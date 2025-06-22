import { useEffect, useState } from "react";

function DarkModeBtn() {
  const [theme, setTheme] = useState("ligth");
  const handleChangeTheme = () => {
    setTheme((theme) => (theme === "ligth" ? "dark" : "ligth"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);
  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <button
        className="bg-gray-300 px-5 py-3 rounded-2xl dark:bg-gray-600 dark:text-white"
        onClick={handleChangeTheme}
      >
        Change Theme
      </button>
    </div>
  );
}
export default DarkModeBtn;
