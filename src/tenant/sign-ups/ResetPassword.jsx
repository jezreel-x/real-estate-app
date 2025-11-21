import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const handleSubmit = () => {

        if (!email || !password || !confirmPassword) {
            return toast.error("Please fill in all required fields!");
        }

        if (password.trim() !== confirmPassword.trim()) {
            return toast.error("Passwords do not match, please try again!");
        }

        // Show loading toast
        const toastId = toast.loading("Resetting password...");

        // toast.success("Successfully reset your password!");

        setTimeout(() => {
            // Dismiss loading and show success
            toast.update(toastId, {
                render: "Successfully reset your password!",
                type: "success",
                isLoading: false,
                autoClose: 3000, // Auto close after 3 seconds
                closeOnClick: true,
                onClose: () => navigate("/login"), // Navigate to login on close
            });

            // Clear form and navigate
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        }, 3000);

    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-xl p-8 shadow-md w-[90%] sm:w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
                <form>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm sm:text-lg font-medium text-gray-700 mb-1">Reset Token
                            <span className="text-red-500" aria-hidden="true">*</span>
                            <span className="sr-only">(required)</span>
                        </label>
                        <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        className="w-full text-gray-800 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your reset token "
                        required
                        />
                    </div>
                    <div className="relative my-6">
                        <label htmlFor="email" className="block text-sm sm:text-lg font-medium text-gray-700 mb-1">New Password
                            <span className="text-red-500" aria-hidden="true">*</span>
                            <span className="sr-only">(required)</span>
                        </label>
                        <input
                            type={isVisible ? "text" : "password"}
                            id="email"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-gray-800  p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your new password "
                            required
                        />
                        <button
                            className="absolute inset-y-0 end-2 top-5 sm:top-8 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label={isVisible ? "Hide password" : "Show password"}
                            aria-pressed={isVisible}
                            aria-controls="password">
                            {isVisible ? (
                                <Eye size={20} aria-hidden="true" />
                            ) : (
                                <EyeOff size={20} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    <div className="relative mb-2">
                        <label htmlFor="email" className="block text-sm sm:text-lg font-medium text-gray-700 mb-1">Confirm Password
                            <span className="text-red-500" aria-hidden="true">*</span>
                            <span className="sr-only">(required)</span>
                        </label>
                        <input
                            type={isVisible ? "text" : "password"}
                            id="email"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full text-gray-800 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm your new password"
                            required
                        />
                        <button
                            className="absolute inset-y-0 end-2 top-5 sm:top-8 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label={isVisible ? "Hide password" : "Show password"}
                            aria-pressed={isVisible}
                            aria-controls="password">
                            {isVisible ? (
                                <Eye size={20} aria-hidden="true" />
                            ) : (
                                <EyeOff size={20} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full py-4 my-4 hover:bg-black text-amber-500 rounded-md bg-[rgb(0,0,30)] transition duration-200 cursor-pointer"
                    >
                        Reset Password
                    </button>
                    
                </form>
                <div className="flex gap-2 items-center mt-4">
                    <p className="text-sm sm:text-lg text-gray-700 text-center">
                        Remembered your password?
                    </p>
                    <Link to="/login" className="text-amber-800 hover:underline hover:text-gray-700 text-sm sm:text-lg">
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default ResetPassword;