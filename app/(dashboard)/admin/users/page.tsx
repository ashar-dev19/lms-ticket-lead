import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { formatDate } from "@/lib/utils"

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") redirect("/login")

  const users = await db.user.findMany({
    where: { role: "USER" },
    include: { _count: { select: { tickets: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-[#2E2C34]">Users</h1>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#84818A]">Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#84818A]">Email</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#84818A]">Tickets</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#84818A]">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#7F56D8]/20 flex items-center justify-center text-xs font-semibold text-[#7F56D8]">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-[#2E2C34]">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[#84818A]">{user.email}</td>
                <td className="px-5 py-3">
                  <span className="font-medium text-[#2E2C34]">{user._count.tickets}</span>
                </td>
                <td className="px-5 py-3 text-[#84818A]">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
