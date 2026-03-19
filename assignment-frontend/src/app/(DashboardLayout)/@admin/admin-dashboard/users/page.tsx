import { getAllUsers, updateUserStatus } from "@/services/User"
import { User } from "@/types/user"
import UserRoleForm from "@/components/modules/user/user-role-form"
import { cn } from "@/lib/utils"

// ── Status badge ─────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isActive = status === "ACTIVE"
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap",
      isActive
        ? "bg-green-50 border border-green-200 text-green-700"
        : "bg-red-50 border border-red-200 text-red-700"
    )}>
      <span className={cn(
        "w-1.25 h-1.25 rounded-full shrink-0",
        isActive ? "bg-green-500" : "bg-red-400"
      )} />
      {isActive ? "Active" : "Suspended"}
    </span>
  )
}

// ── Avatar helpers ────────────────────────────────────────────
const GRADIENTS = [
  "from-orange-500 to-rose-600",
  "from-teal-600 to-emerald-500",
  "from-blue-600 to-sky-400",
  "from-violet-600 to-purple-500",
  "from-amber-700 to-amber-500",
  "from-green-700 to-green-500",
]
function initials(name: string) {
  return name?.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() ?? "?"
}

export default async function UsersPage() {
  const res   = await getAllUsers()
  const users: User[] = res?.data ?? []

  // ── Stats ──────────────────────────────────────────────────
  const active    = users.filter((u) => u.status === "ACTIVE").length
  const suspended = users.filter((u) => u.status !== "ACTIVE").length
  const providers = users.filter((u) => u.role === "PROVIDER").length
  const admins    = users.filter((u) => u.role === "ADMIN").length

  return (
    <div className="min-h-screen bg-[#f7f2ec] rounded-2xl">
      <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-7">

        {/* ── Header ── */}
        <div>
          <h1 className=" text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            User{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Manage roles and access for all platform users</p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "Total Users",  value: users.length, sub: "registered" },
            { label: "Active",       value: active,       sub: "can access platform" },
            { label: "Suspended",    value: suspended,    sub: "blocked access" },
            { label: "Providers",    value: providers,    sub: "restaurant owners" },
            { label: "Admins",       value: admins,       sub: "full access" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-2xl px-4 py-4">
              <p className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400 mb-1">{label}</p>
              <p className=" text-[1.55rem] font-bold text-gray-900 leading-none">
                {value}
              </p>
              <p className="text-[11.5px] text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#faf7f3]">
                  {["User", "Email", "Role", "Status", "Joined", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10.5px] font-bold tracking-[0.06em] uppercase text-gray-400 border-b border-gray-100 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-sm text-gray-400 italic">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user, i) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-[#fdf9f5] transition-colors"
                    >
                      {/* User */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={cn(
                            "w-8.5 h-8.5 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-linear-to-br",
                            GRADIENTS[i % GRADIENTS.length]
                          )}>
                            {initials(user.name)}
                          </div>
                          <span className="font-semibold text-[13.5px] text-gray-900 whitespace-nowrap">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3.5">
                        <span className="text-[13px] text-gray-400">{user.email}</span>
                      </td>

                      {/* Role — existing form component */}
                      <td className="px-4 py-3.5">
                        <UserRoleForm userId={user.id} role={user.role} />
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={user.status} />
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        <span className="text-[12px] text-gray-400 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3.5">
                        {user.status === "ACTIVE" ? (
                          <form action={updateUserStatus.bind(null, user.id, "SUSPENDED")}>
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1.5 h-7.5 px-3 rounded-xl border-[1.5px] border-red-200 bg-red-50 text-red-500 text-[12px] font-semibold hover:bg-red-100 hover:border-red-300 hover:-translate-y-0.5 transition-all cursor-pointer  whitespace-nowrap"
                            >
                              <svg className="w-3 h-3 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                              </svg>
                              Suspend
                            </button>
                          </form>
                        ) : (
                          <form action={updateUserStatus.bind(null, user.id, "ACTIVE")}>
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1.5 h-7.5 px-3 rounded-xl border-none bg-linear-to-br from-green-500 to-emerald-600 text-white text-[12px] font-semibold shadow-sm shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5 transition-all cursor-pointer  whitespace-nowrap"
                            >
                              <svg className="w-3 h-3 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Activate
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}