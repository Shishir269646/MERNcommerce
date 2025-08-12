"use client";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

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
                        <a href={option.LinkUrl}>{option.label}</a>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HoverDropDown;
