import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import Icon from "./icons.jsx";
import { formatMoney, fmtShortDate, nightsBetween } from "../../utils.js";
import { pricing } from "../../pricing.js";
function BookingSummary({ room, checkIn, checkOut, guests, compact = false }) {
  const nights = nightsBetween(checkIn, checkOut) || 1;
  const p = pricing(room, checkIn, checkOut, guests);
  return /* @__PURE__ */ jsxDEV("div", { className: "summary-card", children: [
    !compact && /* @__PURE__ */ jsxDEV("div", { className: "thumb", children: /* @__PURE__ */ jsxDEV("img", { src: room.image, alt: room.name, loading: "lazy" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 14,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 13,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "summary-body", children: [
      !compact && /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("h3", { children: room.name }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 20,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "room-type", children: [
          room.type,
          " \xB7 ",
          room.beds,
          " \xB7 sleeps ",
          room.capacity
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 21,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 19,
        columnNumber: 11
      }, this),
      compact && /* @__PURE__ */ jsxDEV("div", { className: "room-card-top", style: { marginBottom: 4 }, children: [
        /* @__PURE__ */ jsxDEV("h3", { style: { fontSize: 18 }, children: room.name }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 26,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "type-badge", children: room.type }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 27,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bsum", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bsum-row", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "bsum-label", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "calendar" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 32,
              columnNumber: 42
            }, this),
            " Your stay"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 32,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            fmtShortDate(checkIn),
            " \u2192 ",
            fmtShortDate(checkOut)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 33,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 31,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bsum-row", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "bsum-label", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "users" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 36,
              columnNumber: 42
            }, this),
            " Guests"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 36,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            guests,
            " ",
            guests === 1 ? "guest" : "guests"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 37,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 35,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bsum-row", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "bsum-label", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "clock" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 40,
              columnNumber: 42
            }, this),
            " Nights"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 40,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            nights,
            " ",
            nights === 1 ? "night" : "nights"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 41,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 39,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bsum", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bsum-row", children: [
          /* @__PURE__ */ jsxDEV("span", { children: p.nightly ? `${formatMoney(p.nightly)} \xD7 ${p.nights} night${p.nights > 1 ? "s" : ""}` : "Room" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 46,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: formatMoney(p.base) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 47,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 45,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bsum-row", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "bsum-label", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "shield" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 50,
              columnNumber: 42
            }, this),
            " Taxes & fees (12%)"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 50,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: formatMoney(p.tax) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 51,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 49,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bsum-row", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "bsum-label", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "spa" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 54,
              columnNumber: 42
            }, this),
            " Cleaning fee"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 54,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: formatMoney(p.cleaning) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 55,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 53,
          columnNumber: 11
        }, this),
        p.discount > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bsum-row discount", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "bsum-label", children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "check" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 59,
              columnNumber: 44
            }, this),
            " Long-stay discount (10%)"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 59,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "\u2212",
            formatMoney(p.discount)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 60,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 58,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bsum-row total", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Total" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 64,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: formatMoney(p.total) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 65,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 63,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { style: { fontSize: 12.5, color: "var(--muted)", marginTop: 10 }, children: "You won't be charged yet. This summary is provided so you always know exactly what you'll pay." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 67,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 44,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 17,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}
export {
  BookingSummary as default
};
