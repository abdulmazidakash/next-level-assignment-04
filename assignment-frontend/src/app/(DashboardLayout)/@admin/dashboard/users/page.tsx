

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import { UserStatusBadge } from "@/components/modules/user/user-status-badge"

import { User } from "@/types/user"
import { getAllUsers, updateUserStatus } from "@/services/User"

export default async function UsersPage() {

  const res = await getAllUsers()

  const users: User[] = res?.data

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        User Management
      </h1>

      <Table>

        <TableHeader>

          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>

          {users.map((user) => (

            <TableRow key={user.id}>

              <TableCell className="font-medium">
                {user.name}
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>
                {user.role}
              </TableCell>

              <TableCell>
                <UserStatusBadge status={user.status} />
              </TableCell>

              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>

                {user.status === "ACTIVE" ? (

                  <form
                    action={updateUserStatus.bind(
                      null,
                      user.id,
                      "SUSPENDED"
                    )}
                  >

                    <Button
                      variant="destructive"
                      size="sm"
                      type="submit"
                    >
                      Suspend
                    </Button>

                  </form>

                ) : (

                  <form
                    action={updateUserStatus.bind(
                      null,
                      user.id,
                      "ACTIVE"
                    )}
                  >

                    <Button
                      size="sm"
                      type="submit"
                    >
                      Activate
                    </Button>

                  </form>

                )}

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>

  )
}