import Link from "next/link"
import { getMyOrders } from "@/services/order"
import { Order } from "@/types/order"
import { UtensilsCrossed, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic";


// ── Status badge ────────────────────────────────────────────
// Replaces / unifies with your existing <OrderStatusBadge />
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
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap",
        STATUS_STYLES[key] ?? "bg-gray-100 border border-gray-200 text-gray-600"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full shrink-0",
          STATUS_DOT[key] ?? "bg-gray-400"
        )}
      />
      {key.charAt(0) + key.slice(1).toLowerCase()}
    </span>
  )
}

// ── Restaurant initials dot ──────────────────────────────────
const DOT_linearS = [
  "from-orange-500 to-rose-600",
  "from-teal-600 to-emerald-500",
  "from-blue-600 to-sky-400",
  "from-violet-600 to-purple-500",
  "from-red-700 to-red-500",
  "from-green-700 to-green-500",
]
function initials(name: string) {
  return name
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() ?? "?"
}

export default async function OrdersPage() {
  const res = await getMyOrders()
  const orders: Order[] = res?.data ?? []

  // ── Derived stats ──────────────────────────────────────────
  const totalSpent = orders.reduce((s, o) => s + (o.totalPrice ?? 0), 0)
  const delivered  = orders.filter((o) => o.status?.toUpperCase() === "DELIVERED").length
  const pending    = orders.filter((o) =>
    ["PENDING", "CONFIRMED", "PREPARING"].includes(o.status?.toUpperCase())
  ).length

  return (
    <div className="min-h-screen bg-[#f7f2ec] rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <div className="mb-7">
          <h1 className=" text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            My{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Orders
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Track and manage all your food orders</p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {[
            { label: "Total Orders", value: orders.length,         sub: "all time" },
            { label: "Total Spent",  value: `৳${totalSpent.toLocaleString()}`, sub: "across orders" },
            { label: "Delivered",    value: delivered,             sub: "completed" },
            { label: "In Progress",  value: pending,               sub: "active" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-2xl px-5 py-4">
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
                  {["Order ID", "Restaurant", "Meals", "Total", "Status", "Date", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-bold tracking-[0.06em] uppercase text-gray-400 border-b border-gray-100 whitespace-nowrap"
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
                      No orders yet. Time to order some food!
                    </td>
                  </tr>
                ) : (
                  orders.map((order, i) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-[#fdf9f5] transition-colors"
                    >
                      {/* Order ID */}
                      <td className="px-4 py-4">
                        <span className="font-mono text-[12px] bg-[#f4f0eb] border border-gray-100 px-2 py-1 rounded-[6px] text-gray-600">
                          {order.id.slice(0, 8)}…
                        </span>
                      </td>

                      {/* Restaurant */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0 bg-linear-to-br",
                              DOT_linearS[i % DOT_linearS.length]
                            )}
                          >
                            {initials(order.provider?.restaurantName ?? "?")}
                          </div>
                          <span className="font-semibold text-[13.5px] text-gray-900 whitespace-nowrap">
                            {order.provider?.restaurantName}
                          </span>
                        </div>
                      </td>

                      {/* Meals count */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                          <UtensilsCrossed className="h-2.5 w-2.5" />
                          {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4">
                        <span className=" text-base font-bold text-gray-900">
                          ৳{order.totalPrice?.toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <StatusBadge status={order.status} />
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-[12.5px] text-gray-400 whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4">
                        <Link
                          href={`/dashboard/my-orders/${order.id}`}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[9px] text-[12px] font-semibold bg-linear-to-br from-orange-500 to-rose-600 text-white shadow-sm shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                        >
                          View
                          <ArrowRight className="h-3 w-3" />
                        </Link>
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