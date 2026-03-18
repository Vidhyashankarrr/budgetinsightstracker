import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  // Load theme on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark"); // 🔥 THIS IS THE FIX
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;