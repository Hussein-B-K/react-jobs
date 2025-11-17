// src/components/ThemeToggle.tsx
import { useTheme } from "../context/ThemeContext";

/**
 * @description A button component used to switch between light and dark themes.
 * It uses an icon to indicate the current state (Sun for Light, Moon for Dark).
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
    >
      {isDark ? (
        <h1 className="text-white">why so espresso depresso homie? :)</h1>
      ) : (
        <h1 className="text-white">h1 :)</h1>
      )}
    </button>
  );
};

export default ThemeToggle;