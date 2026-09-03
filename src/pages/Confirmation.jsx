import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState } from "react";
import Icon from "../components/icons.jsx";
import { EmptyState } from "../components/components.jsx";
import { useApp } from "../../AppProvider.jsx";
import { ROOMS, PROPERTY } from "../../data.js";
import { pricing } from "../../pricing.js";
import { formatMoney, fmtDate } from "../../utils.js";

const STATUS_META = {
  pending: { label: "Pending confirmation", cls: "pending" },
  confirmed: { label: "Confirmed", cls: "confirmed" },
  cancelled: { label: "Cancelled", cls: "cancelled" }
};

function Confirmation({ refId }) {
  const { bookings } = useApp();
  const [status, setStatus] = useState(null);
  const booking = bookings.find((b) => b.ref === refId);
  const room = booking ? ROOMS.find((r) => r.id === booking.roomId) : null;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/bookings/${refId}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.booking) setStatus(data.booking.status);
        }
      } catch {}

    })();

    return () => {
      cancelled = true;
    };
  }, [refId]);

  if (!booking || !room) {
    return (
      <div className="container">
        <EmptyState
          icon="alert"
          title="Booking not found"
          text="We couldn't find that booking. Check the reference number or contact us."
        />
      </div>
    );
  }

  const p = pricing(room, booking.checkIn, booking.checkOut, booking.guests);
  const nights = p.nights;
  const st = STATUS_META[status] || STATUS_META.pending;

  return (
    <div className="container confirm-wrap">
      <div className="confirm-card">
        <div className="confirm-hero">
          <div className="confirm-icon">
            <Icon name="checkCircle" />
          </div>
          <h1>
            Booking {status === "cancelled" ? "cancelled" : "confirmed"}!
          </h1>
          <p>
            A confirmation has been sent to {booking.email}.
          </p>
          <div className="confirm-ref">
            Booking reference&nbsp; <strong>{booking.ref}</strong>
          </div>
          <span className={`status-badge ${st.cls}`}>{st.label}</span>
        </div>

        <div className="confirm-body">
          <div className="confirm-section">
            <h2>Your stay</h2>
            <div className="confirm-room">
              <img src={room.image} alt={room.name} />
              <div>
                <div className="n">{booking.roomName}</div>
                <div className="t">
                  {room.type} · {room.beds} · sleeps {room.capacity}
                </div>
                <div className="t">
                  {PROPERTY.name}, {PROPERTY.location}
                </div>
              </div>
            </div>
          </div>

          <div className="confirm-section">
            <h2>Guest details</h2>
            <div className="confirm-rows">
              <div className="confirm-row">
                <span className="k">Name</span>
                <span className="v">{booking.name}</span>
              </div>
              <div className="confirm-row">
                <span className="k">Email</span>
                <span className="v">{booking.email}</span>
              </div>
              <div className="confirm-row">
                <span className="k">Phone</span>
                <span className="v">{booking.phone}</span>
              </div>
              {booking.requests && (
                <div className="confirm-row">
                  <span className="k">Special requests</span>
                  <span
                    className="v"
                    style={{ textAlign: "right", maxWidth: 260 }}
                  >
                    {booking.requests}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="confirm-section">
            <h2>Dates & guests</h2>
            <div className="confirm-rows">
              <div className="confirm-row">
                <span className="k">Check-in</span>
                <span className="v">
                  {fmtDate(booking.checkIn)} · from {PROPERTY.checkIn}
                </span>
              </div>
              <div className="confirm-row">
                <span className="k">Check-out</span>
                <span className="v">
                  {fmtDate(booking.checkOut)} · until {PROPERTY.checkOut}
                </span>
              </div>
              <div className="confirm-row">
                <span className="k">Length of stay</span>
                <span className="v">
                  {nights} {nights === 1 ? "night" : "nights"}
                </span>
              </div>
              <div className="confirm-row">
                <span className="k">Guests</span>
                <span className="v">
                  {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                </span>
              </div>
            </div>
          </div>

          <div className="confirm-section">
            <h2>Price summary</h2>
            <div className="confirm-rows">
              <div className="confirm-row">
                <span className="k">Room</span>
                <span className="v">{formatMoney(p.base)}</span>
              </div>
              <div className="confirm-row">
                <span className="k">Taxes & fees</span>
                <span className="v">{formatMoney(p.tax)}</span>
              </div>
              <div className="confirm-row">
                <span className="k">Cleaning fee</span>
                <span className="v">{formatMoney(p.cleaning)}</span>
              </div>

              {p.discount > 0 && (
                <div className="confirm-row">
                  <span className="k" style={{ color: "var(--success)" }}>
                    Long-stay discount
                  </span>
                  <span className="v" style={{ color: "var(--success)" }}>
                    −{formatMoney(p.discount)}
                  </span>
                </div>
              )}
            </div>

            <div className="confirm-total">
              <span>Total due</span>
              <span>{formatMoney(p.total)}</span>
            </div>
          </div>

          <div className="confirm-section">
            <h2>Good to know</h2>
            <div className="confirm-rows">
              <div className="confirm-row">
                <span className="k">Check-in</span>
                <span className="v">
                  From {PROPERTY.checkIn} · ID required
                </span>
              </div>
              <div className="confirm-row">
                <span className="k">Cancellation</span>
                <span className="v">Free until 48h before arrival</span>
              </div>
              <div className="confirm-row">
                <span className="k">Questions?</span>
                <span className="v">{PROPERTY.contact.phone}</span>
              </div>
            </div>
          </div>

          <div className="confirm-actions no-print">
            <button
              className="btn btn-primary"
              onClick={() => window.print()}
            >
              <Icon name="print" /> Download PDF
            </button>
            <a href="#/rooms" className="btn btn-outline">
              Book another room
            </a>
            <a href="#/" className="btn btn-ghost">
              Back to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Confirmation as default };