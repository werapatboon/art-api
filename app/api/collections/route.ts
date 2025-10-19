import { NextResponse } from "next/server";
import { Artwork } from "../../../src/types/art";
import artworksData from "../../../data/arts.json";

const artworks: Artwork[] = artworksData as Artwork[];


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

function generateCollectionsByStyle() {
  const grouped = artworks.reduce((acc: Record<string, Artwork[]>, art: Artwork) => {
  if (!acc[art.style]) acc[art.style] = [];
  acc[art.style].push(art);
  return acc;
}, {});

  return Object.keys(grouped).map((style, index) => ({
    id: index + 1,
    title: `${style} Collection`,
    title_th: `คอลเล็กชันแนว ${style}`,
    description: `A curated collection of artworks in the ${style} style.`,
    description_th: `คอลเล็กชันผลงานศิลปะแนว ${style}`,
    artworks: grouped[style],
  }));
}

export async function GET() {
  const collections = generateCollectionsByStyle();
  return NextResponse.json(collections, { headers: corsHeaders });
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
