import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { formatDate, formatTime, STATUS_CONFIG, TICKET_TYPE_LABELS } from "@/lib/utils"
import { UserReplyForm } from "./UserReplyForm"

export default async function UserTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  if (session.user.role === "ADMIN") redirect("/admin")

  const ticket = await db.ticket.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      replies: {
        include: { author: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  })

  if (!ticket || ticket.userId !== session.user.id) notFound()

  const status = STATUS_CONFIG[ticket.status]

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#2E2C34]">Ticket Detail</h1>
        <a href="/user/tickets" className="text-sm text-[#84818A] hover:text-[#2E2C34]">← Back to tickets</a>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${status.dot}`} />
            <span className="font-semibold text-sm text-[#2E2C34]">Ticket# {ticket.ticketNo}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
            <span className="text-xs text-[#84818A]">· {TICKET_TYPE_LABELS[ticket.type]}</span>
          </div>
          <span className="text-xs text-[#84818A]">Posted at {formatTime(ticket.createdAt)}</span>
        </div>

        <h2 className="font-semibold text-lg text-[#2E2C34]">{ticket.title}</h2>
        <p className="text-sm text-[#84818A] leading-relaxed whitespace-pre-wrap">{ticket.body}</p>
      </div>

      {ticket.replies.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#2E2C34]">Replies</h3>
          {ticket.replies.map((reply) => (
            <div
              key={reply.id}
              className={`rounded-xl border p-4 ${
                reply.author.role === "ADMIN"
                  ? "bg-[#7F56D8]/5 border-[#7F56D8]/20 ml-6"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-[#7F56D8]/20 flex items-center justify-center text-[10px] font-semibold text-[#7F56D8]">
                  {reply.author.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-[#2E2C34]">{reply.author.name}</span>
                {reply.author.role === "ADMIN" && (
                  <span className="text-[10px] bg-[#7F56D8]/10 text-[#7F56D8] px-1.5 py-0.5 rounded font-medium">Support</span>
                )}
                <span className="text-xs text-[#84818A] ml-auto">{formatDate(reply.createdAt)}</span>
              </div>
              <p className="text-sm text-[#2E2C34] leading-relaxed whitespace-pre-wrap">{reply.body}</p>
            </div>
          ))}
        </div>
      )}

      {ticket.status !== "RESOLVED" && (
        <UserReplyForm ticketId={ticket.id} />
      )}
    </div>
  )
}
