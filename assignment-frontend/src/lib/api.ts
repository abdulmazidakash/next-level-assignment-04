const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
      ...(options?.headers || {}),
    },
  });

  return res.json();
}