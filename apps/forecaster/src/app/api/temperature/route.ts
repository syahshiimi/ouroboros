export async function GET() {
  const url =
    "https://api-open.data.gov.sg/v2/real-time/api/air-temperature?date=2024-07-06T23%3A59%3A00";
  const options = { method: "GET", headers: { accept: "*/*" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.error(error);
  }
}
