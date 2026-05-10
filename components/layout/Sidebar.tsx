"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: DashboardIcon },
  { label: "Users", href: "/admin/users", icon: UsersIcon },
  { label: "Tickets", href: "/admin/tickets", icon: TicketsIcon },
  { label: "Site Settings", href: "/admin/settings", icon: SettingsIcon },
]

const userNav = [
  { label: "Dashboard", href: "/user", icon: DashboardIcon },
  { label: "My Tickets", href: "/user/tickets", icon: TicketsIcon },
  { label: "New Ticket", href: "/user/new-ticket", icon: NewTicketIcon },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "ADMIN"
  const nav = isAdmin ? adminNav : userNav
  const base = isAdmin ? "/admin" : "/user"

  return (
    <aside className="w-[200px] min-h-screen bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
      <div className="mb-8 px-2">
        <span className="text-base font-bold text-[#2E2C34] tracking-wide">TICKET LEAD</span>
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== base && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-[#7F56D8]/10 text-[#7F56D8]"
                  : "text-[#84818A] hover:bg-gray-50 hover:text-[#2E2C34]"
              )}
            >
              <Icon active={active} />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

function DashboardIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#7F56D8" : "#84818A"} strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function UsersIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#7F56D8" : "#84818A"} strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function TicketsIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#7F56D8" : "#84818A"} strokeWidth="1.8">
      <path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function SettingsIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#7F56D8" : "#84818A"} strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function NewTicketIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#7F56D8" : "#84818A"} strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
