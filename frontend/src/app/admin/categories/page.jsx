'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
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

const CategoriesPage = () => {
    const dispatch = useDispatch();

    const {
        categories = [],
        loading = false,
        error = null,
    } = useSelector((state) => state.category || {});

    const [categoryName, setCategoryName] = useState('');
    const [editId, setEditId] = useState(null);
    const [categoryImg, setCategoryImg] = useState(null);

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
            formData.append('image', categoryImg);
        }

        try {
            if (editId) {
                await dispatch(updateCategory({ id: editId, data: formData })).unwrap();
                toast.success('Category updated successfully');
            } else {
                await dispatch(createCategory(formData)).unwrap();
                toast.success('Category created successfully');
            }

            await dispatch(fetchCategories());
            resetForm();
        } catch (err) {
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
            resetForm();
            toast.success('Category deleted');
        } catch (err) {
            toast.error(err?.message || 'Failed to delete category');
        }
    };

    const handleFileChange = (e) => {
        setCategoryImg(e.target.files[0]);
    };

    return (
        <div className="p-4 md:p-6 text-gray-800 dark:text-gray-100">
            <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

            <form onSubmit={handleSubmit} className="gap-4 mb-8 items-center">
                <input
                    type="text"
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="input input-primary"
                />

                <div>
                    <label className="block text-sm font-medium mb-1">Category Image</label>

                    <ImageInputer onChange={handleFileChange} />
                </div>
                <Button type="submit">{editId ? 'Update' : 'Create'}</Button>
                {editId && (
                    <Button type="button" variant="ghost" onClick={resetForm}>
                        Cancel
                    </Button>
                )}
            </form>

            {loading ? (
                <span className="loading loading-dots loading-xl"></span>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted dark:bg-gray-800">
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((cat) => (
                                <TableRow key={cat._id}>
                                    <TableCell>{cat._id}</TableCell>
                                    <TableCell>{cat.name}</TableCell>
                                    <TableCell>
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-24">
                                                <img src="https://img.daisyui.com/images/profile/demo/distracted1@192.webp" />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => handleEdit(cat)}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDelete(cat._id)}
                                            >
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
