'use client';
import clsx from 'clsx';

export function Card({ className = '', children, ...props }) {
    return (
        <div
            className={clsx(
                'rounded-2xl border bg-white p-4 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardContent({ className = '', children, ...props }) {
    return (
        <div
            className={clsx('text-sm text-gray-700 dark:text-gray-300', className)}
            {...props}
        >
            {children}
        </div>
    );
}
