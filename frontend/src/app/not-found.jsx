"use client";

import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <section className="ezy__httpcodes9 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap justify-center text-center">
          <div className="w-full">
            <div
              className="bg-cover bg-no-repeat bg-bottom min-h-[300px] rounded-2xl"
              style={{
                backgroundImage:
                  "url(https://cdn.easyfrontend.com/pictures/httpcodes/https9.jpg)",
              }}
            ></div>
          </div>
          <div className="w-full pt-12">
            <h1 className="text-[32px] font-bold leading-none md:text-[40px] mb-4">
              Oh no! Error 404
            </h1>
            <p className="text-lg opacity-80">
              Something went wrong, this page is broken.
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/" className="btn btn-primary">Go To Home</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




export default NotFound;
