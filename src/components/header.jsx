import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState } from "react";
import Icon from "./icons.jsx";
import { AuthModal } from "./auth.jsx";
import { useApp } from "../../AppProvider.jsx";
function Header() {
  const { route, navigate, user, logout, toast, hotelStatus } = useApp();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const links = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" }
  ];
  const isActive = (to) => to === "/" ? route.name === "/" : route.name.startsWith("/rooms");
  const isAdmin = user && user.role === "admin";
  const [notifState, setNotifState] = useState(null);
  const statusBanner = hotelStatus !== "available" ? {
    limited: { text: "Limited availability \u2014 some rooms may be booked out.", cls: "limited" },
    fully_booked: { text: "We're currently fully booked. Check back soon.", cls: "busy" },
    closed: { text: "The hotel is temporarily closed for new bookings.", cls: "busy" }
  }[hotelStatus] : null;
  const openAuth = (mode) => {
    setMenuOpen(false);
    setAuthMode(mode);
  };
  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    toast({ type: "info", title: "Signed out", message: "You've been signed out." });
  };
  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e) => {
      if (!e.target.closest(".get-started, .user-menu")) setMenuOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [menuOpen]);
  useEffect(() => {
    let live = true;
    const ws = window.websim && window.websim.notifications;
    if (ws && typeof ws.getPermission === "function") {
      ws.getPermission().then((r) => {
        if (live) setNotifState(r.state);
      }).catch(() => {
      });
    }
    return () => {
      live = false;
    };
  }, []);
  const toggleNotif = async () => {
    const ws = window.websim && window.websim.notifications;
    if (!ws) {
      toast({ type: "info", title: "Notifications unavailable", message: "Sign in to receive booking updates." });
      return;
    }
    try {
      const { state } = await ws.requestPermission();
      setNotifState(state);
      if (state === "granted") toast({ type: "success", title: "Notifications on", message: "We'll ping you when your booking status changes." });
      else toast({ type: "info", title: "Notifications off", message: "You won't get booking updates." });
    } catch {
      toast({ type: "error", title: "Couldn't update", message: "Please try again." });
    }
  };
  return /* @__PURE__ */ jsxDEV("header", { className: "nav", children: [
    statusBanner && /* @__PURE__ */ jsxDEV("div", { className: `status-banner ${statusBanner.cls}`, role: "status", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: statusBanner.text }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 74,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("nav", { className: "container nav-inner", "aria-label": "Main navigation", children: [
      /* @__PURE__ */ jsxDEV("a", { className: "brand", href: "#/", onClick: () => setOpen(false), children: [
        /* @__PURE__ */ jsxDEV("img", { src: "icon.png", alt: "Stayinn logo", className: "brand-logo", width: "34", height: "34" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        "Stayinn"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("ul", { className: `nav-links ${open ? "open" : ""}`, children: [
        links.map((l) => /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
          "a",
          {
            href: `#${l.to}`,
            className: isActive(l.to) ? "active" : "",
            onClick: () => setOpen(false),
            children: l.label
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 85,
            columnNumber: 15
          },
          this
        ) }, l.to, false, {
          fileName: "<stdin>",
          lineNumber: 84,
          columnNumber: 13
        }, this)),
        /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
          "a",
          {
            href: "#/admin",
            className: route.name === "/admin" ? "active" : "",
            onClick: () => setOpen(false),
            children: "Admin"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 95,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 94,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "nav-cta flex items-center gap-2.5", children: [
        user ? /* @__PURE__ */ jsxDEV("div", { className: "user-menu", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              className: "user-chip",
              onClick: () => setMenuOpen((m) => !m),
              "aria-expanded": menuOpen,
              "aria-haspopup": "menu",
              children: [
                /* @__PURE__ */ jsxDEV(
                  "img",
                  {
                    src: user.avatar || `https://images.websim.com/avatar/${user.username}`,
                    alt: "",
                    className: "user-avatar",
                    onError: (e) => {
                      e.currentTarget.style.display = "none";
                    }
                  },
                  void 0,
                  false,
                  {
                    fileName: "<stdin>",
                    lineNumber: 113,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { className: "user-name", children: user.username || user.name }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 119,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(Icon, { name: "chevronRight", style: { transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" } }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 120,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "<stdin>",
              lineNumber: 107,
              columnNumber: 15
            },
            this
          ),
          menuOpen && /* @__PURE__ */ jsxDEV("div", { className: "user-dropdown", role: "menu", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "user-dropdown-head", children: [
              /* @__PURE__ */ jsxDEV("strong", { children: user.name || user.username }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 125,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isAdmin ? "Administrator" : "Guest" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 126,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 124,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("button", { role: "menuitem", onClick: () => {
              setMenuOpen(false);
              navigate("/rooms");
            }, children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "bed" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 129,
                columnNumber: 21
              }, this),
              " My bookings"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 128,
              columnNumber: 19
            }, this),
            isAdmin && /* @__PURE__ */ jsxDEV("button", { role: "menuitem", onClick: () => {
              setMenuOpen(false);
              navigate("/admin");
            }, children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "shield" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 133,
                columnNumber: 23
              }, this),
              " Admin panel"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 132,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("button", { role: "menuitem", onClick: () => {
              setMenuOpen(false);
              toggleNotif();
            }, children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "bell" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 137,
                columnNumber: 21
              }, this),
              " ",
              notifState === "granted" ? "Booking alerts: on" : "Turn on booking alerts"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 136,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("button", { role: "menuitem", className: "danger", onClick: handleLogout, children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "x" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 140,
                columnNumber: 21
              }, this),
              " Sign out"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 139,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 123,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 106,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "get-started", children: [
          /* @__PURE__ */ jsxDEV("button", { className: "btn btn-primary btn-sm", onClick: () => setMenuOpen((m) => !m), "aria-expanded": menuOpen, children: "Get Started" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 147,
            columnNumber: 15
          }, this),
          menuOpen && /* @__PURE__ */ jsxDEV("div", { className: "get-started-dropdown", role: "menu", children: [
            /* @__PURE__ */ jsxDEV("button", { role: "menuitem", onClick: () => openAuth("register"), children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "checkCircle" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 153,
                columnNumber: 21
              }, this),
              " Register"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 152,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("button", { role: "menuitem", onClick: () => openAuth("login"), children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "lock" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 156,
                columnNumber: 21
              }, this),
              " Login"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 155,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 151,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 146,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            className: "nav-burger btn btn-ghost",
            "aria-label": "Toggle menu",
            "aria-expanded": open,
            onClick: () => setOpen((o) => !o),
            children: /* @__PURE__ */ jsxDEV(Icon, { name: open ? "x" : "menu" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 168,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 162,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 77,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      AuthModal,
      {
        open: authMode !== null,
        mode: authMode || "login",
        onClose: () => setAuthMode(null),
        onSuccess: () => navigate("/rooms")
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 172,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}
export {
  Header as default
};
