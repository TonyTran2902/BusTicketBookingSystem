# Database

Utility scripts for creating the MongoDB structure and seeding example data for AWAD.

## Prerequisites
- MongoDB connection string in `MONGODB_URI` (e.g. `mongodb://localhost:27017/awad`).
- Node.js (same version you use for the server) with dependencies already installed in `server/` (`bcryptjs`, `mongoose`, etc).

## Scripts

- `seed.mjs`: creates indexes for the `users` collection and upserts example users (admin and regular).

## Usage

From the repo root:
```bash
MONGODB_URI="mongodb://localhost:27017/awad" node Database/seed.mjs
```

The script is idempotent; re-running will update the sample users if they already exist. You can change the sample emails/passwords inside `seed.mjs` as needed.
