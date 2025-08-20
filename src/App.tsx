// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Assistant from "./pages/Assistant";
import QuizGenerator from "./pages/QuizGenerator";
import SmartChat from "./pages/SmartChat";
import TextToSpeechPage from "./pages/TextToSpeech";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Apply dark class to <html> for global dark mode
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/quiz" element={<QuizGenerator />} />
          <Route path="/chat" element={<SmartChat />} />
          <Route path="/tts" element={<TextToSpeechPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
