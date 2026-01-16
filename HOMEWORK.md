## Cél

Egy egyszerű filmkereső alkalmazás elkészítése, ahol a felhasználók megtekinthetik a filmeket, megnézhetik a részleteiket, és jelezhetik érdeklődésüket egy adott film iránt.

## Technológiai stack

- **Frontend:** Nuxt 3, Vue 3, Pinia, PrimeVue
- **Backend:** NestJS, class-validator
- **API:** Használj bármilyen film API-t, például:
  - [Studio Ghibli API](https://ghibliapi.vercel.app/) - ingyenes, nem kell API kulcs
  - [TMDB API](https://developer.themoviedb.org/docs) - ingyenes, regisztráció után API kulcs szükséges
  - vagy bármilyen más publikus film API

## Meglévő kód

A projekt tartalmaz kész példákat, amiket mintaként használhatsz:

### Backend

**Cinemas modul** (`apps/api/src/cinemas/`) - NestJS modul felépítés példa:

```
GET /cinemas   →  visszaadja a mozik listáját
POST /cinemas  →  új mozi hozzáadása (DTO validációval)
```

A `dto/create-cinema.dto.ts` fájl mutatja a `class-validator` használatát.

### Frontend

- **Cinemas store** (`stores/cinemas.ts`) - Pinia store API hívással
- **CinemaMarquee komponens** (`components/CinemaMarquee.vue`) - store használata komponensben

Ezeket használd mintának a Movies modul és frontend elkészítéséhez!

## Feladatok

### 1. Backend (NestJS)

#### A) Film API proxy endpointok

A NestJS szerver hívja a külső API-t és normalizált választ ad vissza.

| Endpoint              | Leírás         | Response mezők                                        |
| --------------------- | -------------- | ----------------------------------------------------- |
| `GET /movies/popular` | Filmek listája | `id`, `title`, `releaseDate`, `posterUrl`             |
| `GET /movies/:id`     | Film részletek | `id`, `title`, `overview`, `releaseDate`, `posterUrl` |

#### B) "Feliratkozás" endpoint

| Endpoint                    | Leírás                            |
| --------------------------- | --------------------------------- |
| `POST /movies/:id/interest` | Érdeklődés jelzése egy film iránt |

**Request body (DTO):**

```json
{
  "email": "string", // kötelező, email formátum
  "ticketCount": "number", // kötelező, 1-10 között
  "cinemaId": "string" // kötelező, valid mozi ID (GET /cinemas-ból)
}
```

**Elvárások:**

- `class-validator` DTO validáció
- Hibás input esetén 400-as hiba megfelelő hibaüzenetekkel
- Siker esetén: log kiírása (`console.log` vagy pino) és `{ ok: true }` response

**Bónusz (nem kötelező):**

- Email normalizálás (trim + lowercase)
- `ticketCount` automatikus number transform

### 2. Frontend (Nuxt 3)

#### Oldalak

| Route        | Leírás                                  |
| ------------ | --------------------------------------- |
| `/`          | Filmek listája                          |
| `/movie/:id` | Film részletező oldal + érdeklődés form |

#### Film részletező oldal tartalma

- Film címe, leírása, megjelenési dátuma
- Poszter (opcionális)
- Érdeklődés form:
  - Email input
  - Jegyszám input (1-10)
  - Mozi választó (dropdown a `/cinemas` endpoint alapján)
  - "Érdekel" gomb

#### UX elvárások

- Loading state (lista és részletek betöltésekor)
- Error state (ha az API hívás sikertelen)
- Submit közben disabled állapot
- Sikeres beküldés: success üzenet megjelenítése
- Hibás input: validációs hibaüzenetek megjelenítése

## Projekt struktúra

```
apps/
├── api/                 # NestJS backend
│   └── src/
│       ├── cinemas/     # Cinemas modul (MINTA - kész)
│       │   ├── cinemas.constants.ts
│       │   ├── cinemas.controller.ts
│       │   ├── cinemas.service.ts
│       │   └── cinemas.module.ts
│       ├── movies/      # Movies modul (FELADAT - előkészítve)
│       │   ├── dto/
│       │   ├── movies.controller.ts
│       │   ├── movies.service.ts
│       │   └── movies.module.ts
│       ├── app.module.ts
│       └── main.ts
└── web/                 # Nuxt 3 frontend
    └── app/
        ├── components/
        │   └── CinemaMarquee.vue  # MINTA - kész
        ├── pages/
        │   ├── index.vue
        │   └── movie/[id].vue
        └── stores/
            ├── cinemas.ts  # Cinemas store (MINTA - kész)
            └── movies.ts   # Movies store (FELADAT - előkészítve)
packages/
└── types/               # Közös típusok (készen van)
```

## Indítás

```bash
# Függőségek telepítése
pnpm install

# Backend és frontend indítása
pnpm dev
```

A frontend a `http://localhost:3000`, a backend a `http://localhost:3001` címen érhető el.

## API példák

### Studio Ghibli API (ajánlott kezdőknek)

```bash
# Filmek listája
curl https://ghibliapi.vercel.app/films

# Film részletek
curl https://ghibliapi.vercel.app/films/{id}
```

### TMDB API

```bash
# Filmek listája (API kulcs szükséges)
curl "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY"

# Film részletek
curl "https://api.themoviedb.org/3/movie/{id}?api_key=YOUR_KEY"

# Poszter URL: https://image.tmdb.org/t/p/w500{poster_path}
```

## Értékelési szempontok

- Kód minősége és olvashatósága
- TypeScript típusok helyes használata
- Validáció megfelelő implementációja
- Error handling
- UX (loading/error state-ek kezelése)

## Hasznos linkek

- [NestJS dokumentáció](https://docs.nestjs.com/)
- [Nuxt 3 dokumentáció](https://nuxt.com/docs)
- [Pinia dokumentáció](https://pinia.vuejs.org/)
- [PrimeVue dokumentáció](https://primevue.org/)
- [class-validator](https://github.com/typestack/class-validator)
