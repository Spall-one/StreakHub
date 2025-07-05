# Streak CMS

This directory contains a Strapi project providing a headless CMS for the Streak streaming platform. The CMS defines three collection types:

- **Streamer** – reusable streamer profiles
- **Canale** – themed channels
- **Trasmissione** – scheduled events linked to a channel and a streamer

## Custom API

- `GET /api/live/:slug` – returns the current transmission and upcoming slots for a given channel
- `GET /api/canali` – list of channels
- `GET /api/streamer` – list of streamers

`Trasmissione` entries are validated to avoid overlapping time slots on the same channel.

Run the CMS in development mode:

```bash
cd backend
npm install
npm run develop
```
