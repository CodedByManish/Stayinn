import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useMemo, useState } from "react";
import { RoomCard, GridSkeleton, EmptyState } from "../components/components.jsx";
import { ROOMS } from "../../data.js";
import { useApp } from "../../AppProvider.jsx";

const MAX_PRICE = 500;
const MIN_PRICE = 0;

const BED_FILTERS = [
  { id: "single", label: "Single bed" },
  { id: "double", label: "Double bed" }
];

const AMENITY_FILTERS = [
  { id: "wifi", label: "Free Wi-Fi" },
  { id: "ac", label: "Air Conditioning" },
  { id: "tv", label: "Smart TV" },
  { id: "balcony", label: "Private Balcony" }
];

function parseQuery(query) {
  const q = new URLSearchParams(query);
  return {
    type: q.get("type") || null,
    checkIn: q.get("checkIn") || null,
    checkOut: q.get("checkOut") || null,
    guests: q.get("guests") ? parseInt(q.get("guests"), 10) : null
  };
}

function Rooms() {
  const { roomStatus } = useApp();
  const [loading, setLoading] = useState(true);
  const [query] = useState(() =>
    parseQuery(window.location.hash.split("?")[1] || "")
  );
  const [price, setPrice] = useState([80, MAX_PRICE]);
  const [acFilter, setAcFilter] = useState(null);
  const [beds, setBeds] = useState([]);
  const [amen, setAmen] = useState([]);
  const [availability, setAvailability] = useState("all");
  const [maxGuests, setMaxGuests] = useState(0);
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (query.type) {
      const t = String(query.type).toLowerCase();
      if (t.includes("ac") || t.includes("condition")) setAcFilter("ac");
    }
  }, [query.type]);

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const activeFilterCount =
    (beds.length ? 1 : 0) +
    (amen.length ? 1 : 0) +
    (availability !== "all" ? 1 : 0) +
    (acFilter ? 1 : 0) +
    (maxGuests ? 1 : 0) +
    (price[0] !== MIN_PRICE || price[1] !== MAX_PRICE ? 1 : 0);

  const filtered = useMemo(() => {
    let list = ROOMS.filter((r) => {
      const active = !roomStatus[r.id] || roomStatus[r.id] === "active";

      if (!active) return false;
      if (r.price < price[0] || r.price > price[1]) return false;
      if (acFilter === "ac" && !r.ac) return false;
      if (acFilter === "nonac" && r.ac) return false;
      if (beds.length && !beds.some((b) => r.beds.toLowerCase().includes(b.toLowerCase()))) return false;
      if (amen.length && !amen.every((a) => r.amenities.includes(a))) return false;
      if (availability === "available" && r.status !== "available") return false;
      if (maxGuests && r.capacity < maxGuests) return false;

      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        list = [...list].sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return list;
  }, [price, acFilter, beds, amen, availability, maxGuests, sort]);

  const reset = () => {
    setPrice([MIN_PRICE, MAX_PRICE]);
    setAcFilter(null);
    setBeds([]);
    setAmen([]);
    setAvailability("all");
    setMaxGuests(0);
    setSort("popular");
  };

  const Filters = (
    <Fragment>
      <div className="filter-group">
        <h4>Price per night</h4>
        <div className="range" aria-hidden="true">
          <div
            className="range-fill"
            style={{
              left: `${(price[0] / MAX_PRICE) * 100}%`,
              width: `${((price[1] - price[0]) / MAX_PRICE) * 100}%`
            }}
          />
        </div>

        <div className="range-inputs">
          {[0, 1].map((i) => (
            <div className="range-box" key={i}>
              <span>$</span>
              <input
                type="number"
                value={price[i]}
                min={0}
                max={MAX_PRICE}
                aria-label={i === 0 ? "Minimum price" : "Maximum price"}
                onChange={(e) => {
                  const value = +e.target.value || 0;
                  setPrice(
                    i === 0
                      ? [Math.max(0, value), Math.max(price[1], value)]
                      : [Math.min(price[0], value), Math.min(MAX_PRICE, value || MAX_PRICE)]
                  );
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Room type</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={acFilter === "ac"}
              onChange={() => setAcFilter(acFilter === "ac" ? null : "ac")}
            />
            Air-conditioned
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={acFilter === "nonac"}
              onChange={() => setAcFilter(acFilter === "nonac" ? null : "nonac")}
            />
            Non-Air-conditioned
          </label>
        </div>
      </div>

      <div className="filter-group">
        <h4>Bed type</h4>
        <div className="filter-options">
          {BED_FILTERS.map((b) => (
            <label key={b.id} className="filter-option">
              <input
                type="checkbox"
                checked={beds.includes(b.id)}
                onChange={() => toggle(beds, setBeds, b.id)}
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Guests</h4>
        <div className="filter-options">
          {[1, 2].map((n) => (
            <label key={n} className="filter-option">
              <input
                type="radio"
                name="guests-filter"
                checked={maxGuests === n}
                onChange={() => setMaxGuests(maxGuests === n ? 0 : n)}
              />
              {n} guest{n === 1 ? "" : "s"}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Amenities</h4>
        <div className="filter-options">
          {AMENITY_FILTERS.map((a) => (
            <label key={a.id} className="filter-option">
              <input
                type="checkbox"
                checked={amen.includes(a.id)}
                onChange={() => toggle(amen, setAmen, a.id)}
              />
              {a.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Availability</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="avail"
              checked={availability === "all"}
              onChange={() => setAvailability("all")}
            />
            All rooms
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="avail"
              checked={availability === "available"}
              onChange={() => setAvailability("available")}
            />
            Available now
          </label>
        </div>
      </div>

      <div className="filter-actions">
        <button
          className="btn btn-primary btn-block"
          onClick={reset}
          disabled={activeFilterCount === 0}
        >
          Reset filters
        </button>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/">Home</a>
            <span className="sep">/</span>
            <span>Rooms</span>
          </nav>

          <div className="page-head-inner">
            <div>
              <h1>Rooms & suites</h1>
              <p className="sub">
                {query.checkIn && query.checkOut ? (
                  <Fragment>
                    Staying {query.checkIn} → {query.checkOut}
                    {query.guests ? ` · ${query.guests} guests` : ""}
                  </Fragment>
                ) : (
                  "Every room includes free Wi-Fi and flexible cancellation."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="layout">
          <aside className="filter-panel" aria-label="Filters">
            <div className="filter-head" style={{ display: "none" }} />
            {Filters}
          </aside>

          <div>
            <div className="results-head">
              <div className="results-count" aria-live="polite">
                {loading ? (
                  "Finding rooms…"
                ) : (
                  <Fragment>
                    <strong>{filtered.length}</strong>{" "}
                    {filtered.length === 1 ? "room" : "rooms"} available
                  </Fragment>
                )}
              </div>

              <div className="sort">
                <label htmlFor="sort" className="visually-hidden">
                  Sort rooms
                </label>
                <select
                  id="sort"
                  className="sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="popular">Most popular</option>
                  <option value="price-asc">Price: low → high</option>
                  <option value="price-desc">Price: high → low</option>
                  <option value="rating">Highest rated</option>
                </select>
              </div>
            </div>

            {loading ? (
              <GridSkeleton count={6} />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon="filter"
                title="No rooms match your filters"
                text="Try widening your price range, removing a few filters, or checking other dates."
                action={
                  <button className="btn btn-primary" onClick={reset}>
                    Clear all filters
                  </button>
                }
              />
            ) : (
              <div className="room-grid">
                {filtered.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { Rooms as default };