import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// SAME schema & model as POST
const ReviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
  ai_response: String,
  summary: String,
  recommendations: String,
  createdAt: { type: Date, default: Date.now }
});

const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: reviews
    });

  } catch (err) {
    console.error("GET /api/reviews ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
