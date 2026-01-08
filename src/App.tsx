import { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import RenderTodos from "./components/RenderTodos";
import FilterTodo from "./components/FilterTodos";

import { Dialog } from "./components/ui/dialog";
import { Button } from "./components/ui/button";

import type { Todo } from "./type";

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

  // Persist the editing todo to pass it in the form
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Scroll to top when click on edit todo
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
  function toggleTodoStatus(id: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        const activeStatus =
          todo.status === "completed" ? "pending" : "completed";
        return todo.id === id ? { ...todo, status: activeStatus } : todo;
      })
    );
  }

  // Both Filters
  // Priority filter
  function filterByPriority(priority: string) {
    setPriorityFilter(priority as "all" | "low" | "medium" | "high");
  }

  // Status filter
  function filterByStatus(status: string) {
    setStatusFilter(status as "all" | "pending" | "completed");
  }

  // Edit todo
  function handleEditTodo(updatedTodo: Todo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
  }

  // Delete a todo
  function deleteTodo(id: string) {
    const choice = confirm("Are you sure, Delete this todo?");
    if (!choice) return;
    setTodos((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
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

      {/* Todo add / update form */}
      <TodoForm
        key={editingTodo && editingTodo.id}
        editingTodo={editingTodo}
        handleEditTodo={handleEditTodo}
        canClear={todos.length > 0}
        addTodo={addTodo}
        clearDialogOpen={setClearDialogOpen}
      />

      {/* Filter todo buttons */}
      <FilterTodo
        filterByPriority={filterByPriority}
        filterByStatus={filterByStatus}
        priority={priorityFilter}
        status={statusFilter}
        canFilter={todos.length > 0}
      />

      {/* Render the list of todo in tabular format */}
      <RenderTodos
        todos={filteredTodos}
        toggleTodoStatus={toggleTodoStatus}
        setEditingTodo={setEditingTodo}
        deleteTodo={deleteTodo}
      />

      {/* Delete Confirmation Dialog -> root level */}
      <Dialog
        open={clearDialogOpen}
        title="Clear All Todo!"
        description="This action cannot be undone."
        onClose={() => setClearDialogOpen(false)}
      >
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={() => setClearDialogOpen(false)}>No</Button>
          <Button variant="destructive" onClick={clearAllTodos}>
            Yes, Clear
          </Button>
        </div>
      </Dialog>
    </main>
  );
}
