'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '@/redux/productSlice';
import { fetchCategories } from '@/redux/categorySlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function CreateProductForm() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.product);

    const { categories = [] } = useSelector((state) => state.category || {});

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

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

    const {
        fields: colorFields,
        append: addColor,
        remove: removeColor,
    } = useFieldArray({ control, name: 'colorVariants' });

    const {
        fields: sizeFields,
        append: addSize,
        remove: removeSize,
    } = useFieldArray({ control, name: 'sizeVariants' });

    const {
        fields: specFields,
        append: addSpec,
        remove: removeSpec,
    } = useFieldArray({ control, name: 'specifications' });

    const imagesWatch = watch('Image');
    const [newImages, setNewImages] = useState([]);

    const onAddMoreImages = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const updated = [...newImages, ...selectedFiles];
        setNewImages(updated);
        setValue('Image', updated);
        e.target.value = '';
    };

    const onRemoveNewImage = (index) => {
        const updated = [...newImages];
        updated.splice(index, 1);
        setNewImages(updated);
        setValue('Image', updated);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Append JSON fields
            formData.append('colorVariants', JSON.stringify(data.colorVariants));
            formData.append('sizeVariants', JSON.stringify(data.sizeVariants));
            formData.append('specifications', JSON.stringify(data.specifications));

            // Append plain fields
            const exclude = ['Image', 'colorVariants', 'sizeVariants', 'specifications'];
            Object.entries(data).forEach(([key, value]) => {
                if (!exclude.includes(key)) {
                    formData.append(key, value);
                }
            });

            // Append image files
            if (Array.isArray(data.Image)) {
                data.Image.forEach((file) => {
                    if (file instanceof File) {
                        formData.append('Image', file);
                        formData.append('type', 'product');
                    }
                });
            }

            await dispatch(createProduct(formData)).unwrap();
            toast.success('Product created!');
            reset();
            setNewImages([]);
        } catch (err) {
            toast.error('Failed to create product');
        }
    };


    const price = watch('price');
    const discountPrice = watch('discountPrice');

    const discountPercentage = price && discountPrice
        ? Math.round(((price - discountPrice) / price) * 100)
        : 0;


    return (
        <div className="p-6 bg-base-200 text-base-content min-h-screen">
            <div className="max-w-4xl mx-auto shadow-xl p-8 rounded-2xl bg-base-100">
                <h2 className="text-2xl font-bold mb-6">Create Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <input {...register('title')} placeholder="Title" className="input input-bordered" required />
                    <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered" />

                    <div className="grid grid-cols-2 gap-4">
                        <input {...register('brand')} placeholder="Brand" className="input input-bordered" />

                        <select {...register('category')} defaultValue="" className="select select-bordered">
                            <option value="" disabled>Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <input {...register('sku')} placeholder="SKU" className="input input-bordered" />
                    </div>


                    <div className="grid grid-cols-3 gap-4">
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
                        <label className="form-control w-full">
                            <span className="label-text">Upload Product Images</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                id="addMoreImages"
                                className="hidden"
                                onChange={onAddMoreImages}
                            />
                        </label>

                        <div className="flex flex-wrap gap-4 mt-2">
                            {newImages.map((file, i) => (
                                <div key={`preview-${i}`} className="relative">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full p-1"
                                        onClick={() => onRemoveNewImage(i)}
                                    >
                                        ✕
                                    </button>
                                    <span className="absolute bottom-0 left-0 text-[10px] bg-black bg-opacity-60 text-white px-1 rounded-t">
                                        New
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline btn-sm mt-3"
                            onClick={() => document.getElementById('addMoreImages').click()}
                        >
                            ➕ Add More Images
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input {...register('selectedColor')} placeholder="Selected Color" className="input input-bordered" />
                        <input {...register('selectedSize')} placeholder="Selected Size" className="input input-bordered" />
                    </div>

                    <input {...register('material')} placeholder="Material" className="input input-bordered" />
                    <input {...register('dimensions')} placeholder="Dimensions" className="input input-bordered" />
                    <input {...register('weight')} placeholder="Weight" className="input input-bordered" />
                    <input {...register('warranty')} placeholder="Warranty" className="input input-bordered" />
                    <input {...register('returnPolicy')} placeholder="Return Policy" className="input input-bordered" />

                    {/* Color Variants */}
                    <div>
                        <label className="label-text font-semibold">Color Variants</label>
                        {colorFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 mb-2">
                                <input {...register(`colorVariants.${index}.value`)} placeholder="Color (e.g. Red)" className="input input-bordered w-1/2" />
                                <input {...register(`colorVariants.${index}.bgcolor`)} placeholder="Hex (#ff0000)" className="input input-bordered w-1/2" />
                                <button type="button" className="btn btn-sm btn-error" onClick={() => removeColor(index)}>X</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-primary mt-2" onClick={() => addColor({ value: '', bgcolor: '' })}>
                            + Add Color
                        </button>
                    </div>

                    {/* Size Variants */}
                    <div>
                        <label className="label-text font-semibold">Size Variants</label>
                        {sizeFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 mb-2">
                                <input {...register(`sizeVariants.${index}.value`)} placeholder="Size (e.g. M)" className="input input-bordered w-1/2" />
                                <input {...register(`sizeVariants.${index}.label`)} placeholder="Label (e.g. Medium)" className="input input-bordered w-1/2" />
                                <button type="button" className="btn btn-sm btn-error" onClick={() => removeSize(index)}>X</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-primary mt-2" onClick={() => addSize({ value: '', label: '' })}>
                            + Add Size
                        </button>
                    </div>

                    {/* Specifications */}
                    <div>
                        <label className="label-text font-semibold">Specifications</label>
                        {specFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 mb-2">
                                <input {...register(`specifications.${index}.key`)} placeholder="Key (e.g. Material)" className="input input-bordered w-1/2" />
                                <input {...register(`specifications.${index}.value`)} placeholder="Value (e.g. Cotton)" className="input input-bordered w-1/2" />
                                <button type="button" className="btn btn-sm btn-error" onClick={() => removeSpec(index)}>X</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-primary mt-2" onClick={() => addSpec({ key: '', value: '' })}>
                            + Add Specification
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                        {loading ? 'Submitting...' : 'Create Product'}
                    </button>

                    {error && <p className="text-error">{error.message || 'An error occurred.'}</p>}
                </form>
            </div>
        </div>
    );
}
