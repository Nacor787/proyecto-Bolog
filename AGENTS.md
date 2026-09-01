# AGENTS.md

Two independent apps, no shared tooling: FastAPI backend (`app/`) + Vite frontend (`frontend/`). No git repo, no README, no tests, no lint config. Company content lives in `docs/informacion.txt`. Codebase comments/naming are Spanish.

## Backend (`app/`)

- Run from **inside `app/`**: `python run.py` (uvicorn reload on port 8000). `run.py` runs `main:app`; `main.py` adds the repo root to `sys.path`, so always start uvicorn with `app/` as the CWD.
- venv is at `app/.venv`; deps in `app/requirements.txt`. Config comes from `app/.env` (not committed): `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ALGORITHM`, `ALLOWED_ORIGINS`, `HOST`, `PORT`.
- PostgreSQL required (default `postgresql://postgres:postgres@localhost:5432/bolog_db`). Tables auto-create on startup via `Base.metadata.create_all` — **no Alembic/migrations**. Startup also seeds the `admin` role and user `nacor`/`nacor`.
- APScheduler background job (every 12h) scrapes the BCB USD/BOB rate from `https://www.bcb.gob.bo/` (`app/scraper/bcb_scraper.py`); startup also backfills today's rate. Needs internet; returns `None` on failure.
- Auth: custom PyJWT in `app/auth/jwt_handler.py` (1h access / 7d refresh). `app/middleware/auth.py` provides `verify_token`, `get_current_user`, `require_role(["admin"])`; admin endpoints depend on the latter.
- Models/schemas/routes use **Spanish naming** (e.g. `Noticia`, `es_destacado`, `fecha_publicacion`). `app/models/news.py` is deprecated — use `noticia.py`. `hero_image` exists only as stale `__pycache__`; ignore it.
- Noticia enforces "one featured at a time" at the app layer; slugs are auto-generated and must stay unique. News images are **uploaded to Cloudinary** (`app/services/cloudinary_service.py`); `NoticiaImagen.image_path` stores the `secure_url`, not a local path. Credentials in `app/.env`: `CLOUDINARY_CLOUD_NAME`/`API_KEY`/`API_SECRET`. Backfill script: `python -m app.scripts.migrate_cloudinary` (run from repo root; `--remove-local` deletes source files).
- Route prefixes: `/api/auth`, `/api/noticias`, `/api/exchange-rate`, `/api/roles`, `/api/users`, `/api/categories`; `tracking.py` is mounted at bare `/tracking` and returns **dummy random data**.

## Frontend (`frontend/`)

- Vanilla JS ES modules with hash routing in `src/main.js` (`#news/...`, `#login`, `#dashboard`, `#tracking`) — **not React/Vue**. Pages/components are exported template-literal strings plus `init*()` functions wired up in `main.js`.
- Commands: `npm run dev` (Vite, port **3000**, not 5173), `npm run build`, `npm run preview`. Vite proxies `/api` and `/uploads` to `127.0.0.1:8000`, so the backend must be running.
- API calls use relative `fetch('/api/...')` (axios is a dep but unused). Auth tokens live in `localStorage` as `bolog_access_token` / `bolog_refresh_token` and are sent as `Authorization: Bearer ...`.
- `index.html` loads heavy libs from CDN and code relies on the globals: three.js **r134**, Vanta (`window.VANTA`), Lenis (`window.Lenis`), AOS (`window.AOS`), Quill 1.3.6, Flowbite. Don't "modernize"/vendor them without checking all consumers.
- i18n via i18next (default `es`); user-facing strings marked `data-i18n` must be added to **both** `src/locales/es.json` and `en.json`.
- Design tokens (colors `primary`/`brand`/`info`, font Inter) are in `tailwind.config.js`. Tailwind content globs include `src/**/*.js`.
- `frontend/dist/` is build output — don't edit.