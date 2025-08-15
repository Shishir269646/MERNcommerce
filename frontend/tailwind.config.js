/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
    plugins: [],
};
