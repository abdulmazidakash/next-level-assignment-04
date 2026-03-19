/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProviderOrders } from "@/services/provider"
import OrderStatusBadge from "@/components/modules/order/provider-order-status-badge"
import OrderStatusDropdown from "@/components/modules/order/provider-order-status-dropdown"
import { cn } from "@/lib/utils"

// ── Avatar helpers ────────────────────────────────────────────
const linearS = [
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

// ── "New" pill — shown for PENDING orders ─────────────────────
function NewBadge() {
  return (
    <span className="inline-flex items-center text-[9px] font-extrabold tracking-wider uppercase bg-linear-to-r from-orange-500 to-rose-600 text-white px-1.5 py-0.5 rounded-full ml-1.5 align-middle">
      New
    </span>
  )
}

export default async function ProviderOrdersPage() {
  const res    = await getProviderOrders()
  const orders = res?.data ?? []

  // ── Stats ──────────────────────────────────────────────────
  const pending   = orders.filter((o: any) => o.status?.toUpperCase() === "PENDING").length
  const preparing = orders.filter((o: any) => o.status?.toUpperCase() === "PREPARING").length
  const delivered = orders.filter((o: any) => o.status?.toUpperCase() === "DELIVERED").length
  const revenue   = orders
    .filter((o: any) => o.status?.toUpperCase() !== "CANCELLED")
    .reduce((s: number, o: any) => s + (o.totalPrice ?? 0), 0)

  return (
    <div className="min-h-screen bg-[#f7f2ec] rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-7">

        {/* ── Header ── */}
        <div>
          <h1 className="  text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Incoming{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Orders
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and update your restaurant's order queue
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Orders", value: orders.length, sub: "all time" },
            { label: "Pending",      value: pending,       sub: "needs action" },
            { label: "Preparing",    value: preparing,     sub: "in kitchen" },
            { label: "Delivered",    value: delivered,     sub: "completed" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-2xl px-4 py-4">
              <p className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400 mb-1">
                {label}
              </p>
              <p className="  text-[1.55rem] font-bold text-gray-900 leading-none">
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
                  {["Order ID", "Customer", "Total", "Status", "Update Status"].map((h) => (
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
                {!orders.length ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-sm text-gray-400 italic">
                      No orders yet. They'll appear here when customers place orders.
                    </td>
                  </tr>
                ) : (
                  orders.map((order: any, i: number) => {
                    const isPending = order.status?.toUpperCase() === "PENDING"
                    return (
                      <tr
                        key={order.id}
                        className={cn(
                          "border-b border-gray-50 last:border-0 transition-colors",
                          isPending
                            ? "bg-amber-50/30 hover:bg-amber-50/60"
                            : "hover:bg-[#fdf9f5]"
                        )}
                      >
                        {/* Order ID */}
                        <td className="px-4 py-4">
                          <span className="font-mono text-[11.5px] bg-[#f4f0eb] border border-gray-100 px-2 py-0.5 rounded-[6px] text-gray-600">
                            {order.id.slice(0, 8)}…
                          </span>
                          {isPending && <NewBadge />}
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className={cn(
                              "w-7.5 h-7.5 rounded-full flex items-center justify-center text-[10.5px] font-bold text-white shrink-0 bg-linear-to-br",
                              linearS[i % linearS.length]
                            )}>
                              {initials(order.customer?.name ?? "?")}
                            </div>
                            <span className="font-semibold text-[13.5px] text-gray-900 whitespace-nowrap">
                              {order.customer?.name}
                            </span>
                          </div>
                        </td>

                        {/* Total */}
                        <td className="px-4 py-4">
                          <span className="  text-[.95rem] font-bold text-gray-900">
                            ৳{order.totalPrice?.toLocaleString()}
                          </span>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-4">
                          <OrderStatusBadge status={order.status} />
                        </td>

                        {/* Status dropdown */}
                        <td className="px-4 py-4">
                          <OrderStatusDropdown
                            orderId={order.id}
                            currentStatus={order.status}
                          />
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Revenue footer */}
          {orders.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-4 bg-[#faf7f3] flex items-center justify-between flex-wrap gap-3">
              <span className="text-[12.5px] text-gray-400 font-medium">
                {orders.length} order{orders.length !== 1 ? "s" : ""} total
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-gray-400">Total Revenue</span>
                <span className="  text-lg font-bold bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                  ৳{revenue.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}