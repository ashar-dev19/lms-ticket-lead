import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { polishTicket } from "@/lib/ai"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { body } = await req.json()
    if (!body?.trim()) return NextResponse.json({ error: "Body is required" }, { status: 400 })

    const result = await polishTicket(body)
    return NextResponse.json({ result })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error("[polish-ticket]", msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
