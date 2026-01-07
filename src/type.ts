export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: number;
};
