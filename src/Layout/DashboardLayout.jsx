import React, { use, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import toast from 'react-hot-toast';
import { LayoutDashboard, LogOut, PackagePlus, ShoppingCart, Truck, User } from 'lucide-react';

const DashboardLayout = () => {
    const { user, logout } = use(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // theme
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.navbar-end')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    // Logout
    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('Logged out successfully!!')
            }).catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            {/* Navbar */}
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>
                    <div className="px-4 flex-1">
                        <Link
                            to="/"
                            className="text-xl sm:text-2xl font-bold whitespace-nowrap"
                        >
                            Trade<span className="text-[#f04a00]">Sphere</span>
                        </Link>
                    </div>

                    {/* PROFILE DROPDOWN MOVED HERE */}
                    <div className="navbar-end pr-4">
                        <div className="relative">
                            {/* Profile Dropdown Trigger */}
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                {user?.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt="user"
                                        referrerPolicy="no-referrer"
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#f04a00] object-cover"
                                    />
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                                            {user?.displayName || "User"}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {user?.email}
                                        </p>
                                    </div>

                                    {/* Dropdown Items */}
                                    <div className="py-1">
                                        <Link
                                            to="/dashboard"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard Home
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition border-b border-gray-200 dark:border-gray-700"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <User className="w-4 h-4" /> Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Theme toggle */}
                        <input
                            onChange={(e) => handleTheme(e.target.checked)}
                            type="checkbox"
                            defaultChecked={localStorage.getItem("theme") === "dark"}
                            className="toggle toggle-sm sm:toggle-md"
                        />
                    </div>
                </nav>

                {/* Page content here */}
                <div className="p-4 bg-base-200 min-h-screen">
                    <Outlet></Outlet>
                </div>
            </div>
            {/* Sidebar */}
            <div className="drawer-side is-drawer-close:overflow-visible ">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow space-y-5">
                        {/* List item */}
                        <li>
                            <Link to={"/"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* List item */}
                        <li>
                            <Link to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Dashboard">
                                <span className="is-drawer-close:hidden flex gap-2"><LayoutDashboard />My Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/add-export' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Export">
                                <span className="is-drawer-close:hidden flex gap-2"><PackagePlus />Add Export</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/my-export' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Export">
                                <span className="is-drawer-close:hidden flex gap-2"><Truck />My Export</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/my-imports' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Import">
                                <span className="is-drawer-close:hidden flex gap-2"><ShoppingCart />My Import</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;