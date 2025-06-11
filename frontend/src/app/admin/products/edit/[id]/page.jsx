"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { getProductById, updateProduct } from "@/services/product.service"; // adjust path
import { toast } from "react-toastify";


export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const product = await getProductById(id);
        if (product) {
          setValue("name", product.name);
          setValue("description", product.description);
          setValue("price", product.price);
          setValue("countInStock", product.countInStock);
          setValue("image", product.image);
          setValue("category", product.category);
          setValue("brand", product.brand);
        }
      } catch (err) {
        toast.error("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProduct(id, data);
      toast.success("Product  updated successfully!");
      router.push("/admin/products");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required", valueAsNumber: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-1 font-medium">Count in Stock</label>
          <input
            type="number"
            {...register("countInStock", { required: "Stock count is required", valueAsNumber: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.countInStock && <p className="text-red-500">{errors.countInStock.message}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            {...register("category", { required: "Category is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input
            type="text"
            {...register("brand")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Product
        </button>
      </form>
    </div>
  );
}
