import { jsxDEV } from "react/jsx-dev-runtime";
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  googleErrorMessage
} from "./firebase.js";
import { AuthModal } from "./src/components/auth.jsx";

const AppContext = createContext(null);
const useApp = () => useContext(AppContext);
const AUTH_KEY = "stayinn_firebase_session";
function parseRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  const [path, query] = hash.split("?");
  const segs = path.split("/").filter(Boolean);
  let name = "/";
  if (segs.length === 0) name = "/";
  else if (segs[0] === "rooms") name = "/rooms";
  else if (segs[0] === "room") name = "/room/:id";
  else if (segs[0] === "booking") name = "/booking/:id";
  else if (segs[0] === "confirmation") name = "/confirmation/:ref";
  else name = "/" + segs[0];
  const params = {};
  const s = segs.length ? segs[0] : "";
  if (s === "room" || s === "booking") params.id = segs[1];
  if (s === "confirmation") params.ref = segs[1];
  return { name, params, query: query || "" };
}
const BOOKINGS_KEY = "stayinn_bookings";
function AppProvider({ children }) {
  const [route, setRoute] = useState(parseRoute);
  const [toasts, setToasts] = useState([]);
  const [search, setSearch] = useState({});
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [hotelStatus, setHotelStatus] = useState("available");
  const [roomStatus, setRoomStatus] = useState({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = localStorage.getItem(AUTH_KEY);
        if (raw) {
          const s = JSON.parse(raw);
          if (!cancelled && s && s.user) {
            setUser(s.user);
            setAuthToken(s.token || null);
          }
        }
      } catch {
      }
      if (!cancelled) setAuthLoading(false);
    })();
    (async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setHotelStatus(data.status || "available");
            if (data.rooms) setRoomStatus(data.rooms);
          }
        }
      } catch {
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cred = await getRedirectResult(auth);
        if (!cancelled && cred && cred.user) {
          const idToken = await cred.user.getIdToken(true);
          const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ idToken })
          });
          const data = await res.json();
          const userData = res.ok && data.user ? data.user : {
            user_id: cred.user.uid,
            username: cred.user.email && cred.user.email.split("@")[0] || "guest",
            name: cred.user.displayName || "Guest",
            email: cred.user.email || "",
            avatar: cred.user.photoURL || "",
            role: "guest"
          };
          setUser(userData);
          setAuthToken(idToken);
          try {
            localStorage.setItem(AUTH_KEY, JSON.stringify({ user: userData, token: idToken }));
          } catch {
          }
        }
      } catch {
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const navigate = useCallback((path) => {
    window.location.hash = path;
  }, []);
  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const toast = useCallback(({ type = "info", message, title } = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, message, title }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);
  const addBooking = useCallback((booking) => {
    const next = [booking, ...bookings];
    setBookings(next);
    try {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
    } catch {
    }
  }, [bookings]);
  const openAuthModal = useCallback((mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);
  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);
  const login = useCallback(async () => {
    let cred;
    try {
      cred = await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const code = err && err.code ? String(err.code) : "";
      if (code === "auth/popup-blocked" || code === "auth/popup-closed-by-user") {
        try {
          await signInWithRedirect(auth, googleProvider);
          return { redirecting: true };
        } catch (e2) {
          return { error: googleErrorMessage(e2) };
        }
      }
      return { error: googleErrorMessage(err) };
    }
    try {
      const idToken = await cred.user.getIdToken(true);
      let data, userData;
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ idToken })
        });
        data = await res.json();
        if (!res.ok) {
          auth.currentUser && typeof auth.currentUser.delete === "function" && auth.currentUser.delete().catch(() => {
          });
          return { error: data.error || "Couldn't create your account." };
        }
        userData = data.user;
      } catch {
        userData = {
          user_id: cred.user.uid,
          username: cred.user.email && cred.user.email.split("@")[0] || "guest",
          name: cred.user.displayName || "Guest",
          email: cred.user.email || "",
          avatar: cred.user.photoURL || "",
          role: "guest"
        };
      }
      setUser(userData);
      setAuthToken(idToken);
      try {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ user: userData, token: idToken }));
      } catch {
      }
      return { user: userData, isNew: !!(data && data.isNew) };
    } catch (err) {
      return { error: googleErrorMessage(err) };
    }
  }, []);
  const logout = useCallback(async () => {
    try {
      if (auth && auth.currentUser) await signOut(auth);
    } catch {
    }
    setUser(null);
    setAuthToken(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
    }
  }, []);
  const authHeaders = useCallback(() => {
    if (!authToken) return {};
    return { authorization: `Bearer ${authToken}` };
  }, [authToken]);
  const updateRoomStatus = useCallback((id, val) => {
    setRoomStatus((m) => ({ ...m, [id]: val }));
  }, []);
  const value = useMemo(
    () => ({
      route,
      navigate,
      toasts,
      toast,
      search,
      setSearch,
      bookings,
      addBooking,
      user,
      setUser,
      login,
      logout,
      authHeaders,
      authToken,
      authLoading,
      hotelStatus,
      setHotelStatus,
      roomStatus,
      updateRoomStatus,
      isAuthModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal
    }),
    [
      route,
      navigate,
      toasts,
      toast,
      search,
      bookings,
      addBooking,
      user,
      login,
      logout,
      authHeaders,
      authToken,
      authLoading,
      hotelStatus,
      roomStatus,
      updateRoomStatus,
      isAuthModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal
    ]
  );
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
export {
  AppProvider,
  useApp
};
