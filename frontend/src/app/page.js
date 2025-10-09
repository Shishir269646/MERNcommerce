"use client";
import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageSlider from "@/components/ui/ImageSlider";
import { fetchCategories } from '@/redux/categorySlice';
import { getProducts } from "@/redux/productSlice";
import { fetchSettings } from "@/redux/settingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faHeadphonesAlt,
  faRibbon,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import LargeProductCard from "@/components/ui/LargeProductCard";



//demo2
import SlideWithCards from "@/components/ui/SlideWithCards";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";






const incentives = [
  {
    icon: faAward,
    title: "Quality Materials",
    desc: "100% quality Products",
  },
  {
    icon: faShippingFast,
    title: "Fast Delivery",
    desc: "Quick and reliable shipping",
  },
  {
    icon: faHeadphonesAlt,
    title: "24/7 Support",
    desc: "We are always here for you",
  },
  {
    icon: faRibbon,
    title: "Trusted Brand",
    desc: "Thousands of happy customers",
  },
];



const IncentiveItem = ({ item }) => (
  <div className="flex justify-center items-center">
    <div className="text-[45px] text-blue-600 dark:text-blue-400">
      <FontAwesomeIcon icon={item.icon} />
    </div>
    <div className="ml-4 mt-2">
      <h5 className="mb-1 text-2xl font-medium text-black dark:text-white">{item.title}</h5>
      <p className="text-sm opacity-70 dark:opacity-80 text-black dark:text-white">{item.desc}</p>
    </div>
  </div>
);



const Incentives1 = () => {
  return (
    <section className="py-6 md:py-14 bg-white dark:bg-[#0b1727] text-black dark:text-white relative overflow-hidden z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {incentives.map((item, index) => (
            <div
              key={index}
              className="col-span-12 sm:col-span-6 lg:col-span-3 mt-6"
            >
              <IncentiveItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default function Home() {

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const { products, productLoading, productError } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getProducts());
    dispatch(fetchSettings());
  }, [dispatch]);


  const { settings, loadingSetting, errorSetting } = useSelector((state) => state.settings);


  const [Settings] = settings || [];
  const Images = Settings?.images?.filter(Boolean) || [];
  const Products = Settings?.products?.filter(Boolean) || [];




  const CategoryItems = categories.map(cat => ({
    imageUrl: cat.image || null,
    title: cat.name,
  }));



  const PerViewFeaturedproducts = () => {
    if (typeof window === 'undefined') return 2;

    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 2;
  };
  const PerViewCategory = () => {
    if (typeof window === 'undefined') return 2;

    const width = window.innerWidth;

    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 4;
    return 4;
  };

  const PerViewProducts = () => {
    if (typeof window === 'undefined') return 2.45;
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 1.5;
    if (width <= 1024) return 2.45;
    return 2.45;
  };


  return (

    <main className="min-h-screen dark:bg-gray-900">


      <section className="text-gray-950 dark:text-white">
        <ImageSlider Images={Images} loading={loadingSetting} error={errorSetting} />
        <Incentives1 />

        <div className="bg-gray-100 dark:bg-gray-800 py-16 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full">

          <div>

            <LargeProductCard Products={Products} />

          </div>
          <div className="">
            <SlideWithCards
              items={products}
              CardComponent={ProductCard}
              cardsPerView={PerViewFeaturedproducts()} // control how many cards you want to show
              SectionName="Featured products"
            />
          </div>

        </div>
        <ProductCard />
        <div className="py-16">

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          <SlideWithCards
            items={CategoryItems}
            CardComponent={CategoryCard}
            cardsPerView={PerViewCategory()} // control how many cards you want to show
            SectionName="Top collections"
          />
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-y-6 lg:gap-y-0 lg:gap-x-6 items-start">
            {/* Left Card */}
            <div className="hero mt-7 lg:w-1/3 w-full bg-primary rounded-md min-h-[460px]">
              <div className="hero-content text-center">
                <div className="max-w-md">

                  <p className="py-6 text-amber-50 text-3xl">
                    The best of smartphone
                  </p>
                  
                  <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl hover:bg-orange-500 hover:text-amber-50">View All</button>
                </div>
              </div>
            </div>

            {/* Right Slider */}
            <div className="w-full lg:w-2/3 overflow-x-auto">
              <SlideWithCards
                items={products}
                CardComponent={ProductCard}
                cardsPerView={PerViewProducts()}
                SectionName=""
              />
            </div>
          </div>
        </div>













      </section>
    </main>

  );
}

