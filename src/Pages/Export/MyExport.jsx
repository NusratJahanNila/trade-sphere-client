import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { DollarSign, Edit2, LocateFixed, Package, Star, Trash2, TrendingUp } from 'lucide-react';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader/Loader';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router';

const MyExport = () => {
    // const navigate=useNavigate();
    // update
    const [selectProduct, setSelectProduct] = useState({})
    const [refetch, setRefetch] = useState(false);

    const { user, loading, setLoading } = use(AuthContext);
    const [products, setProducts] = useState([]);
    // api
    useEffect(() => {
        fetch(`http://localhost:3000/my-export?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
                'content-type': 'application/json'
            }
        })
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

    // Update
    const handleUpdate = (product) => {
        setSelectProduct(product);
        document.getElementById('my_modal_3').showModal()
    }
    // console.log('Selected product to update= ', selectProduct);
    // modal submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            productName: e.target.name.value,
            productImage: e.target.photoURL.value,
            price: e.target.price.value,
            originCountry: e.target.country.value,
            rating: e.target.rating.value,
            availableQuantity: e.target.quantity.value,
        }
        fetch(`http://localhost:3000/my-export/${selectProduct._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                console.log('inside response')
                return res.json()
            })
            .then(data => {
                console.log(data)
                setProducts([...products, data])
                setRefetch(!refetch)
                document.getElementById('my_modal_3').close();
            })
            .catch(err => {
                console.log(err)
            })
    }


    // delete
    const handleDelete = (product) => {
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
                fetch(`http://localhost:3000/my-export/${product._id}`, {
                    method: "DELETE",

                })
                    .then(res => {
                        console.log('inside response')
                        return res.json()
                    })
                    .then(data => {
                        console.log(data)
                        setRefetch(!refetch);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
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
            <title>My Export - Trade Sphere</title>
            <div className="pt-10">
                <h2 className="text-3xl font-bold mb-3  text-center dark:text-white mt-5">
                    My<span className='text-[#f04a00]'> Export</span> </h2>
                <p className="text-xl text-gray-600 text-center dark:text-gray-400 max-w-4xl mx-auto mb-5">
                    Manage and track the products you've listed for export.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  my-10'>

                {
                    products.map(product => <div key={product._id} className=" rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col h-[410px] border-gray-200 border">
                        {/*Image */}
                        <div className="rounded-xl overflow-hidden mb-3">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full h-44 object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="px-4 flex-1 flex flex-col justify-between">

                            <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                                {product.productName}
                            </h3>
                            <div className="badge badge-primary badge-outline text-xs p-3">
                                <LocateFixed className="w-3 h-3 mr-1" />
                                {product.originCountry}
                            </div>

                            <div className="grid grid-cols-3 gap-3 my-1 border-y py-3 border-gray-100">

                                <div className="flex flex-col ">
                                    <DollarSign className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-gray-500">Price</span>
                                    <p className="font-semibold text-md text-green-600">${product.price}</p>
                                </div>

                                <div className="flex flex-col ">
                                    <TrendingUp className="w-4 h-4 text-yellow-500" />
                                    <span className="text-xs text-gray-500">Rating</span>
                                    <p className="ml-1 font-semibold text-md text-yellow-500">{product.rating}</p>
                                </div>

                                <div className="flex flex-col ">
                                    <Package className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs text-gray-500">Quantity</span>
                                    <p className="font-semibold text-md text-blue-500">{product.availableQuantity}</p>
                                </div>
                            </div>
                        </div>

                        {/*  Buttons */}
                        <div className="flex gap-3 mt-2">

                            {/* Update */}
                            <button
                                className="flex-1 btn text-white bg-[#f04a00] hover:bg-[#e34234] rounded-xl"
                                onClick={() => handleUpdate(product)}>
                                <Edit2 className="w-4 h-4 mr-1" /> Update
                            </button>

                            {/* Delete */}
                            <button onClick={() => handleDelete(product)} className="flex-1 btn  btn-outline border-2 border-[#e34234] text-[#e34324] hover:text-white hover:bg-[#f04a00] rounded-xl">
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </button>
                        </div>
                    </div>)
                }
                {/* Modal */}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-600 hover:text-white">✕</button>
                        </form>
                        <form key={selectProduct._id} onSubmit={handleSubmit} className="space-y-4">
                            <h2 className='text-center text-xl font-bold '>Update here!</h2>
                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter product name"
                                    className="input input-bordered w-full"
                                    required
                                    defaultValue={selectProduct.productName}
                                />
                            </div>

                            {/*  img */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Product Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    placeholder="Enter image url"
                                    className="input input-bordered w-full"
                                    required
                                    defaultValue={selectProduct.productImage}
                                />
                            </div>

                            {/* price */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Price</span>
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="Enter price"
                                    className="input input-bordered w-full"
                                    required
                                    defaultValue={selectProduct.price}
                                />
                            </div>

                            {/* origin */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Origin Country</span>
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Enter product's origin"
                                    className="input input-bordered w-full"
                                    required
                                    defaultValue={selectProduct.originCountry}
                                />
                            </div>

                            {/* rating */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Rating</span>
                                </label>
                                <input
                                    type="text"
                                    name="rating"
                                    placeholder="Enter product's rating of 5"
                                    className="input input-bordered w-full"
                                    required
                                    defaultValue={selectProduct.rating}
                                />
                            </div>

                            {/* quantity */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Available Quantity</span>
                                </label>
                                <input
                                    type="text"
                                    name="quantity"
                                    placeholder="Enter product's quantity"
                                    className="input input-bordered w-full"
                                    required
                                    defaultValue={selectProduct.availableQuantity}
                                />
                            </div>

                            {/* btn */}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn rounded-xl text-white bg-[#f04a00] hover:bg-[#e34234] w-full">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyExport;