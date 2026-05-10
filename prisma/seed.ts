import { PrismaClient, TicketType, TicketStatus, Priority } from "@prisma/client"
import bcrypt from "bcryptjs"

const db = new PrismaClient()

async function main() {
  const hashedAdmin = await bcrypt.hash("admin123", 10)
  const hashedStudent = await bcrypt.hash("student123", 10)

  const admin = await db.user.upsert({
    where: { email: "admin@lms.com" },
    update: {},
    create: { name: "Alex Robert", email: "admin@lms.com", password: hashedAdmin, role: "ADMIN" },
  })

  const alice = await db.user.upsert({
    where: { email: "alice@student.com" },
    update: {},
    create: { name: "Alice Johnson", email: "alice@student.com", password: hashedStudent, role: "USER" },
  })

  const bob = await db.user.upsert({
    where: { email: "bob@student.com" },
    update: {},
    create: { name: "Bob Smith", email: "bob@student.com", password: hashedStudent, role: "USER" },
  })

  const tickets: Array<{
    ticketNo: string
    title: string
    body: string
    type: TicketType
    status: TicketStatus
    priority: Priority
    userId: string
  }> = [
    {
      ticketNo: "2024-CS001",
      title: "AI Tutor not responding to Math questions",
      body: "When I ask the AI tutor questions about calculus integration, it gives generic answers and doesn't follow up with practice problems as it used to. This started after the last platform update.",
      type: "AI_TUTOR_ISSUE",
      status: "NEW",
      priority: "HIGH",
      userId: alice.id,
    },
    {
      ticketNo: "2024-CS002",
      title: "Cannot access Module 3 video lectures",
      body: "I enrolled in the Advanced Python course but Module 3 videos show a locked icon even though I completed Module 2. My progress tracker shows 100% on Module 2.",
      type: "TECHNICAL_ISSUE",
      status: "ON_GOING",
      priority: "MEDIUM",
      userId: alice.id,
    },
    {
      ticketNo: "2024-CS003",
      title: "Question about assignment grading rubric",
      body: "I submitted my Assignment 2 for the Data Structures course but I am confused about how partial credit works. The rubric says 'conceptual understanding' but does not define how many points that is worth.",
      type: "CONTENT_QUESTION",
      status: "RESOLVED",
      priority: "LOW",
      userId: bob.id,
    },
  ]

  for (const ticket of tickets) {
    const created = await db.ticket.upsert({
      where: { ticketNo: ticket.ticketNo },
      update: {},
      create: ticket,
    })

    if (ticket.status === "RESOLVED") {
      await db.reply.create({
        data: {
          body: "Hi Bob, thank you for reaching out. The assignment rubric has been updated with a detailed breakdown. Conceptual understanding is worth 30 points. Please check the updated course materials. Let us know if you have further questions!",
          ticketId: created.id,
          authorId: admin.id,
        },
      })
    }
  }

  console.log("✅ Seed complete")
  console.log("   Admin:     admin@lms.com / admin123")
  console.log("   Student 1: alice@student.com / student123")
  console.log("   Student 2: bob@student.com / student123")
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
