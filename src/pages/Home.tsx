import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <main className="p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Your AI-powered Study Companion</h2>
        <p className="text-gray-700 text-lg">
          Summarize notes, generate quizzes, and chat with your study buddy.
        </p>
        <button
          onClick={() => navigate("/assistant")}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Try Assistant
        </button>
      </main>

      {/* Features Section */}
      <section className="mt-8 px-4 max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        <div
          onClick={() => navigate("/assistant")}
          className="cursor-pointer bg-gray-100 p-6 rounded shadow hover:bg-gray-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">📄 Summarize Notes</h3>
          <p className="text-gray-700">Upload your notes and let Noto generate summaries instantly.</p>
        </div>

        <div
          onClick={() => navigate("/quiz")}
          className="cursor-pointer bg-gray-100 p-6 rounded shadow hover:bg-gray-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">🧠 Quiz Generator</h3>
          <p className="text-gray-700">Create quizzes or flashcards from your content.</p>
        </div>

        <div
          onClick={() => navigate("/chat")}
          className="cursor-pointer bg-gray-100 p-6 rounded shadow hover:bg-gray-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">💬 Smart Chat</h3>
          <p className="text-gray-700">Ask questions about any topic or your uploaded content.</p>
        </div>

        <div
          onClick={() => navigate("/tts")}
          className="cursor-pointer bg-gray-100 p-6 rounded shadow hover:bg-gray-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2">🗣️  Text to Speech</h3>
          <p className="text-gray-700">Group and manage your notes by subject or topic.</p>
        </div>
      </section>
    </>
  );
};

export default Home;
