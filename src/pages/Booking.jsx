import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState } from "react";
import Icon from "../components/icons.jsx";
import BookingSummary from "../components/BookingSummary.jsx";
import PayPalButton from "../components/PayPalButton.jsx";
import { EmptyState } from "../components/components.jsx";
import { SignInGate } from "../components/auth.jsx";
import { useApp } from "../../AppProvider.jsx";
import { ROOMS } from "../../data.js";
import { pricing } from "../../pricing.js";
import { todayISO } from "../../utils.js";
function readQuery() {
  const q = new URLSearchParams(window.location.hash.split("?")[1] || "");
  return {
    checkIn: q.get("checkIn") || todayISO(1),
    checkOut: q.get("checkOut") || todayISO(3),
    guests: q.get("guests") ? parseInt(q.get("guests"), 10) : 2
  };
}
const validators = {
  name: (v) => v.trim().length < 2 ? "Please enter the guest's full name." : "",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address.",
  phone: (v) => v.replace(/\D/g, "").length < 7 ? "Enter a valid phone number." : "",
  dates: (ci, co) => {
    if (!ci || !co) return "Please select both check-in and check-out dates.";
    if (co <= ci) return "Check-out must be after check-in.";
    return "";
  }
};
function Booking({ id }) {
  const { addBooking, toast, user, authLoading, authHeaders, hotelStatus, roomStatus } = useApp();
  const room = ROOMS.find((r) => r.id === id);
  const [q] = useState(readQuery);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
    checkIn: q.checkIn,
    checkOut: q.checkOut,
    guests: q.guests
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [paymentError, setPaymentError] = useState("");
  useEffect(() => {
    if (form.guests > (room ? room.capacity : 4)) {
      setForm((f) => ({ ...f, guests: room ? room.capacity : 4 }));
    }
  }, [form.guests, room]);
  if (!room) {
    return /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV(EmptyState, { icon: "alert", title: "Room not found", text: "The room you're booking no longer exists." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 51,
      columnNumber: 39
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 51,
      columnNumber: 12
    }, this);
  }
  if (authLoading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV("div", { className: "state", children: /* @__PURE__ */ jsxDEV("p", { className: "muted", children: "Loading\u2026" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 55,
      columnNumber: 62
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 55,
      columnNumber: 39
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 55,
      columnNumber: 12
    }, this);
  }
  if (!user) {
    return /* @__PURE__ */ jsxDEV(SignInGate, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 59,
      columnNumber: 12
    }, this);
  }
  const roomInactive = room && roomStatus[room.id] && roomStatus[room.id] !== "active";
  const blocked = roomInactive || hotelStatus === "closed" || hotelStatus === "fully_booked";
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setGuests = (e) => {
    const n = Math.max(1, Math.min(room.capacity, +e.target.value));
    setForm((f) => ({ ...f, guests: n }));
  };
  const validate = () => {
    const e = {};
    e.name = validators.name(form.name);
    e.email = validators.email(form.email);
    e.phone = validators.phone(form.phone);
    e.dates = validators.dates(form.checkIn, form.checkOut);
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };
  const createBooking = async () => {
    if (status !== "idle" || blocked) return;
    if (!validate()) return;
    setStatus("submitting");
    setPaymentError("");
    const p2 = pricing(room, form.checkIn, form.checkOut, form.guests);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json", ...authHeaders() },
        body: JSON.stringify({
          roomId: room.id,
          roomName: room.name,
          roomType: room.type,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guests: form.guests,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          requests: form.requests.trim(),
          total: p2.total
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        toast({ type: "error", title: "Booking failed", message: data.error || "Please try again." });
        return;
      }
      const booking = data.booking;
      addBooking(booking);
      toast({ type: "success", title: "Booking submitted!", message: `Reference ${booking.ref}` });
      const Swal = window.Swal;
      if (Swal && Swal.fire) {
        Swal.fire({
          icon: "success",
          title: "Booking Submitted!",
          text: `Your booking ${booking.ref} is pending confirmation. A confirmation has been sent to ${booking.email}.`,
          confirmButtonColor: "#b98543",
          confirmButtonText: "View confirmation"
        }).then(() => {
          window.location.hash = `/confirmation/${booking.ref}`;
        });
      } else {
        window.location.hash = `/confirmation/${booking.ref}`;
      }
    } catch {
      setStatus("error");
      toast({ type: "error", title: "Booking failed", message: "Network error. Please try again." });
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (blocked) return;
    if (!validate()) return;
    setPaymentError("");
  };
  const handlePayPalSuccess = () => {
    createBooking();
  };
  const handlePayPalError = (msg) => {
    setStatus("idle");
    setPaymentError(msg);
  };
  const p = pricing(room, form.checkIn, form.checkOut, form.guests);
  const formValid = !validators.name(form.name) && !validators.email(form.email) && !validators.phone(form.phone) && !validators.dates(form.checkIn, form.checkOutut);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "page-head", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      /* @__PURE__ */ jsxDEV("nav", { className: "crumbs", "aria-label": "Breadcrumb", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "#/", children: "Home" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 157,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "sep", children: "/" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 157,
          columnNumber: 34
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", children: "Rooms" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 158,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "sep", children: "/" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 158,
          columnNumber: 40
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: `#/room/${room.id}`, children: room.name }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 159,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "sep", children: "/" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 159,
          columnNumber: 58
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Booking" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 160,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 156,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { children: "Complete your booking" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 162,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 155,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 154,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV("div", { className: "booking-layout", children: [
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("form", { className: "form-card", onSubmit: handleSubmit, noValidate: true, children: [
        /* @__PURE__ */ jsxDEV("h2", { children: "Guest details" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 170,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "form-sub", children: "Where should we send your confirmation?" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 171,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "form-grid", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "span2", children: /* @__PURE__ */ jsxDEV("div", { className: "field", children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "bk-name", children: "Full name" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 176,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("input", { id: "bk-name", type: "text", value: form.name, onChange: set("name"), autoComplete: "name", placeholder: "Jane Doe" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 177,
              columnNumber: 21
            }, this),
            errors.name && /* @__PURE__ */ jsxDEV("p", { className: "field-error", role: "alert", children: errors.name }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 178,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 175,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 174,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `field${errors.email ? " has-error" : ""}`, children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "bk-email", children: "Email" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 182,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { id: "bk-email", type: "email", value: form.email, onChange: set("email"), autoComplete: "email", placeholder: "jane@example.com" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 183,
              columnNumber: 19
            }, this),
            errors.email && /* @__PURE__ */ jsxDEV("p", { className: "field-error", role: "alert", children: errors.email }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 184,
              columnNumber: 36
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 181,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `field${errors.phone ? " has-error" : ""}`, children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "bk-phone", children: "Phone" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 187,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { id: "bk-phone", type: "tel", value: form.phone, onChange: set("phone"), autoComplete: "tel", placeholder: "+1 555 010 1234" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 188,
              columnNumber: 19
            }, this),
            errors.phone && /* @__PURE__ */ jsxDEV("p", { className: "field-error", role: "alert", children: errors.phone }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 189,
              columnNumber: 36
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 186,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `field${errors.dates ? " has-error" : ""}`, children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "bk-in", children: "Check-in" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 192,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { id: "bk-in", type: "date", value: form.checkIn, min: todayISO(), onChange: set("checkIn") }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 193,
              columnNumber: 19
            }, this),
            errors.dates && /* @__PURE__ */ jsxDEV("p", { className: "field-error", role: "alert", children: errors.dates }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 194,
              columnNumber: 36
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 191,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `field${errors.dates ? " has-error" : ""}`, children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "bk-out", children: "Check-out" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 197,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { id: "bk-out", type: "date", value: form.checkOut, min: form.checkIn || todayISO(), onChange: set("checkOut") }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 198,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 196,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "span2", children: /* @__PURE__ */ jsxDEV("div", { className: "field", children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "bk-guests", children: "Number of guests" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 202,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("select", { id: "bk-guests", value: form.guests, onChange: setGuests, children: [1, 2, 3, 4].filter((n) => n <= room.capacity).map((n) => /* @__PURE__ */ jsxDEV("option", { value: n, children: [
              n,
              " ",
              n === 1 ? "guest" : "guests"
            ] }, n, true, {
              fileName: "<stdin>",
              lineNumber: 205,
              columnNumber: 25
            }, this)) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 203,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 201,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 200,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "span2", children: /* @__PURE__ */ jsxDEV("div", { className: "field", children: [
            /* @__PURE__ */ jsxDEV("label", { htmlFor: "bk-req", children: [
              "Special requests ",
              /* @__PURE__ */ jsxDEV("span", { style: { textTransform: "none", fontWeight: 400 }, children: "(optional)" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 212,
                columnNumber: 62
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 212,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("textarea", { id: "bk-req", value: form.requests, onChange: set("requests"), placeholder: "Early check-in, extra pillows, dietary requirements\u2026" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 213,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 211,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 210,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 173,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { style: { marginTop: 24, borderTop: "1px solid var(--line)", paddingTop: 18 }, children: [
          /* @__PURE__ */ jsxDEV("p", { style: { fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }, children: [
            /* @__PURE__ */ jsxDEV(Icon, { name: "shield" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 220,
              columnNumber: 19
            }, this),
            " Pay securely with PayPal. Free cancellation up to 48h before arrival."
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 219,
            columnNumber: 17
          }, this),
          status === "error" && /* @__PURE__ */ jsxDEV("div", { className: "field-error", style: { background: "var(--danger-soft)", padding: 12, borderRadius: 10, marginBottom: 12 }, role: "alert", children: "We couldn't process your booking. Your card hasn't been charged \u2014 please try again." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 223,
            columnNumber: 19
          }, this),
          paymentError && /* @__PURE__ */ jsxDEV("div", { className: "field-error", style: { background: "var(--danger-soft)", padding: 12, borderRadius: 10, marginBottom: 12 }, role: "alert", children: paymentError }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 228,
            columnNumber: 19
          }, this),
          blocked && /* @__PURE__ */ jsxDEV("div", { className: "field-error", style: { background: "var(--warning)", color: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 }, role: "alert", children: "We're not accepting new bookings right now. Please check back later." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 233,
            columnNumber: 19
          }, this),
          !blocked && /* @__PURE__ */ jsxDEV(
            PayPalButton,
            {
              amount: p.total,
              disabled: !formValid || status === "submitting",
              onSuccess: handlePayPalSuccess,
              onError: handlePayPalError
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 238,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "btn btn-accent btn-lg btn-block", style: { marginTop: 12 }, disabled: blocked, children: blocked ? /* @__PURE__ */ jsxDEV(Fragment, { children: "Not accepting bookings" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 246,
            columnNumber: 30
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: "Review booking details" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 246,
            columnNumber: 60
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 245,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 218,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 169,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 168,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("aside", { className: "sticky-wrap", children: /* @__PURE__ */ jsxDEV(BookingSummary, { room, checkIn: form.checkIn, checkOut: form.checkOut, guests: form.guests }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 253,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 252,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 167,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 166,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 153,
    columnNumber: 5
  }, this);
}
export {
  Booking as default
};
