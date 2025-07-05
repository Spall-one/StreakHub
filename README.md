# StreakHub

This repository contains the initial prototype for **Streak**, a themed live streaming platform. The project is split into two main parts:

- `frontend/` – a Next.js application with Tailwind CSS and Google/Twitch authentication via NextAuth.
- `backend/` – placeholder for a future headless CMS implementation (e.g. Strapi).

The frontend currently demonstrates channel selection, dynamic player updates based on the schedule, and simple authentication hooks. Environment variables for authentication providers can be configured in `.env.example`.

## Development

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000.
