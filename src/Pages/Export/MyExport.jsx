import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { Edit2, Star, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
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
        fetch(`http://localhost:3000/my-export?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log('after my export', data)
                setProducts(data)
                setLoading(false)
            })
    }, [user, setLoading, refetch])

    if (loading) {
        return <p>Loading...</p>
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {
                products.map(product => <div key={product._id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col h-[410px] border-gray-200 border">
                    {/* Product Image */}
                    <div className="rounded-xl overflow-hidden mb-3">
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-full h-44 object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className=" flex flex-col justify-start">
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                            <span>{product.originCountry}</span>
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                {product.rating}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                            {product.productName}
                        </h3>

                        <p className="text-gray-700 font-medium">
                            Price: <span className="text-primary">{product.price} BDT</span>
                        </p>

                        <p className="text-gray-600 text-sm mb-3">
                            Available: {product.availableQuantity} pcs
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-2">

                        {/* Update */}
                        <button
                            className="flex-1 btn btn-primary text-white rounded-lg py-2 "
                            onClick={() => handleUpdate(product)}>
                            <Edit2 className="w-4 h-4 mr-1" /> Update
                        </button>

                        {/* Delete */}
                        <button onClick={()=>handleDelete(product)} className="flex-1 btn bg-red-500 text-white hover:bg-red-600 rounded-lg py-2">
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
                            <button type="submit" className="btn btn-primary w-full">
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