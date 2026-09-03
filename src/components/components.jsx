import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef, useState } from "react";
import Icon from "./icons.jsx";
import { AMENITIES } from "../../data.js";
import { useApp } from "../../AppProvider.jsx";
import { formatMoney, roomLabel, todayISO } from "../../utils.js";

function Rating({ value, count, showBox = false }) {
  return (
    <span
      className="rating"
      aria-label={`Rated ${value} out of 5${count ? `, ${count} reviews` : ""}`}
    >
      <span className="rating-stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon
            key={i}
            name="star"
            style={i <= Math.round(value) ? {} : { opacity: 0.25 }}
          />
        ))}
      </span>

      {showBox ? (
        <Fragment>
          <span className="rating-box">
            <Icon name="star" /> {value.toFixed(1)}
          </span>
          {count != null && (
            <span className="rating-count">({count.toLocaleString()})</span>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <span className="rating-value">{value.toFixed(1)}</span>
          {count != null && (
            <span className="rating-count">
              ({count.toLocaleString()} reviews)
            </span>
          )}
        </Fragment>
      )}
    </span>
  );
}

const amenityIcon = (id) =>
  (AMENITIES.find((a) => a.id === id) || {}).icon || "check";

const amenityLabel = (id) =>
  (AMENITIES.find((a) => a.id === id) || {}).label || id;

function AmenityChips({ ids, limit = 3 }) {
  const shown = ids.slice(0, limit);
  const more = ids.length - shown.length;

  return (
    <div className="amenity-chips" role="list">
      {shown.map((id) => (
        <span key={id} className="chip" role="listitem">
          <Icon name={amenityIcon(id)} /> {amenityLabel(id)}
        </span>
      ))}
      {more > 0 && <span className="chip">+{more} more</span>}
    </div>
  );
}

function AmenityList({ ids }) {
  return (
    <ul className="amenity-list" role="list">
      {ids.map((id) => (
        <li key={id} className="amenity-item">
          <Icon name={amenityIcon(id)} /> {amenityLabel(id)}
        </li>
      ))}
    </ul>
  );
}

function RoomCard({ room, showRating = true }) {
  const { navigate, roomStatus } = useApp();
  const [saved, setSaved] = useState(false);
  const active = !roomStatus[room.id] || roomStatus[room.id] === "active";
  const available = active && room.status === "available";

  return (
    <article className="room-card">
      <div className="room-card-media">
        <span className={`status-pill${available ? "" : " busy"}`}>
          <span className="dot" aria-hidden="true" />
          {available ? "Available" : "Unavailable"}
        </span>

        <button
          className={`room-fav${saved ? " saved" : ""}`}
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved" : "Save room"}
        >
          <Icon name="heart" fill="currentColor" stroke="none" />
        </button>

        <img
          src={room.image}
          alt={`${room.name} — ${room.beds}`}
          loading="lazy"
          width="640"
          height="400"
        />
      </div>

      <div className="room-card-body">
        <div className="room-card-top">
          <h3>{room.name}</h3>
          <span className="type-badge">
            {room.type}
            {room.ac ? " · AC" : " · Non-AC"}
          </span>
        </div>

        {showRating && (
          <Rating value={room.rating} count={room.reviews} />
        )}

        <div className="room-meta">
          <span>
            <Icon name="users" /> Sleeps {room.capacity}
          </span>
          <span>
            <Icon name="bed" /> {roomLabel(room)}
          </span>
          <span>
            <Icon name="ruler" /> {room.size} m²
          </span>
        </div>

        <AmenityChips ids={room.amenities} />

        <div className="room-card-foot">
          <div className="price-block">
            <span className="price">
              {formatMoney(room.price)}
              <small>/night</small>
            </span>
            <div className="per">per room · taxes included</div>
          </div>

          <div className="card-actions">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate(`/room/${room.id}`)}
            >
              Details
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate(`/booking/${room.id}`)}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function RoomCardSkeleton() {
  return (
    <div className="room-card skeleton-card" aria-hidden="true">
      <div className="sk-media skeleton" />
      <div className="room-card-body">
        <div className="sk-line w70 skeleton" />
        <div className="sk-line w40 skeleton" />
        <div className="sk-line w90 skeleton" />
        <div className="sk-line w60 skeleton" />
      </div>
    </div>
  );
}

function GridSkeleton({ count = 6 }) {
  return (
    <div className="room-grid">
      {Array.from({ length: count }).map((_, i) => (
        <RoomCardSkeleton key={i} />
      ))}
    </div>
  );
}

function EmptyState({ icon = "search", title, text, action }) {
  return (
    <div className="state" role="status">
      <div className="state-icon">
        <Icon name={icon} />
      </div>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action}
    </div>
  );
}

function ErrorState({ title = "Something went wrong", text, onRetry }) {
  return (
    <div className="state" role="alert">
      <div className="state-icon">
        <Icon name="alert" />
      </div>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          <Icon name="refresh" /> Try again
        </button>
      )}
    </div>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title || "Dialog"}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal-head">
            <h3>{title}</h3>
            <button
              className="close-icon-btn"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <Icon name="x" />
            </button>
          </div>
        )}

        <div className="modal-body">{children}</div>

        {footer && (
          <div className="modal-body" style={{ paddingTop: 0 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

function Toaster() {
  const { toasts } = useApp();

  return (
    <div className="toast-viewport" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <Icon
            name={
              t.type === "success"
                ? "checkCircle"
                : t.type === "error"
                ? "alert"
                : "info"
            }
          />

          <div>
            {t.title && (
              <div style={{ fontWeight: 600 }}>{t.title}</div>
            )}
            <div>{t.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function GuestStepper({ value, onChange, min = 1, max = 6 }) {
  return (
    <div className="guest-stepper">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease guests"
      >
        −
      </button>
      <span className="value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase guests"
      >
        +
      </button>
    </div>
  );
}

function SearchBar({ compact = false, onSearch }) {
  const { setSearch, navigate } = useApp();
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(3));
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    setError("");

    const q = { checkIn, checkOut, guests };
    setSearch(q);

    const params = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => params.set(k, v));

    if (onSearch) onSearch(q);
    else navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="search-wrap">
      <form className="search-card" onSubmit={submit} noValidate>
        <div className="search-grid">
          <div className={`field${error && !checkIn ? " has-error" : ""}`}>
            <label htmlFor="sb-in">Check-in</label>
            <input
              id="sb-in"
              type="date"
              value={checkIn}
              min={todayISO()}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className={`field${error && !checkOut ? " has-error" : ""}`}>
            <label htmlFor="sb-out">Check-out</label>
            <input
              id="sb-out"
              type="date"
              value={checkOut}
              min={checkIn || todayISO()}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="field">
            <label id="sb-guests-lbl">Guests</label>
            <GuestStepper value={guests} onChange={setGuests} />
          </div>

          <div className="search-actions">
            <button type="submit" className="btn btn-accent">
              <Icon name="search" /> {compact ? "Update" : "Search rooms"}
            </button>
          </div>
        </div>

        {error && (
          <p
            className="field-error"
            style={{ marginTop: 12 }}
            role="alert"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export {
  AmenityChips,
  AmenityList,
  EmptyState,
  ErrorState,
  GridSkeleton,
  GuestStepper,
  Modal,
  Rating,
  Reveal,
  RoomCard,
  RoomCardSkeleton,
  SearchBar,
  Toaster,
};