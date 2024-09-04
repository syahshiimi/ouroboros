import { getCurrentDate } from "@/utils/date";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const date = getCurrentDate();
  console.log("__rainfall_route_date", date);

  const url = `https://api-open.data.gov.sg/v2/real-time/api/rainfall?date=${date}`;
  const options = { method: "GET", headers: { accept: "*/*" } };

  console.log("__rainfall_route_handler__", url);
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
}
