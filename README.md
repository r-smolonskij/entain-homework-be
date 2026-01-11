# Entain Homework - Movies API

NestJS backend for a Entain homework task. It proxies data from TMDB.

## Setup

1. Install deps:

```bash
npm install
```

2. Create `.env`:

```
PORT=3001
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_tmdb_bearer_token
```

3. Run:

```bash
npm run start:dev
```

API base is `http://localhost:3001/api`.

Note: TMDB `discover` uses page-based pagination (no offset). Default response size is 20, so this API returns 20 movies per page instead of 10.

## Endpoints

- `GET /api/movies?page=1` - list movies (TMDB discover)
- `GET /api/movies/:id` - single movie details with `append_to_response=images`

## Tests

```bash
npm test
```
