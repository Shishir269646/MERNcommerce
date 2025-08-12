'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct } from '@/redux/productSlice';
import { toast } from 'react-toastify';

export default function EditProductForm() {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const dispatch = useDispatch();
  const router = useRouter();

  const { selectedProduct, loading } = useSelector((state) => state.product);

  // Initialize Image as an empty array to avoid null issues


  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      colorVariants: [{ value: '', bgcolor: '' }],
      sizeVariants: [{ value: '', label: '' }],
      specifications: [{ key: '', value: '' }],
    },
  });



  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({ control, name: 'colorVariants' });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: 'sizeVariants' });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({ control, name: 'specifications' });

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (selectedProduct) {
      reset({
        title: selectedProduct.title || '',
        description: selectedProduct.description || '',
        brand: selectedProduct.brand || '',
        category: selectedProduct.category || '',
        sku: selectedProduct.sku || '',
        price: selectedProduct.price ?? '',
        discountPrice: selectedProduct.discountPrice ?? '',
        discountPercentage: selectedProduct.discountPercentage ?? '',
        stock: selectedProduct.stock ?? '',
        selectedColor: selectedProduct.selectedColor || '',
        selectedSize: selectedProduct.selectedSize || '',
        material: selectedProduct.material || '',
        dimensions: selectedProduct.dimensions || '',
        weight: selectedProduct.weight || '',
        warranty: selectedProduct.warranty || '',
        returnPolicy: selectedProduct.returnPolicy || '',

        colorVariants: selectedProduct.colorVariants?.length
          ? selectedProduct.colorVariants
          : [{ value: '', bgcolor: '' }],

        sizeVariants: selectedProduct.sizeVariants?.length
          ? selectedProduct.sizeVariants
          : [{ value: '', label: '' }],

        specifications: selectedProduct.specifications
          ? Object.entries(selectedProduct.specifications).map(([key, value]) => ({ key, value }))
          : [{ key: '', value: '' }],
      });

      setMainPreview(Array.isArray(selectedProduct.Image) ? selectedProduct.Image : []);
    }


  }, [selectedProduct, reset]);




  const [Image, setMainPreview] = useState([]);
  const [newImages, setNewImages] = useState([]);


  const [removedImages, setRemovedImages] = useState([]);


  const onAddMoreImages = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...selectedFiles]);
    setValue('Image', [...(watch('Image') || []), ...selectedFiles]);
    e.target.value = '';
  };


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Convert specifications array to object
      const specsObj = {};
      if (Array.isArray(data.specifications)) {
        data.specifications.forEach(({ key, value }) => {
          if (key?.trim()) {
            specsObj[key.trim()] = value;
          }
        });
      }

      // Append structured fields
      formData.append('colorVariants', JSON.stringify(data.colorVariants || []));
      formData.append('sizeVariants', JSON.stringify(data.sizeVariants || []));
      formData.append('specifications', JSON.stringify(specsObj));

      // Exclude special fields from direct append
      const excludeFields = ['Image', 'colorVariants', 'sizeVariants', 'specifications'];

      Object.entries(data).forEach(([key, value]) => {
        if (!excludeFields.includes(key)) {
          formData.append(key, value);
        }
      });

      //Send existing (unremoved) images
      formData.append('existingImages', JSON.stringify(Image));

      // Send removed image URLs (for backend to delete from S3)
      formData.append('removedImages', JSON.stringify(removedImages));

      //Append NEW image files
      if (Array.isArray(data.Image) && data.Image.length > 0) {
        data.Image.forEach((file) => {
          if (file instanceof File) {
            formData.append('Image', file);
            formData.append('type', 'product');
          }
        });
      }

      await dispatch(updateProduct({ id: productId, formData })).unwrap();

      toast.success('Product updated successfully!');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update product.');
    }
  };



  if (loading && !selectedProduct) {
    return <div className="p-6 text-center">Loading product data...</div>;
  }

  return (
    <div className="p-6 bg-base-200 min-h-screen text-base-content">
      <div className="max-w-4xl mx-auto p-8 shadow-xl rounded-2xl bg-base-100">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Basic inputs */}
          <input {...register('title')} placeholder="Title" className="input input-bordered" required />
          <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered" />

          <div className="grid grid-cols-2 gap-4">
            <input {...register('brand')} placeholder="Brand" className="input input-bordered" />
            <input {...register('category')} placeholder="Category" className="input input-bordered" />
            <input {...register('sku')} placeholder="SKU" className="input input-bordered" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="number" {...register('price')} placeholder="Price" className="input input-bordered" />
            <input type="number" {...register('discountPrice')} placeholder="Discount Price" className="input input-bordered" />
            <input type="number" {...register('discountPercentage')} placeholder="Discount %" className="input input-bordered" />
          </div>

          <input type="number" {...register('stock')} placeholder="Stock" className="input input-bordered" />

          {/* Images */}
          <label className="form-control">
            <span className="label-text">Image</span>
            <input type="file" {...register('Image')} accept="image/*" className="file-input file-input-bordered" />
          </label>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-4 mt-2">
              {/* Render new images from newImages state */}
              {newImages.map((file, i) => (
                <div key={`new-${i}`} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="New"
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

              {/* Previously uploaded images - unchanged */}
              {Image?.length > 0 &&
                Image.map((imgUrl, i) => (
                  <div key={`old-${i}`} className="relative">
                    <img
                      src={imgUrl}
                      alt="Old"
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full p-1"
                      onClick={() => {
                        setMainPreview(prev => prev.filter(img => img !== imgUrl));
                        setRemovedImages(prev => [...prev, imgUrl]);
                      }}
                    >
                      ✕
                    </button>
                    <span className="absolute bottom-0 left-0 text-[10px] bg-gray-800 bg-opacity-70 text-white px-1 rounded-t">
                      Existing
                    </span>
                  </div>
                ))}
            </div>

            {/* Hidden input for selecting more images */}
            <input
              type="file"
              accept="image/*"
              multiple
              id="addMoreImages"
              className="hidden"
              onChange={onAddMoreImages}
            />

            {/* Add More Images Button */}
            <button
              type="button"
              className="btn btn-outline btn-sm w-fit"
              onClick={() => document.getElementById('addMoreImages').click()}
            >
              ➕ Add More Images
            </button>
          </div>




          {/* Selected Color & Size */}
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
            <label className="label">
              <span className="label-text font-semibold">Color Variants</span>
            </label>
            <div className="flex flex-col gap-3">
              {colorFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    {...register(`colorVariants.${index}.value`)}
                    placeholder="Color Name (e.g. Red)"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    {...register(`colorVariants.${index}.bgcolor`)}
                    placeholder="Hex Code (e.g. #ff0000)"
                    className="input input-bordered w-full"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => removeColor(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => appendColor({ value: '', bgcolor: '' })}
            >
              Add More Color Variants
            </button>
          </div>

          {/* Size Variants */}
          <div>
            <label className="label mt-6">
              <span className="label-text font-semibold">Size Variants</span>
            </label>
            <div className="flex flex-col gap-3">
              {sizeFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    {...register(`sizeVariants.${index}.value`)}
                    placeholder="Size Value (e.g. M)"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    {...register(`sizeVariants.${index}.label`)}
                    placeholder="Label (e.g. Medium)"
                    className="input input-bordered w-full"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => removeSize(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => appendSize({ value: '', label: '' })}
            >
              Add More Size Variants
            </button>
          </div>

          {/* Specifications */}
          <div>
            <label className="label mt-6">
              <span className="label-text font-semibold">Specifications</span>
            </label>
            <div className="flex flex-col gap-3">
              {specFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    {...register(`specifications.${index}.key`)}
                    placeholder="Key (e.g. Material, Fit)"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    {...register(`specifications.${index}.value`)}
                    placeholder="Value (e.g. Cotton, Slim)"
                    className="input input-bordered w-full"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => removeSpec(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => appendSpec({ key: '', value: '' })}
            >
              Add More Specifications
            </button>
          </div>

          <button type="submit" className="btn btn-primary mt-6" disabled={loading}>
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
