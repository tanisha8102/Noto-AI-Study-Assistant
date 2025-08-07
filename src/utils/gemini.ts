// src/utils/gemini.ts

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function summarizeWithGenAI(text: string, wordLimit: number): Promise<string> {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Summarize the following text in simple bullet points, keeping the summary within ${wordLimit} words:\n\n${text}`,
    });
    return response.text.trim();
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

    // 👇 Strip code block if Gemini includes ```json ... ```
    const cleaned = response.text.trim().replace(/^```json\s*|```$/g, "").trim();

    const json = JSON.parse(cleaned);
    return json;
  } catch (err: any) {
    console.error("Quiz Generation Error:", err.message);
    throw new Error("Failed to generate quiz.");
  }
}
