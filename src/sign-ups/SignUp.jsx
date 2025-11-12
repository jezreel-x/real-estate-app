import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import logo from '../assets/black.png';

import { toast } from "react-toastify";

import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import Select from 'react-select';

import TextInput from "@custom-components/TextInput";

import { dummyUsers as users } from "../data/DummyUsers";


const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgb(229, 231, 235)",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgb(169, 169, 169)" : "transparent",
      color: state.isSelected ? "white" : "black",
    }),
    singleValue: (provided) => ({
      ...provided,
        color: "black",
        fontSize: "16px",
        fontWeight: "500",
        padding: "4px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray",
      fontSize: "16px",
      fontWeight: "480",
    }),
};


const SignUp = () => {
    const navigate = useNavigate();

    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const [selectedRole, setSelectedRole] = useState(null);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const handleSignUp = (e) => {

        e.preventDefault();
        const input = emailOrPhone.trim().toLowerCase();
        
        if (!name || !input || !password || !confirmPassword || selectedRole === null) {
            return toast.error("Please fill in all fields.");
        } 
        
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        // Perform SignUp logic here
        toast.success("SignUp successful!");

        const role = selectedRole.value;
        // localStorage for persisting user data
        localStorage.setItem(
            "user",
            JSON.stringify({ input, role, name, password, confirmPassword })
        );

        // Role-based navigation
        const roleRoutes = {
            tenant: "/",
            agent: "/agent",
            serviceprovider: "/service-provider",
            admin: "/admin",
        }; // Redirect to dashboard or another page after SignUp

        const redirectPath = roleRoutes[role] || "/";

        setTimeout(() => {
            if (redirectPath) {
                navigate(redirectPath);
            } else {
                toast.error("User role is not recognized.");
            }
        }, 1000);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-2xl flex flex-col items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-24 h-auto mb-6"
                />
                <h1 className="text-2xl font-bold text-gray-800">User Sign Up</h1>

            <div className="flex flex-col mt-4 w-full justify-center items-center">

                {/* Name Input */}
                <TextInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full sm:w-3/4 p-4 border border-gray-300 text-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <TextInput
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Enter phone number or email"
                    className="w-full mt-4 sm:w-3/4 p-4 border border-gray-300 text-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Role Selection */}
                <div className="w-full mt-4 sm:w-3/4">
                    <Select
                        options={[
                            { value: 'tenant', label: 'Tenant' },
                            { value: 'agent', label: 'Agent' },
                            { value: 'serviceprovider', label: 'Service Provider' },
                            { value: 'propertymanager', label: 'Property Manager' },
                        ]}
                        value={selectedRole}
                        onChange={setSelectedRole}
                        placeholder="Select your role"
                        styles={customStyles}
                        isSearchable={true}
                    />
                </div>

                <div className="relative mt-4 w-full sm:w-3/4">
                    <TextInput
                    id="password"
                    type={isVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-slate-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 p-4"
                    placeholder="Enter your password..."
                    aria-label="Password"
                    required
                    />
                    <button
                    className="absolute inset-y-0 end-0 flex items-center px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
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

                <div className="relative mt-4 w-full sm:w-3/4">
                    <TextInput
                    id="confirm__password"
                    type={isVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full text-slate-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 p-4"
                    placeholder="Confirm password..."
                    aria-label="Confirm Password"
                    required
                    />
                    <button
                    className="absolute inset-y-0 end-0 flex items-center px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
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

                {/* SignUp Button */}
                <button
                    type="button"
                    onClick={handleSignUp}
                    className="mt-4 w-full sm:w-3/4 bg-[rgb(0,0,30)] text-amber-500 py-4 rounded-lg hover:bg-[rgb(0,0,0)] transition duration-200 cursor-pointer">
                    SignUp
                </button>
            </div>

            {/* <div className="text-center my-4 text-gray-600">Or</div> */}

            <div className="flex flex-col justify-center items-center w-full my-6">
                <button
                    type="button"
                    className="w-full sm:w-3/4 flex items-center justify-center bg-white border border-gray-300 text-black py-4 rounded-md shadow-md hover:bg-gray-100 transition duration-200 cursor-pointer">
                    <FcGoogle className="mr-2" size={20} /> Continue with Google
                </button>
                <p className="text-gray-900 mt-6 gap-3 text-sm sm:text-lg">Already have an account?
                    <Link to="/login" className="text-sm sm:text-lg text-blue-500 hover:underline hover:text-gray-700 ml-2">
                    Log In
                    </Link>
                </p>
            </div>
            </div>
        </div>
    )
};

export default SignUp;