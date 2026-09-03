var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { AppProvider, useApp } from "./AppProvider.jsx";
import Header from "./src/components/header.jsx";
import Footer from "./src/components/footer.jsx";
import { Toaster, ErrorState } from "./src/components/components.jsx";
import Home from "./src/pages/Home.jsx";
import Rooms from "./src/pages/Rooms.jsx";
import RoomDetails from "./src/pages/RoomDetails.jsx";
import Booking from "./src/pages/Booking.jsx";
import Confirmation from "./src/pages/Confirmation.jsx";
import Admin from "./src/pages/Admin.jsx";
function Router() {
  const { route } = useApp();
  switch (route.name) {
    case "/rooms":
      return /* @__PURE__ */ jsxDEV(Rooms, {}, "rooms", false, {
        fileName: "<stdin>",
        lineNumber: 18,
        columnNumber: 14
      }, this);
    case "/room/:id":
      return /* @__PURE__ */ jsxDEV(RoomDetails, { id: route.params.id }, `room-${route.params.id}`, false, {
        fileName: "<stdin>",
        lineNumber: 20,
        columnNumber: 14
      }, this);
    case "/booking/:id":
      return /* @__PURE__ */ jsxDEV(Booking, { id: route.params.id }, `booking-${route.params.id}`, false, {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 14
      }, this);
    case "/confirmation/:ref":
      return /* @__PURE__ */ jsxDEV(Confirmation, { refId: route.params.ref }, `conf-${route.params.ref}`, false, {
        fileName: "<stdin>",
        lineNumber: 24,
        columnNumber: 14
      }, this);
    case "/admin":
      return /* @__PURE__ */ jsxDEV(Admin, {}, "admin", false, {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 14
      }, this);
    default:
      return /* @__PURE__ */ jsxDEV(Home, {}, "home", false, {
        fileName: "<stdin>",
        lineNumber: 28,
        columnNumber: 14
      }, this);
  }
}
class Boundary extends React.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", { error: null });
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("App error", error, info);
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV(ErrorState, { title: "Something went wrong", text: "An unexpected error occurred. Try refreshing the page." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 44,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 43,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function App() {
  return /* @__PURE__ */ jsxDEV(AppProvider, { children: [
    /* @__PURE__ */ jsxDEV(Header, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("main", { id: "main", children: /* @__PURE__ */ jsxDEV(Boundary, { children: /* @__PURE__ */ jsxDEV(Router, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 58,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 57,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Footer, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Toaster, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 62,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 68,
  columnNumber: 13
}));
