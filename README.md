# Cursor Template

A production-ready starter template built with **Next.js 14**, **Tailwind CSS**, and **TypeScript** — pre-configured for use with [Cursor](https://cursor.sh).

## Features

- ⚡ **Next.js 14** — App Router, Server Components, streaming
- 🎨 **Tailwind CSS** — utility-first styling with CSS variables for theming
- 🛡️ **TypeScript** — strict mode enabled throughout
- 🤖 **.cursorrules** — AI-aware project conventions baked in
- 🧩 **UI Components** — Button, Card, Input, Badge (all typed)
- 🪝 **Custom Hooks** — `useLocalStorage`, `useMediaQuery`
- 📄 **Pages** — Home, About, Dashboard, 404
- 🌙 **Dark mode ready** — via CSS variables

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
# edit .env.local with your values
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout (Navbar + Footer)
│   ├── page.tsx          # Home page
│   ├── about/page.tsx    # About page
│   ├── dashboard/page.tsx# Dashboard page
│   └── not-found.tsx     # 404 page
├── components/
│   ├── ui/               # Base design-system components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── badge.tsx
│   ├── navbar.tsx        # Site-wide navigation
│   └── footer.tsx        # Site-wide footer
├── hooks/
│   ├── use-local-storage.ts
│   └── use-media-query.ts
├── lib/
│   └── utils.ts          # cn(), sleep(), capitalize(), formatCompact()
└── styles/
    └── globals.css       # Tailwind base + CSS variables
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Customisation

### Colors
Edit the `brand` palette in `tailwind.config.ts` and the CSS variables in `src/styles/globals.css`.

### Fonts
Swap out `Geist` / `Geist_Mono` in `src/app/layout.tsx` for any Google Font.

### Components
All UI components live in `src/components/ui/` and use the `cn()` helper for class merging. Extend freely.

### Cursor Rules
`.cursorrules` teaches Cursor your conventions. Update it as your project evolves.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
# Chuck-LoCascio-website
