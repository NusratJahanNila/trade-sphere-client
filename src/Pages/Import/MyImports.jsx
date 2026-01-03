import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { DollarSign, LocateFixed, Package, Trash2, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader/Loader';

const MyImports = () => {
    const { user, loading, setLoading } = use(AuthContext);
    const [products, setProducts] = useState([]);
    const [refetch, setRefetch] = useState(false);
    
    // api
    useEffect(() => {
        fetch(`https://trade-sphere-server.vercel.app/my-imports?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log('after my export', data)
                setProducts(data)
                setLoading(false)
            })
    }, [user, setLoading, refetch])

    if (loading) {
        return <Loader></Loader>
    }

    console.log('products from import=', products)

    // delete
    const handleRemove = (product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://trade-sphere-server.vercel.app/my-imports/${product._id}`, {
                    method: "DELETE",
                })
                    .then(res => {
                        console.log('inside response')
                        return res.json()
                    })
                    .then(data => {
                        console.log(data)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your import has been deleted.",
                            icon: "success"
                        });
                        setRefetch(!refetch);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    }

    // Format price with commas
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(price).replace('BDT', '৳');
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <title>My Import - Trade Sphere</title>
            <div className="pt-10">
                <h2 className="text-3xl font-bold mb-3 text-center dark:text-white mt-5">
                    My<span className='text-[#f04a00]'> Imports</span>
                </h2>
                <p className="text-xl text-gray-600 text-center dark:text-gray-400 max-w-4xl mx-auto mb-8">
                    View all products you've imported and their shipment details.
                </p>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-10">
                {/* Table Header */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Product
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Origin
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Price
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Rating
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Quantity
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center">
                                        <div className="text-5xl mb-4">📦</div>
                                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            No imports yet
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Start importing products from the marketplace
                                        </p>
                                        <Link 
                                            to="/all-products" 
                                            className="inline-block mt-4 px-6 py-2 bg-[#f04a00] text-white rounded-lg hover:bg-[#e34234] transition"
                                        >
                                            Browse Products
                                        </Link>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                        {/* Product Name & Image */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                                                    <img
                                                        src={product.productImage}
                                                        alt={product.productName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                                                        {product.productName}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        Imported: {new Date(product.importedAt || new Date()).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Origin Country */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <LocateFixed className="w-4 h-4 text-[#f04a00]" />
                                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                    {product.originCountry}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Price */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                <span className="font-bold text-green-600 dark:text-green-400">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Rating */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-gray-900 dark:text-white">
                                                        {product.rating}
                                                    </span>
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Quantity */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                <div>
                                                    <span className="font-bold text-gray-900 dark:text-white">
                                                        {product.userQuantity}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                                                        units imported
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    to={`/product-details/${product.productId}`}
                                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleRemove(product)}
                                                    className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                                                    title="Remove Import"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer Stats */}
                {products.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold">{products.length}</span> imported products
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Total Quantity: </span>
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        {products.reduce((sum, product) => sum + (parseInt(product.userQuantity) || 0), 0)} units
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Total Value: </span>
                                    <span className="font-bold text-green-600 dark:text-green-400">
                                        {formatPrice(products.reduce((sum, product) => sum + (product.price * (parseInt(product.userQuantity) || 0)), 0))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyImports;