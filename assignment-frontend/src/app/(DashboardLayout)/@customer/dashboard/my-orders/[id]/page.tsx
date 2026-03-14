import { getSingleOrder } from "@/services/order"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { OrderStatusBadge } from "@/components/modules/order/order-status-badge"
import { OrderItem } from "@/types/order"
import Image from "next/image"

export default async function OrderDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {


    const { id } = await params

    const res = await getSingleOrder(id)

    const order = res?.data;

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Order Details
                    </h1>

                    <p className="text-muted-foreground">
                        Order ID: {order.id}
                    </p>
                </div>

                <Link href="/dashboard/my-orders">
                    <Button variant="outline">
                        Back to Orders
                    </Button>
                </Link>

            </div>

            {/* Order Info */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Provider */}

                <div className="border rounded-lg p-5 space-y-2">

                    <h3 className="font-semibold text-lg">
                        Restaurant
                    </h3>

                    <p>
                        {order.provider.restaurantName}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {order.provider.cuisineType}
                    </p>

                </div>

                {/* Status */}

                <div className="border rounded-lg p-5 space-y-2">

                    <h3 className="font-semibold text-lg">
                        Order Status
                    </h3>

                    <OrderStatusBadge status={order.status} />

                    <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                    </p>

                </div>

                {/* Address */}

                <div className="border rounded-lg p-5 space-y-2">

                    <h3 className="font-semibold text-lg">
                        Delivery Address
                    </h3>

                    <p>
                        {order.address}
                    </p>

                </div>

            </div>

            {/* Meals Table */}

            <div>

                <h2 className="text-xl font-semibold mb-4">
                    Ordered Meals
                </h2>

                <Table>

                    <TableHeader>

                        <TableRow>
                            <TableHead>Meal</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {order.items.map((item: OrderItem) => (

                            <TableRow key={item.id}>

                                <TableCell className="flex items-center gap-3">

                                    <Image
                                    width={48}
                                    height={48}
                                        src={item.meal.imageUrl}
                                        alt={item.meal.name}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />

                                    <span>
                                        {item.meal.name}
                                    </span>

                                </TableCell>

                                <TableCell>
                                    ৳ {item.price}
                                </TableCell>

                                <TableCell>
                                    {item.quantity}
                                </TableCell>

                                <TableCell>
                                    ৳ {item.price * item.quantity}
                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </div>

            {/* Total */}

            <div className="flex justify-end">

                <div className="border rounded-lg p-6 w-75 space-y-2">

                    <div className="flex justify-between">

                        <span className="text-muted-foreground">
                            Total Items
                        </span>

                        <span>
                            {order.items.length}
                        </span>

                    </div>

                    <div className="flex justify-between text-lg font-semibold">

                        <span>
                            Total Price
                        </span>

                        <span>
                            ৳ {order.totalPrice}
                        </span>

                    </div>

                </div>

            </div>

        </div>

    )
}