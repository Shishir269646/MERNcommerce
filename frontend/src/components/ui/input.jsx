'use client';
import clsx from 'clsx';

export function Input({ className = '', ...props }) {
    return (
        <input
            className={clsx(
                'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                className
            )}
            {...props}
        />
    );
}
