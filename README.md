# Viatours Voyage

Modern full-stack travel platform monorepo.

## Repository layout

```text
viatours-voyage/
├── client/                 # Next.js 16 + React frontend
│   ├── public/             # Static assets and local fonts
│   └── src/
│       ├── app/            # App Router routes and layouts
│       ├── components/     # Reusable UI primitives and layout components
│       │   ├── helper/     # Frontend data/image helpers
│       │   ├── layout/     # Navbar, Footer and global layout UI
│       │   ├── shared/     # Reusable product components/cards
│       │   ├── style/      # Design tokens and shared visual rules
│       │   └── ui/         # Low-level UI primitives
│       ├── sections/       # Page-specific composed sections
│       ├── context/        # React context providers
│       ├── hooks/          # Reusable React hooks
│       ├── lib/            # Technical libraries and integrations
│       ├── services/       # API/service layer
│       └── store/          # Client state management
├── server/                # MERN/Express backend — intentionally scaffolded
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   └── tests/
├── AGENT.md
├── ARCHITECTURE.md
├── COMPONENTS.md
├── CRO.md
├── DESIGN_SYSTEM.md
├── DEVELOPMENT.md
├── FRONTEND_BACKEND_CONTRACT.md
├── MARKETING_CONTENT.md
├── PROJECT_RULES.md
└── UI_UX.md
```

## Current stack

- Frontend: Next.js 16, React 19, Tailwind CSS 4, Swiper, React Icons
- Backend target: Node.js, Express, MongoDB, Mongoose
- Architecture: client/server monorepo with a clean frontend API boundary

## Run the client

```bash
cd client
npm install
npm run dev
```

Or from the repository root:

```bash
npm run dev
```

## Build and lint

```bash
npm run build
npm run lint
```

## Source-of-truth documentation

Before adding or changing UI, read `AGENT.md` and then the relevant design/architecture document. These files are intentionally kept at the repository root so agentic coding tools can use them as project-wide instructions.

## Important rule

Do not introduce one-off colors, typography scales, spacing conventions, or component patterns when an existing project token or reusable component already covers the requirement.
