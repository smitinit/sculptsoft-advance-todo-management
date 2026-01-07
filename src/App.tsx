import { useEffect, useState } from "react";
import AddTodo from "./components/TodoForm";
import RenderTodos from "./components/RenderTodos";
import { Dialog } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import FilterTodo from "./components/FilterTodos";

type Todo = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: number;
};

export default function App() {
  // Dialog state
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  // Application Todo State
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // persist the editing todo to pass it in the form
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [editingTodo]);

  // Filter states
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "low" | "medium" | "high"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  // Sync todos with localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo
  function addTodo(newTodo: Todo) {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  // Function to mark a todo as completed
  function markTodoAsCompleted(id: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: "completed" } : todo
      )
    );
  }

  // Filters
  // Priority filter
  function filterByPriority(priority: string) {
    setPriorityFilter(priority as "all" | "low" | "medium" | "high");
  }

  // Status filter
  function filterByStatus(status: string) {
    setStatusFilter(status as "all" | "pending" | "completed");
  }

  // edit todo
  function handleEditTodo(updatedTodo: Todo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
  }

  // Function to clear all todos
  function clearAllTodos() {
    localStorage.removeItem("todos");
    setTodos([]);
    setClearDialogOpen(false);
  }

  // Applying filters
  const filteredTodos = todos.filter((todo) => {
    if (todo.priority !== priorityFilter && priorityFilter !== "all")
      return false;
    if (todo.status !== statusFilter && statusFilter !== "all") return false;
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto space-y-4 my-4 p-5">
      <h1 className="text-2xl text-center my-10">
        Advance Todo Management System
      </h1>
      <AddTodo
        key={editingTodo && editingTodo.id}
        editingTodo={editingTodo}
        handleEditTodo={handleEditTodo}
        canClear={todos.length > 0}
        addTodo={addTodo}
        clearDialogOpen={setClearDialogOpen}
      />
      <FilterTodo
        filterByPriority={filterByPriority}
        filterByStatus={filterByStatus}
        priority={priorityFilter}
        status={statusFilter}
        canFilter={todos.length > 0}
      />
      <RenderTodos
        todos={filteredTodos}
        markAsCompleted={markTodoAsCompleted}
        setEditingTodo={setEditingTodo}
      />

      {/* Delete Confirmation Dialog */}
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
