import { useState } from "react";
import { summarizeWithGenAI } from "../utils/gemini";

const Assistant = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordLimit, setWordLimit] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className={`${isDarkMode ? "dark" : ""} transition-colors duration-500`}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-10 transition-colors duration-500">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 text-gray-900 dark:text-gray-100 transition-colors duration-500">
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
              📚 Study Assistant
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-4 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your study notes here..."
            className="w-full h-52 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 transition-all"
          />

          <div className="flex items-center justify-between mt-4 mb-6">
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
                className="w-24 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900"
              />
            </div>

            <button
              onClick={handleSummarize}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          {summary && (
            <div className="mt-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
              <h2 className="text-lg font-semibold mb-3">📝 Summary</h2>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
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
    </div>
  );
};

export default Assistant;
