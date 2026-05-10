# Skill: Add API Route

When adding a new API route to this project:

1. Create file at `app/api/<resource>/route.ts`
2. Always import Prisma from `@/lib/db`
3. Always import auth from `@/lib/auth` and check session for protected routes
4. Return shape:
   - Success: `NextResponse.json({ data: ... }, { status: 200 | 201 })`
   - Error: `NextResponse.json({ error: "message" }, { status: 400 | 401 | 403 | 404 | 500 })`
5. Wrap all DB calls in try/catch
6. Check role (`session.user.role === "ADMIN"`) for admin-only endpoints

Example skeleton:
```ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const data = await db.ticket.findMany()
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
```
