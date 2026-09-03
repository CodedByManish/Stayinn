import React, { useEffect, useState } from "react";
import Icon from "./icons.jsx";
import { AuthModal } from "./auth.jsx";
import { useApp } from "../../AppProvider.jsx";

function Header() {
  const { route, navigate, user, logout, toast, hotelStatus } = useApp();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [notifState, setNotifState] = useState(null);

  const links = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" }
  ];

  const isActive = (to) =>
    to === "/" ? route.name === "/" : route.name.startsWith("/rooms");

  const isAdmin = user && user.role === "admin";

  const statusBanner = hotelStatus !== "available"
    ? {
        limited: { text: "Limited availability — some rooms may be booked out.", cls: "limited" },
        fully_booked: { text: "We're currently fully booked. Check back soon.", cls: "busy" },
        closed: { text: "The hotel is temporarily closed for new bookings.", cls: "busy" }
      }[hotelStatus]
    : null;

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
      }).catch(() => {});
    }
    return () => { live = false; };
  }, []);

  const toggleNotif = async () => {
    const ws = window.websim && window.websim.notifications;

    if (!ws) {
      toast({
        type: "info",
        title: "Notifications unavailable",
        message: "Sign in to receive booking updates."
      });
      return;
    }

    try {
      const { state } = await ws.requestPermission();
      setNotifState(state);

      toast(
        state === "granted"
          ? { type: "success", title: "Notifications on", message: "We'll ping you when your booking status changes." }
          : { type: "info", title: "Notifications off", message: "You won't get booking updates." }
      );
    } catch {
      toast({ type: "error", title: "Couldn't update", message: "Please try again." });
    }
  };

  return (
    <header className="nav">
      {statusBanner && (
        <div className={`status-banner ${statusBanner.cls}`} role="status">
          <div className="container">{statusBanner.text}</div>
        </div>
      )}

      <nav className="container nav-inner" aria-label="Main navigation">
        <a className="brand" href="#/" onClick={() => setOpen(false)}>
          <img src="icon.png" alt="Stayinn logo" className="brand-logo" width="34" height="34" />
          Stayinn
        </a>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.to}>
              <a
                href={`#${l.to}`}
                className={isActive(l.to) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#/admin"
              className={route.name === "/admin" ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              Admin
            </a>
          </li>
        </ul>

        <div className="nav-cta flex items-center gap-2.5">
          {user ? (
            <div className="user-menu">
              <button
                className="user-chip"
                onClick={() => setMenuOpen((m) => !m)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <img
                  src={user.avatar || `https://images.websim.com/avatar/${user.username}`}
                  alt=""
                  className="user-avatar"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <span className="user-name">{user.username || user.name}</span>
                <Icon
                  name="chevronRight"
                  style={{
                    transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s"
                  }}
                />
              </button>

              {menuOpen && (
                <div className="user-dropdown" role="menu">
                  <div className="user-dropdown-head">
                    <strong>{user.name || user.username}</strong>
                    <span>{isAdmin ? "Administrator" : "Guest"}</span>
                  </div>

                  <button role="menuitem" onClick={() => {
                    setMenuOpen(false);
                    navigate("/rooms");
                  }}>
                    <Icon name="bed" /> My bookings
                  </button>

                  {isAdmin && (
                    <button role="menuitem" onClick={() => {
                      setMenuOpen(false);
                      navigate("/admin");
                    }}>
                      <Icon name="shield" /> Admin panel
                    </button>
                  )}

                  <button role="menuitem" onClick={() => {
                    setMenuOpen(false);
                    toggleNotif();
                  }}>
                    <Icon name="bell" />{" "}
                    {notifState === "granted" ? "Booking alerts: on" : "Turn on booking alerts"}
                  </button>

                  <button role="menuitem" className="danger" onClick={handleLogout}>
                    <Icon name="x" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="get-started">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setMenuOpen((m) => !m)}
                aria-expanded={menuOpen}
              >
                Get Started
              </button>

              {menuOpen && (
                <div className="get-started-dropdown" role="menu">
                  <button role="menuitem" onClick={() => openAuth("register")}>
                    <Icon name="checkCircle" /> Register
                  </button>
                  <button role="menuitem" onClick={() => openAuth("login")}>
                    <Icon name="lock" /> Login
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="nav-burger btn btn-ghost"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </nav>

      <AuthModal
        open={authMode !== null}
        mode={authMode || "login"}
        onClose={() => setAuthMode(null)}
        onSuccess={() => navigate("/rooms")}
      />
    </header>
  );
}

export { Header as default };