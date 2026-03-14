/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllOrders } from "@/services/order"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

export default async function AdminOrdersPage() {

  const res = await getAllOrders()

  const orders = res.data

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        All Orders
      </h1>

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Meals</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>

          {orders.map((order: any) => (

            <TableRow key={order.id}>

              <TableCell>
                {order.id.slice(0,8)}...
              </TableCell>

              <TableCell>
                {order.customer.name}
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
                {order.status}
              </TableCell>

              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>

  )
}

