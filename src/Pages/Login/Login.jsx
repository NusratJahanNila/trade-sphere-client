import React, { use, useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoMdEye } from 'react-icons/io';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthContext';

const Login = () => {
    // Show Password
    const [showPassword, setShowPassword] = useState(false);
    

    // Navigate to home page
    const navigate = useNavigate();
    const location=useLocation();
    // console.log(location);

    

    // AuthContext
    const {user, setUser, googleSignIn, loginWithEmailPassword} = use(AuthContext);
    if(user){
        return <Navigate to='/'></Navigate>
    }
    // Login
    const handleLogin=(e)=>{
        e.preventDefault();
        const from = e.target;
        const email = from.email.value;
        const password = from.password.value;
        // console.log({ email, password });

        loginWithEmailPassword(email,password)
        .then((result) => {
                // Signed up 
                const user = result.user;
                console.log(user);
                toast.success('Logged in Successfully!!')
                navigate(`${location.state? location.state : '/'}`);
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                toast.error(errorCode, errorMessage);
            });
    }
    
    // Show PAssword
    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    // Signin with google
    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success('Successfully sign in with google!');
                navigate(`${location.state? location.state : '/'}`);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode, errorMessage);
            });
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center text-blue-900">Login Here!</h1>
                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset">
                            {/* Email */}
                            <label className="label">Email</label>
                            <input
                                name='email'
                                type="email"
                                className="input"
                                placeholder="Email"
                            />
                            {/* password */}
                            <div className="relative">
                                <label className="label">Password</label>
                                <input
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className="input"
                                    placeholder="Password"
                                />
                                <button
                                    onClick={handleToggleShowPassword}
                                    className="btn btn-xs absolute right-6 bottom-2">
                                    {showPassword ? <FaEyeSlash /> : <IoMdEye />}
                                </button>
                            </div>
                            <Link className="link link-hover">Forgot password?</Link>
                            
                            <button className="bg-blue-900 text-white  font-semibold hover:bg-blue-800 btn">Login </button>
                        </fieldset>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] hover:shadow-sm">
                        <FcGoogle />
                        Login with Google
                    </button>
                    <p className='text-center'>Don't have an account? <Link to='/auth/register' className='text-blue-900 hover:underline font-semibold'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;