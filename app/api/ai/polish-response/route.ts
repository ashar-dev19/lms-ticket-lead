import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { polishResponse } from "@/lib/ai"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const { body, ticketContext } = await req.json()
    if (!body?.trim()) return NextResponse.json({ error: "Body is required" }, { status: 400 })

    const result = await polishResponse(body, ticketContext ?? "")
    return NextResponse.json({ result })
  } catch {
    return NextResponse.json({ error: "AI service unavailable" }, { status: 500 })
  }
}
