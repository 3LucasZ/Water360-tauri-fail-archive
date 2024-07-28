export async function under360(route: string, params?: Record<string, string>) {
  const res = await fetch("/api/under360", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: route + "?" + new URLSearchParams(params).toString(),
    }),
  });
  return res;
}
