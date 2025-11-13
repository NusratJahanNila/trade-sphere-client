import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { DollarSign, LocateFixed, Package, Trash2, TrendingUp } from 'lucide-react';
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
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        setRefetch(!refetch);
                        // navigate('/all-models')
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        });
    }

    return (
        <div className="max-w-11/12 mx-auto">
            <title>My Import - Trade Sphere</title>
            <div className="pt-10">
                <h2 className="text-3xl font-bold mb-3  text-center dark:text-white mt-5">
                    My<span className='text-[#f04a00]'> Imports</span> </h2>
                <p className="text-xl text-gray-600 text-center dark:text-gray-400 max-w-4xl mx-auto mb-5">
                    View all products you've imported and their shipment details.
                </p>
            </div>
            <div className=" my-10">

                {
                    products.map(product => <div className="card lg:card-side bg-base-200 shadow-xl border border-gray-300 w-full mb-6">

                        <figure className="lg:w-1/3 w-full p-4 bg-gray-50 flex items-center justify-center">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="rounded-lg object-cover max-h-48  w-full"
                            />
                        </figure>

                        <div className="card-body p-4 lg:w-2/3">
                            <div>
                                <h2 className="card-title text-xl font-bold grow mr-4 mb-2">
                                    {product.productName}
                                </h2>
                                <div className="badge badge-primary badge-outline text-xs p-3">
                                    <LocateFixed className="w-3 h-3 mr-1" />
                                    {product.originCountry}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 my-3 border-y py-3 border-gray-300">

                                <div className="flex flex-col ">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                    <span className="text-xs text-gray-500">Price</span>
                                    <p className="font-semibold text-lg text-green-600">${product.price}</p>
                                </div>

                                <div className="flex flex-col ">
                                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                                    <span className="text-xs text-gray-500">Rating</span>
                                    <p className="ml-1 font-semibold text-lg text-yellow-500">{product.rating}</p>
                                </div>

                                <div className="flex flex-col ">
                                    <Package className="w-5 h-5 text-blue-500" />
                                    <span className="text-xs text-gray-500">Quantity</span>
                                    <p className="font-semibold text-lg">{product.userQuantity}</p>
                                </div>
                            </div>

                            <div className="card-actions  mt-4">
                                <button
                                    onClick={() => handleRemove(product)}
                                    className="flex-1 btn text-white bg-[#f04a00] hover:bg-[#e34234] rounded-xl"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Remove
                                </button>

                                <Link to={`/product-details/${product.productId}`} className="flex-1 btn  btn-outline border-2 border-[#e34234] text-[#e34324] hover:text-white hover:bg-[#f04a00] rounded-xl">
                                    See Details
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyImports;