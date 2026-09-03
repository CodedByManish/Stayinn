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