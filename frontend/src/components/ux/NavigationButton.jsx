"use client";

import React from 'react';

const NavigationButton = ({ direction }) => {
    const baseClasses =
        'absolute top-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-50 shadow-xl text-pink-500 text-xl font-bold flex justify-center items-center rounded-full p-8 cursor-pointer z-10';

    const positionClass =
        direction === 'prev'
            ? 'swiper-button-prev left-0 md:-left-7'
            : 'swiper-button-next right-0 md:-right-7';

    return <div className={`${baseClasses} ${positionClass}`} />;
};

export default NavigationButton;
