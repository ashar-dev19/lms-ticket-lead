import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { ticketId, body } = await req.json()

    if (!ticketId || !body?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const ticket = await db.ticket.findUnique({ where: { id: ticketId } })
    if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 })

    if (session.user.role === "USER" && ticket.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const reply = await db.reply.create({
      data: { body, ticketId, authorId: session.user.id },
      include: { author: { select: { id: true, name: true, role: true } } },
    })

    return NextResponse.json({ data: reply }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to post reply" }, { status: 500 })
  }
}
