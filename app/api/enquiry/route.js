export const runtime = "nodejs";

// Very small in-memory rate limit. Enough to blunt casual abuse on a single instance.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const win = 15 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 10; // shared mobile IPs (CGNAT) are common in India
}

/**
 * The leftmost x-forwarded-for entry is supplied by the caller and can be
 * forged on every request, which defeats the limiter entirely. Prefer the
 * headers the platform itself appends; fall back to the LAST xff hop, which is
 * the one added closest to us.
 */
function clientIp(req) {
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",").pop().trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",").pop().trim();
  return "local";
}

// Generous ceilings — a real enquiry never approaches these. They exist so the
// endpoint cannot be used to pump unbounded content at the studio's mailbox.
const LIMITS = { name: 120, phone: 40, email: 200, location: 160, budget: 40, details: 4000 };

export async function POST(req) {
  try {
    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return Response.json({ error: "Too many enquiries. Please try again shortly." }, { status: 429 });
    }

    const declared = Number(req.headers.get("content-length") || 0);
    if (declared > 20_000) {
      return Response.json({ error: "That message is too long." }, { status: 413 });
    }

    const body = await req.json();
    const { name, phone, email, location, budget, details, company } = body;

    // honeypot: silently accept so bots don't learn anything
    if (company) return Response.json({ ok: true });

    if (!name?.trim() || !phone?.trim() || !location?.trim()) {
      return Response.json({ error: "Please complete the required fields." }, { status: 400 });
    }

    // The client's checks are UX only; this is the authoritative boundary.
    for (const [field, max] of Object.entries(LIMITS)) {
      if (typeof body[field] === "string" && body[field].length > max) {
        return Response.json({ error: "One of those fields is too long." }, { status: 400 });
      }
    }
    if (!/^[\d\s+()-]{7,}$/.test(phone)) {
      return Response.json({ error: "Please check the phone number." }, { status: 400 });
    }
    // Commas would be parsed as a second Reply-To address by nodemailer.
    if (email && (!/^[^\s,<>]+@[^\s,<>]+\.[^\s,<>]+$/.test(email) || email.includes(","))) {
      return Response.json({ error: "Please check the email address." }, { status: 400 });
    }

    // Formspree owns the actual email formatting/delivery; this route stays
    // the authoritative gate (rate limit, honeypot, field validation) in
    // front of it. The endpoint ID isn't a secret — Formspree's protection is
    // domain-allowlisting + its own spam filtering, not URL secrecy — but an
    // env var still overrides it without a code change if it's ever rotated.
    const endpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mzebzqgr";

    const fsRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email: email || undefined,
        location,
        budget: budget || undefined,
        details: details || undefined,
        _subject: `New enquiry — ${name} (${location})`,
        _replyto: email || undefined,
      }),
    });

    if (!fsRes.ok) {
      console.error("[enquiry] Formspree rejected the submission:", fsRes.status, await fsRes.text());
      return Response.json({ ok: true, delivered: false });
    }

    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] failed:", err);
    return Response.json({ error: "We couldn't send that just now. Please call or email us instead." }, { status: 500 });
  }
}
