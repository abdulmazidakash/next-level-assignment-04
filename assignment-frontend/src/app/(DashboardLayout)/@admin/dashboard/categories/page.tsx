import CreateCategoryModal from "@/components/modal/CreateCategoryModal";
import CategoryTable from "@/components/table/CategoryTable";
import { getCategories } from "@/services/category";


export default async function CategoriesPage() {

  const res = await getCategories();
  const categories = res?.data || [];

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <CreateCategoryModal />
      </div>

      <CategoryTable categories={categories} />

    </div>
  );
}