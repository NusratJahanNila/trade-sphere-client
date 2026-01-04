import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { Edit2, Trash2, Eye, DollarSign, Star, Package, LocateFixed } from 'lucide-react';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router';

const MyExport = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectProduct, setSelectProduct] = useState({});
    const [refetch, setRefetch] = useState(false);
    const [loading, setLoading] = useState(true); // Local loading state

    useEffect(() => {
        // If no user, don't fetch
        if (!user?.email) {
            setLoading(false);
            return;
        }
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://trade-sphere-server.vercel.app/my-export?email=${user.email}`, {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`,
                        'content-type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                
                const data = await response.json();
                console.log('Fetched data:', data); // Debug log
                setProducts(data || []);
            } catch (error) {
                console.error('Error fetching exports:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to load your exports. Please try again.",
                    icon: "error",
                    timer: 3000
                });
                setProducts([]);
            } finally {
                setLoading(false); // Always set loading to false
            }
        };

        fetchData();
    }, [user, refetch]); // Remove setLoading from dependencies

    // Update
    const handleUpdate = (product) => {
        setSelectProduct(product);
        document.getElementById('update_modal').showModal();
    };

    // Modal submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            productName: e.target.name.value,
            productImage: e.target.photoURL.value,
            price: parseFloat(e.target.price.value),
            originCountry: e.target.country.value,
            rating: parseFloat(e.target.rating.value),
            availableQuantity: parseInt(e.target.quantity.value),
        };

        try {
            const response = await fetch(`https://trade-sphere-server.vercel.app/my-export/${selectProduct._id}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${user.accessToken}`
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.modifiedCount > 0) {
                setRefetch(!refetch); // This will trigger re-fetch
                document.getElementById('update_modal').close();
                Swal.fire({
                    title: "Success!",
                    text: "Product updated successfully",
                    icon: "success",
                    timer: 2000
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: "Error!",
                text: "Failed to update product",
                icon: "error"
            });
        }
    };

    // Delete
    const handleDelete = async (product) => {
        const result = await Swal.fire({
            title: "Delete Product?",
            text: `Are you sure you want to delete "${product.productName}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://trade-sphere-server.vercel.app/my-export/${product._id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                });
                
                const data = await response.json();
                
                if (data.deletedCount > 0) {
                    // Update local state immediately without re-fetching
                    setProducts(products.filter(p => p._id !== product._id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product has been deleted.",
                        icon: "success",
                        timer: 2000
                    });
                }
            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete product",
                    icon: "error"
                });
            }
        }
    };

    // Show loader if still loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 mt-10">
            <title>My Exports - Trade Sphere</title>
            
            {/* Header */}
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    My <span className="text-[#f04a00]">Exports</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage all your exported products
                </p>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {products.length === 0 ? (
                    <div className="text-center py-16">
                        <Package className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Exports Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">You haven't listed any products for export.</p>
                        <Link to="/add-export" className="btn btn-primary mt-4 bg-[#f04a00] border-[#f04a00] hover:bg-[#e34234]">
                            Add Your First Export
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* Table Header */}
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="font-semibold">Product</th>
                                    <th className="font-semibold">Country</th>
                                    <th className="font-semibold">Price</th>
                                    <th className="font-semibold">Rating</th>
                                    <th className="font-semibold">Quantity</th>
                                    <th className="font-semibold">Actions</th>
                                </tr>
                            </thead>
                            
                            {/* Table Body */}
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        {/* Product Column */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img 
                                                        src={product.productImage} 
                                                        alt={product.productName}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium line-clamp-1">
                                                        {product.productName}
                                                    </h3>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Country Column */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <LocateFixed className="w-4 h-4 text-gray-500" />
                                                <span>{product.originCountry}</span>
                                            </div>
                                        </td>

                                        {/* Price Column */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                                <span className="font-semibold">${product.price}</span>
                                            </div>
                                        </td>

                                        {/* Rating Column */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span>{product.rating}</span>
                                            </div>
                                        </td>

                                        {/* Quantity Column */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4 text-blue-500" />
                                                <span>{product.availableQuantity}</span>
                                            </div>
                                        </td>

                                        {/* Actions Column */}
                                        <td>
                                            <div className="flex gap-2">
                                                {/* Update Button */}
                                                <button
                                                    onClick={() => handleUpdate(product)}
                                                    className="btn btn-sm btn-outline border-[#f04a00] text-[#f04a00] hover:bg-[#f04a00] hover:text-white"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                
                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                
                                                {/* View Button */}
                                                <Link
                                                    to={`/products/${product._id}`}
                                                    className="btn btn-sm btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box max-w-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
                    </form>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="text-xl font-bold text-center mb-4">
                            Update Product
                        </h3>
                        
                        {/* Product Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={selectProduct.productName}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Product Image URL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input
                                type="text"
                                name="photoURL"
                                defaultValue={selectProduct.productImage}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price ($)</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                defaultValue={selectProduct.price}
                                className="input input-bordered w-full"
                                required
                                min="0"
                            />
                        </div>

                        {/* Origin Country */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Origin Country</span>
                            </label>
                            <input
                                type="text"
                                name="country"
                                defaultValue={selectProduct.originCountry}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Rating */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input
                                type="number"
                                name="rating"
                                defaultValue={selectProduct.rating}
                                className="input input-bordered w-full"
                                required
                                min="0"
                                max="5"
                                step="0.1"
                            />
                        </div>

                        {/* Available Quantity */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available Quantity</span>
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                defaultValue={selectProduct.availableQuantity}
                                className="input input-bordered w-full"
                                required
                                min="0"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="modal-action">
                            <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('update_modal').close()}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary bg-[#f04a00] border-[#f04a00] hover:bg-[#e34234]">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyExport;