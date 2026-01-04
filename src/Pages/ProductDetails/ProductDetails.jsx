import React, { use, useEffect, useState } from "react";
import { DollarSign, LocateFixed, Package, TrendingUp, Calendar, Tag, Shield, Truck, Info, Star, Box, Hash, Building2 } from 'lucide-react';
import { useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import ProductNotFound from "../ErrorPage/ProductNotFound";

const ProductDetails = () => {
    const { user } = use(AuthContext);
    const [disable, setDisable] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [refetch, setRefetch] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    // API call from server
    useEffect(() => {
        fetch(`https://trade-sphere-server.vercel.app/products/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log('after token verify', data)
                if (data.message === 'Invalid product ID format. Must be a 24-character hex string.') {
                    setLoading(false)
                    setProduct(null)
                    return;
                }
                setLoading(false)
                setProduct(data)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setProduct(null)
            })
    }, [user, id, setLoading, refetch])

    if (!product) {
        return <ProductNotFound></ProductNotFound>
    }

    if (loading) {
        return <Loader></Loader>
    }

    const {
        productImage,
        productName,
        price,
        originCountry,
        rating,
        availableQuantity,
        exportBy,
        exportAt,
        // New fields
        category,
        brand,
        longDescription,
        keySpecifications,
        shippingInfo,
        warranty,
        minimumOrderQuantity,
        tags
    } = product;

    // Update quantity
    const handleChange = (e) => {
        const addedQuantity = parseInt(e.target.value);
        setQuantity(addedQuantity);

        if (addedQuantity > availableQuantity || addedQuantity <= 0 || isNaN(addedQuantity)) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    };

    // Handle submit -->added to import database
    const handleQuantity = (e) => {
        e.preventDefault();
        console.log("Submitted quantity:", quantity);
        const addedQuantity = e.target.quantity.value;

        const importData = {
            productId: product?._id,
            productName: product?.productName,
            productImage: product?.productImage,
            price: product?.price,
            originCountry: product?.originCountry,
            rating: product?.rating,
            userQuantity: addedQuantity,
            exportBy: product?.exportBy,
            exportAt: product?.exportAt,
            importBy: user?.email,
            category: product?.category || "Uncategorized",
            importedAt: new Date().toISOString()
        }

        fetch(`https://trade-sphere-server.vercel.app/imports/${product._id}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(importData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Product added successfully')
                setRefetch(!refetch);
                document.getElementById('my_modal_3').close();
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-8 mt-16 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Main Product Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/30 overflow-hidden">
                    {/* Top Section: Image and Basic Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                        {/* Left: Product Image */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 flex items-center justify-center h-full">
                                <img
                                    src={productImage}
                                    alt={productName}
                                    className="rounded-xl object-cover w-full max-h-96"
                                />
                            </div>
                        </div>

                        {/* Right: Basic Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Product Title and Tags */}
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                    {productName}
                                </h1>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {category && (
                                        <div className="badge badge-primary badge-outline dark:border-[#f04a00] dark:text-[#f04a00]">
                                            <Tag className="w-3 h-3 mr-1" />
                                            {category}
                                        </div>
                                    )}
                                    {brand && (
                                        <div className="badge badge-secondary badge-outline dark:border-blue-400 dark:text-blue-400">
                                            <Building2 className="w-3 h-3 mr-1" />
                                            {brand}
                                        </div>
                                    )}
                                    <div className="badge badge-outline dark:border-gray-400 dark:text-gray-300">
                                        <LocateFixed className="w-3 h-3 mr-1" />
                                        {originCountry}
                                    </div>
                                </div>
                            </div>

                            {/* Key Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                                    <p className="font-bold text-xl text-green-600 dark:text-green-400">৳{price}</p>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <TrendingUp className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                                    <div className="flex items-center justify-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" />
                                        <p className="font-bold text-xl text-gray-900 dark:text-white">{rating}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <Package className="w-6 h-6 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">In Stock</p>
                                    <p className="font-bold text-xl text-blue-500 dark:text-blue-400">{availableQuantity}</p>
                                </div>

                                {minimumOrderQuantity && (
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                                        <Box className="w-6 h-6 text-purple-500 dark:text-purple-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Min Order</p>
                                        <p className="font-bold text-xl text-purple-500 dark:text-purple-400">{minimumOrderQuantity}</p>
                                    </div>
                                )}
                            </div>

                            {/* Long Description */}
                            {longDescription && (
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Info className="w-5 h-5 text-[#f04a00]" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Product Description</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {longDescription}
                                    </p>
                                </div>
                            )}

                            {/* Key Specifications - Improved spacing */}
                            {keySpecifications && keySpecifications.length > 0 && (
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Key Specifications</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {keySpecifications.map((spec, index) => (
                                            spec.label && spec.value && (
                                                <div key={index} className="flex items-start gap-4">
                                                    <div className="w-2 h-2 mt-2 rounded-full bg-[#f04a00] shrink-0"></div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-start items-start">
                                                            <span className="text-gray-600 dark:text-gray-400 font-medium">{spec.label} : </span>
                                                            <span className="text-gray-900 dark:text-white font-semibold ml-4">{spec.value}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Section: Additional Info */}
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                            {/* Shipping Information - Improved spacing */}
                            {shippingInfo && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Truck className="w-5 h-5 text-[#f04a00]" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Shipping Information</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {shippingInfo.weight && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[#f04a00]"></div>
                                                <div className="flex-1 flex justify-start">
                                                    <span className="text-gray-600 dark:text-gray-400">Weight:</span>
                                                    <span className="text-gray-900 dark:text-white font-medium ml-4">{shippingInfo.weight}</span>
                                                </div>
                                            </div>
                                        )}
                                        {shippingInfo.dimensions && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[#f04a00]"></div>
                                                <div className="flex-1 flex justify-start">
                                                    <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                                                    <span className="text-gray-900 dark:text-white font-medium ml-4">{shippingInfo.dimensions}</span>
                                                </div>
                                            </div>
                                        )}
                                        {shippingInfo.shippingMethod && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[#f04a00]"></div>
                                                <div className="flex-1 flex justify-start">
                                                    <span className="text-gray-600 dark:text-gray-400">Method:</span>
                                                    <span className="text-gray-900 dark:text-white font-medium ml-4">{shippingInfo.shippingMethod}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Warranty & Exporter Info */}
                            <div className="space-y-6">
                                {warranty && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Shield className="w-5 h-5 text-[#f04a00]" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Warranty</h3>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-[#f04a00] shrink-0"></div>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm">{warranty}</p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar className="w-5 h-5 text-[#f04a00]" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Export Details</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#f04a00]"></div>
                                            <div className="flex-1">
                                                <span className="text-gray-600 dark:text-gray-400">Exporter:</span>
                                                <span className="text-gray-900 dark:text-white font-medium ml-2">{exportBy}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#f04a00]"></div>
                                            <div className="flex-1">
                                                <span className="text-gray-600 dark:text-gray-400">Date:</span>
                                                <span className="text-gray-900 dark:text-white font-medium ml-2">
                                                    {new Date(exportAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            {tags && tags.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Hash className="w-5 h-5 text-[#f04a00]" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Product Tags</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Import Button */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 border-t border-gray-200 dark:border-gray-600">
                        <button
                            className="btn rounded-xl text-white bg-[#f04a00] hover:bg-[#e34234] border-0 w-full md:w-auto px-8 py-3 text-lg"
                            onClick={() => document.getElementById('my_modal_3').showModal()}
                        >
                            Import Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box dark:bg-gray-800 dark:text-white">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-gray-300">✕</button>
                    </form>
                    <form onSubmit={handleQuantity}>
                        <fieldset className="fieldset">
                            <label className="label dark:text-white">Add Quantity</label>
                            <input
                                name="quantity"
                                type="number"
                                value={quantity}
                                onChange={handleChange}
                                className="input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Add Quantity"
                                min="1"
                                max={availableQuantity}
                            />
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Available: {availableQuantity} units
                                {minimumOrderQuantity && (
                                    <span className="block">Minimum order: {minimumOrderQuantity} units</span>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={disable}
                                className={`btn rounded-xl text-white bg-[#f04a00] hover:bg-[#e34234] border-0 mt-4 w-full ${disable ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                Confirm Import
                            </button>
                        </fieldset>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ProductDetails;