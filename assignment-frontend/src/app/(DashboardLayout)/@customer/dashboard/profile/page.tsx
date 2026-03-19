import { getProfile } from "@/services/profile"
import { Briefcase, Calendar, Phone, Hash, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

function initials(name: string) {
  return name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
}

export default async function ProfilePage() {
  const profileRes = await getProfile()

  if (!profileRes?.data) {
    return (
      <div className="min-h-screen bg-[#f7f2ec] flex items-center justify-center">
        <p className="text-gray-400 text-sm italic">Not logged in</p>
      </div>
    )
  }

  const user = profileRes.data

  const infoRows = [
    {
      label: "User ID",
      value: user.id,
      icon: <Hash className="h-3.5 w-3.5" />,
      truncate: true,
    },
    {
      label: "Joined",
      value: new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      icon: <Calendar className="h-3.5 w-3.5" />,
    },
    {
      label: "Phone",
      value: user.phone ?? null,
      icon: <Phone className="h-3.5 w-3.5" />,
      fallback: "Not provided",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f7f2ec] flex items-center justify-center p-6">
      <div className="w-full max-w-115 bg-white border border-black/[0.07] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.06)]">

        {/* ── Banner ── */}
        <div className="relative h-27.5 bg-linear-to-br from-orange-500 via-rose-500 to-rose-700 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -right-4 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -top-6 left-8 w-20 h-20 rounded-full bg-white/10" />
        </div>

        {/* ── Avatar ── */}
        <div className="flex justify-center -mt-11 relative z-10">
          <div className="w-22 h-22 rounded-full border-4 border-white bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-[0_8px_24px_rgba(232,56,79,0.35)]">
            <span className=" text-2xl font-bold text-white">
              {initials(user.name)}
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-8 pb-8 pt-3">
          {/* Name + email */}
          <div className="text-center">
            <h1 className=" text-2xl font-bold text-gray-900 leading-tight mt-1">
              {user.name}
            </h1>
            <p className="text-[13.5px] text-gray-400 mt-1">{user.email}</p>
          </div>

          {/* Role + status badges */}
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <span className="text-[11.5px] font-semibold px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 tracking-wide">
              {user.role}
            </span>
            <span
              className={cn(
                "text-[11.5px] font-semibold px-3.5 py-1 rounded-full tracking-wide",
                user.status === "ACTIVE"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              )}
            >
              {user.status}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6" />

          {/* Info rows */}
          <div className="space-y-2.5">
            {infoRows.map(({ label, value, icon, truncate, fallback }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 bg-[#faf7f3] rounded-xl px-4 py-2.5"
              >
                <span className="flex items-center gap-2 text-[12.5px] font-semibold text-gray-400 whitespace-nowrap shrink-0">
                  <span className="opacity-60">{icon}</span>
                  {label}
                </span>
                <span
                  className={cn(
                    "text-[13px] font-medium text-right",
                    value ? "text-gray-900" : "text-gray-400 italic",
                    truncate && "truncate max-w-50"
                  )}
                  title={truncate ? String(value ?? "") : undefined}
                >
                  {value ?? fallback ?? "—"}
                </span>
              </div>
            ))}
          </div>

          {/* Edit button */}
          <Link
            href="/profile/edit"
            className="mt-6 w-full h-11 rounded-[14px] flex items-center justify-center gap-2 text-[14px] font-semibold text-white bg-linear-to-br from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Link>
        </div>

      </div>
    </div>
  )
}