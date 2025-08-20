import { Link } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800 transition-colors duration-500">
      <h1 className="text-2xl font-bold text-indigo-600">Noto</h1>
      <nav className="space-x-4 flex items-center">
        <Link to="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
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

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
