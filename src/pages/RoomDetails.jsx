import React, { useState } from "react";
import Icon from "../components/icons.jsx";
import { Rating, AmenityList, EmptyState } from "../components/components.jsx";
import BookingSummary from "../components/BookingSummary.jsx";
import { ROOMS, PROPERTY } from "../../data.js";
import { roomLabel, todayISO } from "../../utils.js";

function RoomDetails({ id }) {
  const room = ROOMS.find((r) => r.id === id);
  const [active, setActive] = useState(0);
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(3));
  const [guests, setGuests] = useState(Math.min(2, room ? room.capacity : 2));

  if (!room) {
    return (
      <div className="container">
        <EmptyState
          icon="alert"
          title="Room not found"
          text="We couldn't find the room you're looking for."
        />
      </div>
    );
  }

  const gallery =
    room.image && room.gallery
      ? [room.image, ...room.gallery.filter((g) => g !== room.image)]
      : [room.image];

  const handleReserve = () => {
    const params = new URLSearchParams({ checkIn, checkOut, guests });
    window.location.hash = `/booking/${room.id}?${params.toString()}`;
  };

  return (
    <Fragment>
      <div className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <a href="#/rooms">Rooms</a>
            <span className="sep">/</span>
            <span>{room.name}</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="details-grid">
          <div>
            <div className="gallery">
              <div className="gallery-main">
                <img
                  src={gallery[active]}
                  alt={`${room.name} photo ${active + 1}`}
                  loading={active === 0 ? "eager" : "lazy"}
                />
              </div>

              {gallery.length > 1 && (
                <div
                  className="gallery-nav"
                  role="tablist"
                  aria-label="Room photos"
                >
                  {gallery.map((g, i) => (
                    <img
                      key={i}
                      src={g}
                      alt={`Photo ${i + 1}`}
                      className={active === i ? "active" : ""}
                      onClick={() => setActive(i)}
                      role="tab"
                      aria-selected={active === i}
                    />
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: 28 }}>
              <div className="detail-head">
                <div className="row">
                  <div>
                    <span className="type-badge">{room.type}</span>
                    <h1>{room.name}</h1>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <Rating
                      value={room.rating}
                      count={room.reviews}
                      showBox={true}
                    />
                  </div>
                </div>

                <div className="detail-meta">
                  <span>
                    <Icon name="users" /> Sleeps {room.capacity}
                  </span>
                  <span>
                    <Icon name="bed" /> {room.beds}
                  </span>
                  <span>
                    <Icon name="ruler" /> {room.size} m²
                  </span>
                  <span>
                    <Icon name="mapPin" /> {PROPERTY.location}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h2>About this room</h2>
                <p className="body">{room.description}</p>
              </div>

              <div className="detail-section">
                <h2>Amenities</h2>
                <AmenityList ids={room.amenities} />
              </div>

              <div className="detail-section">
                <h2>Room information</h2>

                <div className="info-rows">
                  <div className="info-row">
                    <div className="k">Check-in</div>
                    <div className="v">
                      <Icon name="clock" /> From {PROPERTY.checkIn}
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="k">Check-out</div>
                    <div className="v">
                      <Icon name="clock" /> Until {PROPERTY.checkOut}
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="k">Capacity</div>
                    <div className="v">
                      <Icon name="users" /> Up to {room.capacity} guests
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="k">Room size</div>
                    <div className="v">
                      <Icon name="expand" /> {room.size} m²
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="k">Bed</div>
                    <div className="v">
                      <Icon name="bed" /> {room.beds}
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="k">Availability</div>
                    <div className="v">
                      <span
                        className={`status-pill${
                          room.status === "available" ? "" : " busy"
                        }`}
                        style={{ position: "static" }}
                      >
                        <span className="dot" />{" "}
                        {room.status === "available" ? "Available" : "Limited"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h2>House policies</h2>

                <div className="policy-list">
                  <div className="policy-item">
                    <Icon name="clock" />
                    <div>
                      <div className="t">Check-in & check-out</div>
                      <div className="d">
                        Check-in from {PROPERTY.checkIn}. Check-out by{" "}
                        {PROPERTY.checkOut}. Early arrival and late checkout
                        subject to availability.
                      </div>
                    </div>
                  </div>

                  <div className="policy-item">
                    <Icon name="shield" />
                    <div>
                      <div className="t">Cancellation</div>
                      <div className="d">
                        Free cancellation up to 48 hours before arrival. After
                        that, the first night is charged.
                      </div>
                    </div>
                  </div>

                  <div className="policy-item">
                    <Icon name="users" />
                    <div>
                      <div className="t">Guests</div>
                      <div className="d">
                        Room accommodates up to {room.capacity} guests.
                        Additional guests beyond capacity require a separate
                        room.
                      </div>
                    </div>
                  </div>

                  <div className="policy-item">
                    <Icon name="card" />
                    <div>
                      <div className="t">Payment</div>
                      <div className="d">
                        A valid card is required to confirm. Pay at the
                        property or prepay online — your choice.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h2>Guest reviews</h2>

                <div className="info-rows">
                  <div className="info-row" style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 40,
                        fontWeight: 700,
                        color: "var(--primary)",
                      }}
                    >
                      {room.rating.toFixed(1)}
                    </div>

                    <div
                      className="rating-stars"
                      style={{ justifyContent: "center", margin: "4px 0" }}
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Icon
                          key={s}
                          name="star"
                          style={
                            s <= Math.round(room.rating)
                              ? {}
                              : { opacity: 0.25 }
                          }
                        />
                      ))}
                    </div>

                    <div className="k">{room.reviews} verified reviews</div>
                  </div>

                  <div
                    className="info-row"
                    style={{
                      gridColumn: "span 2",
                      display: "grid",
                      gap: 8,
                    }}
                  >
                    {[
                      ["Cleanliness", 4.8],
                      ["Comfort", 4.7],
                      ["Location", 4.9],
                      ["Value", 4.5],
                    ].map(([label, val]) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            width: 110,
                            fontSize: 14,
                            color: "var(--ink-soft)",
                          }}
                        >
                          {label}
                        </span>

                        <div
                          style={{
                            flex: 1,
                            height: 7,
                            background: "var(--surface-3)",
                            borderRadius: 99,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${(val / 5) * 100}%`,
                              background: "var(--primary)",
                              borderRadius: 99,
                            }}
                          />
                        </div>

                        <span
                          style={{
                            width: 30,
                            textAlign: "right",
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          {val.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="sticky-wrap">
            <div className="summary-card">
              <div className="summary-body">
                <div
                  className="room-card-top"
                  style={{ marginBottom: 12 }}
                >
                  <h3 style={{ fontSize: 18 }}>{room.name}</h3>

                  <span
                    className={`status-pill${
                      room.status === "available" ? "" : " busy"
                    }`}
                  >
                    <span className="dot" />{" "}
                    {room.status === "available" ? "Available" : "Limited"}
                  </span>
                </div>

                <div className="field" style={{ marginBottom: 12 }}>
                  <label htmlFor="rd-in">Check-in</label>
                  <input
                    id="rd-in"
                    type="date"
                    value={checkIn}
                    min={todayISO()}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div className="field" style={{ marginBottom: 12 }}>
                  <label htmlFor="rd-out">Check-out</label>
                  <input
                    id="rd-out"
                    type="date"
                    value={checkOut}
                    min={checkIn || todayISO()}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>

                <div className="field" style={{ marginBottom: 16 }}>
                  <label htmlFor="rd-guests">Guests</label>
                  <select
                    id="rd-guests"
                    value={guests}
                    onChange={(e) => setGuests(+e.target.value)}
                  >
                    {[1, 2, 3, 4]
                      .filter((n) => n <= room.capacity)
                      .map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="summary-rate">
                  <span className="lbl">
                    from{" "}
                    <strong style={{ fontSize: 26, color: "var(--ink)" }}>
                      ${room.price}
                    </strong>{" "}
                    / night
                  </span>

                  <span className="lbl">
                    {roomLabel(room)} · {room.size} m²
                  </span>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handleReserve}
                >
                  Reserve now
                </button>

                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    marginTop: 12,
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <Icon name="lock" /> Free cancellation · No payment today
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Fragment>
  );
}

export {
  RoomDetails as default
};