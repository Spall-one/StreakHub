# StreakHub

This repository contains the initial prototype for **Streak**, a themed live streaming platform. The project is split into two main parts:

- `frontend/` – a Next.js application with Tailwind CSS and Google/Twitch authentication via NextAuth.
- `backend/` – Strapi headless CMS providing channel, streamer and transmission management.

The frontend currently demonstrates channel selection, dynamic player updates based on the schedule, and simple authentication hooks. Environment variables for authentication providers can be configured in `.env.example`.

## Development

Start both the frontend and backend together from the repository root. The `dev` script uses `dev.js` to launch both apps and will install sub-project dependencies on first run:

```bash
npm install
# optional: install dependencies for each project explicitly
npm run setup
# start the development servers and open the browser
npm run dev

On Windows you can simply double click `start.bat`. The script installs all dependencies on first run, starts both servers and keeps the console window open so you can read any messages. When the servers are ready your default browser opens automatically.

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

Additional endpoints are available to import a schedule via Excel. The template is generated dynamically by the backend:

- `GET /api/palinsesto/template` – download the Excel template.
- `POST /api/palinsesto/upload` – upload the filled template.

## Testing

Run unit tests for the frontend and backend with:

```bash
cd frontend && npm install && npm test
```

```bash
cd backend && npm install && npm test
```
