import { formatDate } from "../lib/util";
import type { Todo } from "../type";
import { Button } from "./ui/button";

// All table headings in a array
const TableHeadings = [
  "Sr.No.",
  "Title",
  "Description",
  "Priority",
  "Created At",
  "Status",
  "Action",
  "Edit",
  "Delete",
];
export default function RenderTodos({
  todos,
  toggleTodoStatus,
  setEditingTodo,
  deleteTodo,
}: {
  todos: Todo[];
  toggleTodoStatus: (id: string) => void;
  setEditingTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}) {
  // Fallback on todos.length = 0
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
              const formattedDate = formatDate(createdAt);
              return (
                <tr key={id} className={strikethroughClass}>
                  <td className="p-4">{index + 1}</td>
                  <td className="text-left wrap-break-word whitespace-normal max-w-2xs p-4">
                    {title}
                  </td>
                  <td className="wrap-break-word whitespace-normal max-w-xs p-2">
                    {description}
                  </td>
                  <td>{priority}</td>
                  <td>{formattedDate}</td>
                  <td>{status === "pending" ? "Pending" : "Completed"}</td>
                  <td>
                    <Button
                      variant="default"
                      onClick={() => toggleTodoStatus(id)}
                    >
                      {status === "pending"
                        ? "Mark as completed"
                        : "Mark as Pending"}
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
                  <td>
                    <Button
                      variant="destructive"
                      onClick={() => deleteTodo(id)}
                    >
                      Delete
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
