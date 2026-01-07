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
  // Get initial todos from local storage
  const storedTodos = localStorage.getItem("todos");

  // Application Todo State
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(storedTodos as string) ?? []
  );

  // Function to add a new todo
  function addTodo(newTodo: Todo) {
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  // Function to clear all todos
  function clearAllTodos() {
    localStorage.clear();
    setTodos([]);
  }

  return (
    <main className="max-w-2xl mx-auto space-y-4 my-4">
      <h1 className="text-2xl text-center my-10">
        Advance Todo Management System
      </h1>
      <AddTodo addTodo={addTodo} clearAllTodos={clearAllTodos} />
      <RenderTodos todos={todos} />
    </main>
  );
}
