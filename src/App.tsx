// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Assistant from "./pages/Assistant";
import QuizGenerator from "./pages/QuizGenerator";
import SmartChat from "./pages/SmartChat";
import TextToSpeechPage from "./pages/TextToSpeech";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <Navbar />
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
