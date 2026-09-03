# Stayinn — Usage Guide

This guide explains how users interact with Stayinn and how authorized administrators use the admin dashboard.

---

## Application Overview

Stayinn provides a simple room-booking workflow:

```text
           Home
            ↓
        Browse Rooms
            ↓
        Room Details
            ↓
       Login / Register
            ↓
         Booking
            ↓
        Confirmation
```

---

## User Guide

### 1. Create an Account

If you are a new user:

1. Open Stayinn.
2. Select the authentication option.
3. Register with the required information.
4. Complete the registration process.
5. Sign in to continue.

Authentication is handled through Firebase Authentication.

---

### 2. Login

Existing users can:

1. Open the login/authentication interface.
2. Enter their account information.
3. Submit the form.
4. Continue to the application after successful authentication.

---

### 3. Browse Rooms

From the home page, navigate to the rooms section.

Users can:

* View available rooms
* Compare room options
* Review room prices
* Select a room for more information

---

### 4. View Room Details

Select a room to open its details page.

Room information may include:

* Room name
* Description
* Price
* Room features
* Images
* Booking options

Review the information before continuing with the booking.

---

### 5. Make a Booking

To make a reservation:

1. Select the desired room.
2. Open the booking page.
3. Enter the required booking information.
4. Select the appropriate dates.
5. Review the booking details.
6. Confirm the booking.

---

### 6. Booking Confirmation

After a successful booking, Stayinn displays the confirmation page.

The confirmation provides the user with the relevant reservation information.

Users should keep the confirmation information for their records.

---

## Admin Dashboard

Stayinn includes an administrative dashboard for authorized users.

The admin page is implemented in:

```text
src/pages/Admin.jsx
```

The dashboard provides administrative functionality for managing the application.

---

## Admin Workflow

```text
Admin Login
     |
     v
Admin Dashboard
     |
     +---- Room Management
     |
     +---- Booking Management
     |
     +---- Application Management
     |
     v
Save / Review Changes
```

---

## Admin Responsibilities

Depending on the implemented functionality, administrators can manage application data such as:

* Rooms
* Room information
* Bookings
* Booking-related information
* Application settings

Administrative functionality should only be available to authorized users.

---

## Recommended User Flow

For the best experience:

```text
1. Register or Login
        ↓
2. Browse Rooms
        ↓
3. Select a Room
        ↓
4. Review Room Details
        ↓
5. Enter Booking Information
        ↓
6. Confirm Booking
        ↓
7. Review Confirmation
```

---

## Recommended Admin Flow

```text
1. Authenticate as Admin
        ↓
2. Open Admin Dashboard
        ↓
3. Review Application Data
        ↓
4. Manage Rooms / Bookings
        ↓
5. Save Changes
        ↓
6. Verify Updated Information
```

---

## Troubleshooting

### Cannot log in

Verify that:

* Your account information is correct.
* Firebase Authentication is configured.
* The required authentication provider is enabled.

### Booking cannot be completed

Check that:

* You are authenticated if authentication is required.
* Required booking fields are completed.
* Valid booking dates are selected.
* The selected room is available according to the application's data.

### Admin dashboard is unavailable

Make sure you are using an authorized administrative account.

If the dashboard is still unavailable, check the application's authentication and authorization configuration.

---

## Related Documentation

* [Setup Guide](SETUP.md)
* [Deployment Guide](DEPLOYMENT.md)
* [Main README](../README.md)
