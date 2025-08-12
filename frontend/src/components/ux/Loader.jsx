'use client';

import React from 'react';


const Loader = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative px-5 py-2 text-[#EB8C79] font-semibold text-lg animate-loader">
                LOADING
                <div className="banner-left absolute bottom-[-30%] w-[60px] h-full bg-gray-300 skew-x-[-15deg] -z-10 animate-sub-banner-left before:absolute before:top-[-1px] before:left-[-1px] before:border-[22px] before:border-transparent before:border-l-[#18506F]" />
                <div className="banner-right absolute bottom-[-30%] w-[60px] h-full bg-gray-300 skew-x-[-15deg] -z-10 animate-sub-banner-right before:absolute before:top-[-1px] before:right-[-1px] before:border-[22px] before:border-transparent before:border-r-[#18506F]" />
                <div className="absolute inset-0 -z-20 bg-[#eee] skew-x-[-15deg]" />
            </div>
        </div>
    );
};

export default Loader;
