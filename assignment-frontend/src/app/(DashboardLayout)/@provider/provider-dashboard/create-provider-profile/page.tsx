import { getOwnProvider } from "@/services/provider";
import { CreateProviderFormClient } from "@/components/form/CreateProviderFormClient";

export const dynamic = "force-dynamic";


export default async function ProviderProfilePage() {

  const res = await getOwnProvider()

  const provider = res?.data

  // profile exists
  if (provider) {
    return (
      <div className="max-w-xl mx-auto py-10">

        <h2 className="text-xl font-bold">
          Provider Profile Already Exists
        </h2>

        <p className="mt-3">
          Restaurant: {provider.restaurantName}
        </p>

        <p>
          Address: {provider.address}
        </p>

      </div>
    )
  }

  // profile not exists → show form
  return (
    <div className="flex justify-center py-10 rounded-2xl container mx-auto bg-[#f7f2ec]">
      <CreateProviderFormClient />
    </div>
  )
}