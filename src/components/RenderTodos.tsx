import type { Todo } from "../type";
import { Button } from "./ui/button";

const TableHeadings = [
  "Sr.No.",
  "Title",
  "Description",
  "Priority",
  "Created At",
  "Status",
  "Action",
  "Edit",
];
export default function RenderTodos({
  todos,
  markAsCompleted,
  setEditingTodo,
}: {
  todos: Todo[];
  markAsCompleted: (id: string) => void;
  setEditingTodo: (todo: Todo) => void;
}) {
  if (todos.length === 0) {
    return (
      <p className="text-center mt-10 text-lg font-medium">
        No todos available!
      </p>
    );
  }
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-225 w-full table-auto text-center border border-slate-200">
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
          {todos.map(
            (
              { id, title, description, priority, createdAt, status },
              index
            ) => {
              // Apply strikethrough style for completed todos
              const strikethroughClass =
                status === "completed" ? "line-through text-gray-500" : "";

              // Format createdAt date
              const createdDate = new Date(createdAt);
              const createdAtFormatted = createdDate.toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              );
              return (
                <tr key={id} className={strikethroughClass}>
                  <td className="p-4">{index + 1}</td>
                  <td className="text-left wrap-break-word whitespace-normal max-w-2xs p-4">
                    {title}
                  </td>
                  <td className="text-left wrap-break-word whitespace-normal max-w-xs p-4">
                    {description}
                  </td>
                  <td>{priority}</td>
                  <td>{createdAtFormatted}</td>
                  <td>{status === "pending" ? "Pending" : "Completed"}</td>
                  <td>
                    <Button
                      variant="default"
                      disabled={status === "completed"}
                      onClick={() => markAsCompleted(id)}
                    >
                      {status === "pending" ? "Mark as completed" : "completed"}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="default"
                      disabled={status === "completed"}
                      onClick={() => {
                        setEditingTodo(todos[index]);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
