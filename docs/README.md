# M-Games Multi-Service Platform Spec

Comprehensive multi-application monorepo specification for **m-games.co.za**, custom pool table manufacturing, leasing, and automated dispatch operations.

---

## Architecture Overview

Built using **Turborepo** + **Next.js App Router** targeting **Vercel** with a shared PostgreSQL database and storage hosted via Supabase in `eu-west-1` (Ireland, POPIA/GDPR compliant).

```
m-games-platform/
├── apps/
│   ├── web/                     # m-games.co.za (Customer Facing, 3D Configurator, B2B Lease Portal)
│   ├── admin/                   # admin.m-games.co.za (Owner PWA, One-Tap Call Desk, Dispatch Approval)
│   └── ops/                     # ops.m-games.co.za (Field Technicians, Digital Leveling Cert, Rigging)
├── packages/
│   ├── database/                # Prisma ORM, migrations, Supabase connection pooler
│   ├── clearance-engine/        # 2D Canvas math, table clearance bounding logic, SAT collision
│   ├── ui/                      # Shared Tailwind CSS + Radix/shadcn component library
│   ├── config-eslint/           # Monorepo linting standards
│   └── config-typescript/       # Shared tsconfig
├── turbo.json
└── package.json
```

---

## Documents in This Archive

1. **`01_DATABASE_SCHEMA.md`**: Prisma database models, enums, relationship graph, and POPIA/Supabase configuration.
2. **`02_APP_WEB_SPEC.md`**: Specification for `m-games.co.za`, including the Three.js 3D configurator, B2B room clearance planner canvas, and ingress walk-through upload.
3. **`03_APP_ADMIN_SPEC.md`**: Specification for `admin.m-games.co.za` (Mobile PWA, click-to-call lead stream, video audit review, dispatch push).
4. **`04_APP_OPS_SPEC.md`**: Specification for `ops.m-games.co.za` (Installation field card, digital spirit level sign-off, customer hand-off).
5. **`05_CLEARANCE_ENGINE.md`**: Real-world pool table dimensions, 1.5m cue envelope formulas, and 2D canvas collision algorithms.
6. **`06_DEPLOYMENT_VERCEL.md`**: Monorepo configuration, environment variables, Vercel multi-project setup, and PWA installation guide.