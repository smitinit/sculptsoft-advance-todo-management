import { useState } from "react";
import AddTodo from "./components/AddTodo";
import RenderTodos from "./components/RenderTodos";

type Todo = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: number;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(newTodo: Todo) {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  console.log(todos);
  return (
    <>
      <h1>Advance Todo Management System</h1>
      <AddTodo addTodo={addTodo} />
      <RenderTodos todos={todos} />
    </>
  );
}
