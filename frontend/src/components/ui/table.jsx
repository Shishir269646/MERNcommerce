"use client";
import React from 'react';
import clsx from 'clsx';

export function Table({ children, className }) {
    return (
        <div className="w-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className={clsx('w-full text-sm text-left', className)}>
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ children }) {
    return (
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {children}
        </thead>
    );
}

export function TableHead({ children, className }) {
    return (
        <th className={clsx('px-4 py-3 font-medium tracking-wide', className)}>
            {children}
        </th>
    );
}

export function TableBody({ children }) {
    return (
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
            {children}
        </tbody>
    );
}

export function TableRow({ children, className }) {
    return (
        <tr className={clsx('hover:bg-gray-100 dark:hover:bg-gray-800 transition', className)}>
            {children}
        </tr>
    );
}

export function TableCell({ children, className }) {
    return (
        <td className={clsx('px-4 py-3 whitespace-nowrap', className)}>
            {children}
        </td>
    );
}
