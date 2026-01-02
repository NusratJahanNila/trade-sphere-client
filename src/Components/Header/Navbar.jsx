import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { House, Package, PackagePlus, ShoppingCart, Truck } from 'lucide-react';
// import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, loading } = use(AuthContext);
  // theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };


  // Logout
  const handleLogout = (e) => {
    e.preventDefault();
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
        <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/my-export'><Truck />My Export</NavLink></li>
        <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/my-imports'><ShoppingCart />My Import</NavLink></li>
        <li className='text-md font-semibold'><NavLink className={({ isActive }) => isActive && 'underline text-[#f04a00]'} to='/add-export'><PackagePlus />Add Export</NavLink></li>
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
        <div className="flex items-center gap-2">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="user"
              referrerPolicy="no-referrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#f04a00] object-cover"
            />
          )}
          <button
            onClick={handleLogout}
            className="btn btn-sm sm:btn-md text-white bg-[#f04a00] hover:bg-[#e34234] rounded-xl"
          >
            Logout
          </button>
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