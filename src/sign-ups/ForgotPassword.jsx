import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    // Redirect to login page after successful reset link submission

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email) {
            return toast.error("Please enter your valid email address or phone number.");
        }
        // Simulate sending a reset link
        toast.success("Reset link sent to your email address: " + email);

        // Redirect to login page after successful reset link submission
        setTimeout(() => {
            navigate("/reset-password");
        }, 2000); // Redirect after 2 seconds

        // Here you would typically send the email to your backend for processing
        setEmail(""); // Clear the input field after submission
    }

    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-xl p-8 shadow-md w-[90%] sm:w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
        <form className="flex flex-col">
            <div className="mb-2">
                <label htmlFor="email" className="block text-sm sm:text-lg font-medium text-gray-700 mb-1">Email / Phone Number
                    <span className="text-red-500" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-gray-800 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email or Phone Number "
                />
            </div>
            
            <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-4 my-4 hover:bg-black text-amber-500 rounded-md bg-[rgb(0,0,30)] transition duration-200 cursor-pointer"
            >
                Send Reset Link
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
  );
};

export default ForgotPassword;