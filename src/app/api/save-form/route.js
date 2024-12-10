// app/api/save-form/route.js

import { NextResponse } from "next/server";

// Handle POST requests to save form data
export async function POST(request) {
    try {
        const data = await request.json();

        // Mock saving data (replace with actual database logic)
        console.log("Received form data:", data);

        // Send a success response
        return NextResponse.json({ message: "Form data saved successfully!", data }, { status: 200 });
    } catch (error) {
        console.error("Error saving form data:", error);
        return NextResponse.json({ error: "Failed to save form data" }, { status: 500 });
    }
}
