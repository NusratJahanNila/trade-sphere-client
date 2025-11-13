import React, { use, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate, useNavigate } from 'react-router';
import { IoMdEye } from 'react-icons/io';
import { FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    // Navigate to home page
    const navigate = useNavigate();
    // console.log(navigate)
    // Show Password
    const [showPassword, setShowPassword] = useState(false);
    // Error for password validation
    const [error, setError] = useState('')
    // AuthContext
    const {user, createUser, setUser, googleSignIn ,updateUser} = use(AuthContext);
    if(user){
        return <Navigate to='/'></Navigate>
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const from = e.target;
        const displayName = from.name.value;
        const photoURL = from.photo.value;
        const email = from.email.value;
        const password = from.password.value;
        console.log({ displayName, photoURL, email, password });
        // Password VAlidation
        const upperCaseValidation = /[A-Z]/;
        const lowerCaseValidation = /[a-z]/;
        const lengthValidation = /.{6,}/;
        if (!upperCaseValidation.test(password)) {
            setError('Password must contain at least one uppercase letter (A-Z).');
            return;
        }
        else if (!lowerCaseValidation.test(password)) {
            setError('Password must contain at least one lowercase letter (a-z).');
            return;
        }
        else if (!lengthValidation.test(password)) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        else {
            setError('')
        }
        // Register
        createUser(email, password)
            .then((result) => {
                // Signed up 
                const user = result.user;
                // Update User
                updateUser({ displayName, photoURL })
                    .then(() => {
                        setUser({ ...user, displayName, photoURL });
                    })
                    .catch((err) => {
                        console.log(err);
                        setUser(user);
                    });
                toast.success('User Registration Successfull!!')
                navigate('/');
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                toast.error(errorCode, errorMessage);
            });


    }

    // Show Password
    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success('Successfully sign in with google!');
                navigate('/');
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode, errorMessage);
            });
    }
    return (
        <div className="max-w-md mx-auto bg-base-100  rounded-lg p-6 my-10 dark:shadow-md dark:shadow-[#e34234]">
            <title>Register - Trade Sphere</title>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6"><span className='text-[#f04a00]'>SignUp</span> Here!</h2>
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input
                                name='name'
                                type="text"
                                className="input"
                                placeholder="Name"
                            />
                            {/* PhotoURL */}
                            <label className="label">Photo URL</label>
                            <input
                                name='photo'
                                type="text"
                                className="input"
                                placeholder="Photo URL"
                            />
                            {/* email */}
                            <label className="label">Email</label>
                            <input
                                name='email'
                                type="email"
                                className="input"
                                placeholder="Email"
                                required
                            />
                            {/* password */}
                            <div className="relative">
                                <label className="label">Password</label>
                                <input
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className="input"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    onClick={handleToggleShowPassword}
                                    className="btn btn-xs absolute right-6 bottom-2">
                                    {showPassword ? <FaEyeSlash /> : <IoMdEye />}
                                </button>
                            </div>
                            {
                                error && <p className='text-red-600 text-sm'>{error}</p>
                            }
                            <button className="btn rounded-xl text-white bg-[#f04a00] hover:bg-[#e34234]">Sign Up </button>
                        </fieldset>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn rounded-xl btn-outline bg-white border-[#e34234] text-[#e34324] hover:text-white hover:bg-[#f04a00] hover:shadow-sm">
                        <FcGoogle />
                        Login with Google
                    </button>
                    <p className='text-center'>Already have an account? <Link to='/auth/login' className='text-[#e34324] hover:underline font-semibold'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;