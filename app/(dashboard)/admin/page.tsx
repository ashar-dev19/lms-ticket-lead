import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { TicketCard } from "@/components/tickets/TicketCard"
import Link from "next/link"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") redirect("/login")

  const [total, newCount, ongoing, resolved, recentTickets] = await Promise.all([
    db.ticket.count(),
    db.ticket.count({ where: { status: "NEW" } }),
    db.ticket.count({ where: { status: "ON_GOING" } }),
    db.ticket.count({ where: { status: "RESOLVED" } }),
    db.ticket.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } }, replies: true },
    }),
  ])

  const stats = [
    { label: "Total Tickets", value: total, dot: "bg-[#7F56D8]" },
    { label: "New", value: newCount, dot: "bg-blue-500" },
    { label: "On-Going", value: ongoing, dot: "bg-orange-400" },
    { label: "Resolved", value: resolved, dot: "bg-green-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#2E2C34]">Dashboard</h1>
        <Link href="/admin/tickets" className="px-4 py-2 bg-[#7F56D8] text-white rounded-lg text-sm font-medium hover:bg-[#6B45C4] transition-colors">
          + New Ticket
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${s.dot}`} />
              <span className="text-xs text-[#84818A] font-medium">{s.label}</span>
            </div>
            <p className="text-3xl font-semibold text-[#2E2C34]">{s.value}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#2E2C34]">Recent Tickets</h2>
          <Link href="/admin/tickets" className="text-xs text-[#7F56D8] hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} basePath="/admin" />
          ))}
        </div>
      </div>
    </div>
  )
}
