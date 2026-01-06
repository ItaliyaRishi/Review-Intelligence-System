# Fynd AI – Review Intelligence System

This project is a full-stack AI-powered review analysis system built using Next.js, MongoDB, and Large Language Models via OpenRouter. It allows users to submit reviews and receive AI-generated responses, while admins can view insights, summaries, and recommendations derived from those reviews.

## Features

User Dashboard:
- Submit a review with a rating from 1 to 5
- Receive a polite AI-generated response
- Handles empty or invalid input gracefully

Admin Dashboard:
- View all submitted reviews
- Display user rating and original review
- View AI-generated response
- View AI-generated summary
- View AI-generated business recommendations
- Data persists using MongoDB

AI Capabilities:
- Generates a polite user-facing response
- Summarizes the review in one sentence
- Suggests recommended actions for business improvement
- All LLM calls are performed server-side

## LLM Used

- Model: mistralai/mistral-7b-instruct
- Provider: OpenRouter
- Usage: Response generation, summarization, recommendations

## Tech Stack

- Frontend: Next.js 14 (App Router)
- Backend: Next.js API Routes
- Database: MongoDB Atlas
- AI Integration: OpenRouter API
- Deployment: Vercel

## Project Structure

app/
- page.jsx
- user/page.jsx
- admin/page.jsx
- api/
  - review/route.js
  - reviews/route.js

lib/
- mongodb.js

## Environment Variables

Create a .env.local file locally with the following values:

OPENROUTER_API_KEY=your_openrouter_api_key  
MONGODB_URI=your_mongodb_connection_string  

These environment variables are also configured on Vercel for production deployment.

## Running Locally

npm install  
npm run dev  

Open the application in your browser:

User Dashboard: http://localhost:3000/user  
Admin Dashboard: http://localhost:3000/admin  

## Deployment

The application is deployed on Vercel and is publicly accessible.

Routes:
- /user – User review submission interface
- /admin – Admin dashboard to view AI-processed reviews

## Assignment Compliance

- Web-based dashboards implemented
- Shared persistent data source using MongoDB
- Server-side LLM usage only
- Explicit API endpoints for AI processing
- Graceful error handling
- Public deployment via Vercel

## Author

Built as part of an AI/LLM engineering assignment.
