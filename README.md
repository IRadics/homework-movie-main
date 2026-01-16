# Házifeladat - Movie "Feliratkozás"

Full-stack házifeladat projekt Nuxt 3 + NestJS + Turborepo monorepo struktúrával.

**A feladat leírása a [HOMEWORK.md](HOMEWORK.md) fájlban található.**

## Projekt struktúra

```
├── apps/
│   ├── web/              # Nuxt 3 frontend (port 3000)
│   └── api/              # NestJS backend (port 3001)
├── packages/
│   └── types/            # Közös TypeScript típusok
├── HOMEWORK.md           # Házifeladat leírás
├── turbo.json            # Turborepo konfiguráció
└── pnpm-workspace.yaml   # pnpm workspace definíció
```

## Követelmények

- Node.js >= 24
- pnpm >= 9

## Telepítés

```bash
# pnpm telepítése (ha még nincs)
npm install -g pnpm

# Függőségek telepítése
pnpm install
```

## Fejlesztés

```bash
# Mindkét alkalmazás indítása egyszerre
pnpm dev

# Csak a frontend indítása
pnpm --filter web dev

# Csak a backend indítása
pnpm --filter api dev
```

## Build

```bash
# Összes csomag build-elése
pnpm build
```

## Hasznos parancsok

```bash
# TypeScript ellenőrzés
pnpm typecheck

# Új függőség hozzáadása egy csomaghoz
pnpm --filter web add <package-name>
pnpm --filter api add <package-name>
```

## Portok

- **Frontend (Nuxt)**: http://localhost:3000
- **Backend (NestJS)**: http://localhost:3001

## Technológiák

- **Turborepo** - Monorepo build rendszer
- **pnpm** - Csomagkezelő
- **Nuxt 3** - Vue.js framework
- **NestJS** - Node.js backend framework
- **Pinia** - Vue state management
- **PrimeVue** - UI komponens könyvtár
- **TypeScript** - Típusos JavaScript
