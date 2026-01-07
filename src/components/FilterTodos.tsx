import { Button } from "./ui/button";
import { Select } from "./ui/select";

export default function FilterTodo({
  filterByPriority,
  filterByStatus,
  priority,
  status,
  canFilter,
}: {
  filterByPriority: (priority: string) => void;
  filterByStatus: (status: string) => void;
  priority: "all" | "low" | "medium" | "high";
  status: "all" | "pending" | "completed";
  canFilter: boolean;
}) {
  return (
    <div className="flex flex-col justify-center items-end w-full mb-4 gap-2">
      <span>Filter by Priority and Status</span>
      <div className="flex gap-4">
        <Button
          disabled={priority === "all" && status === "all"}
          onClick={() => {
            filterByPriority("all");
            filterByStatus("all");
          }}
        >
          Clear
        </Button>
        <Select
          id="priority"
          onChange={(e) => filterByPriority(e.target.value)}
          value={priority}
          disabled={!canFilter}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>

        <Select
          id="status"
          onChange={(e) => filterByStatus(e.target.value)}
          value={status}
          disabled={!canFilter}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </Select>
      </div>
    </div>
  );
}
