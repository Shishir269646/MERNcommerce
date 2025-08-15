"use client";

import Image from 'next/image';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import NavigationButton from './NavigationButton';
import CategoryCard from './CategoryCard';


const items = [
    { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_1.png', title: 'Toys' },
    { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png', title: 'Kids' },
    { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_3.png', title: 'Bags' },
    { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png', title: 'Babies' },
    { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png', title: 'Kids' },
    { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png', title: 'Babies' },
];

const Category = () => {
    return (
        <section className="py-14 md:py-24 bg-white text-zinc-900 relative overflow-hidden z-10">
            <div className="absolute top-0 right-0">
                <Image
                    src="https://cdn.easyfrontend.com/pictures/ecommerce/grid_10_shape1.png"
                    alt="background shape"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </div>

            <div className="container px-4 mx-auto relative">
                <h2 className="font-medium text-3xl text-center">
                    Top collections
                </h2>

                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        spaceBetween={30}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}

                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index} className="my-[80px]">
                                {/* <div className="bg-white bg-slate-800 shadow-xl relative flex items-end justify-center min-h-[155px] rounded-t-[30px] rounded-b-[15px] border border-slate-700">
                                    <div className="absolute -top-[75px] left-1/2 -translate-x-1/2 bg-white bg-slate-800 shadow border border-slate-700 rounded-full flex justify-center items-center h-40 w-40 overflow-hidden">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    </div>
                                    <h4 className="text-2xl font-medium mb-6">{item.title}</h4>
                                </div> */}
                                <CategoryCard item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows */}
                    <NavigationButton direction="prev" />
                    <NavigationButton direction="next" />


                </div>

            </div>
        </section>
    );
};

export default Category;
