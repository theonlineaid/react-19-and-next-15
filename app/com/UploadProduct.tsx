"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface Product {
    name: string;
    sku: string;
    description: string;
    category: string;
    price: number;
    tags: string[];
    stock: number;
    images: string[];
}

const CreateProduct = () => {
    const [product, setProduct] = useState<Product>({
        name: "",
        sku: "",
        description: "",
        category: "",
        price: 0,
        tags: [],
        stock: 0,
        images: [],
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "tags") {
            setProduct({
                ...product,
                [name]: value.split(",").map(tag => tag.trim()),  // Split and map to array of strings
            });
        } else {
            setProduct({
                ...product,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products?limit=5", {
                    method: "GET",
                    credentials: "include", // Include cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("User is authenticated:", data);
                    return data;
                } else {
                    throw new Error("User not authenticated");
                }
            } catch (error: any) {
                console.log(error.message);
            }
        };

        checkAuth();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setSuccess(null);

        // Ensure price is a number and tags are an array
        const updatedProduct = {
            ...product,
            tags: product.tags.length ? product.tags : [],  // Ensure tags are an array
        };

        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
                credentials: "include", // Include cookies
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            const data = await res.json();
            setSuccess("Product created successfully!");
            setProduct({
                name: "",
                sku: "",
                description: "",
                category: "",
                price: 0,
                tags: [],
                stock: 0,
                images: [],
            }); // Reset form after success
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create New Product</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={product.tags.join(",")} // Display tags as comma-separated string
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
