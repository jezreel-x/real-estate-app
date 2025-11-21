import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaTiktok } from "react-icons/fa6";

const Footer = () => {
    
    const navigate = useNavigate();

    return (
        <footer className="mt-16 bg-[rgb(0,0,30)] text-amber-500 py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="space-y-3">
                <h3 className="font-bold text-xl mb-3">About Us</h3>
                <p 
                    className="hover:text-[#FFD700] cursor-pointer transition duration-300"
                >
                    AirHousing
                </p>
                <p className="hover:text-[#FFD700] cursor-pointer transition duration-300">Helpdesk</p>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-3">
                <h3 className="font-bold text-xl mb-3">Quick Links</h3>
                <p className="hover:text-[#FFD700] cursor-pointer transition duration-300">
                    Terms Of Service
                </p>
                <p className="hover:text-[#FFD700] cursor-pointer transition duration-300">
                    Privacy and Data Protection Policy
                </p>
            </div>

            {/* Contacts Section */}
            <div className="space-y-3">
                <h3 className="font-bold text-xl mb-3">Contacts</h3>
                <p className="text-gray-300">+254 701 234 567</p>
                <p>
                <a
                    href="mailto:info@airhousing.co.ke"
                    className="text-[#FFD700] hover:underline transition duration-300">
                    info@airhousing.co.ke
                </a>
                </p>
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
                <h3 className="font-bold text-xl mb-3">Follow Us</h3>
                <div className="flex justify-center sm:justify-start space-x-5 mt-4">
                {[
                    { icon: FaFacebookF, color: "blue-900" },
                    { icon: FaXTwitter, color: "blue-900" },
                    { icon: FaLinkedinIn, color: "blue-900" },
                    { icon: FaInstagram, color: "pink-900" },
                    { icon: FaTiktok, color: "gray-900" },
                // eslint-disable-next-line no-unused-vars
                ].map(({ icon: Icon, color }, index) => (
                    <a
                    key={index}
                    href="#"
                    className={`text-xl p-3 bg-[rgb(0,0,122)] text-white rounded-full hover:bg-[#FFD700] hover:text-${color} transition duration-300 transform hover:scale-110 shadow-md`}>
                    <Icon />
                    </a>
                ))}
                </div>
                </div>
            </div>
            {/* Bottom Copyright Section */}
            <div className="border-t border-gray-500 mt-12 pt-6 text-center text-sm text-gray-300">
                <p>&copy; 2025 AirHousing. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;