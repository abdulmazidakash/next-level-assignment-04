import { getOwnProvider } from "@/services/provider";
import { UpdateProviderFormClient } from "@/components/form/UpdateProviderFormClient";

export const dynamic = "force-dynamic";


export default async function UpdateProviderPage() {

  const res = await getOwnProvider()

  const provider = res?.data

  return (
    <div className="flex justify-center py-10 bg-[#f7f2ec] rounded-2xl container mx-auto">
      <UpdateProviderFormClient provider={provider} />
    </div>
  );
}