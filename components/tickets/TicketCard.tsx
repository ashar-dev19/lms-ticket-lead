import Link from "next/link"
import { formatDate, STATUS_CONFIG, PRIORITY_CONFIG, TICKET_TYPE_LABELS } from "@/lib/utils"
import { Ticket, User } from "@prisma/client"

type TicketWithUser = Ticket & { user: Pick<User, "name" | "email">; replies: { id: string }[] }

interface Props {
  ticket: TicketWithUser
  basePath: string
}

export function TicketCard({ ticket, basePath }: Props) {
  const status = STATUS_CONFIG[ticket.status]
  const priority = PRIORITY_CONFIG[ticket.priority]

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${status.dot}`} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-medium text-[#84818A]">#{ticket.ticketNo}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priority.color}`}>
                {priority.label} Priority
              </span>
            </div>
            <h3 className="font-semibold text-sm text-[#2E2C34] leading-snug">{ticket.title}</h3>
            <p className="text-xs text-[#84818A] mt-1 line-clamp-2">{ticket.body}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-5 h-5 rounded-full bg-[#7F56D8]/20 flex items-center justify-center text-[10px] font-semibold text-[#7F56D8]">
                {ticket.user.name.charAt(0)}
              </div>
              <span className="text-xs text-[#84818A]">{ticket.user.name}</span>
              <span className="text-xs text-[#84818A]">{TICKET_TYPE_LABELS[ticket.type]}</span>
              <span className="text-xs text-[#84818A]">{ticket.replies.length} replies</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-xs text-[#84818A]">Posted at {formatDate(ticket.createdAt)}</span>
          <Link
            href={`${basePath}/tickets/${ticket.id}`}
            className="text-xs font-medium text-[#7F56D8] hover:underline"
          >
            Open Ticket →
          </Link>
        </div>
      </div>
    </div>
  )
}
