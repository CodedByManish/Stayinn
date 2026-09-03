# Stayinn — Deployment Guide

This guide covers the deployment of **Stayinn** to Firebase Hosting using manual deployment and GitHub Actions.

---

## Deployment Overview

```text
GitHub → GitHub Actions → Build → Firebase Hosting → Live Website
```

---

## Production Build

Build the application:

```bash
npm run build
```

The production files are generated in:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## Firebase CLI

Install Firebase CLI:

```bash
npm install -g firebase-tools
```

Login and verify:

```bash
firebase login
firebase projects:list
```

Stayinn uses:

```text
stayinn-3a715
```

---

## Manual Deployment

Build and deploy:

```bash
npm run build
firebase deploy --only hosting
```

**Live Website:**
https://stayinn-3a715.web.app

---

## GitHub Actions

Deployment workflows are located in:

```text
.github/workflows/
├── firebase-hosting-main.yml
└── firebase-hosting-pull-request.yml
```

### Main Deployment

Pushing to `main` automatically:

1. Installs dependencies
2. Builds the application
3. Deploys to Firebase Hosting

```bash
git add .
git commit -m "Update application"
git push origin main
```

### Pull Request Preview

Pull requests can generate a Firebase Hosting preview before changes are merged into `main`.

---

## Firebase Service Account

GitHub Actions uses the following secret:

```text
FIREBASE_SERVICE_ACCOUNT_STAYINN_3A715
```

Configure it under:

```text
GitHub → Repository → Settings → Secrets and variables → Actions
```

Never commit Firebase service-account credentials.

---

## Environment Variables

Local environment variables are stored in:

```text
.env
```

Common Vite variables:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Do not commit `.env` or other sensitive credentials.

---

## Deployment Checklist

* [ ] `npm install` works
* [ ] `npm run build` succeeds
* [ ] Firebase CLI is authenticated
* [ ] Correct Firebase project is selected
* [ ] Environment variables are configured
* [ ] GitHub Actions secret is available
* [ ] Changes are pushed to `main`

---

## Troubleshooting

### Build Fails

```bash
npm run build
```

Fix the reported error before deploying.

### Wrong Firebase Project

```bash
firebase use
```

Expected project:

```text
stayinn-3a715
```

### Deployment Fails

```bash
npm install
npm run build
firebase deploy --only hosting
```

### Blank Page After Deployment

Run:

```bash
npm run build
npm run preview
```

If the local preview works, check the browser console and production environment variables.

---

## Deployment Files

| File                                                  | Purpose                        |
| ----------------------------------------------------- | ------------------------------ |
| `firebase.json`                                       | Firebase Hosting configuration |
| `.firebaserc`                                         | Firebase project configuration |
| `.github/workflows/firebase-hosting-main.yml`         | Production deployment          |
| `.github/workflows/firebase-hosting-pull-request.yml` | PR preview                     |
| `vite.config.js`                                      | Vite configuration             |
| `.env.dist`                                           | Environment variable reference |

---

## Production

**Project:** `stayinn-3a715`
**Hosting:** Firebase Hosting
**Live Website:** https://stayinn-3a715.web.app

---

## Related Documentation

* [Setup Guide](SETUP.md)
* [Usage Guide](USAGE.md)
* [Main README](../README.md)
