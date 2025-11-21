# AWAD Travel Dashboard

Full-stack dashboard for AWAD Travel with protected routes, Google SSO, and email/password login. Includes user and admin dashboards plus database seed scripts.

## Features
- Auth: Google OAuth (SSO) and email/password with JWT httpOnly cookies.
- Protected routes with role-based access (user/admin).
- Light/dark theme toggle on all pages, including sign-in.
- User dashboard: upcoming trips cards with actions and CTA.
- Admin dashboard: metrics cards, trend placeholder, top routes, and recent bookings.
- Database seed script for example admin/user accounts.

## Tech Stack
- Client: React 18, Vite, React Router, Axios, @react-oauth/google.
- Server: Node.js, Express, Mongoose, JWT, bcryptjs.
- Database: MongoDB.

## Setup
Prereqs: Node.js, npm, MongoDB instance, Google OAuth client (for SSO).

### Server
```bash
cd server
npm install
```
Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/awad
JWT_SECRET=choose-a-strong-secret
CLIENT_ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=your-google-client-id
```
Run API:
```bash
npm start
```

### Client
```bash
cd client
npm install
```
Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```
Run dev server:
```bash
npm run dev
```

## Database Seed
Adds sample admin/user accounts (emails: `admin@example.com` / `user@example.com`).
```bash
MONGODB_URI="mongodb://localhost:27017/awad" node Database/seed.mjs
```
Passwords are defined in `Database/seed.mjs`; rerun anytime to update.

## Admin Sign In
- Email: `admin@admin.com`
- Password: `admin@admin.com`
Use these credentials on the sign-in page to access the admin dashboard.

## Google OAuth Setup
1. In Google Cloud Console, create a Web Client credential.  
   - Authorized JavaScript origins: your Vite URL (e.g., `http://localhost:5173`).  
   - Authorized redirect URI: `http://localhost:5173`.
2. Set the client ID in both `server/.env` (`GOOGLE_CLIENT_ID`) and `client/.env` (`VITE_GOOGLE_CLIENT_ID`).
3. Ensure `CLIENT_ORIGIN` in `server/.env` matches the client URL.

## Auth Flow Summary
- Google: `GoogleLogin` gets an ID token → POST `/auth/google` → server verifies token, upserts user, sets httpOnly JWT cookie.
- Email/password: POST `/auth/register` or `/auth/login` → server hashes/validates password and sets cookie.
- `AuthProvider` calls `/auth/me` on load and protects routes; admin pages check `role: admin`.

## Endpoints
- `POST /auth/register` – email/password sign-up.
- `POST /auth/login` – email/password login.
- `POST /auth/google` – Google SSO.
- `POST /auth/logout` – clear auth cookie.
- `GET /auth/me` – current user (auth required).
- `GET /api/dashboard` – user dashboard message (auth required).
- `GET /api/admin/metrics` – admin-only data (auth + admin role).

## Notes
- Diagrams: `user-dashboard.svg` / `admin-dashboard.svg` capture the target layouts.
- Build locally before deployment: `npm run build` inside `client`. 
