import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { getAllPublicProviders } from "@/services/provider"
import { Provider } from "@/types/provider";

export default async function ProvidersPage() {

    const { data } = await getAllPublicProviders();
    console.log(data)


    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Food Providers
            </h1>

            <Table>

                <TableHeader>

                    <TableRow>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Meals</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>

                </TableHeader>

                <TableBody>

                    {data?.map((provider: Provider) => (

                        <TableRow key={provider.id}>

                            <TableCell>
                                {provider.restaurantName}
                            </TableCell>

                            <TableCell>
                                {provider.user.name}
                            </TableCell>

                            <TableCell>
                                {provider.address}
                            </TableCell>

                            <TableCell>
                                {provider._count.meals}
                            </TableCell>

                            <TableCell>

                                <Link href={`/providers/${provider.id}`}>
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