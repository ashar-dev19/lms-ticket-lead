"use client"

import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

export function TopBar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <button className="text-[#84818A] hover:text-[#2E2C34]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span className="text-sm text-[#84818A]">
          Welcome! <span className="font-semibold text-[#2E2C34]">{session?.user?.name}</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-[#84818A] hover:text-[#2E2C34] relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#7F56D8] rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:opacity-80"
          >
            <div className="w-8 h-8 rounded-full bg-[#7F56D8]/20 flex items-center justify-center text-xs font-semibold text-[#7F56D8]">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-[#2E2C34]">{session?.user?.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#84818A" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-10 w-40 bg-white rounded-lg shadow-md border border-gray-100 py-1 z-50">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
