"use client";
import React from 'react';
import clsx from 'clsx';

export function Table({ children, className }) {
    return (
        <div className="w-full overflow-auto rounded-lg border border-gray-200">
            <table className={clsx('w-full text-sm text-left', className)}>
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ children }) {
    return (
        <thead className="bg-gray-100 text-gray-700">
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
        <tbody className="divide-y divide-gray-200 text-gray-800">
            {children}
        </tbody>
    );
}

export function TableRow({ children, className }) {
    return (
        <tr className={clsx('hover:bg-gray-100 transition', className)}>
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