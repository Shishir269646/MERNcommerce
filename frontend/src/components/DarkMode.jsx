"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function DarkMode() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = storedTheme || (prefersDark ? "dark" : "light");

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }

        setMounted(true);
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    if (!mounted) return null;

    return (
        <label className="flex items-center cursor-pointer gap-2">
            <FiSun className={isDark ? "text-gray-400" : "text-yellow-400"} />
            <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={isDark}
                onChange={toggleTheme}
                aria-label="Toggle dark mode"
            />
            <FiMoon className={isDark ? "text-indigo-400" : "text-gray-400"} />
        </label>
    );
}
