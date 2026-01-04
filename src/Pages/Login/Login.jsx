import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { useLocation, useNavigate, Navigate, Link } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Package, Globe, Shield } from "lucide-react";
import Loader from "../../Components/Loader/Loader";

const Login = () => {
  const { user, loginWithEmailPassword, googleSignIn, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to={location.state || "/"} />;
  }

  // YOUR ORIGINAL LOGIC
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await loginWithEmailPassword(data.email, data.password);
      toast.success("Logged in successfully!");
      navigate(location.state || "/");
    } catch (err) {
      toast.error(err.code || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // YOUR ORIGINAL LOGIC
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      toast.success("Logged in with Google!");
      navigate(location.state || "/");
    } catch (err) {
      toast.error(err.code || "Google login failed");
      setLoading(false);
    }
  };

  // YOUR ORIGINAL LOGIC
  const fillDemoUser = () => {
    setValue("email", "user@a.com");
    setValue("password", "123456aA!");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-base-200 p-10">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-linear-to-br from-[#f04a00] to-[#e34234] dark:from-gray-800 dark:to-gray-700  text-white p-4 rounded-2xl">
        
        {/* Left Side - Information */}
        <div className="hidden lg:block">
          <div className="p-8 rounded-2xl text-white ">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-10 h-10" />
                <h1 className="text-3xl font-bold">Trade Sphere</h1>
              </div>
              <p className="text-xl font-semibold mb-2">Welcome Back to Your Global Trade Hub</p>
              <p className="text-white/90 mb-8">
                Manage exports, browse global products, and import with one click.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Global Marketplace</h3>
                  <p className="text-white/80">Access products from 50+ countries</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Transactions</h3>
                  <p className="text-white/80">Your data is protected with enterprise-grade security</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Real-time Sync</h3>
                  <p className="text-white/80">Instant updates across all your devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form (YOUR ORIGINAL FORM LOGIC WITH BETTER DESIGN) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Package className="w-12 h-12 text-[#f04a00]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              <span className="text-[#f04a00]">Login</span> Here
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to continue to your Trade Sphere dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-500"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password - YOUR ORIGINAL */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 pr-12 text-gray-800 dark:text-gray-500"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button - YOUR ORIGINAL */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-full bg-[#f04a00] text-white hover:bg-[#e34234]"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Demo Button - YOUR ORIGINAL */}
          <button
            onClick={fillDemoUser}
            className="btn w-full mt-3 bg-gray-100 dark:bg-gray-700"
          >
            Demo User Login
          </button>

          {/* Google Button - YOUR ORIGINAL */}
          <button
            onClick={handleGoogleLogin}
            className="btn w-full mt-3 flex gap-2"
          >
            <FcGoogle /> Login with Google
          </button>

          {/* Register Link - YOUR ORIGINAL */}
          <p className="text-center mt-4">
            Doesn't have an account?{" "}
            <Link to={"/auth/register"} className="text-[#f04a00] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;