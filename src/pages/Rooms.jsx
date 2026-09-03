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
  const [query] = useState(() => parseQuery(window.location.hash.split("?")[1] || ""));
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
  const toggle = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  const activeFilterCount = (beds.length ? 1 : 0) + (amen.length ? 1 : 0) + (availability !== "all" ? 1 : 0) + (acFilter ? 1 : 0) + (maxGuests ? 1 : 0) + (price[0] !== MIN_PRICE || price[1] !== MAX_PRICE ? 1 : 0);
  const filtered = useMemo(() => {
    let list = ROOMS.filter((r) => {
      const active = !roomStatus[r.id] || roomStatus[r.id] === "active";
      if (!active) return false;
      if (r.price < price[0] || r.price > price[1]) return false;
      if (acFilter === "ac" && !r.ac) return false;
      if (acFilter === "nonac" && r.ac) return false;
      if (beds.length && !beds.some((b) => r.beds.toLowerCase().includes(b.toLowerCase()))) return false;
      if (amen.length && !amen.every((a) => r.amenities.includes(a))) return false;
      if (availability === "available" && (!active || r.status !== "available")) return false;
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
      default:
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
  const Filters = /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "filter-group", children: [
      /* @__PURE__ */ jsxDEV("h4", { children: "Price per night" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 97,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "range", "aria-hidden": "true", children: /* @__PURE__ */ jsxDEV("div", { className: "range-fill", style: { left: `${price[0] / MAX_PRICE * 100}%`, width: `${(price[1] - price[0]) / MAX_PRICE * 100}%` } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 99,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 98,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "range-inputs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "range-box", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "$" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 102,
            columnNumber: 38
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              value: price[0],
              min: 0,
              max: MAX_PRICE,
              "aria-label": "Minimum price",
              onChange: (e) => setPrice([Math.max(0, +e.target.value || 0), Math.max(price[1], +e.target.value || 0)])
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 103,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 102,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "range-box", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "$" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 106,
            columnNumber: 38
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              value: price[1],
              min: 0,
              max: MAX_PRICE,
              "aria-label": "Maximum price",
              onChange: (e) => setPrice([Math.min(price[0], +e.target.value || 0), Math.min(MAX_PRICE, +e.target.value || MAX_PRICE)])
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 107,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 106,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 101,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 96,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "filter-group", children: [
      /* @__PURE__ */ jsxDEV("h4", { children: "Room type" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 114,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "filter-options", children: [
        /* @__PURE__ */ jsxDEV("label", { className: "filter-option", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "checkbox",
              checked: acFilter === "ac",
              onChange: () => setAcFilter(acFilter === "ac" ? null : "ac")
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 117,
              columnNumber: 13
            },
            this
          ),
          "Air-conditioned"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 116,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("label", { className: "filter-option", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "checkbox",
              checked: acFilter === "nonac",
              onChange: () => setAcFilter(acFilter === "nonac" ? null : "nonac")
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 125,
              columnNumber: 13
            },
            this
          ),
          "Non-Air-conditioned"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 124,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 115,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "filter-group", children: [
      /* @__PURE__ */ jsxDEV("h4", { children: "Bed type" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 136,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "filter-options", children: BED_FILTERS.map((b) => /* @__PURE__ */ jsxDEV("label", { className: "filter-option", children: [
        /* @__PURE__ */ jsxDEV("input", { type: "checkbox", checked: beds.includes(b.id), onChange: () => toggle(beds, setBeds, b.id) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 140,
          columnNumber: 15
        }, this),
        b.label
      ] }, b.id, true, {
        fileName: "<stdin>",
        lineNumber: 139,
        columnNumber: 13
      }, this)) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 137,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 135,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "filter-group", children: [
      /* @__PURE__ */ jsxDEV("h4", { children: "Guests" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 148,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "filter-options", children: [1, 2].map((n) => /* @__PURE__ */ jsxDEV("label", { className: "filter-option", children: [
        /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "guests-filter", checked: maxGuests === n, onChange: () => setMaxGuests(maxGuests === n ? 0 : n) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 152,
          columnNumber: 15
        }, this),
        n,
        " guest",
        n === 1 ? "" : "s"
      ] }, n, true, {
        fileName: "<stdin>",
        lineNumber: 151,
        columnNumber: 13
      }, this)) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 149,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 147,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "filter-group", children: [
      /* @__PURE__ */ jsxDEV("h4", { children: "Amenities" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 160,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "filter-options", children: AMENITY_FILTERS.map((a) => /* @__PURE__ */ jsxDEV("label", { className: "filter-option", children: [
        /* @__PURE__ */ jsxDEV("input", { type: "checkbox", checked: amen.includes(a.id), onChange: () => toggle(amen, setAmen, a.id) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 164,
          columnNumber: 15
        }, this),
        a.label
      ] }, a.id, true, {
        fileName: "<stdin>",
        lineNumber: 163,
        columnNumber: 13
      }, this)) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 161,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 159,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "filter-group", children: [
      /* @__PURE__ */ jsxDEV("h4", { children: "Availability" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 172,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "filter-options", children: [
        /* @__PURE__ */ jsxDEV("label", { className: "filter-option", children: [
          /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "avail", checked: availability === "all", onChange: () => setAvailability("all") }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 175,
            columnNumber: 13
          }, this),
          "All rooms"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 174,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("label", { className: "filter-option", children: [
          /* @__PURE__ */ jsxDEV("input", { type: "radio", name: "avail", checked: availability === "available", onChange: () => setAvailability("available") }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 179,
            columnNumber: 13
          }, this),
          "Available now"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 178,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 173,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 171,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "filter-actions", children: /* @__PURE__ */ jsxDEV("button", { className: "btn btn-primary btn-block", onClick: reset, disabled: activeFilterCount === 0, children: "Reset filters" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 186,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 185,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 95,
    columnNumber: 5
  }, this);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "page-head", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      /* @__PURE__ */ jsxDEV("nav", { className: "crumbs", "aria-label": "Breadcrumb", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "#/", children: "Home" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 198,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "sep", children: "/" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 198,
          columnNumber: 34
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Rooms" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 198,
          columnNumber: 64
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 197,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "page-head-inner", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h1", { children: "Rooms & suites" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 202,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "sub", children: query.checkIn && query.checkOut ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
          "Staying ",
          query.checkIn,
          " \u2192 ",
          query.checkOut,
          query.guests ? ` \xB7 ${query.guests} guests` : ""
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 205,
          columnNumber: 21
        }, this) : "Every room includes free Wi-Fi and flexible cancellation." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 203,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 201,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 200,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 196,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 195,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV("div", { className: "layout", children: [
      /* @__PURE__ */ jsxDEV("aside", { className: "filter-panel", "aria-label": "Filters", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "filter-head", style: { display: "none" } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 217,
          columnNumber: 13
        }, this),
        Filters
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 216,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "results-head", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "results-count", "aria-live": "polite", children: loading ? "Finding rooms\u2026" : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV("strong", { children: filtered.length }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 225,
              columnNumber: 49
            }, this),
            " ",
            filtered.length === 1 ? "room" : "rooms",
            " available"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 225,
            columnNumber: 47
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 224,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "sort", children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "sort", className: "visually-hidden", children: "Sort rooms" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 228,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("select", { id: "sort", className: "sort-select", value: sort, onChange: (e) => setSort(e.target.value), children: [
              /* @__PURE__ */ jsxDEV("option", { value: "popular", children: "Most popular" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 230,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "price-asc", children: "Price: low \u2192 high" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 231,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "price-desc", children: "Price: high \u2192 low" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 232,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "rating", children: "Highest rated" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 233,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 229,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 227,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 223,
          columnNumber: 13
        }, this),
        loading ? /* @__PURE__ */ jsxDEV(GridSkeleton, { count: 6 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 239,
          columnNumber: 15
        }, this) : filtered.length === 0 ? /* @__PURE__ */ jsxDEV(
          EmptyState,
          {
            icon: "filter",
            title: "No rooms match your filters",
            text: "Try widening your price range, removing a few filters, or checking other dates.",
            action: /* @__PURE__ */ jsxDEV("button", { className: "btn btn-primary", onClick: reset, children: "Clear all filters" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 245,
              columnNumber: 25
            }, this)
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 241,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ jsxDEV("div", { className: "room-grid", children: filtered.map((room) => /* @__PURE__ */ jsxDEV(RoomCard, { room }, room.id, false, {
          fileName: "<stdin>",
          lineNumber: 249,
          columnNumber: 41
        }, this)) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 248,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 222,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 214,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 213,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 194,
    columnNumber: 5
  }, this);
}
export {
  Rooms as default
};
