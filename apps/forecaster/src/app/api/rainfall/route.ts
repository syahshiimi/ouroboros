import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("date");

  const url = `https://api-open.data.gov.sg/v2/real-time/api/rainfall?date=${query}`;
  const options = { method: "GET", headers: { accept: "*/*" } };

  console.log("__rainfall_route_handler__", url);
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.error(error);
  }
}
