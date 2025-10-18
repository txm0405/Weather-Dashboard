import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply initial theme class to avoid flash of incorrect theme on load
(() => {
	try {
		const raw = localStorage.getItem("theme");
		const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		const theme = raw ?? (prefersDark ? "dark" : "light");
		if (theme === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	} catch (e) {
		// ignore
	}
})();

createRoot(document.getElementById("root")!).render(<App />);
