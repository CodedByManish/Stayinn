import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState } from "react";
import Icon from "../components/icons.jsx";
import { EmptyState } from "../components/components.jsx";
import { useApp } from "../../AppProvider.jsx";
import { ROOMS } from "../../data.js";
import { formatMoney, fmtShortDate } from "../../utils.js";
const ADMIN_KEY = "stayinn_";
const ADMIN_TOKEN_KEY = "stayinn_admin_token";
const HOTEL_STATUSES = [
  { value: "available", label: "Available", icon: "checkCircle", desc: "Accepting all bookings" },
  { value: "limited", label: "Limited availability", icon: "info", desc: "Accepting a few bookings" },
  { value: "fully_booked", label: "Fully booked", icon: "alert", desc: "No more bookings accepted" },
  { value: "closed", label: "Closed", icon: "x", desc: "Hotel closed for bookings" }
];
const BOOKING_STATUS = {
  pending: { label: "Pending", cls: "pending" },
  confirmed: { label: "Confirmed", cls: "confirmed" },
  cancelled: { label: "Cancelled", cls: "cancelled" }
};
function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password })
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        setError("Invalid admin credentials. Please try again.");
        setBusy(false);
        return;
      }
      sessionStorage.setItem(ADMIN_KEY, "1");
      sessionStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      onLogin();
    } catch {
      setError("Couldn't reach the server. Please try again.");
    }
    setBusy(false);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV("div", { className: "admin-login", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "admin-login-icon", children: /* @__PURE__ */ jsxDEV(Icon, { name: "shield" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 58,
      columnNumber: 43
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 58,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("h1", { children: "Admin sign in" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 59,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "form-sub", children: "Restricted area \u2014 property staff only." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: submit, noValidate: true, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "field", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "adm-user", children: "Username" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 63,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("input", { id: "adm-user", type: "text", value: username, onChange: (e) => setUsername(e.target.value), autoComplete: "username" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 64,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "field", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "adm-pass", children: "Password" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 67,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("input", { id: "adm-pass", type: "password", value: password, onChange: (e) => setPassword(e.target.value), autoComplete: "current-password" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 68,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 66,
        columnNumber: 11
      }, this),
      error && /* @__PURE__ */ jsxDEV("p", { className: "field-error", role: "alert", children: error }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 70,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "btn btn-primary btn-lg btn-block", style: { marginTop: 8 }, disabled: busy, children: busy ? "Signing in\u2026" : "Sign in to admin" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 71,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 61,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 57,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}
function Admin() {
  const { hotelStatus, setHotelStatus, roomStatus, updateRoomStatus, toast } = useApp();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_KEY) === "1");
  const [tab, setTab] = useState("rooms");
  const [hotelStatusLocal, setHotelStatusLocal] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const adminHeaders = () => ({
    "content-type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem(ADMIN_TOKEN_KEY) || ""}`
  });
  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    setLoadError("");
    if (hotelStatusLocal === null) setHotelStatusLocal(hotelStatus);
    const loadAll = async () => {
      try {
        const [u, b] = await Promise.all([
          fetch("/api/admin/users", { headers: adminHeaders() }).then((r) => r.json()),
          fetch("/api/admin/bookings", { headers: adminHeaders() }).then((r) => r.json())
        ]);
        if (u.error || b.error) {
          setLoadError(u.error || b.error || "Couldn't load admin data. Please sign in again.");
          setAuthed(false);
          sessionStorage.removeItem(ADMIN_KEY);
          sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        } else {
          setUsers(u.users || []);
          setBookings(b.bookings || []);
        }
      } catch {
        setLoadError("Couldn't reach the server. Please try again.");
      }
      setLoading(false);
    };
    loadAll();
  }, [authed]);
  useEffect(() => {
    if (hotelStatusLocal === null) setHotelStatusLocal(hotelStatus);
  }, [hotelStatus, hotelStatusLocal]);
  if (!authed) {
    return /* @__PURE__ */ jsxDEV(AdminLogin, { onLogin: () => setAuthed(true) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 126,
      columnNumber: 12
    }, this);
  }
  const setHotel = async (status) => {
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      const prev = hotelStatusLocal;
      setHotelStatusLocal(status);
      setHotelStatus(status);
      toast({ type: "success", title: "Status updated", message: `Hotel is now ${HOTEL_STATUSES.find((s) => s.value === status).label.toLowerCase()}.` });
      if (!prev) {
      }
    } else {
      toast({ type: "error", title: "Update failed", message: "Couldn't update the hotel status." });
    }
  };
  const setRoomActive = async (room, active) => {
    updateRoomStatus(room.id, active ? "active" : "inactive");
    const res = await fetch(`/api/admin/rooms/${room.id}`, {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ active })
    });
    if (res.ok) {
      toast({ type: "success", title: "Room updated", message: `${room.name} is now ${active ? "active" : "inactive"}.` });
    } else {
      updateRoomStatus(room.id, active ? "inactive" : "active");
      const data = await res.json().catch(() => ({}));
      toast({ type: "error", title: "Update failed", message: data.error || "Couldn't update the room." });
    }
  };
  const setBookingStatus = async (id, status) => {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setBookings((list) => list.map((b) => b.id === id ? { ...b, status } : b));
      toast({ type: "success", title: "Booking updated", message: `Booking ${status === "confirmed" ? "accepted" : "cancelled"}. The guest was notified.` });
    } else {
      toast({ type: "error", title: "Update failed", message: "Couldn't update the booking." });
    }
  };
  const removeUser = async (id) => {
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE", headers: adminHeaders() });
    if (res.ok) {
      setUsers((list) => list.filter((u) => u.user_id !== id));
      toast({ type: "success", title: "User removed", message: "The user was removed." });
    } else {
      toast({ type: "error", title: "Remove failed", message: "Couldn't remove the user." });
    }
  };
  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setAuthed(false);
  };
  const currentStatus = HOTEL_STATUSES.find((s) => s.value === (hotelStatusLocal || "available")) || HOTEL_STATUSES[0];
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "page-head", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      /* @__PURE__ */ jsxDEV("nav", { className: "crumbs", "aria-label": "Breadcrumb", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "#/", children: "Home" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 199,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "sep", children: "/" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 199,
          columnNumber: 34
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Admin" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 199,
          columnNumber: 64
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 198,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "page-head-inner", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h1", { children: "Admin panel" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 203,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "sub", children: "Manage rooms, bookings and guests." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 204,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 202,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { className: "btn btn-outline btn-sm", onClick: logout, children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "x" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 206,
            columnNumber: 73
          }, this),
          " Sign out"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 206,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 201,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 197,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 196,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      loadError && /* @__PURE__ */ jsxDEV("div", { className: "field-error", style: { background: "var(--danger-soft)", padding: 12, borderRadius: 10, marginBottom: 16 }, role: "alert", children: loadError }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 213,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "admin-tabs", role: "tablist", children: [
        { id: "rooms", label: "Rooms", icon: "bed" },
        { id: "bookings", label: `Bookings (${bookings.length})`, icon: "calendar" },
        { id: "users", label: `Users (${users.length})`, icon: "users" },
        { id: "hotel", label: "Hotel status", icon: "home" }
      ].map((t) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          role: "tab",
          "aria-selected": tab === t.id,
          className: tab === t.id ? "active" : "",
          onClick: () => setTab(t.id),
          children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: t.icon }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 231,
              columnNumber: 15
            }, this),
            " ",
            t.label
          ]
        },
        t.id,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 224,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 217,
        columnNumber: 9
      }, this),
      tab === "rooms" && /* @__PURE__ */ jsxDEV("div", { className: "admin-card", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Rooms" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 238,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "form-sub", children: `Toggle a room on/off. Inactive rooms show as "Unavailable" on the site and can't be booked.` }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 239,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "room-manage-grid", children: ROOMS.map((room) => {
          const active = (roomStatus[room.id] || "active") === "active";
          return /* @__PURE__ */ jsxDEV("div", { className: `room-manage${active ? "" : " off"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "room-manage-media", children: [
              /* @__PURE__ */ jsxDEV("img", { src: room.image, alt: room.name, loading: "lazy" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 246,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `status-pill${active ? "" : " busy"}`, children: [
                /* @__PURE__ */ jsxDEV("span", { className: "dot" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 248,
                  columnNumber: 25
                }, this),
                " ",
                active ? "Available" : "Unavailable"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 247,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 245,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "room-manage-body", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "room-manage-name", children: room.name }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 252,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "cell-sub", children: [
                room.type,
                " \xB7 ",
                room.beds,
                " \xB7 ",
                formatMoney(room.price),
                "/night"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 253,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "room-manage-actions", children: /* @__PURE__ */ jsxDEV(
                "button",
                {
                  className: `btn ${active ? "btn-outline" : "btn-primary"} btn-sm`,
                  onClick: () => setRoomActive(room, !active),
                  children: [
                    /* @__PURE__ */ jsxDEV(Icon, { name: active ? "x" : "check" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 259,
                      columnNumber: 27
                    }, this),
                    active ? "Mark inactive" : "Make active"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "<stdin>",
                  lineNumber: 255,
                  columnNumber: 25
                },
                this
              ) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 254,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 251,
              columnNumber: 21
            }, this)
          ] }, room.id, true, {
            fileName: "<stdin>",
            lineNumber: 244,
            columnNumber: 19
          }, this);
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 240,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 237,
        columnNumber: 11
      }, this),
      tab === "hotel" && /* @__PURE__ */ jsxDEV("div", { className: "admin-card", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Hotel availability" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 273,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "form-sub", children: "Set the overall status shown to guests. Closed or fully booked blocks new bookings." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 274,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "status-options", children: HOTEL_STATUSES.map((s) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            className: `status-option${currentStatus.value === s.value ? " active" : ""}`,
            onClick: () => setHotel(s.value),
            children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: s.icon }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 282,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: s.label }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 283,
                columnNumber: 19
              }, this),
              currentStatus.value === s.value && /* @__PURE__ */ jsxDEV(Icon, { name: "check", className: "status-check" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 284,
                columnNumber: 55
              }, this)
            ]
          },
          s.value,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 277,
            columnNumber: 17
          },
          this
        )) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 275,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 272,
        columnNumber: 11
      }, this),
      tab === "bookings" && /* @__PURE__ */ jsxDEV("div", { className: "admin-card", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Bookings" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 293,
          columnNumber: 13
        }, this),
        loading ? /* @__PURE__ */ jsxDEV("p", { className: "muted", children: "Loading bookings\u2026" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 295,
          columnNumber: 15
        }, this) : bookings.length === 0 ? /* @__PURE__ */ jsxDEV(EmptyState, { icon: "calendar", title: "No bookings yet", text: "Bookings will appear here once guests confirm a stay." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 297,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "admin-table-wrap", children: /* @__PURE__ */ jsxDEV("table", { className: "admin-table", children: [
          /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("th", { children: "Ref" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 303,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Guest" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 303,
              columnNumber: 35
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Room" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 303,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Dates" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 303,
              columnNumber: 62
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Total" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 303,
              columnNumber: 76
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Status" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 303,
              columnNumber: 90
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Actions" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 303,
              columnNumber: 105
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 302,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 301,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { children: bookings.map((b) => {
            const st = BOOKING_STATUS[b.status] || BOOKING_STATUS.pending;
            return /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("td", { className: "mono", children: b.ref }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 311,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("td", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "cell-name", children: b.name || b.username }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 313,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "cell-sub", children: b.email }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 314,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 312,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("td", { children: b.room_name }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 316,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "cell-sub", children: [
                fmtShortDate(b.check_in),
                " \u2192 ",
                fmtShortDate(b.check_out)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 317,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("td", { children: formatMoney(b.total) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 318,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { className: `status-badge ${st.cls}`, children: st.label }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 319,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 319,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("div", { className: "row-actions", children: [
                b.status !== "confirmed" && /* @__PURE__ */ jsxDEV("button", { className: "btn btn-soft btn-sm", onClick: () => setBookingStatus(b.id, "confirmed"), children: "Accept" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 323,
                  columnNumber: 33
                }, this),
                b.status !== "cancelled" && /* @__PURE__ */ jsxDEV("button", { className: "btn btn-outline btn-sm danger", onClick: () => setBookingStatus(b.id, "cancelled"), children: "Reject" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 326,
                  columnNumber: 33
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 321,
                columnNumber: 29
              }, this) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 320,
                columnNumber: 27
              }, this)
            ] }, b.id, true, {
              fileName: "<stdin>",
              lineNumber: 310,
              columnNumber: 25
            }, this);
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 306,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 300,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 299,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 292,
        columnNumber: 11
      }, this),
      tab === "users" && /* @__PURE__ */ jsxDEV("div", { className: "admin-card", children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Registered users" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 342,
          columnNumber: 13
        }, this),
        loading ? /* @__PURE__ */ jsxDEV("p", { className: "muted", children: "Loading users\u2026" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 344,
          columnNumber: 15
        }, this) : users.length === 0 ? /* @__PURE__ */ jsxDEV(EmptyState, { icon: "users", title: "No users yet", text: "Guests who sign in with Google will appear here." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 346,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "admin-table-wrap", children: /* @__PURE__ */ jsxDEV("table", { className: "admin-table", children: [
          /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("th", { children: "User" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 351,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Role" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 351,
              columnNumber: 38
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Joined" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 351,
              columnNumber: 51
            }, this),
            /* @__PURE__ */ jsxDEV("th", { children: "Actions" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 351,
              columnNumber: 66
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 351,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 350,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { children: users.map((u) => /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("div", { className: "cell-user", children: [
              /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: u.avatar || `https://images.websim.com/avatar/${u.username}`,
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
                  lineNumber: 358,
                  columnNumber: 29
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "cell-name", children: u.name || u.username }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 365,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "cell-sub", children: [
                  "@",
                  u.username
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 366,
                  columnNumber: 31
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 364,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 357,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 356,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("span", { className: `status-badge ${u.role === "admin" ? "confirmed" : "pending"}`, children: u.role }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 370,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 370,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "cell-sub", children: u.created_at ? (/* @__PURE__ */ new Date(u.created_at + "Z")).toLocaleDateString() : "\u2014" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 371,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV("button", { className: "btn btn-outline btn-sm danger", onClick: () => removeUser(u.user_id), children: "Remove" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 373,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 372,
              columnNumber: 25
            }, this)
          ] }, u.user_id, true, {
            fileName: "<stdin>",
            lineNumber: 355,
            columnNumber: 23
          }, this)) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 353,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 349,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 348,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 341,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 211,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 195,
    columnNumber: 5
  }, this);
}
export {
  Admin as default
};
