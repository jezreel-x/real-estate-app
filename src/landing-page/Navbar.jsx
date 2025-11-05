import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from '../assets/yellow.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // const [sideNavBarOpen, setSideNavBarOpen] = useState(false);
    const [openOption, setOpenOption] = useState(null);

    const [isOpenPropertyCategory, setIsOpenPropertyCategory] = useState(false);
    const [propertyCategory, setPropertyCategory] = useState("Property Category");

    const [isOpenBedrooms, setIsOpenBedrooms] = useState(false);
    const [bedrooms, setBedrooms] = useState("Bedrooms");

    const [isOpenPriceRange, setIsOpenPriceRange] = useState(false);
    const [priceRange, setPriceRange] = useState("Price Range");

    const [active, setActive] = useState(false);

    const [selectedOption, setSelectedOption] = useState("Property Type");
    const [isOpenSelectedOption, setIsOpenSelectedOption] = useState(false);
    
    // section1Ref.current = null;
    const section1Ref = useRef(null);
    const navigate = useNavigate();

    const menuButtons = ["Login", "Sign Up", "About Us"];

    // Define menu options and their dropdown items
    const options = [
        {
            label: "Property Type",
            items: ["Rentals", "Sales"],
        },
        {
            label: "Property Category",
            items: ["Apartments", "Houses", "Villas", "Mansions"],
        },
        {
            label: "Bedrooms",
            items: ["1-bedroom", "2-bedroom", "3-bedroom", "4-bedroom", "5-bedroom", "6+"],
        },
        {
            label: "Price Range",
            items: [
                "Below KES 5,000", 
                "KES 5,000 - KES 10,000", 
                "KES 10,000 - KES 20,000", 
                "KES 20,000 - KES 50,000", 
                "KES 50,000 - KES 100,000", 
                "KES 100,000 - KES 200,000", 
                "Above KES 200,000"
            ],
        },
    ];

    const handleMenuButtonClick = (index) => {
        switch (menuButtons[index]) {
        case "Login":
            navigate("/login");
            break;
        case "Sign Up":
            scrollToSection(section1Ref);
            break;
        case "About Us":
            navigate("/landing-page-s");
            break;
        default:
            break;
        }
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleClickSignUp = () => {
        navigate("/sign-up");
        setActive(!active);
    };

    const handleSelect = (label, item) => {
        switch (label) {
            case "Property Type":
                setSelectedOption(item);
                break;
            case "Property Category":
                setPropertyCategory(item);
                break;
            case "Bedrooms":
                setBedrooms(item);
                break;
            case "Price Range":
                setPriceRange(item);
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex h-24 w-full fixed top-0 left-0 z-50 bg-[rgb(0,0,30)] justify-between items-center py-1 px-6 md:px-8"> 
            <img
            src={logo}
            alt="Logo"
            className="w-24 h-auto"
            />

            <ul className="hidden space-x-4 2xl:flex 2xl:space-x-20">
                {/* Dropdown Navbar Items */}
                <li
                    className="relative cursor-pointer"
                    onMouseEnter={() => setIsOpenSelectedOption(true)}
                    onMouseLeave={() => setIsOpenSelectedOption(false)}
                >
                    <div>
                        <div className="flex items-center space-x-1 text-amber-500 hover:text-blue-500">
                            <span>{selectedOption}</span>
                            <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                                isOpenSelectedOption ? "rotate-180" : "rotate-0"
                            }`}
                            />
                        </div>

                        {/* Dropdown Menu */}
                        {isOpenSelectedOption && (
                            <div 
                                className="absolute left-0 top-full w-48"
                            >
                                <ul className="bg-[rgb(0,0,30)] border border-gray-200 rounded-lg shadow-lg">
                                    {["Rentals", "Sales"].map((type) => (
                                        <li
                                            key={type}
                                            className="px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                            onClick={() => {
                                                setSelectedOption(type);   // update displayed text
                                                setIsOpenSelectedOption(false);    // close dropdown
                                            }}
                                        >
                                            {type}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </li>

                <li
                    className="relative cursor-pointer"
                    onMouseEnter={() => setIsOpenPropertyCategory(true)}
                    onMouseLeave={() => setIsOpenPropertyCategory(false)}
                >
                    <div className="flex items-center space-x-1 text-amber-500 hover:text-blue-500">
                        <span>{propertyCategory}</span>
                        <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                            isOpenPropertyCategory ? "rotate-180" : "rotate-0"
                        }`}
                        />
                    </div>

                    {/* Dropdown Menu */}
                    {isOpenPropertyCategory && (
                        <div 
                            className="absolute top-full left-0 w-48"
                        >
                            <ul className="bg-[rgb(0,0,30)] border border-gray-200 rounded-lg shadow-lg">
                                {["Apartments", "Houses", "Villas", "Mansions"].map((type) => (
                                    <li
                                        key={type}
                                        className="px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => {
                                            setPropertyCategory(type);   // update displayed text
                                            setIsOpenSelectedOption(false);    // close dropdown
                                        }}
                                    >
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>

                <li
                    className="relative cursor-pointer"
                    onMouseEnter={() => setIsOpenBedrooms(true)}
                    onMouseLeave={() => setIsOpenBedrooms(false)}
                >
                    <div className="flex items-center space-x-1 text-amber-500 hover:text-blue-500">
                        <span>{bedrooms}</span>
                        <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                            isOpenBedrooms ? "rotate-180" : "rotate-0"
                        }`}
                        />
                    </div>

                    {/* Dropdown Menu */}
                    {isOpenBedrooms && (
                        <div 
                            className="absolute top-full left-0 w-48"
                        >
                            <ul className="bg-[rgb(0,0,30)] border border-gray-200 rounded-lg shadow-lg">
                                {["1-bedroom", "2-bedroom", "3-bedroom", "4-bedroom", "5-bedroom", "6+"].map((type) => (
                                    <li
                                        key={type}
                                        className="px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => {
                                            setBedrooms(type);   // update displayed text
                                            setIsOpenBedrooms(false);    // close dropdown
                                        }}
                                    >
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>

                <li
                    className="relative cursor-pointer"
                    onMouseEnter={() => setIsOpenPriceRange(true)}
                    onMouseLeave={() => setIsOpenPriceRange(false)}
                >
                    <div className="flex items-center space-x-1 text-amber-500 hover:text-blue-500">
                        <span>{priceRange}</span>
                        <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                            isOpenPriceRange ? "rotate-180" : "rotate-0"
                        }`}
                        />
                    </div>

                    {/* Dropdown Menu */}
                    {isOpenPriceRange && (
                        <div 
                            className="absolute top-full left-0 w-64"
                        >
                            <ul className="bg-[rgb(0,0,30)] border border-gray-200 rounded-lg shadow-lg">
                                {[
                                    "Below KES 5,000", 
                                    "KES 5,000 - KES 10,000", 
                                    "KES 10,000 - KES 20,000", 
                                    "KES 20,000 - KES 50,000", 
                                    "KES 50,000 - KES 100,000", 
                                    "KES 100,000 - KES 200,000", 
                                    "Above KES 200,000"
                                ].map((type) => (
                                    <li
                                        key={type}
                                        className="px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => {
                                            setPriceRange(type);   // update displayed text
                                            setIsOpenPriceRange(false);    // close dropdown
                                        }}
                                    >
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            </ul>

            <div id="div1" className="hidden space-x-4 xl:flex xl:space-x-8">
                <button
                    type="button"
                    className="bg-[rgb(0,0,30)] text-amber-500 min-h-[48px] py-2 px-6 rounded-full shadow-md hover:scale-110 hover:transition duration-900 ease-in-out hover:bg-[#FFD700] hover:text-black hover:cursor-pointer flex items-center justify-center sm:w-36 md:w-32"
                    onClick={() => navigate("/login")}
                >
                    Login                                   
                </button>
                <button
                    type="button"
                    onClick={handleClickSignUp}
                    className={`text-amber-500 py-3 px-6 rounded-full shadow-md hover:scale-110 hover:transition duration-900 ease-in-out hover:bg-[#FFD700] hover:cursor-pointer hover:text-black sm:w-36 md:w-32
                        ${active ? "bg-green-600" : "bg-[rgb(0,0,30)]"}`}
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    className="bg-[rgb(0,0,30)] text-amber-500 min-h-[48px] py-2 px-6 rounded-full shadow-md hover:scale-110 hover:transition duration-900 ease-in-out hover:bg-[#FFD700] hover:text-black hover:cursor-pointer flex items-center justify-center sm:w-36 md:w-32"
                    onClick={() => navigate("/landing-page-s")}
                >
                    About Us 
                </button>
            </div>

            <div className="xl:hidden">
                <button className="text-amber-500 hover:cursor-pointer" type="button" onClick={handleClick}>
                    {isOpen ? <X size={36} /> : <Menu size={36} />}
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-16 right-2 rounded-lg sm:w-64 md:w-68 lg:w-80 bg-white shadow-md flex flex-col items-center space-y-2 p-4 xl:hidden">
                    {menuButtons.map((text, index) => (
                        <button
                            type="button"
                            key={index}
                            className="text-amber-800 hover:bg-gray-300 hover:rounded-lg text-left min-h-[48px] py-2 px-6 cursor-pointer flex items-center w-full"
                            onClick={handleMenuButtonClick.bind(null, index)}
                        >
                            {text}
                        </button>
                    ))}
                    <div className="my-2 bg-gray-400 h-[1px] w-full" />
                    {options.map(({ label, items }) => {
                        // Dropdown visibility state
                        const isOptionOpen = openOption === label;

                        // Determine selected item based on label
                        const selected = label === "Property Type" ? selectedOption : label === "Property Category" ? propertyCategory
                                : label === "Bedrooms" ? bedrooms : label === "Price Range" ? priceRange : null;

                        return (
                            <div
                                key={label}
                                className="w-full flex flex-col items-center"
                                onMouseEnter={() => setOpenOption(label)}
                                onMouseLeave={() => setOpenOption(null)}
                            >
                                <button
                                    type="button"
                                    className="w-full hover:bg-gray-300 hover:rounded-lg text-left text-amber-800 min-h-[48px] py-2 px-4 flex items-center justify-between cursor-pointer"
                                >
                                    <span>{selected || label}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                                        isOptionOpen ? "rotate-180" : "rotate-0"
                                    }`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isOptionOpen && (
                                    <div className="w-full bg-white shadow-lg rounded-b-lg z-10 border border-gray-200">
                                    {items.map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => handleSelect(label, item)}
                                            className={`px-4 py-2 text-sm text-amber-800 cursor-pointer hover:bg-amber-100 ${
                                                selected === item
                                                ? "bg-amber-50 font-semibold text-amber-800"
                                                : ""
                                            }`}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
};

export default Navbar