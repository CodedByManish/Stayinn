import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState } from "react";
import Icon from "../components/icons.jsx";
import { EmptyState } from "../components/components.jsx";
import { useApp } from "../../AppProvider.jsx";
import { ROOMS } from "../../data.js";
import { formatMoney, fmtShortDate } from "../../utils.js";

const ADMIN_KEY = "stayinn_";
const ADMIN_TOKEN_KEY = "stayinn_admin_token";

const HOTEL_STATUSES = [
  { value: "available", label: "Available", icon: "checkCircle", desc: "Accepting all bookings" },
  { value: "limited", label: "Limited availability", icon: "info", desc: "Accepting a few bookings" },
  { value: "fully_booked", label: "Fully booked", icon: "alert", desc: "No more bookings accepted" },
  { value: "closed", label: "Closed", icon: "x", desc: "Hotel closed for bookings" }
];

const BOOKING_STATUS = {
  pending: { label: "Pending", cls: "pending" },
  confirmed: { label: "Confirmed", cls: "confirmed" },
  cancelled: { label: "Cancelled", cls: "cancelled" }
};

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password })
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        setError("Invalid admin credentials. Please try again.");
        setBusy(false);
        return;
      }

      sessionStorage.setItem(ADMIN_KEY, "1");
      sessionStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      onLogin();
    } catch {
      setError("Couldn't reach the server. Please try again.");
    }

    setBusy(false);
  };

  return (
    <div className="container">
      <div className="admin-login">
        <div className="admin-login-icon">
          <Icon name="shield" />
        </div>

        <h1>Admin sign in</h1>
        <p className="form-sub">Restricted area — property staff only.</p>

        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="adm-user">Username</label>
            <input
              id="adm-user"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="adm-pass">Password</label>
            <input
              id="adm-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            style={{ marginTop: 8 }}
            disabled={busy}
          >
            {busy ? "Signing in…" : "Sign in to admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Admin() {
  const { hotelStatus, setHotelStatus, roomStatus, updateRoomStatus, toast } = useApp();
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(ADMIN_KEY) === "1"
  );
  const [tab, setTab] = useState("rooms");
  const [hotelStatusLocal, setHotelStatusLocal] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const adminHeaders = () => ({
    "content-type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem(ADMIN_TOKEN_KEY) || ""}`
  });

  useEffect(() => {
    if (!authed) return;

    setLoading(true);
    setLoadError("");

    if (hotelStatusLocal === null) setHotelStatusLocal(hotelStatus);

    const loadAll = async () => {
      try {
        const [u, b] = await Promise.all([
          fetch("/api/admin/users", { headers: adminHeaders() }).then((r) => r.json()),
          fetch("/api/admin/bookings", { headers: adminHeaders() }).then((r) => r.json())
        ]);

        if (u.error || b.error) {
          setLoadError(
            u.error || b.error || "Couldn't load admin data. Please sign in again."
          );
          setAuthed(false);
          sessionStorage.removeItem(ADMIN_KEY);
          sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        } else {
          setUsers(u.users || []);
          setBookings(b.bookings || []);
        }
      } catch {
        setLoadError("Couldn't reach the server. Please try again.");
      }

      setLoading(false);
    };

    loadAll();
  }, [authed]);

  useEffect(() => {
    if (hotelStatusLocal === null) setHotelStatusLocal(hotelStatus);
  }, [hotelStatus, hotelStatusLocal]);

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  const setHotel = async (status) => {
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      const prev = hotelStatusLocal;
      setHotelStatusLocal(status);
      setHotelStatus(status);

      toast({
        type: "success",
        title: "Status updated",
        message: `Hotel is now ${
          HOTEL_STATUSES.find((s) => s.value === status).label.toLowerCase()
        }.`
      });

      if (!prev) {
      }
    } else {
      toast({
        type: "error",
        title: "Update failed",
        message: "Couldn't update the hotel status."
      });
    }
  };

  const setRoomActive = async (room, active) => {
    updateRoomStatus(room.id, active ? "active" : "inactive");

    const res = await fetch(`/api/admin/rooms/${room.id}`, {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ active })
    });

    if (res.ok) {
      toast({
        type: "success",
        title: "Room updated",
        message: `${room.name} is now ${active ? "active" : "inactive"}.`
      });
    } else {
      updateRoomStatus(room.id, active ? "inactive" : "active");
      const data = await res.json().catch(() => ({}));

      toast({
        type: "error",
        title: "Update failed",
        message: data.error || "Couldn't update the room."
      });
    }
  };

  const setBookingStatus = async (id, status) => {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      setBookings((list) =>
        list.map((b) => (b.id === id ? { ...b, status } : b))
      );

      toast({
        type: "success",
        title: "Booking updated",
        message: `Booking ${
          status === "confirmed" ? "accepted" : "cancelled"
        }. The guest was notified.`
      });
    } else {
      toast({
        type: "error",
        title: "Update failed",
        message: "Couldn't update the booking."
      });
    }
  };

  const removeUser = async (id) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      headers: adminHeaders()
    });

    if (res.ok) {
      setUsers((list) => list.filter((u) => u.user_id !== id));
      toast({
        type: "success",
        title: "User removed",
        message: "The user was removed."
      });
    } else {
      toast({
        type: "error",
        title: "Remove failed",
        message: "Couldn't remove the user."
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setAuthed(false);
  };

  const currentStatus =
    HOTEL_STATUSES.find(
      (s) => s.value === (hotelStatusLocal || "available")
    ) || HOTEL_STATUSES[0];

  return (
    <Fragment>
      <div className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <span>Admin</span>
          </nav>

          <div className="page-head-inner">
            <div>
              <h1>Admin panel</h1>
              <p className="sub">Manage rooms, bookings and guests.</p>
            </div>

            <button className="btn btn-outline btn-sm" onClick={logout}>
              <Icon name="x" /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {loadError && (
          <div
            className="field-error"
            style={{
              background: "var(--danger-soft)",
              padding: 12,
              borderRadius: 10,
              marginBottom: 16
            }}
            role="alert"
          >
            {loadError}
          </div>
        )}

        <div className="admin-tabs" role="tablist">
          {[
            { id: "rooms", label: "Rooms", icon: "bed" },
            { id: "bookings", label: `Bookings (${bookings.length})`, icon: "calendar" },
            { id: "users", label: `Users (${users.length})`, icon: "users" },
            { id: "hotel", label: "Hotel status", icon: "home" }
          ].map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={tab === t.id ? "active" : ""}
              onClick={() => setTab(t.id)}
            >
              <Icon name={t.icon} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "rooms" && (
          <div className="admin-card">
            <h2>Rooms</h2>
            <p className="form-sub">
              Toggle a room on/off. Inactive rooms show as "Unavailable" on the site and can't be booked.
            </p>

            <div className="room-manage-grid">
              {ROOMS.map((room) => {
                const active = (roomStatus[room.id] || "active") === "active";

                return (
                  <div
                    className={`room-manage${active ? "" : " off"}`}
                    key={room.id}
                  >
                    <div className="room-manage-media">
                      <img src={room.image} alt={room.name} loading="lazy" />
                      <span className={`status-pill${active ? "" : " busy"}`}>
                        <span className="dot" /> {active ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    <div className="room-manage-body">
                      <div className="room-manage-name">{room.name}</div>
                      <div className="cell-sub">
                        {room.type} · {room.beds} · {formatMoney(room.price)}/night
                      </div>

                      <div className="room-manage-actions">
                        <button
                          className={`btn ${active ? "btn-outline" : "btn-primary"} btn-sm`}
                          onClick={() => setRoomActive(room, !active)}
                        >
                          <Icon name={active ? "x" : "check"} />
                          {active ? "Mark inactive" : "Make active"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "hotel" && (
          <div className="admin-card">
            <h2>Hotel availability</h2>
            <p className="form-sub">
              Set the overall status shown to guests. Closed or fully booked blocks new bookings.
            </p>

            <div className="status-options">
              {HOTEL_STATUSES.map((s) => (
                <button
                  key={s.value}
                  className={`status-option${
                    currentStatus.value === s.value ? " active" : ""
                  }`}
                  onClick={() => setHotel(s.value)}
                >
                  <Icon name={s.icon} />
                  <span>{s.label}</span>
                  {currentStatus.value === s.value && (
                    <Icon name="check" className="status-check" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="admin-card">
            <h2>Bookings</h2>

            {loading ? (
              <p className="muted">Loading bookings…</p>
            ) : bookings.length === 0 ? (
              <EmptyState
                icon="calendar"
                title="No bookings yet"
                text="Bookings will appear here once guests confirm a stay."
              />
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Dates</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((b) => {
                      const st = BOOKING_STATUS[b.status] || BOOKING_STATUS.pending;

                      return (
                        <tr key={b.id}>
                          <td className="mono">{b.ref}</td>

                          <td>
                            <div className="cell-name">{b.name || b.username}</div>
                            <div className="cell-sub">{b.email}</div>
                          </td>

                          <td>{b.room_name}</td>

                          <td className="cell-sub">
                            {fmtShortDate(b.check_in)} → {fmtShortDate(b.check_out)}
                          </td>

                          <td>{formatMoney(b.total)}</td>

                          <td>
                            <span className={`status-badge ${st.cls}`}>
                              {st.label}
                            </span>
                          </td>

                          <td>
                            <div className="row-actions">
                              {b.status !== "confirmed" && (
                                <button
                                  className="btn btn-soft btn-sm"
                                  onClick={() => setBookingStatus(b.id, "confirmed")}
                                >
                                  Accept
                                </button>
                              )}

                              {b.status !== "cancelled" && (
                                <button
                                  className="btn btn-outline btn-sm danger"
                                  onClick={() => setBookingStatus(b.id, "cancelled")}
                                >
                                  Reject
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "users" && (
          <div className="admin-card">
            <h2>Registered users</h2>

            {loading ? (
              <p className="muted">Loading users…</p>
            ) : users.length === 0 ? (
              <EmptyState
                icon="users"
                title="No users yet"
                text="Guests who sign in with Google will appear here."
              />
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((u) => (
                      <tr key={u.user_id}>
                        <td>
                          <div className="cell-user">
                            <img
                              src={u.avatar || `https://images.websim.com/avatar/${u.username}`}
                              alt=""
                              className="user-avatar"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />

                            <div>
                              <div className="cell-name">
                                {u.name || u.username}
                              </div>
                              <div className="cell-sub">@{u.username}</div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              u.role === "admin" ? "confirmed" : "pending"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>

                        <td className="cell-sub">
                          {u.created_at
                            ? new Date(u.created_at + "Z").toLocaleDateString()
                            : "—"}
                        </td>

                        <td>
                          <button
                            className="btn btn-outline btn-sm danger"
                            onClick={() => removeUser(u.user_id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export { Admin as default };