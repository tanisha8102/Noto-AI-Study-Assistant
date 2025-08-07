// src/pages/SmartChat.tsx
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SmartChat = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
  if (!input.trim()) return;

  const newUserMessage = input;
  setInput("");
  setLoading(true);

  try {
    // Construct chat history as text prompt
    const chatHistory = messages
      .map((msg) => `User: ${msg.user}\nAssistant: ${msg.bot}`)
      .join("\n");

    const fullPrompt = `${chatHistory}\nUser: ${newUserMessage}\nAssistant:`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: fullPrompt,
    });

    const botResponse = result?.text?.trim();

    if (!botResponse) {
      throw new Error("No response from the assistant.");
    }

    setMessages((prev) => [...prev, { user: newUserMessage, bot: botResponse }]);
  } catch (err: any) {
    alert("Failed to get a response: " + err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">💬 Smart Chat</h2>

      <div className="space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded shadow">
            <p><strong>You:</strong> {msg.user}</p>
            <p className="text-indigo-700 mt-2"><strong>Assistant:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your study question..."
        />
        <button
          onClick={handleAsk}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default SmartChat;
