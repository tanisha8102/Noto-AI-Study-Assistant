import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer">
            Noto
          </h1>
        </Link>

        {/* Right side: Desktop links + dark mode + hamburger */}
        <div className="flex items-center space-x-2">
          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Home
            </Link>
            <Link
              to="/assistant"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Assistant
            </Link>
            <Link
              to="/quiz"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Quiz Generator
            </Link>
          </nav>

          {/* Dark Mode Toggle (always visible) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>

          {/* Hamburger Button (mobile only) */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 text-2xl ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
        } bg-white dark:bg-gray-800`}
      >
        <nav className="flex flex-col items-center">
          {["Home", "Assistant", "Quiz Generator"].map((item, index) => (
            <div key={item} className="w-full text-center">
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                className="block text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 py-2"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
              {index < 2 && (
                <hr className="border-gray-300 dark:border-gray-600 w-3/4 mx-auto" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
