import React from "react";
import Icon from "./icons.jsx";
import { formatMoney, fmtShortDate, nightsBetween } from "../../utils.js";
import { pricing } from "../../pricing.js";

function BookingSummary({ room, checkIn, checkOut, guests, compact = false }) {
  const nights = nightsBetween(checkIn, checkOut) || 1;
  const p = pricing(room, checkIn, checkOut, guests);

  return (
    <div className="summary-card">
      {!compact && (
        <div className="thumb">
          <img src={room.image} alt={room.name} loading="lazy" />
        </div>
      )}

      <div className="summary-body">
        {!compact && (
          <Fragment>
            <h3>{room.name}</h3>
            <div className="room-type">
              {room.type} · {room.beds} · sleeps {room.capacity}
            </div>
          </Fragment>
        )}

        {compact && (
          <div className="room-card-top" style={{ marginBottom: 4 }}>
            <h3 style={{ fontSize: 18 }}>{room.name}</h3>
            <span className="type-badge">{room.type}</span>
          </div>
        )}

        <div className="bsum">
          <div className="bsum-row">
            <span className="bsum-label">
              <Icon name="calendar" /> Your stay
            </span>
            <span>
              {fmtShortDate(checkIn)} → {fmtShortDate(checkOut)}
            </span>
          </div>

          <div className="bsum-row">
            <span className="bsum-label">
              <Icon name="users" /> Guests
            </span>
            <span>
              {guests} {guests === 1 ? "guest" : "guests"}
            </span>
          </div>

          <div className="bsum-row">
            <span className="bsum-label">
              <Icon name="clock" /> Nights
            </span>
            <span>
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          </div>
        </div>

        <div className="bsum">
          <div className="bsum-row">
            <span>
              {p.nightly
                ? `${formatMoney(p.nightly)} × ${p.nights} night${p.nights > 1 ? "s" : ""}`
                : "Room"}
            </span>
            <span>{formatMoney(p.base)}</span>
          </div>

          <div className="bsum-row">
            <span className="bsum-label">
              <Icon name="shield" /> Taxes & fees (12%)
            </span>
            <span>{formatMoney(p.tax)}</span>
          </div>

          <div className="bsum-row">
            <span className="bsum-label">
              <Icon name="spa" /> Cleaning fee
            </span>
            <span>{formatMoney(p.cleaning)}</span>
          </div>

          {p.discount > 0 && (
            <div className="bsum-row discount">
              <span className="bsum-label">
                <Icon name="check" /> Long-stay discount (10%)
              </span>
              <span>−{formatMoney(p.discount)}</span>
            </div>
          )}

          <div className="bsum-row total">
            <span>Total</span>
            <span>{formatMoney(p.total)}</span>
          </div>

          <p
            style={{
              fontSize: 12.5,
              color: "var(--muted)",
              marginTop: 10,
            }}
          >
            You won't be charged yet. This summary is provided so you always
            know exactly what you'll pay.
          </p>
        </div>
      </div>
    </div>
  );
}

export { BookingSummary as default };