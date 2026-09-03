import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
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
    return /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV(EmptyState, { icon: "alert", title: "Room not found", text: "We couldn't find the room you're looking for." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 18,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 17,
      columnNumber: 7
    }, this);
  }
  const gallery = room.image && room.gallery ? [room.image, ...room.gallery.filter((g) => g !== room.image)] : [room.image];
  const handleReserve = () => {
    const params = new URLSearchParams({ checkIn, checkOut, guests });
    window.location.hash = `/booking/${room.id}?${params.toString()}`;
  };
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "page-head", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV("nav", { className: "crumbs", "aria-label": "Breadcrumb", children: [
      /* @__PURE__ */ jsxDEV("a", { href: "#/", children: "Home" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "sep", children: "/" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 34
      }, this),
      /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", children: "Rooms" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "sep", children: "/" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 40
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: room.name }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 34,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 33,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV("div", { className: "details-grid", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "gallery", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "gallery-main", children: /* @__PURE__ */ jsxDEV("img", { src: gallery[active], alt: `${room.name} photo ${active + 1}`, loading: active === 0 ? "eager" : "lazy" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 47,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 46,
            columnNumber: 15
          }, this),
          gallery.length > 1 && /* @__PURE__ */ jsxDEV("div", { className: "gallery-nav", role: "tablist", "aria-label": "Room photos", children: gallery.map((g, i) => /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: g,
              alt: `Photo ${i + 1}`,
              className: active === i ? "active" : "",
              onClick: () => setActive(i),
              role: "tab",
              "aria-selected": active === i
            },
            i,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 52,
              columnNumber: 21
            },
            this
          )) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 50,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 45,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { style: { marginTop: 28 }, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "detail-head", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "row", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "type-badge", children: room.type }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 70,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h1", { children: room.name }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 71,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 69,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { style: { textAlign: "right" }, children: /* @__PURE__ */ jsxDEV(Rating, { value: room.rating, count: room.reviews, showBox: true }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 74,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 73,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 68,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "detail-meta", children: [
              /* @__PURE__ */ jsxDEV("span", { children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "users" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 78,
                  columnNumber: 25
                }, this),
                " Sleeps ",
                room.capacity
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 78,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "bed" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 79,
                  columnNumber: 25
                }, this),
                " ",
                room.beds
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 79,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "ruler" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 80,
                  columnNumber: 25
                }, this),
                " ",
                room.size,
                " m\xB2"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 80,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "mapPin" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 81,
                  columnNumber: 25
                }, this),
                " ",
                PROPERTY.location
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 81,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 77,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 67,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "detail-section", children: [
            /* @__PURE__ */ jsxDEV("h2", { children: "About this room" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 86,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "body", children: room.description }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 87,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 85,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "detail-section", children: [
            /* @__PURE__ */ jsxDEV("h2", { children: "Amenities" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 91,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(AmenityList, { ids: room.amenities }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 92,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 90,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "detail-section", children: [
            /* @__PURE__ */ jsxDEV("h2", { children: "Room information" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 96,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "info-rows", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "info-row", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "k", children: "Check-in" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 99,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "v", children: [
                  /* @__PURE__ */ jsxDEV(Icon, { name: "clock" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 100,
                    columnNumber: 40
                  }, this),
                  " From ",
                  PROPERTY.checkIn
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 100,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 98,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "info-row", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "k", children: "Check-out" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 103,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "v", children: [
                  /* @__PURE__ */ jsxDEV(Icon, { name: "clock" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 104,
                    columnNumber: 40
                  }, this),
                  " Until ",
                  PROPERTY.checkOut
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 104,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 102,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "info-row", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "k", children: "Capacity" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 107,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "v", children: [
                  /* @__PURE__ */ jsxDEV(Icon, { name: "users" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 108,
                    columnNumber: 40
                  }, this),
                  " Up to ",
                  room.capacity,
                  " guests"
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 108,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 106,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "info-row", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "k", children: "Room size" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 111,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "v", children: [
                  /* @__PURE__ */ jsxDEV(Icon, { name: "expand" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 112,
                    columnNumber: 40
                  }, this),
                  " ",
                  room.size,
                  " m\xB2"
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 112,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 110,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "info-row", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "k", children: "Bed" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 115,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "v", children: [
                  /* @__PURE__ */ jsxDEV(Icon, { name: "bed" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 116,
                    columnNumber: 40
                  }, this),
                  " ",
                  room.beds
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 116,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 114,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "info-row", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "k", children: "Availability" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 119,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "v", children: /* @__PURE__ */ jsxDEV("span", { className: `status-pill${room.status === "available" ? "" : " busy"}`, style: { position: "static" }, children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "dot" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 122,
                    columnNumber: 25
                  }, this),
                  " ",
                  room.status === "available" ? "Available" : "Limited"
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 121,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 120,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 118,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 97,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 95,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "detail-section", children: [
            /* @__PURE__ */ jsxDEV("h2", { children: "House policies" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 130,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "policy-list", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "policy-item", children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "clock" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 133,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "t", children: "Check-in & check-out" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 134,
                    columnNumber: 26
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "d", children: [
                    "Check-in from ",
                    PROPERTY.checkIn,
                    ". Check-out by ",
                    PROPERTY.checkOut,
                    ". Early arrival and late checkout subject to availability."
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 134,
                    columnNumber: 75
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 134,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 132,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "policy-item", children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "shield" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 137,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "t", children: "Cancellation" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 138,
                    columnNumber: 26
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "d", children: "Free cancellation up to 48 hours before arrival. After that, the first night is charged." }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 138,
                    columnNumber: 63
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 138,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 136,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "policy-item", children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "users" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 141,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "t", children: "Guests" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 142,
                    columnNumber: 26
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "d", children: [
                    "Room accommodates up to ",
                    room.capacity,
                    " guests. Additional guests beyond capacity require a separate room."
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 142,
                    columnNumber: 57
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 142,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 140,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "policy-item", children: [
                /* @__PURE__ */ jsxDEV(Icon, { name: "card" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 145,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "t", children: "Payment" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 146,
                    columnNumber: 26
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "d", children: "A valid card is required to confirm. Pay at the property or prepay online \u2014 your choice." }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 146,
                    columnNumber: 58
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 146,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 144,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 131,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 129,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "detail-section", children: [
            /* @__PURE__ */ jsxDEV("h2", { children: "Guest reviews" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 152,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "info-rows", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "info-row", style: { textAlign: "center" }, children: [
                /* @__PURE__ */ jsxDEV("div", { style: { fontSize: 40, fontWeight: 700, color: "var(--primary)" }, children: room.rating.toFixed(1) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 155,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "rating-stars", style: { justifyContent: "center", margin: "4px 0" }, children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxDEV(Icon, { name: "star", style: s <= Math.round(room.rating) ? {} : { opacity: 0.25 } }, s, false, {
                  fileName: "<stdin>",
                  lineNumber: 157,
                  columnNumber: 51
                }, this)) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 156,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "k", children: [
                  room.reviews,
                  " verified reviews"
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 159,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 154,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "info-row", style: { gridColumn: "span 2", display: "grid", gap: 8 }, children: [
                ["Cleanliness", 4.8],
                ["Comfort", 4.7],
                ["Location", 4.9],
                ["Value", 4.5]
              ].map(([label, val]) => /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
                /* @__PURE__ */ jsxDEV("span", { style: { width: 110, fontSize: 14, color: "var(--ink-soft)" }, children: label }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 166,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { style: { flex: 1, height: 7, background: "var(--surface-3)", borderRadius: 99, overflow: "hidden" }, children: /* @__PURE__ */ jsxDEV("div", { style: { height: "100%", width: `${val / 5 * 100}%`, background: "var(--primary)", borderRadius: 99 } }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 168,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 167,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { style: { width: 30, textAlign: "right", fontWeight: 600, fontSize: 14 }, children: val.toFixed(1) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 170,
                  columnNumber: 25
                }, this)
              ] }, label, true, {
                fileName: "<stdin>",
                lineNumber: 165,
                columnNumber: 23
              }, this)) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 161,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 153,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 151,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 66,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("aside", { className: "sticky-wrap", children: /* @__PURE__ */ jsxDEV("div", { className: "summary-card", children: /* @__PURE__ */ jsxDEV("div", { className: "summary-body", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "room-card-top", style: { marginBottom: 12 }, children: [
          /* @__PURE__ */ jsxDEV("h3", { style: { fontSize: 18 }, children: room.name }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 184,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `status-pill${room.status === "available" ? "" : " busy"}`, children: [
            /* @__PURE__ */ jsxDEV("span", { className: "dot" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 186,
              columnNumber: 21
            }, this),
            " ",
            room.status === "available" ? "Available" : "Limited"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 185,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 183,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "field", style: { marginBottom: 12 }, children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "rd-in", children: "Check-in" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 190,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("input", { id: "rd-in", type: "date", value: checkIn, min: todayISO(), onChange: (e) => setCheckIn(e.target.value) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 191,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 189,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "field", style: { marginBottom: 12 }, children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "rd-out", children: "Check-out" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 194,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("input", { id: "rd-out", type: "date", value: checkOut, min: checkIn || todayISO(), onChange: (e) => setCheckOut(e.target.value) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 195,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 193,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "field", style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "rd-guests", children: "Guests" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 198,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("select", { id: "rd-guests", value: guests, onChange: (e) => setGuests(+e.target.value), children: [1, 2, 3, 4].filter((n) => n <= room.capacity).map((n) => /* @__PURE__ */ jsxDEV("option", { value: n, children: [
            n,
            " ",
            n === 1 ? "guest" : "guests"
          ] }, n, true, {
            fileName: "<stdin>",
            lineNumber: 201,
            columnNumber: 23
          }, this)) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 199,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 197,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "summary-rate", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "lbl", children: [
            "from ",
            /* @__PURE__ */ jsxDEV("strong", { style: { fontSize: 26, color: "var(--ink)" }, children: [
              "$",
              room.price
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 206,
              columnNumber: 46
            }, this),
            " / night"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 206,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "lbl", children: [
            roomLabel(room),
            " \xB7 ",
            room.size,
            " m\xB2"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 207,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 205,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("button", { className: "btn btn-primary btn-lg btn-block", onClick: handleReserve, children: "Reserve now" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 209,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { style: { fontSize: 13, color: "var(--muted)", marginTop: 12, display: "flex", gap: 6, alignItems: "center" }, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "lock" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 213,
            columnNumber: 19
          }, this),
          " Free cancellation \xB7 No payment today"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 212,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 182,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 181,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 180,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
export {
  RoomDetails as default
};
