"use client"

import { useState } from "react"

interface Props {
  endpoint: string
  getPayload: () => Record<string, unknown>
  onResult: (result: string) => void
  label?: string
}

export function PolishButton({ endpoint, getPayload, onResult, label = "✨ Polish It" }: Props) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState("")
  const [error, setError] = useState("")

  async function handleClick() {
    setLoading(true)
    setError("")
    setPreview("")
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getPayload()),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "AI request failed")
      setPreview(data.result)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function handleApply() {
    onResult(preview)
    setPreview("")
  }

  function handleDiscard() {
    setPreview("")
  }

  return (
    <div className="w-full space-y-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7F56D8] border border-[#7F56D8]/30 rounded-lg hover:bg-[#7F56D8]/5 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Polishing...
          </>
        ) : label}
      </button>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {preview && (
        <div className="border border-[#7F56D8]/25 rounded-xl bg-[#7F56D8]/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#7F56D8]">✨ AI Suggestion — review before applying</p>
          </div>
          <pre className="text-sm text-[#2E2C34] whitespace-pre-wrap font-sans leading-relaxed">{preview}</pre>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleApply}
              className="px-3 py-1.5 bg-[#7F56D8] text-white text-xs font-medium rounded-lg hover:bg-[#6B45C4] transition-colors"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleDiscard}
              className="px-3 py-1.5 text-xs font-medium text-[#84818A] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
