import { useState } from "react";

import type { Todo } from "../type";

export default function AddTodo({
  addTodo,
}: {
  addTodo: (todo: Todo) => void;
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Todos!</h1>
      <label htmlFor="title">Todo Title: </label>
      <input
        id="title"
        type="title"
        name="title"
        onChange={(e) => setTodo({ ...todo, title: e.target.value.trim() })}
        value={todo?.title}
      />
      <label htmlFor="description">Todo Description: </label>
      <input
        id="description"
        type="description"
        name="description"
        onChange={(e) =>
          setTodo({ ...todo, description: e.target.value.trim() })
        }
        value={todo?.description}
      />
      <select
        name="priority"
        id="priority"
        value={todo?.priority}
        onChange={(e) =>
          setTodo({ ...todo, priority: e.target.value as Todo["priority"] })
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        value="submit"
        disabled={todo.title.trim().length === 0}
      >
        Add
      </button>
    </form>
  );
}
