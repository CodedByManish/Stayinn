# Stayinn — Usage Guide

Quick guide to using Stayinn for room browsing, booking, and administration.

---

## User Flow

```text id="x6f0j4"
Home → Rooms → Room Details → Login/Register → Booking → Confirmation
```

---

## User Guide

### 1. Register or Login

Create an account or sign in using the authentication interface.

Stayinn uses **Firebase Authentication** for user authentication.

---

### 2. Browse Rooms

From the home page, open the rooms section to:

* View available rooms
* Compare room options
* Check prices
* Select a room

---

### 3. View Room Details

Open a room to view information such as:

* Room name
* Description
* Price
* Features
* Images
* Booking options

---

### 4. Make a Booking

1. Select a room.
2. Open the booking page.
3. Enter the required information.
4. Select your dates.
5. Review the details.
6. Confirm the booking.

---

### 5. Booking Confirmation

After a successful booking, Stayinn displays a confirmation page containing the reservation details.

---

## Admin Dashboard

Authorized administrators can access the admin dashboard:

```text id="h6zv9m"
src/pages/Admin.jsx
```

Depending on the implemented features, administrators can manage:

* Rooms
* Room information
* Bookings
* Application data

Administrative features should only be accessible to authorized users.

---

## Troubleshooting

### Login Problems

Check:

* Account credentials
* Firebase Authentication configuration
* Enabled authentication provider

### Booking Problems

Check:

* Required fields are completed
* Valid booking dates are selected
* The selected room is available
* You are authenticated when required

### Admin Access Problems

Make sure you are signed in with an authorized administrator account.

---

## Related Documentation

* [Setup Guide](SETUP.md)
* [Deployment Guide](DEPLOYMENT.md)
* [Main README](../README.md)
