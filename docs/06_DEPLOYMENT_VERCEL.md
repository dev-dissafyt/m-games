# 06 - Turborepo & Vercel Deployment Configuration

## Monorepo Configuration (`turbo.json`)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## Vercel Project Mapping

Create three independent Vercel projects from the same GitHub repository:

| Project Name | Root Directory | Framework Preset | Production Domain |
| :--- | :--- | :--- | :--- |
| `m-games-web` | `apps/web` | Next.js | `m-games.co.za` |
| `m-games-admin` | `apps/admin` | Next.js | `admin.m-games.co.za` |
| `m-games-ops` | `apps/ops` | Next.js | `ops.m-games.co.za` |

---

## Environment Variables

### Shared Across All Projects
```env
# Supabase Postgres in eu-west-1 (Ireland)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"

# Supabase Storage & Public API
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[SERVICE-ROLE-KEY]"
```

### Admin Specific (`apps/admin`)
```env
ADMIN_AUTH_SECRET="[STRONG-RANDOM-SECRET]"
NEXT_PUBLIC_OWNER_PHONE="+27820000000"
```