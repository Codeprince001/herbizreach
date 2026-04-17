# HerBizReach Frontend

The HerBizReach frontend is a modern Next.js application powering:

- a conversion-focused marketing landing page,
- role-based dashboards for business owners and admins,
- public storefronts optimized for sharing and SEO,
- and real-time buyer-to-seller messaging.

It is built for women-led SMEs across Africa to create visibility, share products quickly, and convert buyer interest through WhatsApp and in-app chat.

## Product Features

### 1) Public Experience (Visitors and Buyers)
- Branded public store pages at `store/[slug]`.
- Product detail pages at `store/[slug]/products/[productId]`.
- Storefront chat widget for direct conversations with sellers.
- WhatsApp-ready sharing and communication workflows.
- Search-friendly metadata (OpenGraph, Twitter, JSON-LD) for rich link previews.
- Dynamic per-store manifest for installable store pages (PWA support).

### 2) Owner Experience (SME Sellers)
- Owner dashboard with engagement insights and trend indicators.
- Product management: create, edit, delete, publish/unpublish, duplicate.
- AI-assisted copywriting for product descriptions and captions.
- Store customization (tagline, description, accent color, chat visibility).
- Shareable store link and quick copy-to-clipboard actions.
- Leads and analytics views for growth tracking.
- Real-time inbox for customer conversations.

### 3) Admin Experience (Platform Operations)
- Platform-wide metrics dashboard (users, products, engagement, activity).
- Admin modules for users, products, conversations, and audit views.
- Role-gated admin layout and navigation.

### 4) Authentication and Access
- Login, registration, and forgot password flows.
- Client-side auth state with persisted token/session synchronization.
- Role-aware route handling for owner/admin views.

## Frontend Architecture

### Framework and Core Patterns
- **Framework:** Next.js App Router (React + TypeScript).
- **Data Fetching / Cache:** TanStack React Query.
- **State Management:** Zustand (auth, theme, chat state slices).
- **Forms and Validation:** React Hook Form + Zod.
- **Styling:** Tailwind CSS v4 with reusable UI primitives.
- **UX and Animation:** Framer Motion, Sonner toasts, Lucide icons.

### Communication Layer
- REST API communication via Axios clients (public and authenticated).
- Real-time communication via Socket.IO client for chat events.
- API base URL resolved from environment configuration.

### SEO and Discoverability
- Root metadata with locale-focused defaults.
- Store/product dynamic metadata generation.
- Canonical URLs, OpenGraph images, Twitter cards, and robots setup.
- Website JSON-LD injection for structured data.

### Installability (PWA)
- Minimal service worker registration for supported browsers.
- Dynamic manifest route per store slug for add-to-home behavior.

## Project Structure

```text
frontend/
  app/
    (auth)/                 # login/register/forgot-password flows
    (owner)/                # owner dashboard, products, chat, analytics, settings
    admin/                  # admin dashboard and management modules
    store/[slug]/           # public store and product pages
    layout.tsx              # root layout and providers mount
    robots.ts               # robots policy
    sitemap.ts              # sitemap generation
  components/
    admin/                  # admin charts/tables/sidebar
    analytics/              # owner analytics components
    auth/                   # auth presentation wrappers
    chat/                   # chat widget and inbox
    layout/                 # top bar/sidebar/navigation/theme toggle
    product/                # product cards/uploaders/AI panel
    seo/                    # JSON-LD and metadata helpers
    shared/                 # reusable app-level UI states
    store/                  # storefront renderers/PWA helpers
    ui/                     # design system primitives
  hooks/                    # domain hooks (auth, products, chat, analytics...)
  lib/                      # axios/socket/seo/utilities
  stores/                   # Zustand stores
  public/                   # static assets + service worker
```

## Local Development Setup

### Prerequisites
- Node.js 20+ (recommended)
- npm 10+ (or yarn/pnpm/bun if preferred)
- Running HerBizReach backend API

### Install Dependencies
```bash
npm install
```

