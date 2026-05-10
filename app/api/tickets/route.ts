import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { generateTicketNo } from "@/lib/utils"
import { TicketType, Priority } from "@prisma/client"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status") || undefined
  const search = searchParams.get("search") || undefined

  try {
    const where: Record<string, unknown> = {}

    if (session.user.role === "USER") where.userId = session.user.id
    if (status && status !== "ALL") where.status = status
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { ticketNo: { contains: search, mode: "insensitive" } },
      ]
    }

    const tickets = await db.ticket.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } }, replies: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ data: tickets })
  } catch {
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const { title, body: ticketBody, type, priority } = body

    if (!title || !ticketBody || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const ticket = await db.ticket.create({
      data: {
        ticketNo: generateTicketNo(),
        title,
        body: ticketBody,
        type: type as TicketType,
        priority: (priority as Priority) ?? "MEDIUM",
        userId: session.user.id,
      },
    })

    return NextResponse.json({ data: ticket }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}
