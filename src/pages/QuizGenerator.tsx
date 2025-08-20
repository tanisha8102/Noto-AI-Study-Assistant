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

  const handleReset = () => {
    setQuiz([]);
    setUserAnswers({});
    setInputText("");
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-pink-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black animate-gradient" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto py-16 px-6">
        <div className="rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 shadow-2xl p-10 md:p-14 border border-white/50 dark:border-gray-800/40 transition-all duration-700 hover:shadow-indigo-200/40 hover:shadow-2xl hover:border-indigo-300/60 dark:hover:border-indigo-600/50 group">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 tracking-tight animate-gradient">
              Quiz Generator
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Turn notes into quizzes instantly ⚡
            </span>
          </div>

          {/* Input */}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your study material here..."
            className="w-full h-56 md:h-64 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300/60 dark:focus:ring-indigo-600/50 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-lg resize-none transition-all"
          />

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button
              onClick={handleGenerate}
              className="flex-1 px-10 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-semibold shadow-xl transform transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 animate-bounce-slow"
              disabled={loading}
            >
              {loading ? "Generating..." : "✨ Generate Quiz"}
            </button>
            {quiz.length > 0 && (
              <button
                onClick={handleReset}
                className="flex-1 px-10 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-xl transform transition-all duration-300"
              >
                🔄 Reset Quiz
              </button>
            )}
          </div>

          {/* Quiz Section */}
          {quiz.length > 0 && currentQuestion && (
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-tr from-white/70 to-indigo-50/70 dark:from-gray-800/70 dark:to-gray-900/70 shadow-xl border border-indigo-100/40 dark:border-gray-700/40 animate-fadeInUp">
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-indigo-600 dark:text-indigo-400">
                Question {currentQuestionIndex + 1} of {quiz.length}
              </h2>
              <p className="text-gray-800 dark:text-gray-200 font-medium text-lg md:text-xl mb-6">
                {currentQuestion.question}
              </p>

              <ul className="space-y-3">
                {currentQuestion.options.map((opt, i) => {
                  const optionLetter = String.fromCharCode(65 + i);
                  const selected = userAnswers[currentQuestionIndex] === optionLetter;
                  const isCorrect = currentQuestion.answer === optionLetter;

                  return (
                    <li key={i}>
                      <button
                        className={`w-full text-left px-5 py-3 border rounded-2xl text-lg md:text-xl transition-all duration-300
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
                  className="px-6 py-3 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  ← Previous
                </button>

                {currentQuestionIndex < quiz.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResult(true)}
                    className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Finish Quiz
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Result */}
          {showResult && quiz.length > 0 && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-50/70 to-white/70 dark:from-gray-800/70 dark:to-gray-900/70 border border-indigo-200/40 dark:border-gray-700/40 shadow-lg text-center animate-fadeInUp">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">
                🎉 Quiz Completed!
              </h2>
              <p className="text-lg md:text-xl mb-4">
                You got{" "}
                <strong>
                  {quiz.filter((q, i) => userAnswers[i] && userAnswers[i] === q.answer).length}
                  /{quiz.length}
                </strong>{" "}
                correct.
              </p>
              <button
                onClick={handleReset}
                className="mt-3 px-10 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-xl transform transition-all duration-300"
              >
                🔄 Reset Quiz
              </button>
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
      `}</style>
    </div>
  );
};

export default QuizGenerator;
