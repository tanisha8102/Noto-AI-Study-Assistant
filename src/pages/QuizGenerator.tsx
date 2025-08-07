// src/pages/QuizGenerator.tsx
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
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📚 Quiz Generator</h1>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your study material or text here..."
        className="w-full h-48 p-4 border rounded mb-4"
      />

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {quiz.length > 0 && currentQuestion && (
        <div className="border rounded p-6 bg-gray-50 shadow space-y-4">
          <h2 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {quiz.length}
          </h2>
          <p className="text-gray-800 font-medium">{currentQuestion.question}</p>

          <ul className="space-y-2">
            {currentQuestion.options.map((opt, i) => {
              const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
              const selected = userAnswers[currentQuestionIndex] === optionLetter;
              const isCorrect = currentQuestion.answer === optionLetter;

              return (
                <li key={i}>
                  <button
                    className={`w-full text-left px-4 py-2 border rounded 
                      ${selected ? (isCorrect ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400") : "hover:bg-gray-100"}
                    `}
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
              className={`mt-2 font-semibold ${
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

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded border hover:bg-gray-100 disabled:opacity-50"
            >
              ← Previous
            </button>

            {currentQuestionIndex < quiz.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setShowResult(true)}
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                Finish Quiz
              </button>
            )}
          </div>
        </div>
      )}

      {showResult && quiz.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-center">
          <h2 className="text-xl font-semibold mb-2">🎉 Quiz Completed!</h2>
          <p>
            You got{" "}
            <strong>
              {
                quiz.filter(
                  (q, i) => userAnswers[i] && userAnswers[i] === q.answer
                ).length
              }{" "}
              out of {quiz.length}
            </strong>{" "}
            correct.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
