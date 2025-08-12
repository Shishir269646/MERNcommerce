"use client";
import { useRef } from "react";
import NextPrivBTN from "./NextPrivBTN";



const SlideWithCards1 = ({ items = [], CardComponent, cardsPerView = 4, SectionName }) => {
    const scrollRef = useRef();

    const scrollByCard = () => {
        if (!scrollRef.current) return 0;
        const card = scrollRef.current.querySelector("div > div");
        return card?.offsetWidth || 300;
    };

    const handleNext = () => {
        scrollRef.current?.scrollBy({ left: scrollByCard(), behavior: "smooth" });
    };

    const handlePrev = () => {
        scrollRef.current?.scrollBy({ left: -scrollByCard(), behavior: "smooth" });
    };

    const cardWidthPercent = 100 / cardsPerView;

    return (
        <div className="relative w-full">
            <h1 className="font-bold text-3xl sm:text-4xl mb-6 text-center">{SectionName}</h1>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-hidden scrollbar-hide px-2 scroll-smooth snap-x snap-mandatory"
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{ flex: `0 0 ${cardWidthPercent}%` }}
                        className="transition-transform duration-300 snap-start"
                    >
                        <CardComponent item={item} />
                    </div>
                ))}
            </div>

            <NextPrivBTN onPrev={handlePrev} onNext={handleNext} />
        </div>
    );
};

export default SlideWithCards1;
