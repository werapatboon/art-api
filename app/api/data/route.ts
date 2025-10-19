import { NextResponse } from "next/server";
import artworks from "../../../data/arts.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");

  const data = artworks.slice(offset, offset + limit).map((art) => ({
    id: art.id,
    title: art.title,
    title_th: art.title_th,
    artist: art.artist,
    artist_th: art.artist_th,
    year: art.year,
    image: art.image,
    details: art.details,
    details_th: art.details_th,
  }));

  return NextResponse.json(
    {
      total: artworks.length,
      offset,
      limit,
      data,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    }
  );
}

// 👇 เพิ่ม handler สำหรับ preflight OPTIONS request
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
