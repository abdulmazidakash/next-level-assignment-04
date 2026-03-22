/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllOrders } from "@/services/order"
import { UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import AdminOrdersFilters from "@/components/modules/order/admin-order-filters"

export const dynamic = "force-dynamic";

// ── Status badge ─────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  PENDING:   "bg-yellow-50 border border-yellow-200 text-yellow-800",
  CONFIRMED: "bg-blue-50  border border-blue-200  text-blue-800",
  PREPARING: "bg-orange-50 border border-orange-200 text-orange-700",
  DELIVERED: "bg-green-50  border border-green-200  text-green-700",
  CANCELLED: "bg-red-50   border border-red-200   text-red-700",
}
const STATUS_DOT: Record<string, string> = {
  PENDING:   "bg-yellow-400",
  CONFIRMED: "bg-blue-500",
  PREPARING: "bg-orange-500",
  DELIVERED: "bg-green-500",
  CANCELLED: "bg-red-500",
}

function StatusBadge({ status }: { status: string }) {
  const key = status?.toUpperCase() ?? "PENDING"
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap",
      STATUS_STYLES[key] ?? "bg-gray-100 border border-gray-200 text-gray-600"
    )}>
      <span className={cn("w-1.25 h-1.25 rounded-full shrink-0", STATUS_DOT[key] ?? "bg-gray-400")} />
      {key.charAt(0) + key.slice(1).toLowerCase()}
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

export default async function AdminOrdersPage() {
  const res = await getAllOrders()
  const orders: any[] = res?.data ?? []

  // ── Computed stats ───────────────────────────────────────
  const totalRevenue  = orders.reduce((s, o) => s + (o.totalPrice ?? 0), 0)
  const delivered     = orders.filter((o) => o.status?.toUpperCase() === "DELIVERED").length
  const pending       = orders.filter((o) =>
    ["PENDING", "CONFIRMED", "PREPARING"].includes(o.status?.toUpperCase())
  ).length
  const cancelled     = orders.filter((o) => o.status?.toUpperCase() === "CANCELLED").length

  return (
    <div className="min-h-screen bg-[#f7f2ec] rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-7">

        {/* ── Header ── */}
        <div>
          <h1 className=" text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            All{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Orders
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Platform-wide order management</p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "Total Orders", value: orders.length,                    sub: "all time" },
            { label: "Revenue",      value: `৳${(totalRevenue/1000).toFixed(1)}k`, sub: "total earned" },
            { label: "Delivered",    value: delivered,                        sub: "completed" },
            { label: "Pending",      value: pending,                          sub: "awaiting action" },
            { label: "Cancelled",    value: cancelled,                        sub: "this month" },
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

        {/* ── Status filter tabs (client component) ── */}
        <AdminOrdersFilters />

        {/* ── Table ── */}
        <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#faf7f3]">
                  {["Order ID", "Customer", "Restaurant", "Meals", "Total", "Status", "Date"].map((h) => (
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
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-sm text-gray-400 italic">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order, i) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-[#fdf9f5] transition-colors"
                    >
                      {/* Order ID */}
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-[11.5px] bg-[#f4f0eb] border border-gray-100 px-2 py-0.5 rounded-[6px] text-gray-600">
                          {order.id.slice(0, 8)}…
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center text-[9.5px] font-bold text-white shrink-0 bg-linear-to-br",
                            GRADIENTS[i % GRADIENTS.length]
                          )}>
                            {initials(order.customer?.name ?? "?")}
                          </div>
                          <span className="font-semibold text-[13.5px] text-gray-900 whitespace-nowrap">
                            {order.customer?.name}
                          </span>
                        </div>
                      </td>

                      {/* Restaurant */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-6 h-6 rounded-[7px] flex items-center justify-center text-[9px] font-bold text-white shrink-0 bg-linear-to-br",
                            GRADIENTS[(i + 2) % GRADIENTS.length]
                          )}>
                            {initials(order.provider?.restaurantName ?? "?")}
                          </div>
                          <span className="text-[13px] font-medium text-gray-700 whitespace-nowrap">
                            {order.provider?.restaurantName}
                          </span>
                        </div>
                      </td>

                      {/* Meals */}
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                          <UtensilsCrossed className="h-2.5 w-2.5" />
                          {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3.5">
                        <span className=" text-[.92rem] font-bold text-gray-900">
                          ৳{order.totalPrice?.toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={order.status} />
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-[12px] text-gray-400 whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </span>
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