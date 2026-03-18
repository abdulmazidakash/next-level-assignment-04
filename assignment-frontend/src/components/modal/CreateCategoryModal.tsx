"use client"

import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Plus, Tag, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createCategory } from "@/services/category"
import { cn } from "@/lib/utils"

const categorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
})

export default function CreateCategoryModal() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const form = useForm({
        defaultValues: { name: "" },
        validators: { onSubmit: categorySchema },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating category…")
            try {
                const res = await createCategory(value)
                if (res?.error) {
                    toast.error(res.error.message, { id: toastId })
                    return
                }
                toast.success("Category created!", { id: toastId })
                setOpen(false)
                form.reset()
                router.refresh()
            } catch {
                toast.error("Something went wrong", { id: toastId })
            }
        },
    })

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) form.reset() }}>
            <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 h-9 px-4 rounded-xl border-none bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13.5px] font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all cursor-pointer ">
                    <Plus className="h-4 w-4" />
                    New Category
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-105 rounded-[22px] p-0 overflow-hidden gap-0">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center gap-3 bg-linear-to-r from-amber-50 to-white border-b border-amber-100 px-6 py-5">
                    <div className="w-8.5 h-8.5 rounded-[10px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
                        <Tag className="h-3.75 w-3.75 text-white" />
                    </div>
                    <DialogTitle className="text-[1.1rem] font-bold text-gray-900 mt-0">
                        New Category
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <form
                    onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}
                    className="px-6 py-5 flex flex-col gap-5"
                >
                    <form.Field name="name">
                        {(field) => {
                            const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0
                            return (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[12.5px] font-semibold text-gray-600">
                                        Category Name
                                    </label>
                                    <input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="e.g. Pizza, Sushi, Soup…"
                                        className={cn(
                                            "h-10.5 w-full rounded-2xl border-[1.5px] px-4",
                                            "text-[14px] text-gray-900 placeholder:text-gray-400",
                                            "outline-none transition-colors bg-white",
                                            hasError
                                                ? "border-red-300 focus:border-red-400 bg-red-50/30"
                                                : "border-gray-200 focus:border-orange-400"
                                        )}
                                    />
                                    {hasError && (
                                        <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                                            {typeof field.state.meta.errors[0] === "string"
                                                ? field.state.meta.errors[0]
                                                : field.state.meta.errors[0]?.message}
                                        </p>
                                    )}
                                    {!hasError && (
                                        <p className="text-[11.5px] text-gray-400">
                                            Must be at least 2 characters long
                                        </p>
                                    )}
                                </div>
                            )
                        }}
                    </form.Field>

                    {/* Actions */}
                    <div className="flex gap-2.5 pt-1">
                        <button
                            type="button"
                            onClick={() => { setOpen(false); form.reset() }}
                            className="flex-1 h-10.5 rounded-2xl border border-gray-200 bg-white text-[13.5px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer "
                        >
                            Cancel
                        </button>

                        <form.Subscribe selector={(s) => s.isSubmitting}>
                            {(isSubmitting) => (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "flex-1 h-10.5 rounded-2xl flex items-center justify-center gap-2",
                                        "text-[13.5px] font-semibold text-white border-none cursor-pointer",
                                        "bg-linear-to-br from-orange-500 to-rose-600",
                                        "hover:from-orange-600 hover:to-rose-700",
                                        "shadow-md shadow-rose-200 hover:shadow-rose-300",
                                        "transition-all ",
                                        "disabled:opacity-60 disabled:cursor-not-allowed"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</>
                                    ) : (
                                        <><Plus className="h-4 w-4" /> Create Category</>
                                    )}
                                </button>
                            )}
                        </form.Subscribe>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}