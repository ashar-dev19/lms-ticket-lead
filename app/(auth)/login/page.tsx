"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", { email, password, redirect: false })

    if (res?.error) {
      setError("Invalid email or password")
      setLoading(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB]">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#2E2C34]">TICKET LEAD</h1>
          <p className="text-sm text-[#84818A] mt-1">Sign in to your support account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2E2C34] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm text-[#2E2C34] placeholder:text-[#84818A] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30 focus:border-[#7F56D8]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E2C34] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-[#FBFBFB] text-sm text-[#2E2C34] placeholder:text-[#84818A] focus:outline-none focus:ring-2 focus:ring-[#7F56D8]/30 focus:border-[#7F56D8]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#7F56D8] text-white rounded-lg font-medium text-sm hover:bg-[#6B45C4] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-[#84818A] space-y-1">
          <p><span className="font-medium">Admin:</span> admin@lms.com / admin123</p>
          <p><span className="font-medium">Student:</span> alice@student.com / student123</p>
        </div>
      </div>
    </div>
  )
}
