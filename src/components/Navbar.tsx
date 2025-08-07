// src/components/Navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-indigo-600">Noto</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
        <Link to="/assistant" className="text-gray-600 hover:text-indigo-600">Assistant</Link>
        <Link to="/quiz">Quiz Generator</Link>
      </nav>
    </header>
  );
};

export default Navbar;
