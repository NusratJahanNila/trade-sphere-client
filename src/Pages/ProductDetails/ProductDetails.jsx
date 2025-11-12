import React, { use, useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const { user, } = use(AuthContext);
    // update
    const [disable, setDisable] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [refetch, setRefetch] = useState(false);
    // console.log(user)
    // data from useEffect
    const [product, setProduct] = useState({});
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
                // console.log('after token verify', data)
                setLoading(false)
                setProduct(data)
            })
    }, [user, id, setLoading,refetch])

    if (loading) {
        return <p>Loading...</p>
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
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
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                            {product.productName}
                        </h2>

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-600 text-sm">
                                Origin: <span className="font-medium">{originCountry}</span>
                            </span>
                            <span className="flex items-center gap-1 text-yellow-500">
                                <FaRegStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-gray-700 font-medium">{rating}</span>
                            </span>
                        </div>

                        <div className="mb-4 text-gray-700">
                            <p className="text-lg font-semibold text-primary">
                                Price: {price} BDT
                            </p>
                            <p className="text-sm mt-1">
                                Available Quantity:
                                <span className="font-medium">{availableQuantity}</span>
                            </p>
                        </div>

                        <div className="text-sm text-gray-600 mb-6">
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

                    <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_3').showModal()}>Import Now</button>
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
                                        className={`btn btn-primary mt-4 ${disable ? "opacity-50 cursor-not-allowed" : ""
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


