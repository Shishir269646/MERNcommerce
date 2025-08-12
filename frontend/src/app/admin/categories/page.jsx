'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '@/redux/categorySlice';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import ImageInputer from '@/components/ui/ImageInputer';
import Image from 'next/image';


//Utility function to build full image URL
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    return imagePath.startsWith('http')
        ? imagePath
        : `https://mern-project-uploads.s3.us-east-1.amazonaws.com/${imagePath}`;
};

const CategoriesPage = () => {
    const dispatch = useDispatch();
    const { categories = [], loading = false, error = null } =
        useSelector((state) => state.category || {});

    const [categoryName, setCategoryName] = useState('');
    const [editId, setEditId] = useState(null);
    const [categoryImg, setCategoryImg] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const resetForm = () => {
        setCategoryName('');
        setCategoryImg(null);
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        const formData = new FormData();
        formData.append('name', categoryName);

        if (categoryImg) {
            formData.append('Image', categoryImg);
            formData.append('type', 'category');
        }


        try {
            if (editId) {
                await dispatch(updateCategory({ id: editId, data: formData })).unwrap();
                toast.success('Category updated successfully');
            } else {
                await dispatch(createCategory(formData)).unwrap();
                toast.success('Category created successfully');
            }
            dispatch(fetchCategories());
            resetForm();
        } catch (err) {
            console.error('Create/Update category error:', err);
            toast.error(err?.message || 'An error occurred');
        }
    };

    const handleEdit = (category) => {
        setCategoryName(category.name);
        setEditId(category._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteCategory(id)).unwrap();
            toast.success('Category deleted');
            resetForm();
        } catch (err) {
            toast.error(err?.message || 'Failed to delete category');
        }
    };

    const handleFileChange = (e) => {
        setCategoryImg(e.target.files[0]);
    };

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 text-gray-800 dark:text-gray-100">
            <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

            <form onSubmit={handleSubmit} className="gap-4 mb-8 items-center">
                <input
                    type="text"
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="input input-bordered mb-4 w-full max-w-sm"
                />

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Category Image</label>
                    <ImageInputer onChange={handleFileChange} />
                </div>

                <div className="flex gap-3 mb-6">
                    <Button type="submit">{editId ? 'Update' : 'Create'}</Button>
                    {editId && (
                        <Button type="button" variant="ghost" onClick={resetForm}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-sm"
                />
            </div>

            {loading ? (
                <span className="loading loading-dots loading-xl"></span>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : filteredCategories.length === 0 ? (
                <p>No matching categories found.</p>
            ) : (
                <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted dark:bg-gray-800">
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCategories.map((cat) => (
                                <TableRow key={cat._id}>
                                    <TableCell className="font-semibold text-xl">{cat.name}</TableCell>
                                    <TableCell>
                                        {cat.image ? (
                                            <Image
                                                src={getImageUrl(cat.image)}
                                                alt={cat.name}
                                                width={80}
                                                height={80}
                                                className="object-cover rounded"
                                            />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => handleEdit(cat)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" onClick={() => handleDelete(cat._id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
