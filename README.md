# Coding Test Web Frontend — Trifa

A React Router v7 application built with React 19, TypeScript, and Tailwind CSS v4.

## Commands

| Command             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Start the development server with HMR                 |
| `npm run build`     | Build the app for production                          |
| `npm run start`     | Serve the production build                            |
| `npm run typecheck` | Generate React Router types and run TypeScript checks |

## Folder Structure

```
.
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── icons.tsx
│   │   ├── LanguageDot.tsx
│   │   ├── Pagination.tsx
│   │   ├── RepoCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SearchFilters.tsx
│   │   └── SkeletonCard.tsx
│   ├── routes/              # Route modules
│   │   └── home.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── github.ts
│   ├── utils/               # Utility functions and constants
│   │   ├── constants.ts
│   │   └── format.ts
│   ├── welcome/             # Welcome page assets
│   │   ├── logo-dark.svg
│   │   ├── logo-light.svg
│   │   └── welcome.tsx
│   ├── app.css              # Global styles
│   ├── root.tsx             # Root layout component
│   └── routes.ts            # Route definitions
├── public/                  # Static assets
│   └── favicon.ico
├── Dockerfile
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

Coding Test Web Frontend - Trifa

Author: Josef Stein Butzke

AI: Claude CLI
