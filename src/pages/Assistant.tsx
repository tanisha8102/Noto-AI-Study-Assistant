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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-700 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 md:p-14 transition-all duration-500">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <h1 className="text-4xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 drop-shadow-md">
            📚 Study Assistant
          </h1>
        </div>

        {/* Input Card */}
        <div className="bg-indigo-50 dark:bg-gray-900 rounded-2xl p-6 md:p-10 shadow-inner shadow-indigo-200 dark:shadow-gray-700 transition-all">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your study notes here..."
            className="w-full h-64 p-5 rounded-2xl border border-indigo-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600 shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          />

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
            <div className="flex items-center gap-3">
              <label htmlFor="wordLimit" className="text-sm font-medium">
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
                className="w-24 px-3 py-2 border border-indigo-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm transition-all"
              />
            </div>

            <button
              onClick={handleSummarize}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>
        </div>

        {/* Summary Display */}
        {summary && (
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-tr from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-2xl border border-indigo-100 dark:border-gray-700 transition-all animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              📝 Summary
            </h2>
            <ul className="list-disc list-inside space-y-3 leading-relaxed text-gray-800 dark:text-gray-200 text-lg md:text-xl">
              {summary
                .split("*")
                .map((point) => point.trim())
                .filter((point) => point)
                .map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assistant;
