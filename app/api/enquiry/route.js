import nodemailer from "nodemailer";

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

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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

    const rows = [
      ["Name", name],
      ["Phone", phone],
      ["Email", email || "—"],
      ["Project Location", location],
      ["Approx. Budget", budget || "—"],
      ["Project Details", details || "—"],
    ];

    const html = `
      <div style="font-family:Georgia,serif;background:#F7F2EA;padding:32px;color:#3A2517">
        <p style="letter-spacing:.28em;text-transform:uppercase;font-size:10px;color:#B08356;margin:0">Spaces by Raag</p>
        <h2 style="font-weight:400;font-size:24px;margin:10px 0 24px">New website enquiry</h2>
        <table style="border-collapse:collapse;width:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:10px 0;border-bottom:1px solid #e3d9c9;color:#8a7461;width:170px;vertical-align:top">${k}</td><td style="padding:10px 0;border-bottom:1px solid #e3d9c9;white-space:pre-wrap">${esc(v)}</td></tr>`
            )
            .join("")}
        </table>
      </div>`;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO, ENQUIRY_FROM } = process.env;

    // Without SMTP configured the lead is logged, not lost — and the visitor still
    // gets a success state. Configure the env vars to switch email on.
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ENQUIRY_TO) {
      console.warn("[enquiry] SMTP not configured — lead captured in logs only:", {
        name, phone, email, location, budget, details,
      });
      return Response.json({ ok: true, delivered: false });
    }

    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transport.sendMail({
      from: ENQUIRY_FROM || `"Spaces by Raag Website" <${SMTP_USER}>`,
      to: ENQUIRY_TO,
      replyTo: email || undefined,
      subject: `New enquiry — ${name} (${location})`,
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    });

    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] failed:", err);
    return Response.json({ error: "We couldn't send that just now. Please call or email us instead." }, { status: 500 });
  }
}
