"use client";


import { Fragment, useState } from "react";
import { FiEye, FiHeart } from 'react-icons/fi';

import ProductQuickView from "./ProductQuickView";



const DemoProduct = () => {


    


    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const actionButtonClass =
        'rounded-lg p-6 text-gray-500 hover:bg-amber-800 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';

    return (
        <Fragment>
            <section className=" py-11 bg-white dark:bg-[#0b1727] text-white relative overflow-hidden z-10">
                <div className="container">
                    <button onClick={handleShow} className={actionButtonClass}>
                        <FiEye className="h-5 w-5" />
                    </button>
                    <button className={actionButtonClass} title="Add to Favorites">
                        <FiHeart className="h-5 w-5" />
                    </button>
                </div>
            </section>
            {show && (
                <ProductQuickView show={show} onClose={() => setShow(false)} />

            )}

        </Fragment>
    );
};

export default DemoProduct;