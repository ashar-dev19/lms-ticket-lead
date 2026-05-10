# Skill: Update Database Schema

When modifying the Prisma schema:

1. Edit `prisma/schema.prisma`
2. Run `npx prisma generate` to update the client types
3. Run `npx prisma db push` for development (no migration file needed)
4. For production schema changes, use `npx prisma migrate dev --name <description>`
5. Update `prisma/seed.ts` if new required fields or relations are added
6. Never delete fields in production — mark as optional first

Current models: User, Ticket, Reply
Enums: Role (ADMIN, USER), TicketStatus (NEW, ON_GOING, PENDING, RESOLVED), TicketType, Priority
