"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PolishButton } from "@/components/ai/PolishButton"

const TICKET_TYPES = [
  { value: "TECHNICAL_ISSUE", label: "Technical Issue" },
  { value: "CONTENT_QUESTION", label: "Content Question" },
  { value: "AI_TUTOR_ISSUE", label: "AI Tutor Issue" },
  { value: "ACCOUNT_ISSUE", label: "Account Issue" },
  { value: "OTHER", label: "Other" },
]

const PRIORITIES = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
]

export function NewTicketForm({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [type, setType] = useState("")
  const [priority, setPriority] = useState("MEDIUM")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim() || !type) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, type, priority }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create ticket")
      router.push("/user/tickets")
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#2E2C34] mb-1.5">Email</label>
          <input
            type="email"
            value={userEmail}
            readOnly
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-[#84818A]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2E2C34] mb-1.5">Request Ticket Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm text-[#2E2C34] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30"
          >
            <option value="">Choose Type</option>
            {TICKET_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2E2C34] mb-1.5">Priority Status</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm text-[#2E2C34] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30"
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#2E2C34] mb-1.5">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief summary of your issue"
          required
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm text-[#2E2C34] placeholder:text-[#84818A] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-[#2E2C34]">Ticket Body</label>
          <PolishButton
            endpoint="/api/ai/polish-ticket"
            getPayload={() => ({ body })}
            onResult={(result) => {
              setBody(result)
              if (!title.trim()) {
                const firstLine = result.split("\n").find((l) => l.trim() && !l.startsWith("SUMMARY"))
                if (firstLine) setTitle(firstLine.trim())
              }
            }}
            label="✨ Polish It"
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Describe your issue in detail. Don't worry about formatting — hit ✨ Polish It and AI will structure it for you."
          rows={6}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm text-[#2E2C34] placeholder:text-[#84818A] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30 resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !title.trim() || !body.trim() || !type}
          className="px-6 py-2.5 bg-[#7F56D8] text-white rounded-lg text-sm font-medium hover:bg-[#6B45C4] transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Ticket"}
        </button>
      </div>
    </form>
  )
}
