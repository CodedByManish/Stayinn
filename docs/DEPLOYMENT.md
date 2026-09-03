# Stayinn — Deployment Guide

This guide explains how Stayinn is built and deployed to **Firebase Hosting**, including manual deployment and GitHub Actions automation.

---

## Deployment Overview

```text
GitHub Repository
       |
       v
GitHub Actions
       |
       v
Install Dependencies
       |
       v
Production Build
       |
       v
Firebase Hosting
       |
       v
Live Website
```

---

## Production Build

Before deploying, create a production build:

```bash
npm run build
```

The optimized files are generated in:

```text
dist/
```

You can test the production build locally:

```bash
npm run preview
```

---

## Firebase CLI

Install the Firebase CLI globally:

```bash
npm install -g firebase-tools
```

Verify the installation:

```bash
firebase --version
```

Log in to Firebase:

```bash
firebase login
```

Check available Firebase projects:

```bash
firebase projects:list
```

---

## Firebase Hosting Setup

Stayinn uses the Firebase project:

```text
stayinn-3a715
```

Firebase Hosting is configured through:

```text
firebase.json
.firebaserc
```

The production build directory is:

```text
dist/
```

---

## Manual Deployment

Build the application:

```bash
npm run build
```

Deploy to Firebase Hosting:

```bash
firebase deploy --only hosting
```

After a successful deployment, Firebase provides the live Hosting URL.

### Production URL

**https://stayinn-3a715.web.app**

---

## GitHub Actions

Stayinn includes automated Firebase Hosting workflows:

```text
.github/
└── workflows/
    ├── firebase-hosting-main.yml
    └── firebase-hosting-pull-request.yml
```

### Main Deployment

The `firebase-hosting-main.yml` workflow runs when code is pushed to:

```text
main
```

The workflow:

1. Checks out the repository.
2. Installs dependencies.
3. Builds the application.
4. Deploys the `dist/` directory to Firebase Hosting.

---

## Pull Request Deployment

The project also includes:

```text
firebase-hosting-pull-request.yml
```

This workflow creates a Firebase Hosting preview deployment for eligible pull requests.

This allows changes to be tested before they are merged into `main`.

---

## Firebase Service Account

GitHub Actions requires a Firebase service account to authenticate the deployment.

The repository uses the GitHub Actions secret:

```text
FIREBASE_SERVICE_ACCOUNT_STAYINN_3A715
```

This secret should be stored in:

```text
GitHub Repository
    → Settings
    → Secrets and variables
    → Actions
```

Never commit the Firebase service-account JSON file to the repository.

---

## Environment Variables

Vite environment variables are required during the build process.

For local development, use:

```text
.env
```

For GitHub Actions, required environment variables should be configured as GitHub Actions secrets or variables when the application requires them during the production build.

Example variable names:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Do not expose private credentials or commit sensitive environment files.

---

## Deployment Workflow

For normal production deployment:

```bash
git add .
git commit -m "Update application"
git push origin main
```

The GitHub Actions workflow will then:

```text
Push to main
     |
     v
GitHub Actions
     |
     v
npm ci
     |
     v
npm run build
     |
     v
Firebase Hosting
```

---

## Deployment Checklist

Before deploying, verify:

* [ ] `npm install` completes successfully
* [ ] `npm run build` completes successfully
* [ ] Firebase CLI is authenticated
* [ ] Firebase project is correct
* [ ] Environment variables are configured
* [ ] Firebase Hosting configuration is correct
* [ ] GitHub Actions secrets are available
* [ ] Changes are pushed to `main`

---

## Troubleshooting

### Build fails

Run:

```bash
npm run build
```

Fix the reported error before deploying.

### Firebase CLI is not authenticated

Run:

```bash
firebase login
```

Then verify:

```bash
firebase projects:list
```

### Wrong Firebase project

Check:

```bash
firebase use
```

The expected project is:

```text
stayinn-3a715
```

### Deployment fails

Try a clean production build:

```bash
npm install
npm run build
firebase deploy --only hosting
```

### GitHub Actions deployment fails

Open:

```text
GitHub Repository
    → Actions
    → Select failed workflow
```

Review the failed step and its error message.

Common causes include:

* Missing GitHub secret
* Invalid Firebase service account
* Build failure
* Missing environment variables
* Incorrect Firebase project configuration

### Website deploys but shows a blank page

First test the production build locally:

```bash
npm run build
npm run preview
```

If the preview works but Firebase shows a blank page, check the browser console for runtime errors and verify that all required production environment variables are available during the build.

---

## Deployment Files

| File                                                  | Purpose                        |
| ----------------------------------------------------- | ------------------------------ |
| `firebase.json`                                       | Firebase Hosting configuration |
| `.firebaserc`                                         | Firebase project configuration |
| `.github/workflows/firebase-hosting-main.yml`         | Production deployment          |
| `.github/workflows/firebase-hosting-pull-request.yml` | Pull request preview           |
| `vite.config.js`                                      | Vite build configuration       |
| `.env.dist`                                           | Environment variable reference |

---

## Production

**Project:** `stayinn-3a715`

**Hosting:** Firebase Hosting

**Live Website:**
https://stayinn-3a715.web.app

---

## Related Documentation

* [Setup Guide](SETUP.md)
* [Usage Guide](USAGE.md)
* [Main README](../README.md)
