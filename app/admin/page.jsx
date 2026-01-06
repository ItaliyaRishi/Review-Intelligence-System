"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch("/api/reviews");
      const json = await res.json();

      // ✅ FIX: extract array properly
      setData(json.data || []);
    }

    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Rating</th>
            <th>Review</th>
            <th>AI Response</th>
            <th>Summary</th>
            <th>Recommendations</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">No reviews yet</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item._id}>
                <td>{item.rating}</td>
                <td>{item.review}</td>
                <td>{item.ai_response}</td>
                <td>{item.summary}</td>
                <td>{item.recommendations}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
  