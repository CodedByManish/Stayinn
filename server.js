// Stayinn backend — Firebase Google auth, admin auth, bookings.
// Self-contained Cloudflare Workers module. No imports.

const schema = `
CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY,
  username TEXT,
  name TEXT,
  email TEXT,
  avatar TEXT,
  role TEXT NOT NULL DEFAULT 'guest',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref TEXT UNIQUE,
  user_id TEXT,
  username TEXT,
  room_id TEXT,
  room_name TEXT,
  room_type TEXT,
  check_in TEXT,
  check_out TEXT,
  guests INTEGER,
  name TEXT,
  email TEXT,
  phone TEXT,
  requests TEXT,
  total INTEGER,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
CREATE INDEX IF NOT EXISTS bookings_user ON bookings (user_id);
`;

// -------- Firebase config (from .env) --------
const FIREBASE_PROJECT_ID = "stayinn-3a715";
const FIREBASE_ISSUER = "https://securetoken.google.com/stayinn-3a715";
const FIREBASE_CERTS_URL =
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

// -------- Admin config (from .env) --------
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "stayinn1234";
const ADMIN_SECRET = "stayinn_";
const ADMIN_TOKEN_TTL = 60 * 60 * 12; // 12h

const HOTEL_STATUSES = ["available", "limited", "fully_booked", "closed"];

function json(data, status = 200) {
  return Response.json(data, { status });
}

// ---------- base64url helpers (manual, no atob/btoa) ----------
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function fromB64url(str) {
  const out = [];
  let buf = 0;
  let bits = 0;
  for (const ch of str) {
    if (ch === "=") break;
    const idx = B64.indexOf(ch);
    if (idx < 0) continue;
    buf = (buf << 6) | idx;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out.push((buf >> bits) & 0xff);
    }
  }
  return new Uint8Array(out);
}

function toB64url(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    s += B64[b0 >> 2];
    s += B64[((b0 & 3) << 4) | (b1 >> 4)];
    s += i + 1 < bytes.length ? B64[((b1 & 15) << 2) | (b2 >> 6)] : "";
    s += i + 2 < bytes.length ? B64[b2 & 63] : "";
  }
  return s;
}

function b64urlJson(str) {
  return JSON.parse(new TextDecoder().decode(fromB64url(str)));
}

function pemToBuffer(pem) {
  const body = pem
    .replace(/-----BEGIN CERTIFICATE-----/g, "")
    .replace(/-----END CERTIFICATE-----/g, "")
    .replace(/-----BEGIN PUBLIC KEY-----/g, "")
    .replace(/-----END PUBLIC KEY-----/g, "")
    .replace(/\s+/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return fromB64url(body).buffer;
}

// ---------- Firebase ID token verification (RS256 via WebCrypto) ----------
let certCache = null;
let certCacheAt = 0;

async function getCerts() {
  // cache for an hour; certs rotate infrequently
  if (certCache && Date.now() - certCacheAt < 3600 * 1000) return certCache;
  const res = await fetch(FIREBASE_CERTS_URL);
  const certs = await res.json();
  certCache = certs;
  certCacheAt = Date.now();
  return certs;
}

async function verifyIdToken(token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) return null;
  const [h, p, sig] = parts;
  let header, payload;
  try {
    header = b64urlJson(h);
    payload = b64urlJson(p);
  } catch {
    return null;
  }
  if (payload.aud !== FIREBASE_PROJECT_ID) return null;
  if (payload.iss !== FIREBASE_ISSUER) return null;
  const now = Math.floor(Date.now() / 1000);
  if (!payload.exp || now >= payload.exp) return null;

  try {
    const certs = await getCerts();
    const cert = certs[header.kid];
    if (!cert) return null;
    const key = await crypto.subtle.importKey(
      "spki",
      pemToBuffer(cert),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      fromB64url(sig),
      new TextEncoder().encode(`${h}.${p}`)
    );
    if (!valid) return null;
  } catch {
    return null;
  }

  return {
    uid: payload.sub || null,
    name: payload.name || payload.displayName || "",
    email: payload.email || "",
    picture: payload.picture || "",
  };
}

// ---------- Admin HMAC token ----------
let hmacKeyPromise = null;
function hmacKey() {
  if (!hmacKeyPromise) {
    hmacKeyPromise = crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(ADMIN_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"]
    );
  }
  return hmacKeyPromise;
}

async function createAdminToken() {
  const exp = Math.floor(Date.now() / 1000) + ADMIN_TOKEN_TTL;
  const data = `${Math.random().toString(36).slice(2)}.${exp}`;
  const key = await hmacKey();
  const sigBytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return `admin.${data}.${toB64url(new Uint8Array(sigBytes))}`;
}

