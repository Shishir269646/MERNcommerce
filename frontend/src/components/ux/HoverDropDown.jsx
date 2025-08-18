"use client";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";

function HoverDropDown({ label, options = [] }) {
    return (
        <div className="dropdown dropdown-hover">
            <div tabIndex={0} className="m-1 flex items-center gap-1 cursor-pointer">
                <span>{label}</span>
                <IoMdArrowDropdown />
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-white text-black rounded-box z-10 w-44 p-2 shadow-md"
            >
                {options.map((option, idx) => (
                    <li key={idx}>
                        {option.onClick ? (
                            <button
                                type="button"
                                onClick={option.onClick}
                                className="w-full text-left hover:bg-gray-200 px-2 py-1"
                            >
                                {option.label}
                            </button>
                        ) : (
                            <Link href={option.LinkUrl || "#"} className="hover:bg-gray-200 px-2 py-1 block">
                                {option.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HoverDropDown;
