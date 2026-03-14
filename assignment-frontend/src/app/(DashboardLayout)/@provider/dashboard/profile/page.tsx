import { getOwnProvider } from "@/services/provider"

export default async function ProviderProfilePage() {

  const res = await getOwnProvider()
  const provider = res?.data

  if (!provider) {
    return <div>No provider profile found</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

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

    </div>
  )
}