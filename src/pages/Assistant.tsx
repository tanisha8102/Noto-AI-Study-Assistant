import { useState } from "react";
import { summarizeWithGenAI } from "../utils/gemini";

const Assistant = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordLimit, setWordLimit] = useState(100);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await summarizeWithGenAI(inputText, wordLimit);
      setSummary(result);
    } catch (err: any) {
      setSummary("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background for Light Mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-pink-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black animate-gradient" />

      {/* Glow Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto py-16 px-6">
        <div className="rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 shadow-2xl p-10 md:p-14 border border-white/50 dark:border-gray-800/40 transition-all duration-700 hover:shadow-indigo-200/40 hover:shadow-2xl hover:border-indigo-300/60 dark:hover:border-indigo-600/50 group">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 tracking-tight animate-gradient">
              Study Assistant
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Summarize notes in seconds ✨
            </span>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your study notes here..."
              className="w-full h-56 md:h-64 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300/60 dark:focus:ring-indigo-600/50 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-lg resize-none transition-all"
            />

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="wordLimit"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Word Limit:
                </label>
                <input
                  id="wordLimit"
                  type="number"
                  min="20"
                  max="500"
                  step="10"
                  value={wordLimit}
                  onChange={(e) => setWordLimit(Number(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                />
              </div>

              <button
                onClick={handleSummarize}
                disabled={loading}
                className="px-10 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-semibold shadow-xl transform transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 animate-bounce-slow"
              >
                {loading ? "Summarizing..." : "✨ Summarize"}
              </button>
            </div>
          </div>

          {/* Summary Display */}
          {summary && (
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-tr from-white/70 to-indigo-50/70 dark:from-gray-800/70 dark:to-gray-900/70 shadow-xl border border-indigo-100/40 dark:border-gray-700/40 animate-fadeInUp">
              <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                📝 Summary
              </h2>
              <ul className="list-disc list-inside space-y-3 leading-relaxed text-gray-800 dark:text-gray-200 text-lg">
                {summary
                  .split("*")
                  .map((point) => point.trim())
                  .filter((point) => point)
                  .map((point, idx) => (
                    <li
                      key={idx}
                      className="animate-slideIn opacity-0"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {point}
                    </li>
                  ))}
              </ul>
            </div>
          )}
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
          animation: fadeInUp 0.8s ease forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease forwards;
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Assistant;
