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
      } catch {
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refId]);
  if (!booking || !room) {
    return /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV(EmptyState, { icon: "alert", title: "Booking not found", text: "We couldn't find that booking. Check the reference number or contact us." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 38,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 37,
      columnNumber: 7
    }, this);
  }
  const p = pricing(room, booking.checkIn, booking.checkOut, booking.guests);
  const nights = p.nights;
  const st = STATUS_META[status] || STATUS_META.pending;
  return /* @__PURE__ */ jsxDEV("div", { className: "container confirm-wrap", children: /* @__PURE__ */ jsxDEV("div", { className: "confirm-card", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "confirm-hero", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "confirm-icon", children: /* @__PURE__ */ jsxDEV(Icon, { name: "checkCircle" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 51,
        columnNumber: 41
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { children: [
        "Booking ",
        status === "cancelled" ? "cancelled" : "confirmed",
        "!"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 52,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { children: [
        "A confirmation has been sent to ",
        booking.email,
        "."
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 53,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "confirm-ref", children: [
        "Booking reference \xA0",
        /* @__PURE__ */ jsxDEV("strong", { children: booking.ref }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 55,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: `status-badge ${st.cls}`, children: st.label }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 57,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "confirm-body", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "confirm-section", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Your stay" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 62,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "confirm-room", children: [
          /* @__PURE__ */ jsxDEV("img", { src: room.image, alt: room.name }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 64,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "n", children: booking.roomName }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 66,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "t", children: [
              room.type,
              " \xB7 ",
              room.beds,
              " \xB7 sleeps ",
              room.capacity
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 67,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "t", children: [
              PROPERTY.name,
              ", ",
              PROPERTY.location
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 68,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 65,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 63,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "confirm-section", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Guest details" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "confirm-rows", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Name" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 76,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: booking.name }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 76,
              columnNumber: 75
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 76,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Email" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 77,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: booking.email }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 77,
              columnNumber: 76
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 77,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Phone" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 78,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: booking.phone }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 78,
              columnNumber: 76
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          booking.requests && /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Special requests" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 80,
              columnNumber: 46
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", style: { textAlign: "right", maxWidth: 260 }, children: booking.requests }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 80,
              columnNumber: 89
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 80,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 75,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 73,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "confirm-section", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Dates & guests" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 86,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "confirm-rows", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Check-in" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 88,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: [
              fmtDate(booking.checkIn),
              " \xB7 from ",
              PROPERTY.checkIn
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 88,
              columnNumber: 79
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 88,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Check-out" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 89,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: [
              fmtDate(booking.checkOut),
              " \xB7 until ",
              PROPERTY.checkOut
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 89,
              columnNumber: 80
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 89,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Length of stay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 90,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: [
              nights,
              " ",
              nights === 1 ? "night" : "nights"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 90,
              columnNumber: 85
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 90,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Guests" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 91,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: [
              booking.guests,
              " ",
              booking.guests === 1 ? "guest" : "guests"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 91,
              columnNumber: 77
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 91,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 87,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "confirm-section", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Price summary" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 96,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "confirm-rows", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Room" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 98,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: formatMoney(p.base) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 98,
              columnNumber: 75
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 98,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Taxes & fees" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 99,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: formatMoney(p.tax) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 99,
              columnNumber: 87
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 99,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Cleaning fee" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 100,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: formatMoney(p.cleaning) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 100,
              columnNumber: 83
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 100,
            columnNumber: 15
          }, this),
          p.discount > 0 && /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", style: { color: "var(--success)" }, children: "Long-stay discount" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 101,
              columnNumber: 63
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", style: { color: "var(--success)" }, children: [
              "\u2212",
              formatMoney(p.discount)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 101,
              columnNumber: 144
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 101,
            columnNumber: 34
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 97,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "confirm-total", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Total due" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 104,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: formatMoney(p.total) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 105,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 103,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 95,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "confirm-section", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Good to know" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "confirm-rows", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Check-in" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 112,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: [
              "From ",
              PROPERTY.checkIn,
              " \xB7 ID required"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 112,
              columnNumber: 79
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 112,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Cancellation" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 113,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: "Free until 48h before arrival" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 113,
              columnNumber: 83
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 113,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "confirm-row", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "k", children: "Questions?" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 114,
              columnNumber: 44
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "v", children: PROPERTY.contact.phone }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 114,
              columnNumber: 81
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 114,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 111,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 109,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "confirm-actions no-print", children: [
        /* @__PURE__ */ jsxDEV("button", { className: "btn btn-primary", onClick: () => window.print(), children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "print" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 119,
            columnNumber: 80
          }, this),
          " Download PDF"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 119,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", className: "btn btn-outline", children: "Book another room" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 120,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#/", className: "btn btn-ghost", children: "Back to home" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 121,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 118,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 60,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 49,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}
export {
  Confirmation as default
};
