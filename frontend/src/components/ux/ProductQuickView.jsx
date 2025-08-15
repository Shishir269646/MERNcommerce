"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faShareAlt,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ColorVariant from "./ColorVariant";
import SizeVariant from "./SizeVariant";
import QtyField from "./QtyField";



const ProductPreviews = ({ Images }) => {
	const [index, setIndex] = useState(0);

	if (!Array.isArray(Images) || Images.length === 0) {
		return (
			<div className="bg-gray-100 dark:bg-blue-600 dark:bg-opacity-10 p-4 text-center text-gray-500">
				No Images available
			</div>
		);
	}

	return (
		<div className="bg-gray-100 dark:bg-blue-600 dark:bg-opacity-10 p-4 rounded">
			<div className="text-center mb-4">
				<img
					src={Images[index]}
					alt=""
					className="w-full h-auto max-h-96 object-contain"
				/>
			</div>
			<ul className="flex gap-3 overflow-x-auto">
				{Images.map((preview, i) => (
					<li
						className="w-24 h-24 flex justify-center items-center bg-gray-200 dark:bg-blue-600/20 rounded border border-gray-100 dark:border-blue-600/20 cursor-pointer"
						key={i}
						onClick={() => setIndex(i)}
					>
						<img
							src={preview}
							alt=""
							className="max-w-full max-h-20 object-contain"
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

ProductPreviews.propTypes = {
	Images: PropTypes.array.isRequired,
};







const ProductQuickView = ({ onClose, product }) => {
	if (!product) return null;

	const [formData, setFormData] = useState({
		color: "Multi",
		size: "XL",
		qty: 1,
	});

	const setField = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};



	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div
				className="bg-white w-full max-w-2xl p-6 rounded-xl relative"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline"
			>
				<button
					className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
					onClick={onClose}
					aria-label="Close"
				>
					<FontAwesomeIcon icon={faTimes} />
				</button>

				<div className="flex flex-col lg:flex-row gap-6">
					<div className="flex-1 min-w-0">
						<ProductPreviews Images={product.Image || []} />
					</div>

					<div className="flex-1 min-w-0">
						<div className="mb-6">
							<h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
							<h3 className="text-blue-600 text-2xl font-bold">
								Rs. {product.price}
							</h3>
						</div>

						<form>

							<ColorVariant colorVariant={product.colorVariants} />
							<SizeVariant sizeVariant={product.sizeVariants} />


							<div className="mb-6">
								<h5 className="font-medium mb-2">QTY</h5>

								<QtyField
									onChange={setField}
									name="qty"
									value={formData.qty}
								/>
							</div>

							<div className="flex flex-col gap-3 mt-6">
								<div className="flex flex-col sm:flex-row gap-4">
									<button className="bg-blue-600 border border-blue-600 text-white text-sm rounded uppercase hover:bg-opacity-90 px-6 py-2.5 w-full sm:w-1/2">
										BUY NOW
									</button>
									<button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded uppercase px-6 py-2.5 w-full sm:w-1/2">
										Add To Cart
									</button>
								</div>
								<div className="flex items-center gap-4 mt-4">
									<button className="text-blue-600 hover:bg-blue-100 hover:bg-blue-900 px-3 py-2 rounded">
										<FontAwesomeIcon icon={faHeart} /> Add to wishlist
									</button>
									<button className="text-blue-600 hover:bg-blue-100 hover:bg-blue-900 px-3 py-2 rounded">
										<FontAwesomeIcon icon={faShareAlt} className="mr-2" />
										Share
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductQuickView;