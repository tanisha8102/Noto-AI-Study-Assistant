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
      const chatHistory = messages
        .map((msg) => `User: ${msg.user}\nAssistant: ${msg.bot}`)
        .join("\n");

      const fullPrompt = `${chatHistory}\nUser: ${newUserMessage}\nAssistant:`;

      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: fullPrompt,
      });

      const botResponse = result?.text?.trim();
      if (!botResponse) throw new Error("No response from the assistant.");

      setMessages((prev) => [...prev, { user: newUserMessage, bot: botResponse }]);
    } catch (err: any) {
      alert("Failed to get a response: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 md:p-12 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        
        {/* Header */}
        <h1 className="text-4xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow-md mb-8">
          💬 Smart Chat
        </h1>

        {/* Messages */}
        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-indigo-700 scrollbar-thumb-rounded">
          {messages.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Ask your study questions here...
            </p>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className="flex flex-col gap-2 animate-fadeIn">
              <div className="self-start bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl shadow-sm max-w-[80%]">
                <strong>You:</strong> {msg.user}
              </div>
              <div className="self-end bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 p-4 rounded-xl shadow-sm max-w-[80%]">
                <strong>Assistant:</strong> {msg.bot}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100 transition-all shadow-inner"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
          />
          <button
            onClick={handleAsk}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartChat;
