import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NewTicketForm } from "./NewTicketForm"

export default async function NewTicketPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  if (session.user.role === "ADMIN") redirect("/admin")

  return (
    <div className="space-y-5 max-w-3xl">
      <h1 className="text-2xl font-semibold text-[#2E2C34]">New Ticket</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-[#2E2C34]">Create Quick Ticket</h2>
          <p className="text-sm text-[#84818A] mt-0.5">Write and address new queries and issues</p>
        </div>
        <NewTicketForm userEmail={session.user.email!} />
      </div>
    </div>
  )
}
