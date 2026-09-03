import React, { useEffect, useRef, useState } from "react";

const PAYPAL_CLIENT_ID = "test";
const PAYPAL_CURRENCY = "USD";
const CLIENT_ID_PLACEHOLDER = "test";
let sdkPromise = null;

function loadPayPalSdk() {
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-paypal-sdk]");

    if (existing) {
      existing.addEventListener("load", () => resolve(window.paypal));
      existing.addEventListener("error", () => reject(new Error("PayPal SDK failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${PAYPAL_CURRENCY}&intent=capture`;
    script.setAttribute("data-paypal-sdk", "");
    script.async = true;
    script.onload = () => resolve(window.paypal);
    script.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.body.appendChild(script);
  });

  return sdkPromise;
}

function PayPalButton({ amount, onSuccess, onError, disabled }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (disabled || !amount) return;

    if (PAYPAL_CLIENT_ID === CLIENT_ID_PLACEHOLDER) {
      setError("PayPal isn't configured yet. Add your sandbox Client ID in src/components/PayPalButton.jsx to enable online payment.");
      return;
    }

    let cancelled = false;

    loadPayPalSdk()
      .then((paypal) => {
        if (cancelled || !ref.current) return;

        paypal.Buttons({
          style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal" },
          createOrder: (data, actions) =>
            actions.order.create({
              purchase_units: [{
                amount: { value: String(amount), currency_code: PAYPAL_CURRENCY },
              }],
            }),
          onApprove: async (data, actions) => {
            try {
              const details = await actions.order.capture();
              if (onSuccess) onSuccess(details);
            } catch (e) {
              if (onError) onError("Payment could not be captured. Please try again.");
            }
          },
          onError: () => {
            if (onError) onError("PayPal reported an error. Please try again.");
          },
          onCancel: () => {
            if (onError) onError("Payment was cancelled.");
          },
        }).render(ref.current);

        setReady(true);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || "Couldn't load PayPal.");
      });

    return () => {
      cancelled = true;
    };
  }, [amount, disabled, onSuccess, onError]);

  if (disabled) return null;

  return (
    <div>
      <div ref={ref} />
      {!ready && !error && (
        <p className="muted" style={{ fontSize: 13, textAlign: "center", padding: 8 }}>
          Loading PayPal…
        </p>
      )}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

export { PayPalButton as default };