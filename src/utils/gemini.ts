// src/utils/gemini.ts

import { GoogleGenAI } from "@google/genai";

// Define the expected quiz question structure
export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string; // "A", "B", "C", or "D"
}

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function summarizeWithGenAI(text: string, wordLimit: number): Promise<string> {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Summarize the following text in simple bullet points, keeping the summary within ${wordLimit} words:\n\n${text}`,
    });

    const content = response?.text?.trim();
    if (!content) throw new Error("No content returned from Gemini.");
    return content;
  } catch (err: any) {
    console.error("GenAI Error:", err.message);
    return "Error summarizing text: " + err.message;
  }
}

export async function generateQuizWithGenAI(text: string): Promise<QuizQuestion[]> {
  try {
    const prompt = `
From the following study material, generate 5 multiple-choice questions.
Each question should have:
- A clear question
- Four options (A–D)
- The correct answer (just the letter A/B/C/D)
Format the output as JSON like this:
[
  {
    "question": "What is ...?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "A"
  },
  ...
]

Text:
${text}
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const raw = response?.text?.trim();
    if (!raw) throw new Error("No content returned from Gemini.");

    // Strip code block if wrapped with ```json
    const cleaned = raw.replace(/^```json\s*|```$/g, "").trim();

    const json = JSON.parse(cleaned);
    return json;
  } catch (err: any) {
    console.error("Quiz Generation Error:", err.message);
    throw new Error("Failed to generate quiz.");
  }
}
