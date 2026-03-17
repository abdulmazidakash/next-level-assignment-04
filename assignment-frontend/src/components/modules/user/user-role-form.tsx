"use client"

import { useState } from "react"
import { updateUserRole } from "@/services/User"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface Props {
  userId: string
  role: string
}

export default function UserRoleForm({ userId, role }: Props) {

  const [loading, setLoading] = useState(false)

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    const newRole = e.target.value

    try {

      setLoading(true)

      const res = await updateUserRole(userId, newRole as any);
      console.log('user role form result: ===>', res)


      if (res?.success) {
        toast.success("User role updated successfully")
      } else {
        toast.error(res?.message || "Failed to update role")
      }

    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="flex items-center gap-2">

      <select
        defaultValue={role}
        onChange={handleChange}
        disabled={loading}
        className="border rounded px-2 py-1"
      >
        <option value="CUSTOMER">Customer</option>
        <option value="PROVIDER">Provider</option>
        <option value="ADMIN">Admin</option>
      </select>

      {loading && (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}

    </div>

  )
}