import React, { use, useEffect, useState } from "react";
import { DollarSign, LocateFixed, Package,TrendingUp } from 'lucide-react';
import { useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import ProductNotFound from "../ErrorPage/ProductNotFound";

const ProductDetails = () => {
    const { user, } = use(AuthContext);
    // update
    const [disable, setDisable] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [refetch, setRefetch] = useState(false);
    // console.log(user)
    // data from useEffect
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)

    const { id } = useParams();


    // API call from server
    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`,{
            headers: {
                authorization: `Bearer ${user.accessToken}`,
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('after token verify', data)
                if(data.message=='Invalid product ID format. Must be a 24-character hex string.'){
                    setLoading(false)
                    setProduct(null)
                    return;
                }
                setLoading(false)
                setProduct(data)

            })
            .catch(err=>{
                console.log(err)
                setLoading(false)
                setProduct(null)
            })
    }, [user, id, setLoading,refetch])

    if(!product){
        console.log(product)
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
        const addedQuantity=e.target.quantity.value;
        // console.log('quantity by user=',userQuantity);
        // console.log('the product details=',product);

        const importData={
            productId:product._id,
            productName: product.productName,
            productImage: product.productImage,
            price: product.price,
            originCountry: product.originCountry,
            rating: product.rating,  
            userQuantity: addedQuantity,
            exportBy: product.exportBy,
            exportAt: product.exportAt,
            importBy:user.email
        }
        // console.log(importData);
        fetch(`http://localhost:3000/imports/${product._id}`,{
                    method: "POST",
                    headers:{
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(importData)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    toast.success('Product added successfully')
                    setRefetch(!refetch);
                    document.getElementById('my_modal_3').close();
                })
                .catch(err=>{
                    console.log(err)
                })

    };

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

                <div className="flex items-center justify-center bg-gray-100 p-6">
                    <img
                        src={productImage}
                        alt={productName}
                        className="rounded-xl object-cover w-full max-h-80"
                    />
                </div>

                <div className="p-8 flex flex-col justify-between">
                    <div>
                        <div>
                                <h2 className="  text-xl font-bold dark:text-black mr-4 mb-2">
                                    {productName}
                                </h2>
                                <div className="badge badge-primary badge-outline text-xs p-3">
                                    <LocateFixed className="w-3 h-3 mr-1" />
                                    {originCountry}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 my-3 border-y py-3 border-gray-100">

                                <div className="flex flex-col ">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                    <span className="text-xs text-gray-500">Price</span>
                                    <p className="font-semibold text-lg text-green-600">${price}</p>
                                </div>

                                <div className="flex flex-col ">
                                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                                    <span className="text-xs text-gray-500">Rating</span>
                                    <p className="ml-1 font-semibold text-lg text-yellow-500">{rating}</p>
                                </div>

                                <div className="flex flex-col ">
                                    <Package className="w-5 h-5 text-blue-500" />
                                    <span className="text-xs text-gray-500">Quantity</span>
                                    <p className="font-semibold text-lg dark:text-blue-500">{availableQuantity}</p>
                                </div>
                            </div>

                        <div className="text-sm text-gray-600 bg-gray-200 p-5 rounded-2xl space-y-2 mb-6">
                            <p>
                                Exported By: <span className="font-medium">{exportBy}</span>
                            </p>
                            <p>
                                Exported At:
                                <span className="font-medium">
                                    {exportAt}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Import Button */}

                    <button className="btn rounded-xl text-white bg-[#f04a00] hover:bg-[#e34234] border-0" onClick={() => document.getElementById('my_modal_3').showModal()}>Import Now</button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <form onSubmit={handleQuantity}>
                                <fieldset className="fieldset">
                                    <label className="label">Add Quantity</label>
                                    <input
                                        name="quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="Add Quantity"
                                    />
                                    <button
                                        type="submit"
                                        disabled={disable}
                                        className={`btn rounded-xl text-white bg-[#f04a00] hover:bg-[#e34234] border-0 mt-4 ${disable ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        Submit
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;


