import Link from "next/link"
import { getMyOrders } from "@/services/order"
import { Order } from "@/types/order"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { OrderStatusBadge } from "@/components/modules/order/order-status-badge"

export default async function OrdersPage() {

  const res = await getMyOrders()

  const orders: Order[] = res.data

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        My Orders
      </h1>

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Restaurant</TableHead>
            <TableHead>Meals</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>

          {orders.map((order) => (

            <TableRow key={order.id}>

              <TableCell className="font-medium">
                {order.id.slice(0, 8)}...
              </TableCell>

              <TableCell>
                {order.provider.restaurantName}
              </TableCell>

              <TableCell>
                {order.items.length}
              </TableCell>

              <TableCell>
                ৳ {order.totalPrice}
              </TableCell>

              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>

              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>

                <Link href={`/orders/${order.id}`}>

                  <Button size="sm">
                    View
                  </Button>

                </Link>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>

  )
}