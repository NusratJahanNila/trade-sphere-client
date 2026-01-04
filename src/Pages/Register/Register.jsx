import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Package, Globe, Shield, CheckCircle } from "lucide-react";
import Loader from "../../Components/Loader/Loader";

const Register = () => {
    const { user, createUser, updateUser, googleSignIn, loading,  } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    if (loading) {
        return <Loader />;
    }

    if (user) return <Navigate to="/" />;

    // YOUR ORIGINAL LOGIC
    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            console.log(result);
            await updateUser({
                displayName: data.name,
                photoURL: data.photo
            });
            toast.success("Registration successful!");
            navigate("/");
        } catch (err) {
            toast.error(err.code || "Registration failed");
        }
    };

    // YOUR ORIGINAL LOGIC
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success("Signed up with Google!");
            navigate("/");
        } catch (err) {
            toast.error(err.code || "Google sign-in failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200  p-10">
            <div className="max-w-7xl mx-auto rounded-2xl bg-linear-to-br from-[#f04a00] to-[#e34234] dark:from-gray-800 dark:to-gray-700 text-white grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4">
                
                {/* Left Side - Registration Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-10">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Package className="w-12 h-12 text-[#f04a00]" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            <span className="text-[#f04a00]">Sign Up</span> Here
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Create your account to start trading globally
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input
                            placeholder="Name"
                            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-500"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                        <input
                            placeholder="Photo URL"
                            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-500"
                            {...register("photo")}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-500"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 pr-12 text-gray-800 dark:text-gray-500"
                                {...register("password", {
                                    required: "Password required",
                                    minLength: { value: 6, message: "Min 6 characters" },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[a-z])/,
                                        message: "Must include upper & lowercase"
                                    }
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}

                        {/* Register Button - YOUR ORIGINAL */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn w-full bg-[#f04a00] text-white hover:bg-[#e34234]"
                        >
                            {isSubmitting ? "Creating..." : "Register"}
                        </button>
                        
                        {/* Google Button - YOUR ORIGINAL */}
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn w-full mt-1 flex items-center justify-center gap-2"
                        >
                            <FcGoogle size={20} />
                            Sign up with Google
                        </button>
                    </form>

                    {/* Login Link - YOUR ORIGINAL */}
                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <Link to={"/auth/login"} className="text-[#f04a00] hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

                {/* Right Side - Benefits */}
                <div className="hidden lg:block">
                    <div className="p-8 text-white ">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Package className="w-10 h-10" />
                                <h1 className="text-3xl font-bold">Join Our Community</h1>
                            </div>
                            <p className="text-xl font-semibold mb-2">Start Your Global Trading Journey</p>
                            <p className="text-white/90 mb-8">
                                Connect with traders worldwide, import/export products with ease, and grow your business.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Globe, title: "Global Reach", desc: "Access buyers and sellers from 50+ countries" },
                                { icon: Shield, title: "Secure Platform", desc: "End-to-end encrypted transactions" },
                                { icon: Package, title: "Easy Management", desc: "One-click imports, real-time tracking" },
                                { icon: CheckCircle, title: "Verified Partners", desc: "All users are authenticated and verified" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                        <p className="text-white/80">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                            <h4 className="font-semibold mb-2">Why Choose Trade Sphere?</h4>
                            <ul className="space-y-1 text-sm">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> No hidden fees
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> 24/7 customer support
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Real-time market analytics
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Mobile app available
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;