"use client"

import { useState } from "react"
import { Trash2, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { deleteMeal } from "@/services/Meal"

export default function DeleteMealDialog({ id }: { id: string }) {
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await deleteMeal(id)
      if (res?.success) {
        toast.success("Category deleted")
        setOpen(false)
        router.refresh()
      } else {
        toast.error(res?.message ?? "Failed to delete")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[9px] border-[1.5px] border-red-200 bg-red-50 text-red-500 text-[12px] font-semibold hover:bg-red-100 hover:border-red-300 hover:-translate-y-0.5 transition-all"
      >
        <Trash2 className="h-3.5 w-3.5" />
        
      </button>

      {/* Confirmation dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm rounded-2xl p-0 overflow-hidden gap-0">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <Trash2 className="h-4.5 w-4.5 text-red-500" />
              </div>
              <DialogTitle className=" text-lg font-bold text-gray-900">
                Delete Meal
              </DialogTitle>
            </div>
            <DialogDescription className="text-[13.5px] text-gray-500 leading-relaxed mt-1">
              This will permanently remove the meal and cannot be undone.
              Any meals linked to it may be affected.
            </DialogDescription>
          </DialogHeader>

          {/* Footer */}
          <DialogFooter className="px-6 py-4 flex gap-2.5 sm:flex-row">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 h-10 rounded-2xl border border-gray-200 bg-white text-[13.5px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className={cn(
                "flex-1 h-10 rounded-2xl flex items-center justify-center gap-2",
                "text-[13.5px] font-semibold text-white border-none",
                "bg-linear-to-br from-red-500 to-rose-600",
                "hover:from-red-600 hover:to-rose-700",
                "shadow-md shadow-red-200 hover:shadow-red-300",
                "transition-all cursor-pointer",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Deleting…</>
              ) : (
                <><Trash2 className="h-4 w-4" /> Yes, Delete</>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}