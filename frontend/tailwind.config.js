module.exports = {
    darkMode: 'media', // You can change this to 'class' if you want to manually toggle dark mode
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        // Include any other folders or file types used in your project
    ],
    theme: {
        extend: {
            colors: {
                // Custom colors for dark mode if needed
                darkBackground: '#121212', // Example of a custom dark mode background color
                lightBackground: '#ffffff',
                textRed:"#ff3c20"
            },
        },
    },
    plugins: [],
};
