// app/api/exalinkedin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { websiteurl } = await req.json();
    if (!websiteurl) {
      return NextResponse.json({ error: 'Website URL is required' }, { status: 400 });
    }

    // Use Exa to search for content related to the claim
    const result = await exa.searchAndContents(
      `${websiteurl} Linkedin profile:`,
      {
        type: "keyword",
        text: true,
        numResults: 1,
        livecrawl: "always",
        category: "linkedin profile"
      }
    );

    return NextResponse.json({ results: result.results });
  } catch (error) {
    return NextResponse.json({ error: `Failed to perform search | ${error}` }, { status: 500 });
  }
}