async function verifyAdminToken(token) {
  const t = String(token || "");
  if (!t.startsWith("admin.")) return false;
  const body = t.slice("admin.".length); // <data>.<sig>, data = nonce.exp
  const idx = body.lastIndexOf(".");
  if (idx < 0) return false;
  const data = body.slice(0, idx);
  const sig = body.slice(idx + 1);
  const exp = Number(data.split(".")[1]);
  if (!exp || Math.floor(Date.now() / 1000) >= exp) return false;
  try {
    const key = await hmacKey();
    return await crypto.subtle.verify(
      "HMAC",
      key,
      fromB64url(sig),
      new TextEncoder().encode(data)
    );
  } catch {
    return false;
  }
}

// ---------- Public helpers ----------
function bearerToken(request) {
  const h = request.headers.get("authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7) : null;
}

function fallbackWebsimUser(request) {
  const userId = request.headers.get("x-websim-user-id");
  if (userId) {
    return { uid: userId, name: "", email: "", picture: request.headers.get("x-websim-username") || "" };
  }
  return null;
}

async function authUser(request) {
  const token = bearerToken(request);
  if (token) {
    if (token.startsWith("admin.")) {
      return (await verifyAdminToken(token)) ? { admin: true } : null;
    }
    const fb = await verifyIdToken(token);
    if (fb) return fb;
  }
  return fallbackWebsimUser(request);
}

async function upsertUser(env, uid, { name, email, picture, username }) {
  const existing = await env.DB
    .prepare("SELECT user_id FROM users WHERE user_id = ?")
    .bind(uid)
    .first();
  const isNew = !existing;
  await env.DB
    .prepare(
      "INSERT INTO users (user_id, username, name, email, avatar, role) VALUES (?, ?, ?, ?, ?, 'guest') " +
        "ON CONFLICT(user_id) DO UPDATE SET username=excluded.username, name=excluded.name, email=excluded.email, avatar=excluded.avatar"
    )
    .bind(uid, username || email, name, email || "", picture || "")
    .run();
  return json({ user: { user_id: uid, username: username || email, name, email: email || "", avatar: picture || "", role: "guest" }, isNew });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method;

    // ---------- Google login (Firebase ID token) ----------
    if (method === "POST" && url.pathname === "/api/auth/google") {
      const body = await request.json().catch(() => ({}));
      const idToken = String(body.idToken || "");
      if (!idToken) return json({ error: "Missing Google ID token" }, 401);
      const fb = await verifyIdToken(idToken);
      if (!fb || !fb.uid) return json({ error: "Invalid or expired Google session" }, 401);
      return await upsertUser(env, fb.uid, {
        name: (fb.name || "Guest").slice(0, 120),
        email: (fb.email || "").slice(0, 200),
        picture: (fb.picture || "").slice(0, 500),
        username: (fb.email ? fb.email.split("@")[0] : "guest").slice(0, 60),
      });
    }

    // ---------- Admin login ----------
    if (method === "POST" && url.pathname === "/api/auth/admin") {
      const body = await request.json().catch(() => ({}));
      const uname = String(body.username || "");
      const pass = String(body.password || "");
      if (uname !== ADMIN_USERNAME || pass !== ADMIN_PASSWORD) {
        return json({ error: "Invalid admin credentials", token: null }, 401);
      }
      return json({ token: await createAdminToken(), admin: true });
    }

    // ---------- Current user ----------
    if (method === "GET" && url.pathname === "/api/me") {
      const token = bearerToken(request);
      if (!token) return json({ user: null });
      if (token.startsWith("admin.")) {
        return (await verifyAdminToken(token)) ? json({ user: null, admin: true }) : json({ user: null });
      }
      const fb = await verifyIdToken(token);
      if (!fb || !fb.uid) return json({ user: null });
      const user = await env.DB
        .prepare("SELECT user_id, username, name, email, avatar, role, created_at FROM users WHERE user_id = ?")
        .bind(fb.uid)
        .first();
      return json({ user: user || null });
    }

    // ---------- Hotel status (public) ----------
    if (method === "GET" && url.pathname === "/api/settings") {
      const { results } = await env.DB.prepare("SELECT key, value FROM settings").all();
      const map = {};
      for (const r of results) map[r.key] = r.value;
      const rooms = {};
      for (const r of results) {
        const k = String(r.key);
        if (k.startsWith("room_status_")) rooms[k.slice(12)] = r.value;
      }
      return json({ status: map.hotel_status || "available", rooms });
    }

    // ---------- Bookings ----------
    if (method === "POST" && url.pathname === "/api/bookings") {
      const auth = await authUser(request);
      if (!auth || auth.admin || !auth.uid) return json({ error: "Sign in to book" }, 401);
      const uid = auth.uid;
      const b = await request.json().catch(() => ({}));
      if (!b.roomId || !b.checkIn || !b.checkOut) return json({ error: "Missing booking details" }, 400);
      if (b.checkOut <= b.checkIn) return json({ error: "Check-out must be after check-in" }, 400);

      const ref = "ST" + Math.random().toString(36).slice(2, 8).toUpperCase();
      const total = Number.isFinite(b.total) ? Math.round(b.total) : 0;
      const uname = (auth.name || (auth.email && auth.email.split("@")[0]) || "guest").slice(0, 60);
      const { meta } = await env.DB
        .prepare(
          "INSERT INTO bookings (ref, user_id, username, room_id, room_name, room_type, check_in, check_out, guests, name, email, phone, requests, total, status) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')"
        )
        .bind(
          ref, uid, uname,
          String(b.roomId), String(b.roomName || ""), String(b.roomType || ""),
          String(b.checkIn), String(b.checkOut),
          Math.max(1, Math.min(20, Number(b.guests) || 1)),
          String(b.name || "").slice(0, 120),
          String(b.email || "").slice(0, 200),
          String(b.phone || "").slice(0, 40),
          String(b.requests || "").slice(0, 500),
          total
        )
        .run();

      const booking = await env.DB
        .prepare("SELECT * FROM bookings WHERE id = ?")
        .bind(meta.last_row_id)
        .first();
      return json({ booking });
    }

    if (method === "GET" && url.pathname === "/api/bookings") {
      const auth = await authUser(request);
      if (!auth || auth.admin || !auth.uid) return json({ error: "Sign in required" }, 401);
      const { results } = await env.DB
        .prepare("SELECT * FROM bookings WHERE user_id = ? ORDER BY id DESC")
        .bind(auth.uid)
        .all();
      return json({ bookings: results });
    }

    if (method === "GET" && url.pathname.startsWith("/api/bookings/")) {
      const ref = url.pathname.split("/").pop();
      const booking = await env.DB.prepare("SELECT * FROM bookings WHERE ref = ?").bind(ref).first();
      if (!booking) return json({ error: "Not found" }, 404);
      return json({ booking });
    }

    // ---------- Admin (pasted admin credentials) ----------
    if (url.pathname.startsWith("/api/admin")) {
      const token = bearerToken(request);
      const isAdminToken = token && (await verifyAdminToken(token));
      if (!isAdminToken) return json({ error: "Admin access required" }, 403);

      if (method === "GET" && url.pathname === "/api/admin/users") {
        const { results } = await env.DB
          .prepare("SELECT user_id, username, name, email, avatar, role, created_at FROM users ORDER BY created_at DESC")
          .all();
        return json({ users: results });
      }

      if (method === "DELETE" && url.pathname.startsWith("/api/admin/users/")) {
        const target = url.pathname.split("/").pop();
        await env.DB.prepare("DELETE FROM users WHERE user_id = ?").bind(target).run();
        return json({ ok: true });
      }

      if (method === "GET" && url.pathname === "/api/admin/bookings") {
        const { results } = await env.DB.prepare("SELECT * FROM bookings ORDER BY id DESC").all();
        return json({ bookings: results });
      }

      if (method === "PATCH" && url.pathname.startsWith("/api/admin/bookings/")) {
        const id = Number(url.pathname.split("/").pop());
        const body = await request.json().catch(() => ({}));
        const status = String(body.status || "");
        if (!["pending", "confirmed", "cancelled"].includes(status)) {
          return json({ error: "Invalid status" }, 400);
        }
        await env.DB.prepare("UPDATE bookings SET status = ? WHERE id = ?").bind(status, id).run();
        const booking = await env.DB.prepare("SELECT * FROM bookings WHERE id = ?").bind(id).first();
        if (booking && booking.user_id) {
          try {
            await env.NOTIFICATIONS.send({
              recipients: [booking.user_id],
              title: status === "confirmed" ? "Booking accepted" : "Booking cancelled",
              body: `Your stay at ${booking.room_name || "Stayinn"} (${booking.ref}) was ${status === "confirmed" ? "accepted" : "cancelled by the property"}.`,
              path: `/?ref=${booking.ref}`,
              idempotencyKey: `booking:${booking.id}:${status}`,
            });
          } catch {}
        }
        return json({ booking });
      }

      if (method === "PATCH" && url.pathname.startsWith("/api/admin/rooms/")) {
        const roomId = url.pathname.split("/").pop();
        const body = await request.json().catch(() => ({}));
        const active = body.active === false ? "inactive" : "active";
        if (!/^[a-z0-9-]+$/.test(roomId)) return json({ error: "Invalid room" }, 400);
        const key = "room_status_" + roomId;
        await env.DB
          .prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
          .bind(key, active)
          .run();
        return json({ roomId, active });
      }

      if (method === "GET" && url.pathname === "/api/admin/settings") {
        const { results } = await env.DB.prepare("SELECT key, value FROM settings").all();
        const map = {};
        for (const r of results) map[r.key] = r.value;
        return json({ status: map.hotel_status || "available" });
      }

      if (method === "PATCH" && url.pathname === "/api/admin/settings") {
        const body = await request.json().catch(() => ({}));
        const status = String(body.status || "");
        if (!HOTEL_STATUSES.includes(status)) return json({ error: "Invalid status" }, 400);
        await env.DB
          .prepare("INSERT INTO settings (key, value) VALUES ('hotel_status', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
          .bind(status)
          .run();
        return json({ status });
      }
    }

    return json({ error: "Not found" }, 404);
  },
};