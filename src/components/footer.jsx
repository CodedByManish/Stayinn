import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import Icon from "./icons.jsx";
import { PROPERTY } from "../../data.js";
import { useApp } from "../../AppProvider.jsx";
function Footer() {
  const { navigate } = useApp();
  return /* @__PURE__ */ jsxDEV("footer", { className: "footer", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "footer-grid", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "brand", children: [
          /* @__PURE__ */ jsxDEV("img", { src: "icon.png", alt: "Stayinn logo", className: "brand-logo", width: "34", height: "34" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 13,
            columnNumber: 36
          }, this),
          " Stayinn"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 13,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "about", children: "A boutique stay with modern comfort and warm hospitality. Thoughtful rooms, honest prices and a team that cares." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 14,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 12,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h4", { children: "Explore" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 20,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "footer-links", children: [
          /* @__PURE__ */ jsxDEV("a", { href: "#/", children: "Home" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 22,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", children: "All rooms" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 23,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("a", { href: "#/rooms?type=Suite", children: "Suites" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 24,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("a", { href: "#/rooms?type=Deluxe", children: "Deluxe rooms" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 25,
            columnNumber: 15
          }, this)
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
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h4", { children: "Good to know" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 29,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "footer-links", children: [
          /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", onClick: (e) => {
            e.preventDefault();
            navigate("/rooms");
          }, children: "Check-in 15:00" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 31,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", onClick: (e) => {
            e.preventDefault();
            navigate("/rooms");
          }, children: "Check-out 11:00" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 32,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", onClick: (e) => {
            e.preventDefault();
            navigate("/rooms");
          }, children: "Free cancellation" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 33,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", onClick: (e) => {
            e.preventDefault();
            navigate("/rooms");
          }, children: "Best price guarantee" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 34,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 30,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 28,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h4", { children: "Contact" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 38,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("ul", { className: "footer-contact", children: [
          /* @__PURE__ */ jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "mapPin" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 40,
              columnNumber: 19
            }, this),
            " ",
            PROPERTY.location
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 40,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "phone" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 41,
              columnNumber: 19
            }, this),
            " ",
            PROPERTY.contact.phone
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 41,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "mail" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 42,
              columnNumber: 19
            }, this),
            " ",
            PROPERTY.contact.email
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 42,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 39,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 11,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "footer-bottom flex justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxDEV("span", { children: [
        "\xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Stayinn Hotel & Suites. All rights reserved."
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: "Made for a restful stay." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 48,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 46,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 10,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}
export {
  Footer as default
};
