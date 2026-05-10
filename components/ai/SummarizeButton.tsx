"use client"

import { useState } from "react"

interface Props {
  ticketTitle: string
  ticketBody: string
  replies: Array<{ authorName: string; body: string; createdAt: Date }>
}

export function SummarizeButton({ ticketTitle, ticketBody, replies }: Props) {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")
  const [error, setError] = useState("")

  async function handleClick() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/ai/summarize-thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketTitle, ticketBody, replies }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "AI request failed")
      setSummary(data.result)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#84818A] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Summarizing...
          </>
        ) : "📋 Summarize Thread"}
      </button>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {summary && (
        <div className="bg-[#7F56D8]/5 border border-[#7F56D8]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#7F56D8] mb-2">AI Summary</p>
          <div className="text-sm text-[#2E2C34] whitespace-pre-wrap leading-relaxed">{summary}</div>
        </div>
      )}
    </div>
  )
}
