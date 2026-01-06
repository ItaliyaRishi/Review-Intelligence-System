import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

/* =======================
   MONGOOSE SCHEMA
======================= */

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
  ai_response: String,
  summary: String,
  recommendations: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review =
  mongoose.models.Review ||
  mongoose.model("Review", ReviewSchema);

/* =======================
   POST /api/review
======================= */

export async function POST(req) {
  try {
    await connectDB();

    const { rating, review } = await req.json();

    if (!rating || !review || review.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating and review are required"
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY missing");
    }

    /* -------- PROMPT -------- */

    const prompt = `
You are a customer feedback assistant.

Rating: ${rating}
Review: ${review}

Tasks:
1. Write a polite user-facing response (2 sentences)
2. Summarize the review in 1 sentence
3. Suggest 2 recommended actions for the business

Return ONLY valid JSON:
{
  "response": "",
  "summary": "",
  "recommendations": []
}
`;

    /* -------- LLM CALL -------- */

    const llmRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Fynd AI Task 2"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.3
        })
      }
    );

    const llmData = await llmRes.json();

    const rawText =
      llmData?.choices?.[0]?.message?.content;

    if (!rawText) {
      throw new Error("LLM returned empty response");
    }

    /* -------- SAFE JSON PARSE -------- */

    let parsed;

    try {
      const match = rawText.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(match[0]);
    } catch {
      parsed = {
        response: rawText,
        summary: "Summary unavailable",
        recommendations: []
      };
    }

    /* -------- CLEAN RESPONSE -------- */

    const cleanResponse = parsed.response
      ?.replace(/###.*$/s, "")
      ?.replace(/Response:/i, "")
      ?.trim();

    /* -------- SAVE TO DB -------- */

    const saved = await Review.create({
      rating,
      review,
      ai_response: cleanResponse,
      summary: parsed.summary,
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations
        : [parsed.recommendations]
    });

    return NextResponse.json({
      success: true,
      data: saved
    });
  } catch (err) {
    console.error("POST /api/review error:", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message
      },
      { status: 500 }
    );
  }
}
