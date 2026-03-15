"use client";


import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { createCategory } from "@/services/category";

const categorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
});

export default function CreateCategoryModal() {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
        },

        validators: {
            onSubmit: categorySchema,
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating category...");

            try {
                const res = await createCategory(value);

                if (res?.error) {
                    toast.error(res.error.message, { id: toastId });
                    return;
                }

                toast.success("Category created", { id: toastId });

                router.refresh();
            } catch {
                toast.error("Something went wrong", { id: toastId });
            }
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Category</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                </DialogHeader>

                <form
                    id="category-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field name="name">
                            {(field) => (
                                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                                    <FieldLabel>Category Name</FieldLabel>

                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Pizza"
                                    />

                                    <FieldError errors={field.state.meta.errors} />
                                </Field>
                            )}
                        </form.Field>

                    </FieldGroup>

                    <Button
                        type="submit"
                        className="w-full mt-4"
                    >
                        Create
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}