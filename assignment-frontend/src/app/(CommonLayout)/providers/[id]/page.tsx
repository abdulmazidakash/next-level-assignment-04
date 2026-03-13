/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { getSinglePublicProvider } from "@/services/provider"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProviderPage({ params }: PageProps) {

  const { id } = await params

  const result = await getSinglePublicProvider(id);
  console.log('result single===> ', result)

  const provider = result?.data

  if (!provider) {
    return <p className="text-center py-10">Provider not found</p>
  }

  return (
    <div className="space-y-10">

      {/* Provider Info */}

      <div className="space-y-2">

        <h1 className="text-3xl font-bold">
          {provider.restaurantName}
        </h1>

        <p className="text-muted-foreground">
          {provider.address}
        </p>

        <Badge>
          Owner: {provider.user?.name}
        </Badge>

      </div>


      {/* Meals Table */}

      <div className="space-y-4">

        <h2 className="text-xl font-semibold">
          Meals
        </h2>

        <Table>

          <TableHeader>

            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>

          </TableHeader>

          <TableBody>

            {provider.meals?.map((meal: any) => (

              <TableRow key={meal.id}>

                <TableCell>
                  {meal.name}
                </TableCell>

                <TableCell>
                  ${meal.price}
                </TableCell>

                <TableCell>

                  <Button size="sm">
                    Order
                  </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

    </div>
  )
}