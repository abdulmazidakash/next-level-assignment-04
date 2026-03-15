"use client";


import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteCategory } from "@/services/category";

export default function DeleteCategoryDialog({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");

    try {
      await deleteCategory(id);

      toast.success("Category deleted", { id: toastId });

      router.refresh();
    } catch {
      toast.error("Delete failed", { id: toastId });
    }
  };

  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this category?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}