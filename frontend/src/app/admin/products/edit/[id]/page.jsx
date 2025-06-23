"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, editProduct } from "@/redux/productSlice";
import { useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageInputer from "@/components/ui/ImageInputer";

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const [previewThumbPairs, setPreviewThumbPairs] = useState([{ preview: null, thumb: null }]);

  // ✅ FIXED: Correct selector for selectedProduct
  const { selectedProduct: product, loading, error } = useSelector((state) => state.product);

  // Fetch product data on mount
  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, [id, dispatch]);

  // Populate form fields when product is available
  useEffect(() => {
    if (!loading && product && product._id === id) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("discountPrice", product.discountPrice || "");
      setValue("stock", product.stock);
      setValue("brand", product.brand);
      setValue("category", product.category);
      setValue("sku", product.sku);
      setValue("material", product.material || "");
      setValue("dimensions", product.dimensions || "");
      setValue("weight", product.weight || "");
      setValue("warranty", product.warranty || "");
      setValue("returnPolicy", product.returnPolicy || "");
    }
  }, [product, loading, id, setValue]);

  const handleFileChange = (index, field, files) => {
    const updatedPairs = [...previewThumbPairs];
    updatedPairs[index][field] = files[0];
    setPreviewThumbPairs(updatedPairs);
  };

  const addPair = () => {
    setPreviewThumbPairs([...previewThumbPairs, { preview: null, thumb: null }]);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      previewThumbPairs.forEach(({ preview, thumb }) => {
        if (preview) formData.append("previews", preview);
        if (thumb) formData.append("thumbs", thumb);
      });

      await dispatch(editProduct({ id, payload: formData })).unwrap();
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product data...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-4 space-y-6">
        <input type="text" placeholder="Title" {...register("title", { required: true })} className="input" />
        <textarea placeholder="Description" {...register("description", { required: true })} className="input" rows={3} />
        <input type="number" step="0.01" placeholder="Price" {...register("price", { required: true })} className="input" />
        <input type="number" step="0.01" placeholder="Discount Price" {...register("discountPrice")} className="input" />
        <input type="number" placeholder="Stock" {...register("stock", { required: true })} className="input" />
        <input type="text" placeholder="Brand" {...register("brand", { required: true })} className="input" />
        <input type="text" placeholder="Category" {...register("category", { required: true })} className="input" />
        <input type="text" placeholder="SKU" {...register("sku", { required: true })} className="input" />
        <input type="text" placeholder="Material" {...register("material")} className="input" />
        <input type="text" placeholder="Dimensions" {...register("dimensions")} className="input" />
        <input type="text" placeholder="Weight" {...register("weight")} className="input" />
        <input type="text" placeholder="Warranty" {...register("warranty")} className="input" />
        <input type="text" placeholder="Return Policy" {...register("returnPolicy")} className="input" />

        {/* Image uploader */}
        <div>
          <h3 className="font-semibold mb-2">Update Preview & Thumbnail Images</h3>
          {previewThumbPairs.map((pair, index) => (
            <div key={index} className="flex items-center gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Preview Image</label>
                <ImageInputer onChange={(e) => handleFileChange(index, "preview", e.target.files)} />
                {pair.preview && (
                  typeof pair.preview === "string" ? (
                    <img src={pair.preview} alt="Preview" className="w-20 mt-2" />
                  ) : (
                    <p className="text-xs mt-1">{pair.preview.name}</p>
                  )
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
                <ImageInputer onChange={(e) => handleFileChange(index, "thumb", e.target.files)} />
                {pair.thumb && (
                  typeof pair.thumb === "string" ? (
                    <img src={pair.thumb} alt="Thumb" className="w-20 mt-2" />
                  ) : (
                    <p className="text-xs mt-1">{pair.thumb.name}</p>
                  )
                )}
              </div>
            </div>
          ))}

          <button type="button" onClick={addPair} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
            Add More Preview + Thumb
          </button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Product
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.375rem;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </>
  );
};

export default EditProductPage;
