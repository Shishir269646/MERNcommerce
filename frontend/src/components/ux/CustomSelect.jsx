"use client";

import { useState, useRef, useEffect, useId } from 'react';


export default function CustomSelect({ options = [], onChange, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const buttonRef = useRef(null);
    const listRef = useRef(null);
    const id = useId();

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const closeDropdown = () => {
        setIsOpen(false);
        setFocusedIndex(-1);
    };

    const selectOption = (option) => {
        setSelected(option);
        if (onChange) onChange(option);
        closeDropdown();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
            setFocusedIndex((prev) => (prev + 1) % options.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setIsOpen(true);
            setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (isOpen && focusedIndex !== -1) {
                selectOption(options[focusedIndex]);
            } else {
                setIsOpen(true);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown();
        } else if (e.key === 'Tab') {
            closeDropdown();
        }
    };

    useEffect(() => {
        if (isOpen && focusedIndex !== -1) {
            listRef.current?.children[focusedIndex]?.focus();
        }
    }, [focusedIndex, isOpen]);

    return (
        <div
            className="relative w-full"
            tabIndex={0}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    closeDropdown();
                }
            }}
        >
            <label id={`${id}-label`} className="sr-only">
                {label}
            </label>
            <button
                type="button"
                ref={buttonRef}
                className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-md bg-transparent text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={`${id}-label`}
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
            >
                <span>{selected.label}</span>
                <span className="ml-2 w-4 h-4 bg-center bg-no-repeat bg-[url('data:image/svg+xml;utf8,<svg fill=\'%2362748E\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>')]"></span>
            </button>

            {isOpen && (
                <ul
                    ref={listRef}
                    id={`${id}-listbox`}
                    className="absolute left-0 right-0 mt-1 border border-gray-300 bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
                    role="listbox"
                    aria-labelledby={`${id}-label`}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            role="option"
                            tabIndex={0}
                            className={`px-3 sm:px-4 py-2 cursor-pointer outline-none text-sm sm:text-base ${selected.value === option.value
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-100'
                                }
                                focus:ring-2 focus:ring-blue-500`}
                            aria-selected={selected.value === option.value}
                            onClick={() => selectOption(option)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    selectOption(option);
                                } else if (e.key === 'Escape') {
                                    e.preventDefault();
                                    closeDropdown();
                                    buttonRef.current?.focus();
                                }
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
