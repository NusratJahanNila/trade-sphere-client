import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';

const AddExport = () => {
    const navigate=useNavigate();
    const {user}=use(AuthContext);
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            productName: e.target.name.value,
            productImage: e.target.photoURL.value,
            price: e.target.price.value,
            originCountry: e.target.country.value,
            rating: e.target.rating.value,  
            availableQuantity: e.target.quantity.value,
            exportBy: user.email,
            exportAt: new Date()
        }
        fetch('http://localhost:3000/products',{
            method: "POST",
            headers:{
                authorization: `Bearer ${user.accessToken}`,
                'content-type': 'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then(data=>{
            toast.success('Product added successfully')
            navigate('/all-products');
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="max-w-md mx-auto bg-base-100 shadow-lg rounded-lg p-6 mt-10">
            <title>Add Export - Trade Sphere</title>
            <h2 className="text-2xl font-bold text-center mb-6">Add Export</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    />
                </div>

                {/* Origin Country */}
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
                    />
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full">
                        Add Export
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddExport;