/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import Image from "next/image";
import ViewMealDialog from "./ViewMealDialog";
import UpdateMealDialog from "./UpdateMealDialog";
import DeleteMealButton from "./DeleteMealButton";

export default function ProviderMealsTable({ meals }: any) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {meals.map((meal: any) => (
                    <TableRow key={meal.id}>
                        <TableCell>
                            <Image
                            alt={meal?.title}
                                width={48}
                                height={48}
                                src={meal.imageUrl}
                                className="h-12 w-12 rounded object-cover"
                            />
                        </TableCell>

                        <TableCell>{meal.name}</TableCell>

                        <TableCell>৳ {meal.price}</TableCell>

                        <TableCell>
                            {meal.isAvailable ? "Available" : "Unavailable"}
                        </TableCell>

                        <TableCell className="flex gap-2">
                            <ViewMealDialog meal={meal} />
                            <UpdateMealDialog meal={meal} />
                            <DeleteMealButton id={meal.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}