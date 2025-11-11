import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const UpdateExport = () => {
    const product = useLoaderData();
    console.log(product)
    const navigate = useNavigate();

    // update
    const handleUpdate = (e, id) => {
        console.log('id from handleUpdate:', id)
        e.preventDefault();
        const formData = {
            productName: e.target.name.value,
            productImage: e.target.photoURL.value,
            price: e.target.price.value,
            originCountry: e.target.country.value,
            rating: e.target.rating.value,
            availableQuantity: e.target.quantity.value,
        }
        fetch(`http://localhost:3000/my-export/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Product updated successfully')
                navigate('/my-export');
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-600 hover:text-white">✕</button>
            </form>
            <form onSubmit={handleUpdate} className="space-y-4">
                <h2 className='text-center text-xl font-bold '>Update here!</h2>
                {/* Name */}
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
                        defaultValue={product.productName}
                    />
                </div>

                {/* Product Image */}
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
                        defaultValue={product.productImage}
                    />
                </div>

                {/* Price */}
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
                        defaultValue={product.price}
                    />
                </div>

                {/* Origin */}
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
                        defaultValue={product.originCountry}
                    />
                </div>

                {/* Rating */}
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
                        defaultValue={product.rating}
                    />
                </div>

                {/* Quantity */}
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
                        defaultValue={product.availableQuantity}
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
    );
};

export default UpdateExport;