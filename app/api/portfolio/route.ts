import { NextResponse } from "next/server";
import { mockProfileData } from "@/lib/mock-data";
import { PortfolioSubmission } from "@/lib/types";

// This is a mock API endpoint that would extract data from a portfolio URL
export async function POST(request: Request) {
  try {
    const body: PortfolioSubmission = await request.json();
    
    // Validate the URL (basic validation for demo)
    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid URL provided" },
        { status: 400 }
      );
    }
    
    // In a real application, this would:
    // 1. Process the URL and extract data from the portfolio
    // 2. Create a new user profile with the extracted data
    // 3. Return the created profile
    
    // For demo purposes, we'll return mock data after a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock data
    return NextResponse.json({
      success: true,
      data: {
        ...mockProfileData,
        profileUrl: `https://app.joinroster.co/${mockProfileData.username}`
      }
    });
    
  } catch (error) {
    console.error("Error processing portfolio:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process portfolio" },
      { status: 500 }
    );
  }
}

// This would get a profile by username
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    
    if (!username) {
      return NextResponse.json(
        { success: false, error: "Username is required" },
        { status: 400 }
      );
    }
    
    // In a real application, this would fetch the user profile from a database
    // For demo purposes, we'll return mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      data: mockProfileData
    });
    
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}