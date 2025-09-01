// components/ProductForm.jsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, fetchProductById, updateProduct } from '@/redux/productSlice';
import { fetchCategories } from '@/redux/categorySlice';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProductForm({ isEditing = false }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const productId = isEditing ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;

    const { selectedProduct, loading, error } = useSelector((state) => state.product);
    const { categories = [] } = useSelector((state) => state.category || {});

    // State for image handling
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            colorVariants: [{ value: '', bgcolor: '' }],
            sizeVariants: [{ value: '', label: '' }],
            specifications: [{ key: '', value: '' }],
            Image: [],
        },
    });

    // UseFieldArray for dynamic fields
    const { fields: colorFields, append: addColor, remove: removeColor } = useFieldArray({ control, name: 'colorVariants' });
    const { fields: sizeFields, append: addSize, remove: removeSize } = useFieldArray({ control, name: 'sizeVariants' });
    const { fields: specFields, append: addSpec, remove: removeSpec } = useFieldArray({ control, name: 'specifications' });

    // Watchers for form fields
    const price = watch('price');
    const discountPrice = watch('discountPrice');
    const discountPercentage = price && discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;
    const imagesWatch = watch('Image'); // This watches for new image files from the file input

    // Fetch product data and categories on component load
    useEffect(() => {
        dispatch(fetchCategories());
        if (isEditing && productId) {
            dispatch(fetchProductById(productId));
        }
    }, [dispatch, isEditing, productId]);

    // Populate form fields when selectedProduct is available (in edit mode)
    useEffect(() => {
        if (isEditing && selectedProduct) {
            reset({
                title: selectedProduct.title || '',
                description: selectedProduct.description || '',
                brand: selectedProduct.brand || '',
                category: selectedProduct.category || '',
                sku: selectedProduct.sku || '',
                price: selectedProduct.price ?? '',
                discountPrice: selectedProduct.discountPrice ?? '',
                stock: selectedProduct.stock ?? '',
                selectedColor: selectedProduct.selectedColor || '',
                selectedSize: selectedProduct.selectedSize || '',
                material: selectedProduct.material || '',
                dimensions: selectedProduct.dimensions || '',
                weight: selectedProduct.weight || '',
                warranty: selectedProduct.warranty || '',
                returnPolicy: selectedProduct.returnPolicy || '',
                colorVariants: selectedProduct.colorVariants?.length ? selectedProduct.colorVariants : [{ value: '', bgcolor: '' }],
                sizeVariants: selectedProduct.sizeVariants?.length ? selectedProduct.sizeVariants : [{ value: '', label: '' }],
                specifications: selectedProduct.specifications
                    ? Object.entries(selectedProduct.specifications).map(([key, value]) => ({ key, value }))
                    : [{ key: '', value: '' }],
            });

            // Set existing images for preview
            setExistingImages(selectedProduct.Image || []);
        }
    }, [isEditing, selectedProduct, reset]);

    // Handle new image uploads
    const onAddMoreImages = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setNewImages((prev) => [...prev, ...selectedFiles]);
        setValue('Image', [...(imagesWatch || []), ...selectedFiles]);
        e.target.value = '';
    };

    // Handle removing new images
    const onRemoveNewImage = (index) => {
        const updatedNewImages = [...newImages];
        updatedNewImages.splice(index, 1);
        setNewImages(updatedNewImages);
        setValue('Image', updatedNewImages);
    };

    // Handle removing existing images
    const onRemoveExistingImage = (imgUrl) => {
        setExistingImages((prev) => prev.filter((img) => img !== imgUrl));
        setRemovedImages((prev) => [...prev, imgUrl]);
    };

    // The single onSubmit function
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Append JSON fields
            formData.append('colorVariants', JSON.stringify(data.colorVariants));
            formData.append('sizeVariants', JSON.stringify(data.sizeVariants));

            // Convert specifications array to object and append
            const specsObj = {};
            data.specifications.forEach(({ key, value }) => {
                if (key.trim()) specsObj[key.trim()] = value;
            });
            formData.append('specifications', JSON.stringify(specsObj));

            // Append calculated discount percentage
            formData.append('discountPercentage', discountPercentage);

            // Append plain fields
            const excludeFields = ['Image', 'colorVariants', 'sizeVariants', 'specifications'];
            Object.entries(data).forEach(([key, value]) => {
                if (!excludeFields.includes(key) && value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });

            // Append images based on mode (create vs. edit)
            if (isEditing) {
                // For editing, we send removed URLs and new files separately
                formData.append('existingImages', JSON.stringify(existingImages));
                formData.append('removedImages', JSON.stringify(removedImages));
                newImages.forEach((file) => {
                    formData.append('Image', file);
                });
            } else {
                // For creating, we just send all new image files
                newImages.forEach((file) => {
                    formData.append('Image', file);
                });
            }
            formData.append('type', 'product');

            if (isEditing) {
                await dispatch(updateProduct({ id: productId, formData })).unwrap();
                toast.success('Product updated successfully!');
            } else {
                await dispatch(createProduct(formData)).unwrap();
                toast.success('Product created successfully!');
                reset(); // Reset form for new product creation
                setNewImages([]); // Clear new images state
            }
            router.push('/admin/products');
        } catch (err) {
            toast.error(`Failed to ${isEditing ? 'update' : 'create'} product.`);
            console.error(err);
        }
    };

    if (isEditing && loading && !selectedProduct) {
        return <div className="p-6 text-center">Loading product data...</div>;
    }

    return (
        <div className="p-6 bg-base-200 text-base-content min-h-screen">
            <div className="max-w-4xl mx-auto shadow-xl p-8 rounded-2xl bg-base-100">
                <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Product' : 'Create Product'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    {/* Basic Fields */}
                    <input {...register('title')} placeholder="Title" className="input input-bordered" required />
                    <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input {...register('brand')} placeholder="Brand" className="input input-bordered" />
                        <select {...register('category')} defaultValue="" className="select select-bordered" required>
                            <option value="" disabled>Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <input {...register('sku')} placeholder="SKU" className="input input-bordered" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="number" {...register('price')} placeholder="Price" className="input input-bordered" required />
                        <input type="number" {...register('discountPrice')} placeholder="Discount Price" className="input input-bordered" />
                        <input
                            type="text"
                            value={`${discountPercentage} %`}
                            disabled
                            className="input input-bordered"
                            placeholder="Discount %"
                        />
                    </div>
                    <input type="number" {...register('stock')} placeholder="Stock" className="input input-bordered" />

                    {/* Image Upload and Preview Section */}
                    <div>
                        <label className="label-text">Product Images</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {/* Existing Images (only in edit mode) */}

                            {isEditing && existingImages.map((imageGroup, i) => {
                                const smallImage = imageGroup.find(imgObj => imgObj.size === 'small');
                                return smallImage ? (
                                    <div key={`small-${i}`} className="relative">
                                        <Image
                                            src={smallImage.url}
                                            alt="Existing Small"
                                            height={96}
                                            width={96}
                                            loading="lazy"
                                            className="object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full p-1"
                                            onClick={() => onRemoveExistingImage(i, 'small')}
                                        >
                                            ✕
                                        </button>
                                        
                                    </div>
                                ) : null;
                            })}


                            {/* New Images */}
                            {newImages.map((file, i) => (
                                <div key={`new-${i}`} className="relative">
                                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-24 h-24 object-cover rounded border" />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full p-1"
                                        onClick={() => onRemoveNewImage(i)}
                                    >
                                        ✕
                                    </button>
                                    <span className="absolute bottom-0 left-0 text-[10px] bg-black bg-opacity-60 px-1 rounded-t">
                                        New
                                    </span>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            id="addMoreImages"
                            className="hidden"
                            onChange={onAddMoreImages}
                        />
                        <button
                            type="button"
                            className="btn btn-outline btn-sm mt-3"
                            onClick={() => document.getElementById('addMoreImages').click()}
                        >
                            ➕ Add More Images
                        </button>
                    </div>

                    {/* Other Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input {...register('selectedColor')} placeholder="Selected Color" className="input input-bordered" />
                        <input {...register('selectedSize')} placeholder="Selected Size" className="input input-bordered" />
                    </div>
                    <input {...register('material')} placeholder="Material" className="input input-bordered" />
                    <input {...register('dimensions')} placeholder="Dimensions" className="input input-bordered" />
                    <input {...register('weight')} placeholder="Weight" className="input input-bordered" />
                    <input {...register('warranty')} placeholder="Warranty" className="input input-bordered" />
                    <input {...register('returnPolicy')} placeholder="Return Policy" className="input input-bordered" />

                    {/* Dynamic Fields (Color, Size, Specs) */}
                    <div>
                        <label className="label-text font-semibold">Color Variants</label>
                        {colorFields.map((field, index) => (
                            <div key={field.id} className="flex flex-col md:flex-row gap-2 mb-2">
                                <input {...register(`colorVariants.${index}.value`)} placeholder="Color (e.g. Red)" className="input input-bordered w-full md:w-1/2" />
                                <input {...register(`colorVariants.${index}.bgcolor`)} placeholder="Hex (#ff0000)" className="input input-bordered w-full md:w-1/2" />
                                <button type="button" className="btn btn-sm btn-error" onClick={() => removeColor(index)}>✕</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-primary mt-2" onClick={() => addColor({ value: '', bgcolor: '' })}>+ Add Color</button>
                    </div>

                    <div>
                        <label className="label-text font-semibold">Size Variants</label>
                        {sizeFields.map((field, index) => (
                            <div key={field.id} className="flex flex-col md:flex-row gap-2 mb-2">
                                <input {...register(`sizeVariants.${index}.value`)} placeholder="Size (e.g. M)" className="input input-bordered w-full md:w-1/2" />
                                <input {...register(`sizeVariants.${index}.label`)} placeholder="Label (e.g. Medium)" className="input input-bordered w-full md:w-1/2" />
                                <button type="button" className="btn btn-sm btn-error" onClick={() => removeSize(index)}>✕</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-primary mt-2" onClick={() => addSize({ value: '', label: '' })}>+ Add Size</button>
                    </div>

                    <div>
                        <label className="label-text font-semibold">Specifications</label>
                        {specFields.map((field, index) => (
                            <div key={field.id} className="flex flex-col md:flex-row gap-2 mb-2">
                                <input {...register(`specifications.${index}.key`)} placeholder="Key (e.g. Material)" className="input input-bordered w-full md:w-1/2" />
                                <input {...register(`specifications.${index}.value`)} placeholder="Value (e.g. Cotton)" className="input input-bordered w-full md:w-1/2" />
                                <button type="button" className="btn btn-sm btn-error" onClick={() => removeSpec(index)}>✕</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-primary mt-2" onClick={() => addSpec({ key: '', value: '' })}>+ Add Specification</button>
                    </div>

                    <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                        {loading ? 'Submitting...' : isEditing ? 'Update Product' : 'Create Product'}
                    </button>

                    {error && <p className="text-error">{error.message || 'An error occurred.'}</p>}
                </form>
            </div>
        </div>
    );
}