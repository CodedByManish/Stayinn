// ---- Shared helpers ----

export function formatMoney(n) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function fmtDate(d) {
  if (!d) return "—";
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export function fmtShortDate(d) {
  if (!d) return "—";
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn + "T00:00:00");
  const b = new Date(checkOut + "T00:00:00");
  const diff = (b - a) / 86400000;
  return diff > 0 ? Math.round(diff) : 0;
}

export function roomLabel(room) {
  const list = room.beds.split("+").map((b) => b.trim());
  return list[0] || room.beds;
}

export function clone(o) {
  return JSON.parse(JSON.stringify(o));
}
