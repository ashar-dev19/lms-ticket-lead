# Skill: Add Page

When adding a new page to this project:

1. Determine role: admin pages go in `app/(dashboard)/admin/`, user pages in `app/(dashboard)/user/`
2. Pages inside `(dashboard)/` automatically get the Sidebar + TopBar from `app/(dashboard)/layout.tsx`
3. Page component is always a server component by default
4. For pages that need client interactivity, create a separate `<PageName>Client.tsx` in `components/` and import it into the server page
5. Always check session server-side and redirect if unauthorized:
```ts
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

const session = await getServerSession(authOptions)
if (!session) redirect("/login")
if (session.user.role !== "ADMIN") redirect("/user")
```
6. Page title matches Figma: use `<h1>` with `text-[#2E2C34] font-semibold text-2xl`
