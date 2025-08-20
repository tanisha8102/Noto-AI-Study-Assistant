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

  // Mock translation function (replace with real API call if needed)
  const translateText = async (text: string, targetLang: string) => {
    // For now, return the same text for English
    // In real app, use Google Translate API or similar
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-12 transition-colors duration-500">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 md:p-12 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        
        {/* Header */}
        <h1 className="text-4xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow-md mb-8">
          🗣️ Text to Speech & Translate
        </h1>

        {/* Text Input */}
        <textarea
          rows={6}
          placeholder="Enter text to read out loud..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 dark:bg-gray-900 dark:text-gray-100 shadow-inner transition-all mb-6"
        />

        {/* Language & Speed Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block mb-2 text-gray-600 dark:text-gray-300 font-medium">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100 shadow-sm"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-gray-600 dark:text-gray-300 font-medium">
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
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 disabled:opacity-50"
          >
            🔊 Speak
          </button>
          <button
            onClick={handleStop}
            disabled={!isSpeaking}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 disabled:opacity-50"
          >
            ⏹️ Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeechPage;
