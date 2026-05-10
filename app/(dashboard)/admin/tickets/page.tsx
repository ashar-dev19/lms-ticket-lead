import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { TicketCard } from "@/components/tickets/TicketCard"
import { TicketStatus } from "@prisma/client"

const TABS: { label: string; value: string }[] = [
  { label: "All Tickets", value: "ALL" },
  { label: "New", value: "NEW" },
  { label: "On-Going", value: "ON_GOING" },
  { label: "Pending", value: "PENDING" },
  { label: "Resolved", value: "RESOLVED" },
]

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") redirect("/login")

  const status = searchParams.status || "ALL"
  const search = searchParams.search || ""

  const where: Record<string, unknown> = {}
  if (status !== "ALL") where.status = status as TicketStatus
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { ticketNo: { contains: search, mode: "insensitive" } },
    ]
  }

  const tickets = await db.ticket.findMany({
    where,
    include: { user: { select: { name: true, email: true } }, replies: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#2E2C34]">Tickets</h1>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1 border-b border-gray-100 w-full pb-0">
          {TABS.map((tab) => (
            <a
              key={tab.value}
              href={`/admin/tickets?status=${tab.value}${search ? `&search=${search}` : ""}`}
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
      </div>

      <form method="GET" action="/admin/tickets" className="flex gap-3">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search tickets..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30 focus:border-[#7F56D8]"
        />
        <input type="hidden" name="status" value={status} />
        <button type="submit" className="px-4 py-2 bg-[#7F56D8] text-white rounded-lg text-sm font-medium">
          Search
        </button>
      </form>

      <div className="space-y-3">
        {tickets.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
            <p className="text-[#84818A] text-sm">No tickets found.</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} basePath="/admin" />
          ))
        )}
      </div>
    </div>
  )
}
