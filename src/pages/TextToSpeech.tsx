// src/pages/TextToSpeechPage.tsx
import React, { useState } from "react";

const TextToSpeechPage = () => {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const synth = window.speechSynthesis;

  const handleSpeak = () => {
    if (!text || synth.speaking) return;
    const utterance = new SpeechSynthesisUtterance(text);
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
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🗣️ Text to Speech</h2>
      <textarea
        rows={6}
        placeholder="Enter text to read out loud..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <div className="mb-4">
        <label className="block mb-1 text-gray-600">Speed: {rate.toFixed(1)}x</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSpeak}
          disabled={isSpeaking || !text}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          🔊 Speak
        </button>
        <button
          onClick={handleStop}
          disabled={!isSpeaking}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          ⏹️ Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeechPage;
