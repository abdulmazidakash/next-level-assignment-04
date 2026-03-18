import CreateCategoryModal from "@/components/modal/CreateCategoryModal"
import CategoryTable from "@/components/table/CategoryTable"
import { getCategories } from "@/services/category"

export default async function CategoriesPage() {
  const res = await getCategories()
  const categories = res?.data || []

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <div className="max-w-160 mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className=" text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Food{" "}
              <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage meal categories for your platform
            </p>
          </div>

          <CreateCategoryModal />
        </div>

        {/* ── Table ── */}
        <CategoryTable categories={categories} />

      </div>
    </div>
  )
}