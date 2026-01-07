import { useState } from "react";

import type { Todo } from "../type";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";

export default function AddTodo({
  editingTodo,
  handleEditTodo,
  canClear,
  addTodo,
  clearDialogOpen,
}: {
  editingTodo: Todo | null;
  handleEditTodo: (updatedTodo: Todo) => void;
  canClear: boolean;
  addTodo: (todo: Todo) => void;
  clearDialogOpen: (value: boolean) => void;
}) {
  const [todo, setTodo] = useState<Todo>(() => {
    if (editingTodo !== null) {
      return editingTodo;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        createdAt: 0,
      };
    }
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Disable form refresh behavior
    e.preventDefault();

    // If we are editing an existing todo
    if (editingTodo) {
      const updatedTodo = {
        ...todo,
        id: editingTodo.id,
        createdAt: editingTodo.createdAt,
      };
      handleEditTodo(updatedTodo);
      // Currently editing, so we do not add a new todo
      return;
    }
    // We crete a new todo object to get the latest createdAt date
    const newTodo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    // Confirming title is present
    if (!newTodo.title.trim()) {
      // Edge case
      alert("Title is required");
      return;
    }

    // Adding the new todo to the todo list
    addTodo(newTodo);

    // Resetting the form
    setTodo({
      id: "",
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      createdAt: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-4">
      <Input
        id="title"
        label="Todo Title"
        placeholder="Enter todo title"
        type="text"
        value={todo?.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <Input
        id="description"
        label="Todo Description"
        placeholder="Enter todo description"
        type="text"
        value={todo?.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />

      <Select
        label="Priority"
        id="priority"
        onChange={(e) =>
          setTodo({ ...todo, priority: e.target.value as Todo["priority"] })
        }
        value={todo.priority}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>

      {/* show some ux  */}
      {editingTodo ? (
        <p className="text-sm text-gray-600">
          Editing Todo created on:{" "}
          <b>
            {new Date(editingTodo.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </b>{" "}
          and status: <b>{editingTodo.status}</b>
        </p>
      ) : null}
      <div className="flex gap-3">
        <Button type="submit" variant="default">
          {editingTodo ? "Save" : "Add"}
        </Button>
        <Button
          disabled={!canClear || editingTodo !== null}
          variant="destructive"
          onClick={() => clearDialogOpen(true)}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}
