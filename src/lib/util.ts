// Format date helper
export function formatDate(value: number | undefined) {
  if (value === undefined) return;
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
