"use client";
import React from "react";
import ImageSlider from "@/components/ux/ImageSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faHeadphonesAlt,
  faRibbon,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import LargeProductCard from "@/components/ux/LargeProductCard";
import ProductListing from "@/components/ux/ProductListing";
import Login from "@/components/ux/Login";
import DemoProduct from "@/components/ux/DemoProduct";
import ProductCard1 from "@/components/ux/ProductCard1";
import img1 from "../images/headphones.jpg"


//demo2
import SlideWithCards1 from "@/components/ux/SlideWithCards1";
import ProductCard from "@/components/ux/ProductCard";
import CategoryCard from "@/components/ux/CategoryCard";
import BreadcrumbSection from "@/components/ux/BreadcrumbSection";
import ProductDetail from "@/components/ux/ProductDetail";
import MiniShoppingCart from "@/components/ux/MiniShoppingCart";





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

const products = [
  {
    name: "Apple MacBook Air M2",
    imageLight: img1,
    imageDark: img1,
    rating: 4.8,
    reviewCount: 2412,
    features: ["Free Delivery", "Best Seller", "0% EMI Available"],
    price: 1249,
  },
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    imageLight: img1,
    imageDark: img1,
    rating: 4.7,
    reviewCount: 987,
    features: ["Free Delivery", "Best Seller", "Noise Cancellation"],
    price: 399,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    imageLight: img1,
    imageDark: img1,
    rating: 4.6,
    reviewCount: 1384,
    features: ["Best Seller", "Free Delivery", "Trade-in Offer"],
    price: 1299,
  },
  {
    name: "Nike Air Max 270",
    imageLight: img1,
    imageDark: img1,
    rating: 4.4,
    reviewCount: 653,
    features: ["Free Delivery", "Comfort Fit", "Best Seller"],
    price: 159,
  },
  {
    name: "Logitech MX Master 3S",
    imageLight: img1,
    imageDark: img1,
    rating: 4.9,
    reviewCount: 328,
    features: ["Best Seller", "Precision Scrolling", "Free Delivery"],
    price: 99,
  },
];


const IncentiveItem = ({ item }) => (
  <div className="flex justify-center items-center">
    <div className="text-[45px] text-blue-600">
      <FontAwesomeIcon icon={item.icon} />
    </div>
    <div className="ml-4 mt-2">
      <h5 className="mb-1 text-2xl font-medium">{item.title}</h5>
      <p className="text-sm opacity-70">{item.desc}</p>
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


//Category
const CategoryItems = [
  { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_1.png', title: 'Toys' },
  { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png', title: 'Kids' },
  { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_3.png', title: 'Bags' },
  { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png', title: 'Babies' },
  { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png', title: 'Kids' },
  { imageUrl: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png', title: 'Babies' },
];


export default function Home() {


  const PerViewFeaturedproducts = () => {
    if (typeof window === 'undefined') return 2;

    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 2;
  };
  const PerViewCategory = () => {
    if (typeof window === 'undefined') return 4;

    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 4;
    return 4;
  };


  return (

    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">


      <section className="p-4 text-gray-800 dark:text-white">
        <ImageSlider />
        <Incentives1 />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full p-4">

          <div>
            <LargeProductCard />

          </div>
          <div>
            <SlideWithCards1
              items={products}
              CardComponent={ProductCard}
              cardsPerView={PerViewFeaturedproducts()} // control how many cards you want to show
              SectionName="Featured products"
            />
          </div>

        </div>
        <ProductCard />

        <SlideWithCards1
          items={CategoryItems}
          CardComponent={CategoryCard}
          cardsPerView={PerViewCategory()} // control how many cards you want to show
          SectionName="Top collections"
        />
        <div className="lg:flex sm:grid-cols-1">
          <div className="card bg-primary w-80 h-auto shadow-sm">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl text-white justify-center">The best of smartphone</h2>
              <div className="card-actions justify-end">

                <button className="btn uppercase hover:bg-[#fd7b7b]">View All</button>

              </div>
            </div>
          </div>

          <div className="ml-3 overflow-hidden">
            <SlideWithCards1
              items={products}
              CardComponent={ProductCard}
              cardsPerView={3.2} // control how many cards you want to show
              SectionName=""
            />
          </div>
        </div>
        <ProductListing />

        <Login />

        <BreadcrumbSection
          items={['Products', 'Electronics']}
          title="Electronics"
        />

        <DemoProduct />
        <ProductCard1 />
        <ProductDetail />
        


      </section>
    </main>

  );
}

