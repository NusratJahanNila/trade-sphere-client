import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Loader from '../../Components/Loader/Loader';
import { Filter, Search, ChevronDown } from 'lucide-react';

const AllProducts = () => {

    // State for products and pagination
    const [products, setProducts] = useState([]);
    console.log("This is product data-->", products)
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Start with loading true

    // Filter states
    const [category, setCategory] = useState('all');
    const [rating, setRating] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');

    // UI states for dropdowns
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showRatingDropdown, setShowRatingDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Pagination
    const limit = 8;

    // Categories
    const categories = [
        'all', 'Apparel', 'Electronics', 'Fashion',
        'Home & Living', 'Home & Kitchen', 'Appliances',
        'Luxury Goods', 'Food & Beverage', 'Accessories', 'Other'
    ];

    // Ratings
    const ratings = ['all', '1', '2', '3', '4', '5'];

    // Sort options
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' }
    ];

    // Fetch products with filters
    const fetchProducts = (page = 1) => {
        setLoading(true);

        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);

        if (category !== 'all') params.append('category', category);
        if (rating !== 'all') params.append('rating', rating);
        if (sortBy !== 'newest') params.append('sort', sortBy);
        if (searchQuery) params.append('search', searchQuery);

        const url = `http://localhost:3000/products?${params.toString()}`;
        console.log('Fetching from:', url);

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("API Response:", data);

                if (data.success) {
                    setProducts(data?.result || []);
                    setTotalProducts(data?.total || 0);
                    setTotalPages(data?.totalPages || 0);
                } else {
                    console.warn('API returned error:', data);
                    setProducts([]);
                    setTotalProducts(0);
                    setTotalPages(0);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
                setProducts([]);
                setTotalProducts(0);
                setTotalPages(0);
            });
    };

    // Initial load and when filters change
    useEffect(() => {
        fetchProducts(currentPage); // Use currentPage, not always 1
    }, [category, rating, sortBy, searchQuery, currentPage]); // Added currentPage dependency

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        setSearchQuery(searchValue);
        setCurrentPage(1);
    };

    // Handle rating filter - filter by minimum rating
    const handleRatingSelect = (selectedRating) => {
        if (selectedRating === 'all') {
            setRating('all');
        } else {
            setRating(selectedRating);
        }
        setShowRatingDropdown(false);
        setCurrentPage(1);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.filter-dropdown')) {
                setShowCategoryDropdown(false);
                setShowRatingDropdown(false);
                setShowSortDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Debug: Check what's happening
    console.log('Current state:', {
        currentPage,
        category,
        rating,
        sortBy,
        searchQuery,
        productsCount: products?.length
    });

    if (loading && products?.length === 0) {
        return <Loader />;
    }

    return (
        <div className="max-w-7xl mx-auto px-10 sm:px-6 my-10 ">
            <div className="pt-10">
                <title>All Products - Trade Sphere</title>
                <h2 className='text-3xl text-center font-bold my-5'>
                    <span className='text-[#f04a00]'>All</span> Products
                </h2>
                <p className="text-xl text-gray-600 text-center dark:text-gray-400 max-w-4xl mx-auto mb-8">
                    Explore a wide range of export-ready products from global suppliers.
                </p>
            </div>

            {/* Filters and Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                {/* Left: Filter Controls */}
                <div className="flex flex-wrap items-center gap-4">
                    {/* Category Filter */}
                    <div className="relative filter-dropdown">
                        <button
                            type="button"
                            onClick={() => {
                                setShowCategoryDropdown(!showCategoryDropdown);
                                setShowRatingDropdown(false);
                                setShowSortDropdown(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${category !== 'all' ? 'bg-[#f04a00] text-white border-[#f04a00]' : 'bg-white dark:bg-gray-800  text-gray-700 dark:text-gray-300'}`}
                        >
                            <span>{category === 'all' ? 'Category' : category}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {showCategoryDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => {
                                            setCategory(cat);
                                            setShowCategoryDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${category === cat ? 'bg-[#f04a00]/10 text-[#f04a00] dark:text-[#f04a00]' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Rating Filter */}
                    <div className="relative filter-dropdown">
                        <button
                            type="button"
                            onClick={() => {
                                setShowRatingDropdown(!showRatingDropdown);
                                setShowCategoryDropdown(false);
                                setShowSortDropdown(false);
                            }}
                            className={`flex items-center font-bold gap-2 px-4 py-2 rounded-lg  ${rating !== 'all' ? 'bg-[#f04a00] text-white ' : 'bg-white dark:bg-gray-800  text-gray-700 dark:text-gray-300'}`}
                        >
                            <span>{rating === 'all' ? 'Rating' : `${rating}+ Stars`}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {showRatingDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                                {ratings?.map((rate) => (
                                    <button
                                        key={rate}
                                        type="button"
                                        onClick={() => handleRatingSelect(rate)}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2 ${rating === rate ? 'bg-[#f04a00]/10 text-[#f04a00] dark:text-[#f04a00]' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        {rate === 'all' ? 'All Ratings' : (
                                            <>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-3 h-3 ${i < rate ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span>& above</span>
                                            </>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sort Filter */}
                    <div className="relative filter-dropdown">
                        <button
                            type="button"
                            onClick={() => {
                                setShowSortDropdown(!showSortDropdown);
                                setShowCategoryDropdown(false);
                                setShowRatingDropdown(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold  "
                        >
                            <span>
                                Sort By
                            </span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {showSortDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                                {sortOptions?.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setSortBy(option.value);
                                            setShowSortDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-between ${sortBy === option.value ? 'bg-[#f04a00]/10 text-[#f04a00] dark:text-[#f04a00]' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        {option.label}
                                        {sortBy === option.value && (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Search Form */}
                <form onSubmit={handleSearch} className="w-full md:w-auto">
                    <div className="join w-full">
                        <div className="flex-1">
                            <label className="input join-item w-full flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <input
                                    name="search"
                                    type="text"
                                    className="w-full bg-transparent outline-none"
                                    placeholder="Search products..."
                                    defaultValue={searchQuery}
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn text-white bg-[#f04a00] hover:bg-[#e34234] join-item rounded-r-md"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {/* Product Count */}
            {products?.length > 0 && (
                <div className="mb-6 px-4 text-gray-600 dark:text-gray-400">
                    Showing {products?.length} of {totalProducts} products
                    {(category !== 'all' || rating !== 'all' || searchQuery) && (
                        <button
                            type="button"
                            onClick={() => {
                                setCategory('all');
                                setRating('all');
                                setSearchQuery('');
                                setSortBy('newest');
                                setCurrentPage(1);
                            }}
                            className="ml-4 text-sm text-[#f04a00] hover:underline"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            )}

            {/* Products Grid */}
            {loading ? (
                <Loader />
            ) : products?.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-5xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No products found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your filters or search term
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  max-w-7xl px-4 gap-4">
                        {products?.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                type="button"
                                onClick={() => {
                                    setCurrentPage(prev => Math.max(prev - 1, 1));
                                }}
                                disabled={currentPage === 1}
                                className="btn btn-sm md:btn-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#f04a00]"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                // Show first, last, current, and neighbors
                                if (
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`btn btn-sm md:btn-md ${currentPage === pageNum
                                                ? 'bg-[#f04a00] text-white border-[#f04a00]'
                                                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-[#f04a00]'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    pageNum === currentPage - 2 ||
                                    pageNum === currentPage + 2
                                ) {
                                    return <span key={i} className="px-2 text-gray-400">...</span>;
                                }
                                return null;
                            })}

                            <button
                                type="button"
                                onClick={() => {
                                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                }}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm md:btn-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#f04a00]"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllProducts;