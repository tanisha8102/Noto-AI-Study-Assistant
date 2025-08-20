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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-pink-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black animate-gradient" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto py-16 px-6">
        <div className="rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 shadow-2xl p-10 md:p-14 border border-white/50 dark:border-gray-800/40 transition-all duration-700 hover:shadow-indigo-200/40 hover:shadow-2xl hover:border-indigo-300/60 dark:hover:border-indigo-600/50">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 tracking-tight animate-gradient">
              💬 Smart Chat
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Ask anything, get instant answers ✨
            </span>
          </div>

          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-indigo-700 scrollbar-thumb-rounded">
            {messages.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Ask your study questions here...
              </p>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className="flex flex-col gap-2 animate-fadeInUp">
                <div className="self-start bg-gradient-to-tr from-gray-100/80 to-white/70 dark:from-gray-700/80 dark:to-gray-800/70 text-gray-900 dark:text-gray-100 p-4 rounded-2xl shadow-md max-w-[80%] backdrop-blur-md border border-gray-200/40 dark:border-gray-700/40">
                  <strong className="block text-indigo-600 dark:text-indigo-400">You</strong>
                  {msg.user}
                </div>
                <div className="self-end bg-gradient-to-tr from-indigo-50/80 to-purple-50/70 dark:from-indigo-900/70 dark:to-purple-900/70 text-indigo-900 dark:text-indigo-100 p-4 rounded-2xl shadow-md max-w-[80%] backdrop-blur-md border border-indigo-200/40 dark:border-indigo-700/40">
                  <strong className="block text-pink-600 dark:text-pink-400">Assistant</strong>
                  {msg.bot}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800/80 dark:text-gray-100 transition-all shadow-inner backdrop-blur-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            />
            <button
              onClick={handleAsk}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-semibold shadow-xl transform transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 animate-bounce-slow"
              disabled={loading}
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s infinite;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SmartChat;
