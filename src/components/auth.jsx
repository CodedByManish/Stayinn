import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { Modal } from "./components.jsx";
import { useApp } from "../../AppProvider.jsx";

function GoogleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41.4 35.4 44 30.2 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

function AuthModal({ open, onClose, mode = "login", onSuccess }) {
  const { login, toast } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleGoogle = async () => {
    setBusy(true);
    setError("");
    const result = await login();

    if (result.redirecting) {
      setBusy(false);
      setError("Opening Google… if the popup was blocked, you'll be redirected to finish signing in.");
      return;
    }

    setBusy(false);
    if (result.error) return setError(result.error);

    toast({
      type: "success",
      title: result.isNew ? "Account created!" : "Welcome back!",
      message: `Signed in as ${result.user.username || result.user.name}`,
    });
    onClose();
    if (onSuccess) onSuccess(result.user);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "register" ? "Create your account" : "Welcome back"}
    >
      <div className="auth-modal">
        <p className="auth-lead">
          {mode === "register"
            ? "Create a Stayinn account to book rooms and track your stays."
            : "Sign in to book rooms and manage your stays."}
        </p>

        <button className="google-btn" onClick={handleGoogle} disabled={busy}>
          <GoogleIcon />
          {busy ? "Signing in…" : "Continue with Google"}
        </button>

        {error && <p className="field-error" role="alert">{error}</p>}

        <p className="auth-note">
          {mode === "register"
            ? "Registration and login both use your Google account — no separate password needed."
            : "We use your Google account for secure, password-free sign-in."}
        </p>
      </div>
    </Modal>
  );
}

function SignInGate({
  title = "Sign in to book",
  text = "You need to be signed in to complete a booking. Continue with Google to get started.",
}) {
  const { login, toast } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    setBusy(true);
    setError("");
    const result = await login();

    if (result.redirecting) {
      setBusy(false);
      setError("Opening Google… if the popup was blocked, you'll be redirected to finish signing in.");
      return;
    }

    setBusy(false);
    if (result.error) return setError(result.error);

    toast({
      type: "success",
      title: result.isNew ? "Account created!" : "Welcome back!",
      message: `Signed in as ${result.user.username || result.user.name}`,
    });
  };

  return (
    <div className="container">
      <div className="state gate-card">
        <div className="state-icon"><GoogleIcon size={34} /></div>
        <h3>{title}</h3>
        <p>{text}</p>

        <button className="google-btn" onClick={handleGoogle} disabled={busy}>
          <GoogleIcon />
          {busy ? "Signing in…" : "Continue with Google"}
        </button>

        {error && <p className="field-error" role="alert">{error}</p>}
      </div>
    </div>
  );
}

export { AuthModal, GoogleIcon, SignInGate };