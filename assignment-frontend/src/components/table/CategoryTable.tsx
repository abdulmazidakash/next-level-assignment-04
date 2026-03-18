/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteCategoryDialog from "../dialog/DeleteCategoryDialog"
import { Tag } from "lucide-react"

// Rotating gradient palette for category dots
const DOT_GRADIENTS = [
  "from-orange-500 to-rose-600",
  "from-teal-600 to-emerald-500",
  "from-blue-600 to-sky-400",
  "from-violet-600 to-purple-500",
  "from-amber-700 to-amber-500",
  "from-green-700 to-green-500",
]

export default function CategoryTable({ categories }: any) {
  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[9px] bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Tag className="h-3.5 w-3.5 text-amber-700" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Categories
          </h2>
        </div>
        <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-semibold px-3 py-1 rounded-full">
          {categories?.length ?? 0} categories
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#faf7f3]">
              <th className="px-4 py-3 text-left text-[11px] font-bold tracking-[0.06em] uppercase text-gray-400 border-b border-gray-100">
                Category Name
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-bold tracking-[0.06em] uppercase text-gray-400 border-b border-gray-100">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {!categories?.length ? (
              <tr>
                <td colSpan={2} className="text-center py-10 text-sm text-gray-400 italic">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat: any, i: number) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-[#fdf9f5] transition-colors"
                >
                  {/* Name */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 bg-linear-to-br ${DOT_GRADIENTS[i % DOT_GRADIENTS.length]}`}
                      />
                      <span className="font-semibold text-[14px] text-gray-900">
                        {cat.name}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3.5 text-right">
                    <DeleteCategoryDialog id={cat.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}