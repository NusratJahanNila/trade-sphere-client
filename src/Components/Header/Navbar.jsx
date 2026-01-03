import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CircleQuestionMark, House, LayoutDashboard, LogOut, Package, PackagePlus, Phone, ScrollText, ShoppingCart, Truck, User } from 'lucide-react';
// import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, loading } = use(AuthContext);
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
  const links = <>

    <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/'><House />Home</NavLink></li>
    <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/all-products'><Package />All Products</NavLink></li>

    {
      user && <>
        
        <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/dashboard/add-export'><PackagePlus />Add Export</NavLink></li>
      </>
    }
    <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/about'><ScrollText />About</NavLink></li>
    
    {
      user && <>
        <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/contact'><Phone />Contact</NavLink></li>
        <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/terms'><CircleQuestionMark />Terms and Condition</NavLink></li>
      </>
    }
    


  </>
  return (
    <div className="dark:border-b-2 dark:border-[#f04a00] border-b border-gray-100 fixed top-0 left-0 right-0 z-50 bg-base-100">
      <div className="navbar max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
        {/* Left Section */}
        <div className="navbar-start">
          {/* Dropdown for mobile */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-[#f04a00] px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-56 p-3 space-y-1"
            >
              {links}
            </ul>
          </div>

          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold whitespace-nowrap"
          >
            Trade<span className="text-[#f04a00]">Sphere</span>
          </Link>
        </div>

        {/* Center links for larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{links}</ul>
        </div>

        {/* Right side */}
        <div className="navbar-end flex items-center gap-2 sm:gap-3">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="relative flex items-center gap-2">
              {/* Profile Dropdown Trigger */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {user.photoURL && (
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
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Dropdown Items */}
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
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
          ) : (
            <div className="flex gap-2">
              <Link
                to="/auth/login"
                className="btn btn-sm sm:btn-md text-white bg-[#f04a00] hover:bg-[#e34234] rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-sm sm:btn-md btn-outline border-2 border-[#e34234] text-[#e34234] hover:text-white hover:bg-[#f04a00] rounded-xl"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Theme toggle */}
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle toggle-sm sm:toggle-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;