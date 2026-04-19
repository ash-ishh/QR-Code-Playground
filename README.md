# Cool QR Codes Studio

A simple web app for generating clean, customizable QR codes from URLs or text.

The current version is intentionally minimal:
- no login
- no saved projects flow in the UI
- no dashboard complexity
- fast editing, preview, and export

## What it does

- Generate QR codes from:
  - URLs
  - plain text
- Preview changes live
- Apply theme presets
- Customize core styling:
  - colors
  - label / CTA text
  - module style
  - frame style
  - optional gradient and logo via advanced options
- Export as:
  - PNG
  - SVG
- Show scanability guidance before export

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- `qr-code-styling`

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## Project structure

- `app/` — Next.js app router files
- `components/` — UI and studio components
- `lib/` — defaults, types, scanability logic, storage helpers
- `docs/PRD.md` — product requirements document
- `TODO.md` — deferred work and future ideas

## Current product direction

This version is designed as a lightweight first experience:
- anonymous usage
- minimal controls by default
- advanced controls hidden behind disclosure
- preview-first workflow

## Future things to add

- Support for more QR content types:
  - Wi-Fi
  - email
  - phone number
  - vCard
  - event
- Add QR overlays on videos
- Add lightweight brand kits
- Add more export presets
- Add smarter scan recommendations

## Notes

- Local state is kept in browser storage for the current design session.
- `.gitignore` excludes `node_modules/` and `.next/`.
