import React from "react";
import { BellRing, ChevronDown, Settings, LogOut } from "lucide-react";
import logo from "../assets/yellow.png";

const PropertyManagerNavbar = () => {

    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [notifOpen, setNotifOpen] = React.useState(false);
    const [avatar, setAvatar] = React.useState(null);
    const fileInputRef = React.useRef(null);

    const menuOptions = [
        {
            icon: <BellRing className="w-5 h-5 text-amber-500" />, 
            items: [
                "A new tenant has signed up", 
                "Invoice #1234 has been paid",
                "Maintenance request #5678 has been created",
                "New inquiry from John Doe"
            ]
        },
        {
            icon: "profile", items: [""]
        },
    ];


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setAvatar(url);
    };

    return (
        <>
            <div className="flex h-20 w-full fixed top-0 left-0 z-50 bg-[rgb(0,0,30)] justify-between items-center py-1 px-6 md:px-8">
                {/* Logo */}
                <img
                    src={logo}
                    alt="Logo"
                    className="w-20 h-auto"
                />

                <ul className="hidden md:flex gap-10">
                    <li 
                        className="relative flex items-center gap-2 cursor-pointer select-none"
                        onMouseEnter={() => setNotifOpen(true)}
                        onMouseLeave={() => setNotifOpen(false)}
                    >
                        {/* Notification Bell */}
                        <BellRing className="w-6 h-6 text-amber-500" />
                        <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                                notifOpen ? "rotate-180" : "rotate-0"
                            }`}
                        />
                        

                        {/* Notification Dropdown */}
                        {notifOpen && (
                            <div className="absolute right-0 top-8 w-64 bg-slate-800 shadow-xl rounded-md border border-slate-700 py-2 z-50">
                                {menuOptions[0].items.map((item, index) => (
                                    <div 
                                        key={index}
                                        className="px-4 py-2 hover:bg-slate-700 text-sm text-white border-b last:border-b-0"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>

                    <li 
                        className="relative flex items-center gap-2 cursor-pointer select-none"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        {/* Hidden input for image upload */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />

                        {/* Avatar image */}
                        <div
                            className="w-10 h-10 rounded-full overflow-hidden border border-slate-600"
                            onClick={() => fileInputRef.current.click()}
                            title="Click to upload profile image"
                        >
                            {avatar ? (
                            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                                Upload
                            </div>
                            )}
                        </div>

                        {/* Chevron */}
                        <ChevronDown
                            className={`w-5 h-5 text-white transition-transform duration-300 ${
                            dropdownOpen ? "rotate-180" : "rotate-0"
                            }`}
                        />

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 top-full w-40 bg-slate-800 shadow-xl rounded-md border border-slate-700 py-2 z-50">
                                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-slate-700 text-sm cursor-pointer">
                                    <Settings className="w-4 h-4" /> Settings
                                </button>

                                <button className="flex items-center gap-2 text-red-400 w-full px-4 py-2 hover:bg-slate-700 text-sm cursor-pointer">
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default PropertyManagerNavbar;