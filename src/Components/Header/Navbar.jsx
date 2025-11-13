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
        <div className="dark:border-b-2 dark:border-[#f04a00]">
            <div className="navbar  max-w-11/12 mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-[#e34234]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="text-2xl font-bold ">Trade<span className='text-[#f04a00]'>Sphere</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-2">
                    <div className="navbar-end ">
                        {loading ? <p>loading...</p> :
                            user ?
                                <div className='flex gap-2'>
                                    <div className="">
                                        <img
                                            referrerPolicy="no-referrer"
                                            src={user.photoURL || ''}
                                            alt="user"
                                            className='w-10 h-10 rounded-full border-2 border-[#f04a00] object-cover' />
                                    </div>

                                    <button onClick={handleLogout} className="btn text-white bg-[#f04a00] hover:bg-[#e34234] rounded-xl">Logout</button>
                                </div>
                                :
                                <div className='flex gap-2'>
                                    <Link to='/auth/login' className="btn rounded-xl text-white bg-[#f04a00] hover:bg-[#e34234]">Login</Link>
                                    <Link to='/auth/register' className="btn rounded-xl btn-outline border-2 border-[#e34234] text-[#e34324] hover:text-white hover:bg-[#f04a00]">Signup</Link>
                                </div>
                        }

                    </div>
                    <input
                        onChange={(e) => handleTheme(e.target.checked)}
                        type="checkbox"
                        defaultChecked={localStorage.getItem('theme') === "dark"}
                        className="toggle"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;