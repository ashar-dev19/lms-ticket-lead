import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { summarizeThread } from "@/lib/ai"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const { ticketTitle, ticketBody, replies } = await req.json()
    if (!ticketTitle || !ticketBody) {
      return NextResponse.json({ error: "Ticket data required" }, { status: 400 })
    }

    const result = await summarizeThread(ticketTitle, ticketBody, replies ?? [])
    return NextResponse.json({ result })
  } catch {
    return NextResponse.json({ error: "AI service unavailable" }, { status: 500 })
  }
}
