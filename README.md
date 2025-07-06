# StreakHub

This repository contains the initial prototype for **Streak**, a themed live streaming platform. The project is split into two main parts:

- `frontend/` – a Next.js application with Tailwind CSS and Google/Twitch authentication via NextAuth.
- `backend/` – Strapi headless CMS providing channel, streamer and transmission management.

The frontend currently demonstrates channel selection, dynamic player updates based on the schedule, and simple authentication hooks. Environment variables for authentication providers can be configured in `.env.example`.

## Development

--- q0258z-codex/crea-eseguibile-per-backend-e-frontend
Start both the frontend and backend together from the repository root. The `dev` script uses `dev.js` to launch both apps and will install sub-project dependencies on first run:

```bash
npm install
# optional: install dependencies for each project explicitly
npm run setup
# start the development servers and open the browser
npm run dev

Start both the frontend and backend together using the helper script:

```bash
node dev.js
main
```

This launches the frontend on <http://localhost:3000> and the Strapi admin on
<http://localhost:1337/admin>. Refresh either page after modifying code to see
the changes.

### Run parts individually

```bash
cd frontend
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Backend CMS

```bash
cd backend
npm install
npm run develop
```

The backend exposes a custom endpoint `/api/live/:slug` to retrieve the current transmission for a channel.

## Testing

Run unit tests for the frontend and backend with:

```bash
cd frontend && npm install && npm test
```

```bash
cd backend && npm install && npm test
```
