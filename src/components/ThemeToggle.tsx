// src/components/ThemeToggle.tsx
import { useTheme } from "../context/ThemeContext";

/**
 * @description A slide switch component used to switch between light and dark themes.
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
   return (
    <div className="mt-[6px] mr-2">
    <button
      onClick={toggleTheme}
      className="
        relative h-10 w-24 rounded-full
        bg-blue-100 dark:bg-gray-800
        transition-colors duration-500 ease-out
        overflow-hidden
      "
    >
      {/* Background circle */}
      <div
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          h-6 w-6 rounded-full bg-yellow-300
          dark:bg-gray-500
          transition-all duration-500
        "
      />

      {/* Sliding disc */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2
          h-6 w-6 rounded-full
          bg-gray-900 dark:bg-black
          transition-all duration-700 ease-out
          ${isDark === true ? "left-4" : "left-16"}
        `}
      />
    </button>
    </div>
  );
};

export default ThemeToggle;
