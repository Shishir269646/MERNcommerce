export default function ExampleCard() {
    return (
        <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">
                This card changes with dark mode
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
                Toggle dark mode to see color changes.
            </p>
        </div>
    );
}
