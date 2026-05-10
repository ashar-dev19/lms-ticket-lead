"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function UserReplyForm({ ticketId }: { ticketId: string }) {
  const router = useRouter()
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, body }),
      })
      if (!res.ok) throw new Error("Failed to post reply")
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
      <h3 className="font-semibold text-sm text-[#2E2C34] mb-4">Add a Reply</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your message..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm placeholder:text-[#84818A] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30 resize-none"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !body.trim()}
            className="px-5 py-2 bg-[#7F56D8] text-white rounded-lg text-sm font-medium hover:bg-[#6B45C4] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reply"}
          </button>
        </div>
      </form>
    </div>
  )
}
