import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef, useState } from "react";
import Icon from "./icons.jsx";
import { AMENITIES } from "../../data.js";
import { useApp } from "../../AppProvider.jsx";
import { formatMoney, roomLabel, todayISO } from "../../utils.js";
function Rating({ value, count, showBox = false }) {
  return /* @__PURE__ */ jsxDEV("span", { className: "rating", "aria-label": `Rated ${value} out of 5${count ? `, ${count} reviews` : ""}`, children: [
    /* @__PURE__ */ jsxDEV("span", { className: "rating-stars", "aria-hidden": "true", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxDEV(Icon, { name: "star", style: i <= Math.round(value) ? {} : { opacity: 0.25 } }, i, false, {
      fileName: "<stdin>",
      lineNumber: 13,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    showBox ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("span", { className: "rating-box", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "star" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 19,
          columnNumber: 13
        }, this),
        " ",
        value.toFixed(1)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 18,
        columnNumber: 11
      }, this),
      count != null && /* @__PURE__ */ jsxDEV("span", { className: "rating-count", children: [
        "(",
        count.toLocaleString(),
        ")"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 21,
        columnNumber: 29
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 17,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("span", { className: "rating-value", children: value.toFixed(1) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 11
      }, this),
      count != null && /* @__PURE__ */ jsxDEV("span", { className: "rating-count", children: [
        "(",
        count.toLocaleString(),
        " reviews)"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 29
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 24,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
const amenityIcon = (id) => (AMENITIES.find((a) => a.id === id) || {}).icon || "check";
const amenityLabel = (id) => (AMENITIES.find((a) => a.id === id) || {}).label || id;
function AmenityChips({ ids, limit = 3 }) {
  const shown = ids.slice(0, limit);
  const more = ids.length - shown.length;
  return /* @__PURE__ */ jsxDEV("div", { className: "amenity-chips", role: "list", children: [
    shown.map((id) => /* @__PURE__ */ jsxDEV("span", { className: "chip", role: "listitem", children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: amenityIcon(id) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      " ",
      amenityLabel(id)
    ] }, id, true, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 9
    }, this)),
    more > 0 && /* @__PURE__ */ jsxDEV("span", { className: "chip", children: [
      "+",
      more,
      " more"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 47,
      columnNumber: 20
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 41,
    columnNumber: 5
  }, this);
}
function AmenityList({ ids }) {
  return /* @__PURE__ */ jsxDEV("ul", { className: "amenity-list", role: "list", children: ids.map((id) => /* @__PURE__ */ jsxDEV("li", { className: "amenity-item", children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: amenityIcon(id) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 57,
      columnNumber: 11
    }, this),
    " ",
    amenityLabel(id)
  ] }, id, true, {
    fileName: "<stdin>",
    lineNumber: 56,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function RoomCard({ room, showRating = true }) {
  const { navigate, roomStatus } = useApp();
  const [saved, setSaved] = useState(false);
  const active = !roomStatus[room.id] || roomStatus[room.id] === "active";
  const available = active && room.status === "available";
  return /* @__PURE__ */ jsxDEV("article", { className: "room-card", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "room-card-media", children: [
      /* @__PURE__ */ jsxDEV("span", { className: `status-pill${available ? "" : " busy"}`, children: [
        /* @__PURE__ */ jsxDEV("span", { className: "dot", "aria-hidden": "true" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 74,
          columnNumber: 11
        }, this),
        available ? "Available" : "Unavailable"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          className: `room-fav${saved ? " saved" : ""}`,
          onClick: () => setSaved((s) => !s),
          "aria-pressed": saved,
          "aria-label": saved ? "Remove from saved" : "Save room",
          children: /* @__PURE__ */ jsxDEV(Icon, { name: "heart", fill: "currentColor", stroke: "none" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 83,
            columnNumber: 11
          }, this)
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 77,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "img",
        {
          src: room.image,
          alt: `${room.name} \u2014 ${room.beds}`,
          loading: "lazy",
          width: "640",
          height: "400"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 85,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "room-card-body", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "room-card-top", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: room.name }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 95,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "type-badge", children: [
          room.type,
          room.ac ? " \xB7 AC" : " \xB7 Non-AC"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 96,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      showRating && /* @__PURE__ */ jsxDEV(Rating, { value: room.rating, count: room.reviews }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 98,
        columnNumber: 24
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "room-meta", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "users" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 100,
            columnNumber: 17
          }, this),
          " Sleeps ",
          room.capacity
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 100,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "bed" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 101,
            columnNumber: 17
          }, this),
          " ",
          roomLabel(room)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 101,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "ruler" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 102,
            columnNumber: 17
          }, this),
          " ",
          room.size,
          " m\xB2"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 102,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(AmenityChips, { ids: room.amenities }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "room-card-foot", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "price-block", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "price", children: [
            formatMoney(room.price),
            /* @__PURE__ */ jsxDEV("small", { children: "/night" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 107,
              columnNumber: 62
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 107,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "per", children: "per room \xB7 taxes included" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 108,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 106,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "card-actions", children: [
          /* @__PURE__ */ jsxDEV("button", { className: "btn btn-outline btn-sm", onClick: () => navigate(`/room/${room.id}`), children: "Details" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { className: "btn btn-primary btn-sm", onClick: () => navigate(`/booking/${room.id}`), children: "Book" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 114,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 93,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}
function RoomCardSkeleton() {
  return /* @__PURE__ */ jsxDEV("div", { className: "room-card skeleton-card", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "sk-media skeleton" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 128,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "room-card-body", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "sk-line w70 skeleton" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 130,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "sk-line w40 skeleton" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 131,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "sk-line w90 skeleton" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "sk-line w60 skeleton" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 133,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 129,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 127,
    columnNumber: 5
  }, this);
}
function GridSkeleton({ count = 6 }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "room-grid", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxDEV(RoomCardSkeleton, {}, i, false, {
    fileName: "<stdin>",
    lineNumber: 143,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 141,
    columnNumber: 5
  }, this);
}
function EmptyState({ icon = "search", title, text, action }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "state", role: "status", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "state-icon", children: /* @__PURE__ */ jsxDEV(Icon, { name: icon }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 153,
      columnNumber: 35
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 153,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("h3", { children: title }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 154,
      columnNumber: 7
    }, this),
    text && /* @__PURE__ */ jsxDEV("p", { children: text }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 155,
      columnNumber: 16
    }, this),
    action
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 152,
    columnNumber: 5
  }, this);
}
function ErrorState({ title = "Something went wrong", text, onRetry }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "state", role: "alert", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "state-icon", children: /* @__PURE__ */ jsxDEV(Icon, { name: "alert" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 164,
      columnNumber: 35
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 164,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("h3", { children: title }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 165,
      columnNumber: 7
    }, this),
    text && /* @__PURE__ */ jsxDEV("p", { children: text }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 166,
      columnNumber: 16
    }, this),
    onRetry && /* @__PURE__ */ jsxDEV("button", { className: "btn btn-outline", onClick: onRetry, children: [
      /* @__PURE__ */ jsxDEV(Icon, { name: "refresh" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 169,
        columnNumber: 11
      }, this),
      " Try again"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 168,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 163,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDEV("div", { className: "modal-overlay", onClick: onClose, role: "presentation", children: /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: "modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title || "Dialog",
      onClick: (e) => e.stopPropagation(),
      children: [
        title && /* @__PURE__ */ jsxDEV("div", { className: "modal-head", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: title }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 196,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { className: "close-icon-btn", onClick: onClose, "aria-label": "Close dialog", children: /* @__PURE__ */ jsxDEV(Icon, { name: "x" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 198,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 197,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 195,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "modal-body", children }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 202,
          columnNumber: 9
        }, this),
        footer && /* @__PURE__ */ jsxDEV("div", { className: "modal-body", style: { paddingTop: 0 }, children: footer }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 203,
          columnNumber: 20
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 187,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 186,
    columnNumber: 5
  }, this);
}
function Toaster() {
  const { toasts } = useApp();
  return /* @__PURE__ */ jsxDEV("div", { className: "toast-viewport", role: "status", "aria-live": "polite", children: toasts.map((t) => /* @__PURE__ */ jsxDEV("div", { className: `toast ${t.type}`, children: [
    /* @__PURE__ */ jsxDEV(Icon, { name: t.type === "success" ? "checkCircle" : t.type === "error" ? "alert" : "info" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 216,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: [
      t.title && /* @__PURE__ */ jsxDEV("div", { style: { fontWeight: 600 }, children: t.title }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 218,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: t.message }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 219,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 217,
      columnNumber: 11
    }, this)
  ] }, t.id, true, {
    fileName: "<stdin>",
    lineNumber: 215,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 213,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDEV("div", { ref, className: `reveal ${visible ? "visible" : ""} ${className}`, style: { transitionDelay: `${delay}ms` }, children }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 247,
    columnNumber: 5
  }, this);
}
function GuestStepper({ value, onChange, min = 1, max = 6 }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "guest-stepper", children: [
    /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => onChange(Math.max(min, value - 1)), disabled: value <= min, "aria-label": "Decrease guests", children: "\u2212" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 257,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("span", { className: "value", "aria-live": "polite", children: value }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 258,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => onChange(Math.min(max, value + 1)), disabled: value >= max, "aria-label": "Increase guests", children: "+" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 259,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 256,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDEV("div", { className: "search-wrap", children: /* @__PURE__ */ jsxDEV("form", { className: "search-card", onSubmit: submit, noValidate: true, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "search-grid", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `field${error && !checkIn ? " has-error" : ""}`, children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "sb-in", children: "Check-in" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 290,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("input", { id: "sb-in", type: "date", value: checkIn, min: todayISO(), onChange: (e) => setCheckIn(e.target.value) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 291,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 289,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `field${error && !checkOut ? " has-error" : ""}`, children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "sb-out", children: "Check-out" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 294,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("input", { id: "sb-out", type: "date", value: checkOut, min: checkIn || todayISO(), onChange: (e) => setCheckOut(e.target.value) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 295,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 293,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "field", children: [
        /* @__PURE__ */ jsxDEV("label", { id: "sb-guests-lbl", children: "Guests" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 298,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(GuestStepper, { value: guests, onChange: setGuests }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 299,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 297,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "search-actions", children: /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "btn btn-accent", children: [
        /* @__PURE__ */ jsxDEV(Icon, { name: "search" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 303,
          columnNumber: 15
        }, this),
        " ",
        compact ? "Update" : "Search rooms"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 302,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 301,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 288,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ jsxDEV("p", { className: "field-error", style: { marginTop: 12 }, role: "alert", children: error }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 307,
      columnNumber: 19
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 287,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 286,
    columnNumber: 5
  }, this);
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
  Toaster
};
