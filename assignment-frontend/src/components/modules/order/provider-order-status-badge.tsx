"use client"

import { Badge } from "@/components/ui/badge"

interface Props {
  status: string
}

export default function OrderStatusBadge({ status }: Props) {
  const getColor = () => {
    switch (status) {
      case "PLACED":
        return "bg-gray-500"

      case "PREPARING":
        return "bg-yellow-500"

      case "READY":
        return "bg-blue-500"

      case "DELIVERED":
        return "bg-green-600"

      default:
        return "bg-gray-400"
    }
  }

  return (
    <Badge className={`${getColor()} text-white`}>
      {status}
    </Badge>
  )
}