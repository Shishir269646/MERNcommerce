'use client';
import clsx from 'clsx';

export function Button({
    children,
    type = 'button',
    variant = 'default',
    className = '',
    disabled = false,
    ...props
}) {
    const baseStyles =
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        default:
            'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400',
        outline:
            'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-400',
        danger:
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400',
        success:
            'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400',
    };

    return (
        <button
            type={type}
            className={clsx(baseStyles, variants[variant], className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
