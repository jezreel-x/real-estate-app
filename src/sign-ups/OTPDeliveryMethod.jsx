import { useNavigate } from 'react-router-dom';
import { notify } from "@custom-components/toastHelper";
import logo from '../assets/black.png';
import { Mail, Phone } from 'lucide-react';

const OTPDeliveryMethod = () => {

    const navigate = useNavigate();

    const deliveryMethods = [
        {
            icon: <Mail className="w-6 h-6 text-gray-600" />,
            title: "Email",
            description: "Send the OTP to your registered email address.",
        },
        { 
            icon: <Phone className="w-6 h-6 text-gray-600" />,
            title: "SMS",
            description: "Send the OTP to your registered phone number.",
        }
    ];

    const handleClick = (method) => {
        // Handle the selection of OTP delivery method
        notify("info", "Redirecting to OTP Page via " + method.title + "...");

        // You can add navigation to the OTP page or trigger OTP sending here
        setTimeout(() => navigate('/otp-page', { state: { method: method.title } }), 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-2xl flex flex-col items-center">
                <img 
                    src={logo}
                    alt="logo"
                    className="w-24 h-auto my-6 mx-auto"
                />

                <label className="mt-8 mb-6 block text-center text-2xl font-bold text-gray-900" aria-hidden>
                    Choose OTP Delivery Method
                </label>

                <div className="w-full flex flex-col p-4">
                    {deliveryMethods.map((method, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(method)}
                            type="button"
                            className="w-[80%] mx-auto flex items-center justify-center p-4 my-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                        >
                            <div className="mr-4">
                                {method.icon}
                            </div>
                            <div className="text-lg font-semibold text-gray-900">
                                {method.title}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OTPDeliveryMethod;