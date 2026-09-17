# Fandom MCU TCG

A fan-made MCU trading card gallery built with React, Vite and Tailwind CSS.

The app presents a base roster of MCU character cards with themed artwork, stats, passive traits, active abilities, tags and flavor text. It is currently a browsable card table for shaping the early rules and character identity of a larger fandom TCG concept.

Live demo: [https://leegrobler.github.io/fandom-mcu-tcg/](https://leegrobler.github.io/fandom-mcu-tcg/)

## Features

- Responsive card grid for the current base roster
- Character-specific color themes, HP and combat stats
- Hover and focus tooltips with descriptions, passives, active abilities, tags and flavor text
- Shared base-rule notes for draft, deployment, combat and card inheritance
- GitHub Pages deployment via GitHub Actions

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- lucide-react icons
- GitHub Pages

## Getting Started

Install dependencies:

```bash
npm ci
```

Run the local dev server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Project Structure

```text
src/
  App.jsx                 Main page and card grid
  App.css                 Tailwind import and global styles
  components/Card.jsx     Character card presentation and tooltip behavior
  data/characters.json    Current MCU base-card roster
  data/baseRules.js       Early rules reference for the card system
```

## Editing Cards

Card content lives in `src/data/characters.json`. Each character includes:

- Identity fields such as `name`, `subtitle`, `character` and `lineageId`
- Theme colors used by the card frame
- Core stats: `hp`, `power`, `defense` and `speed`
- Passive abilities and one optional active ability
- Tags, flavor text and image URL

After changing card data, run `npm run dev` to review the card layout and tooltip content.

## Deployment

The Vite base path is configured as `/fandom-mcu-tcg/` in `vite.config.js` for GitHub Pages. The workflow in `.github/workflows/deploy.yml` builds the app with Node 22 and deploys `dist/` whenever changes are pushed to `main`, or when the workflow is run manually.

## Disclaimer

This is an unofficial fan project. Marvel, MCU character names and related imagery belong to their respective rights holders.
