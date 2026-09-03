# Stayinn — Setup Guide

Quick guide to setting up and running Stayinn locally.

---

## Requirements

Install:

* **Node.js** (LTS recommended)
* **npm**
* **Git**
* **Firebase** project

Verify:

```bash
node --version
npm --version
git --version
```

---

## 1. Clone the Project

```bash
git clone https://github.com/CodedByManish/Stayinn.git
cd Stayinn
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment

Create a `.env` file in the project root using `.env.dist` as a reference.

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

## 4. Firebase

Stayinn uses Firebase for authentication and hosting.

The configured project is:

```text
stayinn-3a715
```

Firebase configuration is handled in:

```text
firebase.js
```

---

## 5. Run Locally

Start the development server:

```bash
npm run dev
```

Open:

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

## Troubleshooting

### Environment Variables

Make sure:

* `.env` is in the project root
* Variables start with `VITE_`
* Values are correct
* The dev server was restarted after changes

### Firebase Authentication

Check that Firebase Authentication is enabled and the required provider is configured.

### Blank Page

Check the browser console for errors.

You can also test the production build:

```bash
npm run build
npm run preview
```

---

## Next Steps

* [Deployment Guide](DEPLOYMENT.md)
* [Usage Guide](USAGE.md)
* [Main README](../README.md)
