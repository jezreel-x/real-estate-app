import React from "react";
import OTPInput from "./OTPInput";
import { toast } from "react-toastify";

function OTPPage() {
  const handleComplete = () => {
    // send to server / verify
    toast.success("Code verified successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-2xl flex flex-col items-center">
            <OTPInput length={6} onComplete={handleComplete} />
        </div>
    </div>
  );
}


export default OTPPage;