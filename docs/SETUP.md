# Stayinn — Setup Guide

This guide explains how to set up and run Stayinn locally for development.

---

## Requirements

Make sure you have the following installed:

* **Node.js** — LTS version recommended
* **npm** — included with Node.js
* **Git**
* A **Firebase** project for authentication and application configuration

Verify your installations:

```bash
node --version
npm --version
git --version
```

---

## 1. Clone the Project

Clone the repository:

```bash
git clone https://github.com/CodedByManish/Stayinn.git
```

Move into the project directory:

```bash
cd Stayinn
```

---

## 2. Install Dependencies

Install all required packages:

```bash
npm install
```

---

## 3. Environment Configuration

Create a `.env` file in the project root.

Use `.env.dist` as the reference for the required variables.

Example:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Do not commit `.env` to Git.

---

## 4. Firebase Configuration

Stayinn uses Firebase for authentication and hosting.

The Firebase configuration is handled through:

```text
firebase.js
```

The project is configured for the Firebase project:

```text
stayinn-3a715
```

If you are setting up your own Firebase project, update the environment variables with your project's Firebase configuration.

---

## 5. Run Locally

Start the Vite development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

---

## Development Commands

| Command           | Purpose                  |
| ----------------- | ------------------------ |
| `npm install`     | Install dependencies     |
| `npm run dev`     | Start development server |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |

---

## Recommended Development Workflow

```text
Install Dependencies
        ↓
Configure Environment
        ↓
Start Development Server
        ↓
  Make Changes
        ↓
Test Application
        ↓
Run Production Build
```

Before pushing changes, verify that:

```bash
npm run build
```

completes successfully.

---

## Troubleshooting

### Dependencies are missing

Run:

```bash
npm install
```

Then restart the development server.

### Environment variables are not working

Check that:

* `.env` exists in the project root.
* Variable names start with `VITE_`.
* Values are correct.
* The development server was restarted after changing `.env`.

### Firebase authentication is not working

Verify:

* Firebase configuration values are correct.
* Firebase Authentication is enabled in the Firebase Console.
* The configured authentication provider is enabled.

### Application shows a blank page

Check the browser's developer console for JavaScript errors.

Also test the production build:

```bash
npm run build
npm run preview
```

If the production preview works but the deployed application does not, review the deployment configuration and environment variables.

---

## Next Steps

After completing the local setup, see:

* [Deployment Guide](DEPLOYMENT.md)
* [Usage Guide](USAGE.md)
* [Main README](../README.md)
