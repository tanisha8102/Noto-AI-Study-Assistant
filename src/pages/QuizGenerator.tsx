import { useState } from "react";
import { generateQuizWithGenAI } from "../utils/gemini";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string; // A, B, C, D
};

const QuizGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setShowResult(false);
    setCurrentQuestionIndex(0);
    try {
      const result = await generateQuizWithGenAI(inputText);
      setQuiz(result);
      setUserAnswers({});
    } catch (err: any) {
      setQuiz([]);
      alert("Failed to generate quiz: " + err.message);
    }
    setLoading(false);
  };

  const handleOptionSelect = (option: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option });
  };

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 py-12 px-6 transition-colors duration-700">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 md:p-14 transition-all duration-500">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <h1 className="text-4xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 drop-shadow-md">
            📚 Quiz Generator
          </h1>
        </div>

        {/* Input Card */}
        <div className="bg-indigo-50 dark:bg-gray-900 rounded-2xl p-6 md:p-10 shadow-inner shadow-indigo-200 dark:shadow-gray-700 transition-all">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your study material or text here..."
            className="w-full h-52 p-5 rounded-2xl border border-indigo-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600 shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          />
          <button
            onClick={handleGenerate}
            className="mt-6 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>

        {/* Quiz Card */}
        {quiz.length > 0 && currentQuestion && (
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-tr from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-2xl border border-indigo-100 dark:border-gray-700 transition-all animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-indigo-600 dark:text-indigo-400">
              Question {currentQuestionIndex + 1} of {quiz.length}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 font-medium text-lg md:text-xl mb-6">
              {currentQuestion.question}
            </p>

            <ul className="space-y-3">
              {currentQuestion.options.map((opt, i) => {
                const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
                const selected = userAnswers[currentQuestionIndex] === optionLetter;
                const isCorrect = currentQuestion.answer === optionLetter;

                return (
                  <li key={i}>
                    <button
                      className={`w-full text-left px-5 py-3 border rounded-2xl text-lg md:text-xl transition 
                        ${
                          selected
                            ? isCorrect
                              ? "bg-green-100 border-green-400"
                              : "bg-red-100 border-red-400"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      onClick={() => handleOptionSelect(optionLetter)}
                      disabled={userAnswers[currentQuestionIndex] !== undefined}
                    >
                      <strong>{optionLetter}.</strong> {opt}
                    </button>
                  </li>
                );
              })}
            </ul>

            {userAnswers[currentQuestionIndex] !== undefined && (
              <p
                className={`mt-4 font-semibold text-lg ${
                  userAnswers[currentQuestionIndex] === currentQuestion.answer
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {userAnswers[currentQuestionIndex] === currentQuestion.answer
                  ? "✅ Correct!"
                  : `❌ Incorrect. Correct answer is ${currentQuestion.answer}.`}
              </p>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 rounded-2xl border hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                ← Previous
              </button>

              {currentQuestionIndex < quiz.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => setShowResult(true)}
                  className="px-6 py-3 rounded-2xl bg-purple-600 text-white hover:bg-purple-700"
                >
                  Finish Quiz
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quiz Result */}
        {showResult && quiz.length > 0 && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">
              🎉 Quiz Completed!
            </h2>
            <p className="text-lg md:text-xl">
              You got{" "}
              <strong>
                {quiz.filter((q, i) => userAnswers[i] && userAnswers[i] === q.answer).length}
                /{quiz.length}
              </strong>{" "}
              correct.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
