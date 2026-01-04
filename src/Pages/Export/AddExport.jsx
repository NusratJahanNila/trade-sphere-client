import React, { use, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { Upload, Plus, X, HelpCircle } from 'lucide-react';

const AddExport = () => {
    const navigate = useNavigate();
    const { user } = use(AuthContext);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [keySpecs, setKeySpecs] = useState([
        { label: '', value: '' }
    ]);
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');

    // Category options
    const categories = [
        'Apparel', 'Electronics', 'Fashion', 'Home & Living', 
        'Home & Kitchen', 'Appliances', 'Luxury Goods', 
        'Food & Beverage', 'Accessories', 'Other'
    ];

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle key specs
    const addKeySpec = () => {
        setKeySpecs([...keySpecs, { label: '', value: '' }]);
    };

    const removeKeySpec = (index) => {
        const newSpecs = [...keySpecs];
        newSpecs.splice(index, 1);
        setKeySpecs(newSpecs);
    };

    const updateKeySpec = (index, field, value) => {
        const newSpecs = [...keySpecs];
        newSpecs[index][field] = value;
        setKeySpecs(newSpecs);
    };

    // Handle tags
    const addTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare form data
        const formData = new FormData();
        
        // Append image file if exists
        if (imageFile) {
            formData.append('image', imageFile);
        }

        // Prepare JSON data
        const productData = {
            productName: e.target.productName.value,
            productImage: imagePreview || e.target.imageUrl?.value || '',
            price: parseFloat(e.target.price.value),
            originCountry: e.target.originCountry.value,
            rating: parseFloat(e.target.rating.value),
            availableQuantity: parseInt(e.target.availableQuantity.value),
            exportBy: user.email,
            exportAt: new Date().toISOString(),
            category: e.target.category.value,
            brand: e.target.brand.value || '',
            longDescription: e.target.longDescription.value,
            keySpecifications: keySpecs.filter(spec => spec.label && spec.value),
            shippingInfo: {
                weight: e.target.shippingWeight.value,
                dimensions: e.target.shippingDimensions.value,
                shippingMethod: e.target.shippingMethod.value
            },
            warranty: e.target.warranty.value,
            minimumOrderQuantity: parseInt(e.target.minimumOrderQuantity.value) || 1,
            tags: tags
        };

        // Append JSON data
        formData.append('productData', JSON.stringify(productData));

        try {
            const response = await fetch('https://trade-sphere-server.vercel.app/products', {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                toast.success('Product added successfully');
                navigate('/all-products');
            } else {
                toast.error(data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error. Please try again.');
        }
    };

    return (
        <div className="max-w-11/12 mx-auto bg-base-100 shadow-lg rounded-xl p-6 mt-16 ">
            <title>Add Export - Trade Sphere</title>
            
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-2">
                    <span className='text-[#f04a00]'>Add</span> Export Product
                </h2>
                <p className="text-gray-600 mx-auto dark:text-gray-300 mb-8 max-w-xl text-center">
                    Fill in the details below to list your product for export
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Basic Information */}
                <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-[#f04a00]">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Product Name *</span>
                                </label>
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Louis Vuitton Denim"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Brand</span>
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    placeholder="Louis Vuitton"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Category *</span>
                                </label>
                                <select 
                                    name="category"
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Origin Country *</span>
                                </label>
                                <input
                                    type="text"
                                    name="originCountry"
                                    placeholder="Switzerland"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Price (BDT) *</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="18000"
                                    className="input input-bordered w-full"
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Rating (1-5) *</span>
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    placeholder="4.6"
                                    className="input input-bordered w-full"
                                    required
                                    min="0"
                                    max="5"
                                    step="0.1"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Available Quantity *</span>
                                </label>
                                <input
                                    type="number"
                                    name="availableQuantity"
                                    placeholder="390"
                                    className="input input-bordered w-full"
                                    required
                                    min="1"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Minimum Order Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    name="minimumOrderQuantity"
                                    placeholder="10"
                                    className="input input-bordered w-full"
                                    min="1"
                                    defaultValue="1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Product Image */}
                <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-[#f04a00]">Product Image</h3>
                    
                    <div className="space-y-4">
                        {/* Image Upload Box */}
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
                            {imagePreview ? (
                                <div className="space-y-4">
                                    <div className="relative max-w-xs mx-auto">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-full h-48 object-contain rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview('');
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Click to change image
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                                    <div>
                                        <p className="font-medium">Upload Product Image</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            PNG, JPG, JPEG up to 5MB
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <label htmlFor="imageUpload" className="btn btn-outline mt-4">
                                Choose from Computer
                            </label>
                        </div>

                        {/* Fallback URL Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    Or enter Image URL
                                    <div className="tooltip" data-tip="Use this if you can't upload from computer">
                                        <HelpCircle className="w-4 h-4 text-gray-400" />
                                    </div>
                                </span>
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                placeholder="https://example.com/product-image.jpg"
                                className="input input-bordered w-full"
                                disabled={!!imageFile}
                            />
                            {imageFile && (
                                <p className="label-text-alt text-gray-500 mt-1">
                                    Disabled because you uploaded an image
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 3: Product Description */}
                <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-[#f04a00]">Product Description</h3>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Long Description *</span>
                        </label>
                        <textarea
                            name="longDescription"
                            placeholder="Describe your product in detail..."
                            className="textarea textarea-bordered w-full h-40"
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Section 4: Key Specifications */}
                <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-[#f04a00]">Key Specifications</h3>
                    
                    <div className="space-y-4">
                        {keySpecs.map((spec, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="form-control flex-1">
                                    <input
                                        type="text"
                                        placeholder="Specification (e.g., Fabric)"
                                        value={spec.label}
                                        onChange={(e) => updateKeySpec(index, 'label', e.target.value)}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control flex-1">
                                    <input
                                        type="text"
                                        placeholder="Value (e.g., 100% Premium Cotton Denim)"
                                        value={spec.value}
                                        onChange={(e) => updateKeySpec(index, 'value', e.target.value)}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                {keySpecs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeKeySpec(index)}
                                        className="btn btn-ghost btn-sm text-red-500"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        
                        <button
                            type="button"
                            onClick={addKeySpec}
                            className="btn btn-outline btn-sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Specification
                        </button>
                    </div>
                </div>

                {/* Section 5: Shipping Information */}
                <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-[#f04a00]">Shipping Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Weight per Unit</span>
                            </label>
                            <input
                                type="text"
                                name="shippingWeight"
                                placeholder="0.8 kg per unit"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Dimensions</span>
                            </label>
                            <input
                                type="text"
                                name="shippingDimensions"
                                placeholder="Folded Packaging"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Shipping Method</span>
                            </label>
                            <input
                                type="text"
                                name="shippingMethod"
                                placeholder="Sea & Air Freight"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 6: Additional Information */}
                <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-[#f04a00]">Additional Information</h3>
                    
                    <div className="space-y-6">
                        {/* Warranty */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Warranty / Quality Assurance</span>
                            </label>
                            <input
                                type="text"
                                name="warranty"
                                placeholder="Quality Assurance Guaranteed"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Tags */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Product Tags</span>
                                <span className="label-text-alt">Press Enter to add tags</span>
                            </label>
                            
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Add tags (e.g., denim, apparel)"
                                    className="input input-bordered flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="btn btn-outline"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Tags Display */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map(tag => (
                                        <div
                                            key={tag}
                                            className="badge badge-outline gap-1"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="hover:text-red-500"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="btn text-white bg-[#f04a00] hover:bg-[#e34234] rounded-xl px-8 py-3 text-lg"
                    >
                        Add Export Product
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        * Required fields must be filled
                    </p>
                </div>
            </form>
        </div>
    );
};

export default AddExport;