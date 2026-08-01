# AlfaHost frontend

Next.js static marketing site for [AlfaHost](https://github.com), configured for **GitHub Pages**.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en/`).

Languages: **EN** `/en/`, **PL** `/pl/`, **RU** `/ru/` — switcher in the header.

## Production build (static export)

```bash
npm run build
```

Output is written to `out/` (ready for any static host).

To preview with a GitHub Pages-style base path:

```bash
# PowerShell
$env:NEXT_PUBLIC_BASE_PATH="/your-repo-name"; npm run build
npx serve out
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (or use this folder as the repo root).
2. In **Settings → Pages**, set Source to **GitHub Actions**.
3. Push to `main` (or `master`) — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

The workflow sets `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>` for project sites, or empty for `*.github.io` user/org sites.

If this folder lives inside a monorepo, either:
- make `frontend` its own GitHub repo, or
- move the workflow to the monorepo root and set `defaults.run.working-directory: frontend` plus artifact path `frontend/out`.
