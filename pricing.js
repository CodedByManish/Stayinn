import { formatMoney, nightsBetween } from "./utils.js";

export function pricing(room, checkIn, checkOut, guests) {
  const nights = nightsBetween(checkIn, checkOut) || 1;
  const nightly = room.price;
  const base = nightly * nights;
  const taxRate = 0.12;
  const tax = Math.round(base * taxRate);
  const cleaning = 25;
  let discount = 0;
  if (nights >= 3) discount = Math.round(base * 0.1); // long-stay 10%
  const subtotal = base + tax + cleaning;
  const total = subtotal - discount;
  return { nights, nightly, base, tax, cleaning, discount, subtotal, total };
}
