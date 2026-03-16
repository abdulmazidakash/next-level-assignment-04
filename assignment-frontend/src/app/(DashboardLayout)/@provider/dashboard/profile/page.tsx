import { Button } from "@/components/ui/button"
import { getOwnProvider } from "@/services/provider"
import Link from "next/link"

export default async function ProviderProfilePage() {

  const res = await getOwnProvider()
  const provider = res?.data

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Top Action Button */}
      <div className="flex justify-end mb-4">

        {!provider ? (
          <Link href="/dashboard/create-provider-profile">
            <Button>Create Provider Profile</Button>
          </Link>
        ) : (
          <Link href="/dashboard/update-provider-profile">
            <Button variant="outline">Edit Profile</Button>
          </Link>
        )}

      </div>

      {/* If profile does not exist */}
      {!provider && (
        <div className="text-center py-20 text-gray-500">
          No provider profile found
        </div>
      )}

      {/* Provider Profile */}
      {provider && (
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">

          <h1 className="text-3xl font-bold">
            {provider.restaurantName}
          </h1>

          <p className="text-gray-600">
            {provider.bio}
          </p>

          <div className="grid grid-cols-2 gap-6 mt-6">

            <div>
              <p className="text-gray-500 text-sm">Cuisine</p>
              <p className="font-medium">{provider.cuisineType}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-medium">{provider.address}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Owner</p>
              <p className="font-medium">{provider.user.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{provider.user.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Meals</p>
              <p className="font-medium">{provider.meals?.length || 0}</p>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}