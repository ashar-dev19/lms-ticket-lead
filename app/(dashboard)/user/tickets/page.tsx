import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { TicketCard } from "@/components/tickets/TicketCard"
import { TicketStatus } from "@prisma/client"
import Link from "next/link"

const TABS = [
  { label: "All Tickets", value: "ALL" },
  { label: "New", value: "NEW" },
  { label: "On-Going", value: "ON_GOING" },
  { label: "Pending", value: "PENDING" },
  { label: "Resolved", value: "RESOLVED" },
]

export default async function UserTicketsPage({ searchParams }: { searchParams: { status?: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  if (session.user.role === "ADMIN") redirect("/admin")

  const status = searchParams.status || "ALL"
  const where: Record<string, unknown> = { userId: session.user.id }
  if (status !== "ALL") where.status = status as TicketStatus

  const tickets = await db.ticket.findMany({
    where,
    include: { user: { select: { name: true, email: true } }, replies: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#2E2C34]">My Tickets</h1>
        <Link href="/user/new-ticket" className="px-4 py-2 bg-[#7F56D8] text-white rounded-lg text-sm font-medium hover:bg-[#6B45C4] transition-colors">
          + New Ticket
        </Link>
      </div>

      <div className="flex gap-1 border-b border-gray-100">
        {TABS.map((tab) => (
          <a
            key={tab.value}
            href={`/user/tickets?status=${tab.value}`}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              status === tab.value
                ? "border-[#7F56D8] text-[#7F56D8]"
                : "border-transparent text-[#84818A] hover:text-[#2E2C34]"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <div className="space-y-3">
        {tickets.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
            <p className="text-[#84818A] text-sm">No tickets in this category.</p>
          </div>
        ) : (
          tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} basePath="/user" />)
        )}
      </div>
    </div>
  )
}
