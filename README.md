# Japan Trip Planner 🗾

A beautiful, fully static Japan trip planning website built with React + Vite + Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.

## ✨ Features

- **3-Step Wizard** — Duration, interests, travel style selection
- **Smart Itinerary Engine** — Generates day-by-day plans based on your preferences
- **Interactive Map** — Leaflet map with route visualization
- **Cost Breakdown** — Pie/bar charts with JPY + USD estimates
- **12+ Cities** — From Tokyo to Okinawa
- **80+ Activities** — Tagged by interest category
- **Cherry Blossom Rain** — Animated background effect
- **Fully Responsive** — Mobile-friendly design

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🏗️ Build & Deploy

```bash
npm run build
```

Deployed automatically to GitHub Pages on every push to `main` via GitHub Actions.

## 🛠️ Tech Stack

- React 18 + Vite
- Tailwind CSS v3
- React Router v6
- Framer Motion
- React Leaflet
- Recharts
- Lucide React

## 📊 Data

All data is static JSON — no API keys required:
- `src/data/cities.json` — 12 destinations
- `src/data/activities.json` — 32 curated activities
- `src/data/transport.json` — Train/flight routes with costs

## 🌐 Live Site

Visit: `https://<your-username>.github.io/japan-trip-planner/`
