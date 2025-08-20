// src/pages/TextToSpeechPage.tsx
import { useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "hi", label: "Hindi" },
  { code: "ar", label: "Arabic" },
];

const TextToSpeechPage = () => {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);
  const [language, setLanguage] = useState("en");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const synth = window.speechSynthesis;

  // Mock translation (can integrate API later)
  const translateText = async (text: string, targetLang: string) => {
    return text;
  };

  const handleSpeak = async () => {
    if (!text || synth.speaking) return;
    const translated = await translateText(text, language);
    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = language;
    utterance.rate = rate;
    synth.speak(utterance);
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
  };

  const handleStop = () => {
    synth.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-pink-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black animate-gradient" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto py-16 px-6">
        <div className="rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 shadow-2xl p-10 md:p-14 border border-white/50 dark:border-gray-800/40 transition-all duration-700 hover:shadow-indigo-200/40 hover:shadow-2xl hover:border-indigo-300/60 dark:hover:border-indigo-600/50 animate-fadeInUp">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 tracking-tight animate-gradient">
              🗣️ Text to Speech
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Convert text into natural voice 🎧
            </span>
          </div>

          {/* Text Input */}
          <textarea
            rows={6}
            placeholder="Enter text to read out loud..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-6 rounded-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300/60 dark:focus:ring-indigo-600/50 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-lg resize-none transition-all mb-8"
          />

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
              <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800/80 dark:text-gray-100 shadow-sm"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Speed: {rate.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 dark:accent-indigo-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSpeak}
              disabled={isSpeaking || !text}
              className="flex-1 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-semibold shadow-xl transform transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 animate-bounce-slow"
            >
              🔊 Speak
            </button>
            <button
              onClick={handleStop}
              disabled={!isSpeaking}
              className="flex-1 px-8 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-xl transform transition-all duration-300 disabled:opacity-50"
            >
              ⏹️ Stop
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

export default TextToSpeechPage;
