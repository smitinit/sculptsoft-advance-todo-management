import type { Todo } from "../type";

export default function RenderTodos({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return <p>No todos available. Start by adding one!</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Sr.No.</th>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Created At</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todos.indexOf(todo) + 1}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.priority}</td>
            <td>{todo.createdAt}</td>
            <td>Delete</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
