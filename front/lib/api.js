export const API_URL = process.env.API_URL || "http://localhost:3000";

export async function getAllStreamers(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(`${API_URL}/streamer`, {
    method: "GET",
    headers,
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error("Failed to fetch API");
  }
  return json;
}
