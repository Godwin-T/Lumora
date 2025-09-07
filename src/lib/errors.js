export function parseApiError(error, fallback = "Something went wrong") {
  const detail = error.response?.data?.detail;

  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((err) => err.msg).join(", ");

  return fallback;
}
