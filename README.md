# Scripting Destiny

> **Know your nature. Time your moves.**  
> The official landing page and interactive Day Master calculator for [Scripting Destiny](https://scriptingdestiny.com).

Bridging classical Chinese astronomy and BaZi with modern personal strategy. Secular, practical, and designed to help leaders understand their natural operating system and time critical moves.

---

## Features

- **Instant Day Master Calculator**: Client-side astronomical calculation mapping birth moment to four pillars and personal archetype.
- **Five Elements Breakdown**: Dynamic element balance mapping (Wood, Fire, Earth, Metal, Water).
- **10-Year Timing Seasons**: Context for decision-making cycles without fortune-telling mysticism.
- **Early Access Waitlist**: Integrated waitlist capture for the full application.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite
- **Routing**: TanStack Router (Client SPA)
- **Styling**: Tailwind CSS v4 + OKLCH color system
- **Typography**: Fraunces & Manrope
- **Deployment**: GitHub Pages via GitHub Actions

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/WAILENGL/Scripting-Destiny-Landing-.git
cd Scripting-Destiny-Landing-

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Deployment

Pushes to `main` trigger the automated GitHub Actions pipeline in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), building the static SPA and publishing to [scriptingdestiny.com](https://scriptingdestiny.com).
