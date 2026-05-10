import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { TicketCard } from "@/components/tickets/TicketCard"
import Link from "next/link"

export default async function UserDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  if (session.user.role === "ADMIN") redirect("/admin")

  const tickets = await db.ticket.findMany({
    where: { userId: session.user.id },
    include: { user: { select: { name: true, email: true } }, replies: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  const open = tickets.filter((t) => t.status !== "RESOLVED").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#2E2C34]">My Dashboard</h1>
        <Link
          href="/user/new-ticket"
          className="px-4 py-2 bg-[#7F56D8] text-white rounded-lg text-sm font-medium hover:bg-[#6B45C4] transition-colors"
        >
          + New Ticket
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-xs text-[#84818A] mb-1">Total Tickets</p>
          <p className="text-3xl font-semibold text-[#2E2C34]">{tickets.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-xs text-[#84818A] mb-1">Open</p>
          <p className="text-3xl font-semibold text-orange-500">{open}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-xs text-[#84818A] mb-1">Resolved</p>
          <p className="text-3xl font-semibold text-green-500">{tickets.length - open}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#2E2C34]">Recent Tickets</h2>
          <Link href="/user/tickets" className="text-xs text-[#7F56D8] hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {tickets.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
              <p className="text-[#84818A] text-sm mb-3">You have no tickets yet.</p>
              <Link href="/user/new-ticket" className="text-sm text-[#7F56D8] font-medium hover:underline">
                Submit your first ticket →
              </Link>
            </div>
          ) : (
            tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} basePath="/user" />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
