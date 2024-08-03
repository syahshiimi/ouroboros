export async function GET() {
  const url =
    "https://api.data.gov.sg/v1/environment/relative-humidity?date_time=2024-07-20T12%3A12%3A12";
  const options = { method: "GET", headers: { accept: "*/*" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.error(error);
  }
}
