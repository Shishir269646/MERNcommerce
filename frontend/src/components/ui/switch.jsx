'use client';
import { useState } from 'react';
import clsx from 'clsx';

export function Switch({ checked = false, onChange, label = '', className = '' }) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onChange && onChange(newState);
    };

    return (
        <div className={clsx('flex items-center space-x-2', className)}>
            {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
            <button
                type="button"
                onClick={handleToggle}
                className={clsx(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none',
                    isChecked ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-300 dark:bg-gray-600'
                )}
            >
                <span
                    className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300',
                        isChecked ? 'translate-x-6' : 'translate-x-1'
                    )}
                />
            </button>
        </div>
    );
}
