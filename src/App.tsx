import { useState } from "react";
import AddTodo from "./components/AddTodo";
import RenderTodos from "./components/RenderTodos";
import { Dialog } from "./components/ui/dialog";
import { Button } from "./components/ui/button";

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

  // Dialog state
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
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
    setClearDialogOpen(false);
  }

  return (
    <main className="max-w-2xl mx-auto space-y-4 my-4">
      <h1 className="text-2xl text-center my-10">
        Advance Todo Management System
      </h1>
      <AddTodo addTodo={addTodo} clearDialogOpen={setClearDialogOpen} />
      <RenderTodos todos={todos} />

      <Dialog
        open={clearDialogOpen}
        title="Delete Todo"
        description="This action cannot be undone."
        onClose={() => setClearDialogOpen(false)}
      >
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={clearAllTodos}>
            Delete
          </Button>
        </div>
      </Dialog>
    </main>
  );
}
