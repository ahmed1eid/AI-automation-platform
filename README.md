# Artificial Intelligence Platform

A modern AI workflow platform built with Next.js, TypeScript, NextAuth, and MongoDB.

## Tech Stack

- Next.js (App Router)
- TypeScript
- NextAuth (Credentials provider)
- MongoDB + Mongoose
- Tailwind CSS
- React Hook Form + Zod

## Features

- User registration and login
- Protected dashboard routes
- Session-based auth flow
- Theme toggle (light/dark/system)
- API route for account creation

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm
- A running MongoDB instance (local or Atlas)

## Environment Variables

Create a `.env.local` file in the project root:

```env
AUTH_SECRET=replace-with-a-long-random-secret
MONGODB_URI=mongodb://127.0.0.1:27017/artificial_intelligence_platform
```

Notes:
- `AUTH_SECRET` is required by NextAuth.
- `MONGODB_URI` must point to an available MongoDB server.

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm run start
```

## Useful Scripts

- `npm run dev` - start development server
- `npm run lint` - run ESLint
- `npm run build` - create production build
- `npm run start` - start production server

## Project Structure (Key Paths)

- `src/app/(auth)/login/page.tsx` - Login page
- `src/app/(auth)/register/page.tsx` - Register page
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth API handler
- `src/app/api/register/route.ts` - Registration API endpoint
- `src/app/dashboard/layout.tsx` - Dashboard layout
- `src/models/auth.ts` - NextAuth main config
- `src/models/auth.config.ts` - Shared auth callbacks/pages config
- `src/models/User.ts` - User schema/model
- `src/lib/db.ts` - MongoDB connection helper

## Troubleshooting

### `POST /api/register` returns `503`

This means database is unavailable.

Check:
- MongoDB is running
- `MONGODB_URI` in `.env.local` is correct
- App has been restarted after env changes

### `MissingSecret` auth error

Set `AUTH_SECRET` in `.env.local` and restart the server.

## License

Private project for internal development.
