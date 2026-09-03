import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState } from "react";
import Icon from "../components/icons.jsx";
import BookingSummary from "../components/BookingSummary.jsx";
import PayPalButton from "../components/PayPalButton.jsx";
import { EmptyState } from "../components/components.jsx";
import { SignInGate } from "../components/auth.jsx";
import { useApp } from "../../AppProvider.jsx";
import { ROOMS } from "../../data.js";
import { pricing } from "../../pricing.js";
import { todayISO } from "../../utils.js";

function readQuery() {
  const q = new URLSearchParams(window.location.hash.split("?")[1] || "");
  return {
    checkIn: q.get("checkIn") || todayISO(1),
    checkOut: q.get("checkOut") || todayISO(3),
    guests: q.get("guests") ? parseInt(q.get("guests"), 10) : 2
  };
}

const validators = {
  name: (v) => v.trim().length < 2 ? "Please enter the guest's full name." : "",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address.",
  phone: (v) => v.replace(/\D/g, "").length < 7 ? "Enter a valid phone number." : "",
  dates: (ci, co) => {
    if (!ci || !co) return "Please select both check-in and check-out dates.";
    if (co <= ci) return "Check-out must be after check-in.";
    return "";
  }
};

function Booking({ id }) {
  const {
    addBooking,
    toast,
    user,
    authLoading,
    authHeaders,
    hotelStatus,
    roomStatus
  } = useApp();

  const room = ROOMS.find((r) => r.id === id);
  const [q] = useState(readQuery);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
    checkIn: q.checkIn,
    checkOut: q.checkOut,
    guests: q.guests
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (form.guests > (room ? room.capacity : 4)) {
      setForm((f) => ({ ...f, guests: room ? room.capacity : 4 }));
    }
  }, [form.guests, room]);

  if (!room) {
    return (
      <div className="container">
        <EmptyState
          icon="alert"
          title="Room not found"
          text="The room you're booking no longer exists."
        />
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="container">
        <div className="state">
          <p className="muted">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return <SignInGate />;

  const roomInactive =
    room && roomStatus[room.id] && roomStatus[room.id] !== "active";
  const blocked =
    roomInactive ||
    hotelStatus === "closed" ||
    hotelStatus === "fully_booked";

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const setGuests = (e) => {
    const n = Math.max(1, Math.min(room.capacity, +e.target.value));
    setForm((f) => ({ ...f, guests: n }));
  };

  const validate = () => {
    const e = {};
    e.name = validators.name(form.name);
    e.email = validators.email(form.email);
    e.phone = validators.phone(form.phone);
    e.dates = validators.dates(form.checkIn, form.checkOut);
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const createBooking = async () => {
    if (status !== "idle" || blocked || !validate()) return;

    setStatus("submitting");
    setPaymentError("");

    const p2 = pricing(room, form.checkIn, form.checkOut, form.guests);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json", ...authHeaders() },
        body: JSON.stringify({
          roomId: room.id,
          roomName: room.name,
          roomType: room.type,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guests: form.guests,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          requests: form.requests.trim(),
          total: p2.total
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        toast({
          type: "error",
          title: "Booking failed",
          message: data.error || "Please try again."
        });
        return;
      }

      const booking = data.booking;
      addBooking(booking);
      toast({
        type: "success",
        title: "Booking submitted!",
        message: `Reference ${booking.ref}`
      });

      const Swal = window.Swal;

      if (Swal && Swal.fire) {
        Swal.fire({
          icon: "success",
          title: "Booking Submitted!",
          text: `Your booking ${booking.ref} is pending confirmation. A confirmation has been sent to ${booking.email}.`,
          confirmButtonColor: "#b98543",
          confirmButtonText: "View confirmation"
        }).then(() => {
          window.location.hash = `/confirmation/${booking.ref}`;
        });
      } else {
        window.location.hash = `/confirmation/${booking.ref}`;
      }
    } catch {
      setStatus("error");
      toast({
        type: "error",
        title: "Booking failed",
        message: "Network error. Please try again."
      });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (blocked) return;
    if (!validate()) return;
    setPaymentError("");
  };

  const handlePayPalSuccess = () => createBooking();

  const handlePayPalError = (msg) => {
    setStatus("idle");
    setPaymentError(msg);
  };

  const p = pricing(room, form.checkIn, form.checkOut, form.guests);

  const formValid =
    !validators.name(form.name) &&
    !validators.email(form.email) &&
    !validators.phone(form.phone) &&
    !validators.dates(form.checkIn, form.checkOutut);

  return (
    <Fragment>
      <div className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <a href="#/rooms">Rooms</a>
            <span className="sep">/</span>
            <a href={`#/room/${room.id}`}>{room.name}</a>
            <span className="sep">/</span>
            <span>Booking</span>
          </nav>
          <h1>Complete your booking</h1>
        </div>
      </div>

      <div className="container">
        <div className="booking-layout">
          <div>
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <h2>Guest details</h2>
              <p className="form-sub">
                Where should we send your confirmation?
              </p>

              <div className="form-grid">
                <div className="span2">
                  <div className="field">
                    <label htmlFor="bk-name">Full name</label>
                    <input
                      id="bk-name"
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      autoComplete="name"
                      placeholder="Jane Doe"
                    />
                    {errors.name && (
                      <p className="field-error" role="alert">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div className={`field${errors.email ? " has-error" : ""}`}>
                  <label htmlFor="bk-email">Email</label>
                  <input
                    id="bk-email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    autoComplete="email"
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p className="field-error" role="alert">{errors.email}</p>
                  )}
                </div>

                <div className={`field${errors.phone ? " has-error" : ""}`}>
                  <label htmlFor="bk-phone">Phone</label>
                  <input
                    id="bk-phone"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    autoComplete="tel"
                    placeholder="+1 555 010 1234"
                  />
                  {errors.phone && (
                    <p className="field-error" role="alert">{errors.phone}</p>
                  )}
                </div>

                <div className={`field${errors.dates ? " has-error" : ""}`}>
                  <label htmlFor="bk-in">Check-in</label>
                  <input
                    id="bk-in"
                    type="date"
                    value={form.checkIn}
                    min={todayISO()}
                    onChange={set("checkIn")}
                  />
                  {errors.dates && (
                    <p className="field-error" role="alert">{errors.dates}</p>
                  )}
                </div>

                <div className={`field${errors.dates ? " has-error" : ""}`}>
                  <label htmlFor="bk-out">Check-out</label>
                  <input
                    id="bk-out"
                    type="date"
                    value={form.checkOut}
                    min={form.checkIn || todayISO()}
                    onChange={set("checkOut")}
                  />
                </div>

                <div className="span2">
                  <div className="field">
                    <label htmlFor="bk-guests">Number of guests</label>
                    <select
                      id="bk-guests"
                      value={form.guests}
                      onChange={setGuests}
                    >
                      {[1, 2, 3, 4]
                        .filter((n) => n <= room.capacity)
                        .map((n) => (
                          <option value={n} key={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="span2">
                  <div className="field">
                    <label htmlFor="bk-req">
                      Special requests{" "}
                      <span style={{ textTransform: "none", fontWeight: 400 }}>
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="bk-req"
                      value={form.requests}
                      onChange={set("requests")}
                      placeholder="Early check-in, extra pillows, dietary requirements…"
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 24,
                  borderTop: "1px solid var(--line)",
                  paddingTop: 18
                }}
              >
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--ink-soft)",
                    marginBottom: 12,
                    display: "flex",
                    gap: 8,
                    alignItems: "center"
                  }}
                >
                  <Icon name="shield" />
                  Pay securely with PayPal. Free cancellation up to 48h before arrival.
                </p>

                {status === "error" && (
                  <div
                    className="field-error"
                    style={{
                      background: "var(--danger-soft)",
                      padding: 12,
                      borderRadius: 10,
                      marginBottom: 12
                    }}
                    role="alert"
                  >
                    We couldn't process your booking. Your card hasn't been charged — please try again.
                  </div>
                )}

                {paymentError && (
                  <div
                    className="field-error"
                    style={{
                      background: "var(--danger-soft)",
                      padding: 12,
                      borderRadius: 10,
                      marginBottom: 12
                    }}
                    role="alert"
                  >
                    {paymentError}
                  </div>
                )}

                {blocked && (
                  <div
                    className="field-error"
                    style={{
                      background: "var(--warning)",
                      color: "#fff",
                      padding: 12,
                      borderRadius: 10,
                      marginBottom: 12
                    }}
                    role="alert"
                  >
                    We're not accepting new bookings right now. Please check back later.
                  </div>
                )}

                {!blocked && (
                  <PayPalButton
                    amount={p.total}
                    disabled={!formValid || status === "submitting"}
                    onSuccess={handlePayPalSuccess}
                    onError={handlePayPalError}
                  />
                )}

                <button
                  type="submit"
                  className="btn btn-accent btn-lg btn-block"
                  style={{ marginTop: 12 }}
                  disabled={blocked}
                >
                  {blocked ? "Not accepting bookings" : "Review booking details"}
                </button>
              </div>
            </form>
          </div>

          <aside className="sticky-wrap">
            <BookingSummary
              room={room}
              checkIn={form.checkIn}
              checkOut={form.checkOut}
              guests={form.guests}
            />
          </aside>
        </div>
      </div>
    </Fragment>
  );
}

export { Booking as default };