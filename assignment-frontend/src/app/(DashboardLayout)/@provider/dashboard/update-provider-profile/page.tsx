import { getOwnProvider } from "@/services/provider";
import { UpdateProviderFormClient } from "@/components/form/UpdateProviderFormClient";

export default async function UpdateProviderPage() {

  const res = await getOwnProvider()

  const provider = res?.data

  return (
    <div className="flex justify-center py-10">
      <UpdateProviderFormClient provider={provider} />
    </div>
  );
}