import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <main className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white dark:from-indigo-700 dark:via-purple-800 dark:to-pink-900 py-24 px-6 text-center transition-colors duration-500">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Your AI-powered Study Companion
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md">
          Summarize notes, generate quizzes, and chat with your personal study buddy.
        </p>
        <button
          onClick={() => navigate("/assistant")}
          className="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:-translate-y-1"
        >
          Try Assistant
        </button>
      </main>

      {/* Features Section */}
      <section className="mt-16 px-4 max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "📄 Summarize Notes",
            desc: "Upload your notes and let Noto generate summaries instantly.",
            link: "/assistant",
          },
          {
            title: "🧠 Quiz Generator",
            desc: "Create quizzes or flashcards from your content effortlessly.",
            link: "/quiz",
          },
          {
            title: "💬 Smart Chat",
            desc: "Ask questions about any topic or your uploaded content.",
            link: "/chat",
          },
          {
            title: "🗣️ Text to Speech",
            desc: "Listen to your notes aloud, making study sessions more interactive.",
            link: "/tts",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            onClick={() => navigate(feature.link)}
            className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900 hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Call-to-Action Section */}
      <section className="mt-20 text-center px-4 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-gray-100">
          Start Learning Smarter Today
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Experience the power of AI in your studies. Summarize, quiz, chat, and learn more efficiently.
        </p>
        <button
          onClick={() => navigate("/assistant")}
          className="px-6 py-3 bg-indigo-600 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1"
        >
          Get Started
        </button>
      </section>
    </>
  );
};

export default Home;
