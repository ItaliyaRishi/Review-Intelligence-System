"use client";
import { useState } from "react";

export default function UserPage() {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setAiResponse(""); // reset before request

    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, review }),
    });

    const result = await res.json();
    console.log("API RESULT:", result); // 🔍 IMPORTANT

    if (result.success && result.data?.ai_response) {
      setAiResponse(result.data.ai_response);
    } else {
      setAiResponse("No AI response received.");
    }
  }

  return (
    <div>
      <h1>Submit a Review</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Rating (1–5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>

        <br />

        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>

        <br />

        <button type="submit">Submit</button>
      </form>

      {aiResponse && (
        <>
          <h2>AI Response</h2>
          <p>{aiResponse}</p>
        </>
      )}
    </div>
  );
}

export default function Home() {
    return (
      <main style={{ padding: 40 }}>
        <h1>Fynd AI Review System</h1>
        <p>Choose a dashboard:</p>
  
        <ul>
          <li>
            <a href="/user">User Dashboard</a>
          </li>
          <li>
            <a href="/admin">Admin Dashboard</a>
          </li>
        </ul>
      </main>
    );
  }
  