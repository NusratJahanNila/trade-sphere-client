import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loader/Loader";
import {
    User,
    Mail,
    LogOut,
    Edit3
} from "lucide-react";

const Profile = () => {
    const { user, logout, loading, updateUser, setUser } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    if (loading) {
        return <Loader />;
    }

    // logout - YOUR ORIGINAL LOGIC
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully");
            navigate("/");
        } catch (err) {
            toast.error("Logout failed", err);
        }
    };

    // update - YOUR ORIGINAL LOGIC
    const handleUpdateUser = (e) => {
        e.preventDefault();
        const from = e.target;
        const displayName = from.name.value;
        const photoURL = from.photo.value;

        updateUser({ displayName, photoURL })
            .then(() => {
                setUser({ ...user, displayName, photoURL });
                toast.success("User profile updated successfully!!");
                setOpenModal(false);
            })
            .catch((err) => {
                console.log(err);
                setUser(user);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 mt-16">
            <title>Profile - Trade Sphere</title>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        My <span className="text-[#f04a00]">Profile</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Manage your account information
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-6">
                    {/* Profile Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
                        <div className="grid grid-cols-1 gap-8">
                            {/* Avatar Section */}
                            <div className="relative mx-auto">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/2kRZ3qs/avatar.png"}
                                    alt="Profile"
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-[#f04a00] object-cover"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-[#f04a00] text-white p-2 rounded-full">
                                    <User className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className=" text-center mx-auto">
                                <div className="mb-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                        {user?.displayName || "User"}
                                    </h2>
                                    <div className="flex items-center justify-center  gap-2 mt-2 text-gray-600 dark:text-gray-400">
                                        <Mail className="w-5 h-5" />
                                        <span>{user?.email}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center ">
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="btn bg-[#f04a00] hover:bg-[#e34234] text-white border-none"
                                    >
                                        <Edit3 className="w-5 h-5 mr-2" />
                                        Update Profile
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"
                                    >
                                        <LogOut className="w-5 h-5 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MODAL (YOUR ORIGINAL LOGIC) ================= */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute right-4 top-4 btn btn-sm btn-circle btn-ghost"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Update Profile</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Edit your personal information</p>

                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Full Name</span>
                                </label>
                                <input
                                    name="name"
                                    defaultValue={user?.displayName}
                                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Profile Photo URL</span>
                                </label>
                                <input
                                    name="photo"
                                    defaultValue={user?.photoURL}
                                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                                    required
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email Address</span>
                                </label>
                                <input
                                    value={user?.email}
                                    disabled
                                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-gray-500">Email cannot be changed</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-[#f04a00] hover:bg-[#e34234] text-white border-none"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;