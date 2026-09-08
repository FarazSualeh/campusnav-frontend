import { NextRequest, NextResponse } from "next/server";
import { findShortestPath } from "@/lib/dijkstra";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      { error: "Missing required query parameters: 'start' and 'end'" },
      { status: 400 }
    );
  }

  try {
    const result = findShortestPath(start, end);

    if (!result.path || result.path.length === 0) {
      return NextResponse.json(
        { error: `No path found between ${start} and ${end}`, path: [], totalDistance: 0 },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error computing route:", error);
    return NextResponse.json(
      { error: "Internal server error calculating route" },
      { status: 500 }
    );
  }
}
