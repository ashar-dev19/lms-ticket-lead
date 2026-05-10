"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PolishButton } from "@/components/ai/PolishButton"
import { TicketStatus } from "@prisma/client"

const STATUS_OPTIONS: { label: string; value: TicketStatus }[] = [
  { label: "New", value: "NEW" },
  { label: "On-Going", value: "ON_GOING" },
  { label: "Pending", value: "PENDING" },
  { label: "Resolved", value: "RESOLVED" },
]

interface Props {
  ticketId: string
  ticketContext: string
  currentStatus: TicketStatus
}

export function AdminReplyForm({ ticketId, ticketContext, currentStatus }: Props) {
  const router = useRouter()
  const [body, setBody] = useState("")
  const [status, setStatus] = useState<TicketStatus>(currentStatus)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setLoading(true)
    setError("")

    try {
      const [replyRes, statusRes] = await Promise.all([
        fetch("/api/replies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketId, body }),
        }),
        status !== currentStatus
          ? fetch(`/api/tickets/${ticketId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status }),
            })
          : Promise.resolve({ ok: true }),
      ])

      if (!replyRes.ok) throw new Error("Failed to post reply")
      setBody("")
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="font-semibold text-sm text-[#2E2C34] mb-4">Reply to Ticket</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-[#2E2C34] mb-1.5">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TicketStatus)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm text-[#2E2C34] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-[#2E2C34]">Reply Body</label>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your reply here..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm text-[#2E2C34] placeholder:text-[#84818A] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30 resize-none"
          />
          <div className="mt-2">
            <PolishButton
              endpoint="/api/ai/polish-response"
              getPayload={() => ({ body, ticketContext })}
              onResult={setBody}
              label="✨ Polish Response"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !body.trim()}
            className="px-6 py-2.5 bg-[#7F56D8] text-white rounded-lg text-sm font-medium hover:bg-[#6B45C4] transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Reply"}
          </button>
        </div>
      </form>
    </div>
  )
}
