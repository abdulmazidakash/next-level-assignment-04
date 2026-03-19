import { getSingleOrder } from "@/services/order"
import Image from "next/image"
import Link from "next/link"
import { OrderItem } from "@/types/order"
import { ArrowLeft, Home, ShieldCheck, MapPin, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"

// ── Status badge (self-contained) ───────────────────────────
const STATUS_STYLES: Record<string, string> = {
    PENDING: "bg-yellow-50 border border-yellow-200 text-yellow-800",
    CONFIRMED: "bg-blue-50  border border-blue-200  text-blue-800",
    PREPARING: "bg-orange-50 border border-orange-200 text-orange-700",
    DELIVERED: "bg-green-50  border border-green-200  text-green-700",
    CANCELLED: "bg-red-50   border border-red-200   text-red-700",
}
const STATUS_DOT: Record<string, string> = {
    PENDING: "bg-yellow-400",
    CONFIRMED: "bg-blue-500",
    PREPARING: "bg-orange-500",
    DELIVERED: "bg-green-500",
    CANCELLED: "bg-red-500",
}
const STATUS_ICON_BG: Record<string, string> = {
    PENDING: "bg-yellow-50 border-yellow-200",
    CONFIRMED: "bg-blue-50  border-blue-200",
    PREPARING: "bg-orange-50 border-orange-200",
    DELIVERED: "bg-green-50  border-green-200",
    CANCELLED: "bg-red-50   border-red-200",
}

function StatusBadge({ status }: { status: string }) {
    const key = status?.toUpperCase() ?? "PENDING"
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full",
                STATUS_STYLES[key] ?? "bg-gray-100 border border-gray-200 text-gray-600"
            )}
        >
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", STATUS_DOT[key] ?? "bg-gray-400")} />
            {key.charAt(0) + key.slice(1).toLowerCase()}
        </span>
    )
}

export default async function OrderDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const res = await getSingleOrder(id)
    const order = res?.data

    if (!order) {
        return (
            <div className="min-h-screen bg-[#f7f2ec] flex items-center justify-center rounded-2xl">
                <p className="text-gray-400 text-sm italic">Order not found</p>
            </div>
        )
    }

    const statusKey = order.status?.toUpperCase() ?? "PENDING"
    const itemCount = order.items?.reduce((s: number, i: OrderItem) => s + i.quantity, 0) ?? 0

    return (
        <div className="min-h-screen bg-[#f7f2ec] rounded-2xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-7">

                {/* ── Top row ── */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h1 className=" text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            Order{" "}
                            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                                Details
                            </span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[12.5px] text-gray-400">Order ID</span>
                            <span className="font-mono text-[12px] bg-[#f4f0eb] border border-gray-100 px-2 py-0.5 rounded-[6px] text-gray-600">
                                {order.id}
                            </span>
                        </div>
                    </div>

                    <Link
                        href="/dashboard/my-orders"
                        className="inline-flex items-center gap-2 h-9 px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-semibold text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors whitespace-nowrap"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Orders
                    </Link>
                </div>

                {/* ── Info cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                    {/* Restaurant */}
                    <div className="bg-white border border-black/[0.07] rounded-2xl p-5 flex flex-col gap-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-1">
                            <Home className="h-4 w-4 text-amber-700" />
                        </div>
                        <p className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400">Restaurant</p>
                        <p className="font-semibold text-[14.5px] text-gray-900 leading-snug">
                            {order.provider?.restaurantName}
                        </p>
                        <p className="text-[12px] text-gray-400">{order.provider?.cuisineType}</p>
                    </div>

                    {/* Status */}
                    <div className="bg-white border border-black/[0.07] rounded-2xl p-5 flex flex-col gap-2">
                        <div
                            className={cn(
                                "w-9 h-9 rounded-xl border flex items-center justify-center mb-1",
                                STATUS_ICON_BG[statusKey] ?? "bg-gray-50 border-gray-200"
                            )}
                        >
                            <ShieldCheck className={cn("h-4 w-4", {
                                "text-yellow-600": statusKey === "PENDING",
                                "text-blue-600": statusKey === "CONFIRMED",
                                "text-orange-600": statusKey === "PREPARING",
                                "text-green-700": statusKey === "DELIVERED",
                                "text-red-600": statusKey === "CANCELLED",
                            })} />
                        </div>
                        <p className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400">Order Status</p>
                        <StatusBadge status={order.status} />
                        <p className="text-[12px] text-gray-400">
                            {new Date(order.createdAt).toLocaleString("en-GB", {
                                day: "numeric", month: "short", year: "numeric",
                                hour: "2-digit", minute: "2-digit",
                            })}
                        </p>
                    </div>

                    {/* Address */}
                    <div className="bg-white border border-black/[0.07] rounded-2xl p-5 flex flex-col gap-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-1">
                            <MapPin className="h-4 w-4 text-amber-700" />
                        </div>
                        <p className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400">Delivery Address</p>
                        <p className="text-[13.5px] font-medium text-gray-800 leading-relaxed">{order.address}</p>
                    </div>

                </div>

                {/* ── Meals table ── */}
                <div>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <h2 className="text-xl font-bold text-gray-900">
                            Ordered Meals
                        </h2>
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-semibold px-3 py-1 rounded-full">
                            <UtensilsCrossed className="h-3 w-3" />
                            {order.items?.length ?? 0} meal{order.items?.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-[#faf7f3]">
                                        {["Meal", "Unit Price", "Qty", "Subtotal"].map((h) => (
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
                                    {order.items?.map((item: OrderItem) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-50 last:border-0 hover:bg-[#fdf9f5] transition-colors"
                                        >
                                            {/* Meal */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-13 h-11 rounded-xl overflow-hidden shrink-0">
                                                        <Image
                                                            src={item.meal.imageUrl}
                                                            alt={item.meal.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="52px"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm text-gray-900 leading-tight">{item.meal.name}</p>
                                                        {item.meal.category?.name && (
                                                            <p className="text-[11.5px] text-gray-400 mt-0.5">{item.meal.category.name}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Unit price */}
                                            <td className="px-4 py-4">
                                                <span className=" text-[.95rem] font-bold text-gray-900">
                                                    ৳{item.price}
                                                </span>
                                            </td>

                                            {/* Quantity */}
                                            <td className="px-4 py-4">
                                                <span className="inline-flex items-center justify-center w-7 h-7 bg-[#f4f0eb] rounded-lg text-[13px] font-bold text-gray-900">
                                                    {item.quantity}
                                                </span>
                                            </td>

                                            {/* Subtotal */}
                                            <td className="px-4 py-4">
                                                <span className=" text-base font-bold text-orange-600">
                                                    ৳{item.price * item.quantity}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ── Summary ── */}
                <div className="flex justify-end">
                    <div className="bg-white border border-black/[0.07] rounded-2xl p-6 w-full max-w-sm flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[13.5px]">
                            <span className="text-gray-400">Total Items</span>
                            <span className="font-semibold text-gray-900">{itemCount} piece{itemCount !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex justify-between items-center text-[13.5px]">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="font-semibold text-gray-900">৳{order.totalPrice?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[13.5px]">
                            <span className="text-gray-400">Delivery Fee</span>
                            <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
                            <span className="font-bold text-[15px] text-gray-900">Total Price</span>
                            <span className=" text-[1.35rem] font-bold bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                                ৳{order.totalPrice?.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}