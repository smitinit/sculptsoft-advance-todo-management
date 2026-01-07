import type { Todo } from "../type";

const TableHeadings = [
  "Sr.No.",
  "Title",
  "Description",
  "Priority",
  "Created At",
  "Delete",
];
export default function RenderTodos({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return (
      <p className="text-center mt-10 text-lg font-medium">
        No todos available. Start by adding one!
      </p>
    );
  }
  return (
    <table className="w-full min-w-max table-auto text-center">
      <thead>
        <tr>
          {TableHeadings.map((heading) => (
            <th key={heading} className="border-b border-slate-200 px-4 py-3">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {todos.map(({ id, title, description, priority, createdAt }, index) => {
          return (
            <tr key={id}>
              <td className="p-4">{index + 1}</td>
              <td>{title}</td>
              <td>{description}</td>
              <td>{priority}</td>
              <td>{createdAt}</td>
              <td>
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
