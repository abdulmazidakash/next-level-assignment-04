/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useTransition } from "react"
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { updateOrderStatus } from "@/services/provider"

interface Props {
  orderId: string
  currentStatus: string
}

export default function OrderStatusDropdown({
  orderId,
  currentStatus,
}: Props) {

  const [pending, startTransition] = useTransition()

  const handleChange = (value: string) => {

    startTransition(async () => {
      try {

        await updateOrderStatus(orderId, value)

        toast.success("Order status updated")

      } catch (error) {

        toast.error("Failed to update order",)

      }
    })
  }

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={handleChange}
      disabled={pending}
    >
      <SelectTrigger className="w-37.5">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="PLACED">PLACED</SelectItem>
        <SelectItem value="PREPARING">PREPARING</SelectItem>
        <SelectItem value="READY">READY</SelectItem>
        <SelectItem value="DELIVERED">DELIVERED</SelectItem>
      </SelectContent>

    </Select>
  )
}