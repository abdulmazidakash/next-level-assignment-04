/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteCategoryDialog from "../dialog/DeleteCategoryDialog";


export default function CategoryTable({ categories }: any) {
  return (
    <div className="border rounded-lg">
      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories?.map((cat: any) => (
            <tr key={cat.id} className="border-b">

              <td className="p-3">
                {cat.name}
              </td>

              <td className="p-3 text-right">
                <DeleteCategoryDialog id={cat.id} />
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}