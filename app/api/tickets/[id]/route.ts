import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { TicketStatus } from "@prisma/client"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  try {
    const ticket = await db.ticket.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        replies: {
          include: { author: { select: { id: true, name: true, role: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    })

    if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    if (session.user.role === "USER" && ticket.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ data: ticket })
  } catch {
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  try {
    const body = await req.json()
    const ticket = await db.ticket.update({
      where: { id },
      data: { status: body.status as TicketStatus },
    })
    return NextResponse.json({ data: ticket })
  } catch {
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
}
