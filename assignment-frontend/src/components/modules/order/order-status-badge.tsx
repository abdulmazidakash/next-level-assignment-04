import { Badge } from "@/components/ui/badge"

export function OrderStatusBadge({ status }: { status: string }) {

  if (status === "PLACED") {
    return <Badge variant="secondary">Placed</Badge>
  }

  if (status === "DELIVERED") {
    return <Badge className="bg-green-500">Delivered</Badge>
  }

  return <Badge variant="destructive">Cancelled</Badge>
}