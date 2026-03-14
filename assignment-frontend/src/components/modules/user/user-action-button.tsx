"use client"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

interface Props {
  userId: string
  nextStatus: "ACTIVE" | "SUSPENDED"
  action: (formData: FormData) => void
}

export default function UserActionButton({
  userId,
  nextStatus,
  action,
}: Props) {

  const isSuspend = nextStatus === "SUSPENDED"

  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant={isSuspend ? "destructive" : "default"}
        >
          {isSuspend ? "Suspend" : "Activate"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Are you sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will {isSuspend ? "suspend" : "activate"} the user.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <form action={action}>

            <input
              type="hidden"
              name="userId"
              value={userId}
            />

            <input
              type="hidden"
              name="status"
              value={nextStatus}
            />

            <AlertDialogAction type="submit">
              Yes, Continue
            </AlertDialogAction>

          </form>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  )
}