### Configure Environment
Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://herbizreach-backend.onrender.com
NEXT_PUBLIC_APP_URL=https://herbizreach.vercel.app
```

- `NEXT_PUBLIC_API_URL`: Backend base URL used by API and socket clients.
- `NEXT_PUBLIC_APP_URL`: Canonical frontend URL used for metadata and generated links.

### Run the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start local development server.
- `npm run build` - create optimized production build.
- `npm run start` - run production server from build output.
- `npm run lint` - run ESLint checks.

## Backend Contract Expectations

The frontend expects backend support for:

- authentication and role-aware user payloads,
- owner product CRUD and publication toggles,
- analytics, leads, and admin metrics endpoints,
- public store/product retrieval by business slug,
- chat conversation/message APIs and Socket.IO namespace/events,
- file hosting for product/store media (for example Cloudinary).

If backend host, port, or CORS policies change, update `NEXT_PUBLIC_API_URL` accordingly.

## Deployment Notes

- Set production values for both `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL`.
- Ensure allowed image hosts in `next.config.ts` cover your media providers.
- Build with `npm run build` and serve with `npm run start` (or deploy on Vercel).
- Confirm metadata URLs, social preview images, sitemap, and robots behavior in production.

## Quality and Contribution Guidance

- Keep components domain-focused and reusable.
- Co-locate API interaction logic in hooks/lib, not in presentational components.
- Validate all user input with Zod-backed forms.
- Preserve accessibility patterns (labels, focus states, semantic controls).
- Run `npm run lint` before opening a PR.

---

For product context, start with the landing page in `app/page.tsx`, then follow owner flows in `app/(owner)` and public storefront flows in `app/store/[slug]`.
# HerBizReach Frontend

The HerBizReach frontend is a modern Next.js application powering:

- a conversion-focused marketing landing page,
- role-based dashboards for business owners and admins,
- public storefronts optimized for sharing and SEO,
- and real-time buyer-to-seller messaging.

It is built for women-led SMEs across Africa to create visibility, share products quickly, and convert buyer interest through WhatsApp and in-app chat.

## Product Features

### 1) Public Experience (Visitors and Buyers)
- Branded public store pages at `store/[slug]`.
- Product detail pages at `store/[slug]/products/[productId]`.
- Storefront chat widget for direct conversations with sellers.
- WhatsApp-ready sharing and communication workflows.
- Search-friendly metadata (OpenGraph, Twitter, JSON-LD) for rich link previews.
- Dynamic per-store manifest for installable store pages (PWA support).

### 2) Owner Experience (SME Sellers)
- Owner dashboard with engagement insights and trend indicators.
- Product management: create, edit, delete, publish/unpublish, duplicate.
- AI-assisted copywriting for product descriptions and captions.
- Store customization (tagline, description, accent color, chat visibility).
- Shareable store link and quick copy-to-clipboard actions.
- Leads and analytics views for growth tracking.
- Real-time inbox for customer conversations.

### 3) Admin Experience (Platform Operations)
- Platform-wide metrics dashboard (users, products, engagement, activity).
- Admin modules for users, products, conversations, and audit views.
- Role-gated admin layout and navigation.

### 4) Authentication and Access
- Login, registration, and forgot password flows.
- Client-side auth state with persisted token/session synchronization.
- Role-aware route handling for owner/admin views.

## Frontend Architecture

### Framework and Core Patterns
- **Framework:** Next.js App Router (React + TypeScript).
- **Data Fetching / Cache:** TanStack React Query.
- **State Management:** Zustand (auth, theme, chat state slices).
- **Forms and Validation:** React Hook Form + Zod.
- **Styling:** Tailwind CSS v4 with reusable UI primitives.
- **UX and Animation:** Framer Motion, Sonner toasts, Lucide icons.

### Communication Layer
- REST API communication via Axios clients (public and authenticated).
- Real-time communication via Socket.IO client for chat events.
- API base URL resolved from environment configuration.

### SEO and Discoverability
- Root metadata with locale-focused defaults.
- Store/product dynamic metadata generation.
- Canonical URLs, OpenGraph images, Twitter cards, and robots setup.
- Website JSON-LD injection for structured data.

### Installability (PWA)
- Minimal service worker registration for supported browsers.
- Dynamic manifest route per store slug for add-to-home behavior.

## Project Structure

```text
frontend/
  app/
    (auth)/                 # login/register/forgot-password flows
    (owner)/                # owner dashboard, products, chat, analytics, settings
    admin/                  # admin dashboard and management modules
    store/[slug]/           # public store and product pages
    layout.tsx              # root layout and providers mount
    robots.ts               # robots policy
    sitemap.ts              # sitemap generation
  components/
    admin/                  # admin charts/tables/sidebar
    analytics/              # owner analytics components
    auth/                   # auth presentation wrappers
    chat/                   # chat widget and inbox
    layout/                 # top bar/sidebar/navigation/theme toggle
    product/                # product cards/uploaders/AI panel
    seo/                    # JSON-LD and metadata helpers
    shared/                 # reusable app-level UI states
    store/                  # storefront renderers/PWA helpers
    ui/                     # design system primitives
  hooks/                    # domain hooks (auth, products, chat, analytics...)
  lib/                      # axios/socket/seo/utilities
  stores/                   # Zustand stores
  public/                   # static assets + service worker
```

## Local Development Setup

### Prerequisites
- Node.js 20+ (recommended)
- npm 10+ (or yarn/pnpm/bun if preferred)
- Running HerBizReach backend API

### Install Dependencies
```bash
npm install
```

### Configure Environment
Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://herbizreach-backend.onrender.com
NEXT_PUBLIC_APP_URL=https://herbizreach.vercel.app
```

- `NEXT_PUBLIC_API_URL`: Backend base URL used by API and socket clients.
- `NEXT_PUBLIC_APP_URL`: Canonical frontend URL used for metadata and generated links.

### Run the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start local development server.
- `npm run build` - create optimized production build.
- `npm run start` - run production server from build output.
- `npm run lint` - run ESLint checks.

## Backend Contract Expectations

The frontend expects backend support for:

- authentication and role-aware user payloads,
- owner product CRUD and publication toggles,
- analytics, leads, and admin metrics endpoints,
- public store/product retrieval by business slug,
- chat conversation/message APIs and Socket.IO namespace/events,
- file hosting for product/store media (for example Cloudinary).

If backend host, port, or CORS policies change, update `NEXT_PUBLIC_API_URL` accordingly.

## Deployment Notes

- Set production values for both `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL`.
- Ensure allowed image hosts in `next.config.ts` cover your media providers.
- Build with `npm run build` and serve with `npm run start` (or deploy on Vercel).
- Confirm metadata URLs, social preview images, sitemap, and robots behavior in production.

## Quality and Contribution Guidance

- Keep components domain-focused and reusable.
- Co-locate API interaction logic in hooks/lib, not in presentational components.
- Validate all user input with Zod-backed forms.
- Preserve accessibility patterns (labels, focus states, semantic controls).
- Run `npm run lint` before opening a PR.

---

For product context, start with the landing page in `app/page.tsx`, then follow owner flows in `app/(owner)` and public storefront flows in `app/store/[slug]`.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
#   h e r b i z r e a c h 
 
 