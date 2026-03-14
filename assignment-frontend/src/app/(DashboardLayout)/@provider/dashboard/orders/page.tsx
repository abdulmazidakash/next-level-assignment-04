/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProviderOrders } from "@/services/provider"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import OrderStatusBadge from "@/components/modules/order/provider-order-status-badge"
import OrderStatusDropdown from "@/components/modules/order/provider-order-status-dropdown"

export default async function ProviderOrdersPage() {

  const res = await getProviderOrders()

  const orders = res?.data

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Incoming Orders</h1>

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>

          {orders?.map((order: any) => (

            <TableRow key={order.id}>

              <TableCell>{order.id.slice(0, 8)}</TableCell>

              <TableCell>{order.customer.name}</TableCell>

              <TableCell>৳ {order.totalPrice}</TableCell>

              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>

              <TableCell>
                <OrderStatusDropdown
                  orderId={order.id}
                  currentStatus={order.status}
                />
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  )
}