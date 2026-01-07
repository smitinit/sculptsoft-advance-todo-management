import { useState } from "react";

import type { Todo } from "../type";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";

export default function AddTodo({
  addTodo,
  clearAllTodos,
}: {
  addTodo: (todo: Todo) => void;
  clearAllTodos: () => void;
}) {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    createdAt: 0,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Disable form refresh behavior
    e.preventDefault();

    // We crete a new todo object to get the latest createdAt date
    const newTodo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    // Confirming title is present
    if (!newTodo.title) {
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
        onChange={(e) => setTodo({ ...todo, title: e.target.value.trim() })}
      />
      <Input
        id="description"
        label="Todo Description"
        placeholder="Enter todo description"
        type="text"
        value={todo?.description}
        onChange={(e) =>
          setTodo({ ...todo, description: e.target.value.trim() })
        }
      />

      <Select
        label="Priority"
        id="priority"
        onChange={(e) =>
          setTodo({ ...todo, priority: e.target.value as Todo["priority"] })
        }
        defaultValue={todo.priority}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={todo.title.trim().length === 0}
          variant="default"
        >
          Add
        </Button>
        <Button variant="destructive" onClick={clearAllTodos}>
          Clear
        </Button>
      </div>
    </form>
  );
}
