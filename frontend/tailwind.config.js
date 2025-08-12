/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // ✅ enables dark mode via `.dark` class
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                yellowColour: '#ffd200',
                darkBackground: '#121212',
                lightBackground: '#ffffff',
                textRed: '#ff3c20',
            },
        },
    },
    plugins: [], // ✅ works without plugins too
};
