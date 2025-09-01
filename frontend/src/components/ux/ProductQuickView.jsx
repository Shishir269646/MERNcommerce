"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import AddToCartButton from './AddToCartButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/wishlistSlice";
import {
	faHeart,
	faShareAlt,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ColorVariant from "./ColorVariant";
import SizeVariant from "./SizeVariant";
import QtyField from "./QtyField";



const ProductPreviews = ({ Images }) => {
	if (!Array.isArray(Images) || Images.length === 0) {
		return (
			<div className="bg-gray-100 dark:bg-blue-600 dark:bg-opacity-10 p-4 text-center text-gray-500">
				No Images available
			</div>
		);
	}

	const formattedImages = Images.map((sizeGroup) => {
		const small = sizeGroup.find((img) => img.size === "small")?.url || "";
		const large = sizeGroup.find((img) => img.size === "large")?.url || small;
		return { small, large };
	});

	const [selectedImage, setSelectedImage] = useState(
		formattedImages[0]?.large || ""
	);

	return (
		<div className="bg-gray-100 dark:bg-blue-600 dark:bg-opacity-10 p-4 rounded">

			<div className="text-center mb-4">
				<div className="w-full max-w-md h-96 mx-auto flex items-center justify-center bg-white rounded overflow-hidden">
					<Image
						src={selectedImage}
						alt="Product Preview"
						width={384}
						height={384}
						priority
						className="object-contain w-full h-full"
					/>
				</div>
			</div>


			<ul className="flex gap-3 overflow-x-auto">
				{formattedImages.map((preview, i) => (
					<li key={i}>
						<button
							className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded border border-gray-300 overflow-hidden"
							onClick={() => setSelectedImage(preview.large)}
						>
							<Image
								src={preview.small}
								alt={`Thumbnail ${i + 1}`}
								width={96}
								height={96}
								className="object-contain w-full h-full"
							/>
						</button>
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

	const dispatch = useDispatch();

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

	const handleAddToWishlist = () => {
		dispatch(addToWishlist(product._id));
	};

	const handleShare = async () => {
		const productUrl = `${window.location.origin}/product/${product._id}`;
		if (navigator.share) {
			await navigator.share({
				title: product.title,
				text: `Check out this product: ${product.title}`,
				url: productUrl,
			});
		} else {
			navigator.clipboard.writeText(productUrl);
			alert("Link copied to clipboard!");
		}
	};



	const hasColorVariants =
		Array.isArray(product.colorVariants) && product.colorVariants.length > 0;
	const hasSizeVariants =
		Array.isArray(product.sizeVariants) && product.sizeVariants.length > 0;

	const formDataCart = {
		qty: 1,
		selectedColor: hasColorVariants ? product.colorVariants[0].value : null,
		selectedSize: hasSizeVariants ? product.sizeVariants[0].value : null,
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
									
									{hasColorVariants && hasSizeVariants ? (
										<AddToCartButton product={product} formData={formDataCart} />
									) : (
										<button
											disabled
											className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-gray-400 cursor-not-allowed rounded-lg"
										>
											Not Available
										</button>
									)}
								</div>
								<div className="flex items-center gap-4 mt-4">
									<button
										onClick={handleAddToWishlist}
										className="text-primary hover:bg-blue-900 hover:text-white px-3 py-2 rounded">
										<FontAwesomeIcon icon={faHeart} /> Add to wishlist
									</button>
									<button
										onClick={handleShare}
										className="text-blue-600 hover:bg-blue-900 px-3 py-2 rounded">
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