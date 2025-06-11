"use client";
import React from "react";
import Image from "next/image";

const CategoryCard = ({ item }) => {
    return (
        <div className="pt-20">
            <div className="bg-white dark:bg-slate-800 shadow-xl relative flex items-end justify-center min-h-[155px] rounded-t-[30px] rounded-b-[15px] border dark:border-slate-700">
                <div className="absolute -top-[75px] left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow border dark:border-slate-700 rounded-full flex justify-center items-center h-40 w-40 overflow-hidden">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                </div>
                <h4 className="text-2xl font-medium mb-6">{item.title}</h4>
            </div>
        </div>
    );
};

export default CategoryCard;
