import { useEffect, useState } from "react";
import { setHours, setMinutes } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Bed, MapPin, ChevronLeft, ChevronRight, Camera, Phone, Mail } from "lucide-react"; // icons (lucide-react)
import { FcNext } from "react-icons/fc"; // next icon
import { FaWhatsapp } from "react-icons/fa";
import { IoPersonOutline, IoVideocamOutline } from "react-icons/io5";

import Navbar from "../landing-page/Navbar";
import { toast } from "react-toastify";
import Footer from "../landing-page/Footer";

const ApartmentForRentDetails = () => {

    const [house, setHouse] = useState(null);

    const [similarApartmentsForRent, setSimilarApartmentsForRent] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("Request Info");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState("In Person");

    const [requestInfoName, setRequestInfoName] = useState("");
    const [requestInfoEmail, setRequestInfoEmail] = useState("");
    const [requestInfoMessage, setRequestInfoMessage] = useState("");

    const [scheduleVisitName, setScheduleVisitName] = useState("");
    const [scheduleVisitEmail, setScheduleVisitEmail] = useState("");
    const [scheduleVisitPhone, setScheduleVisitPhone] = useState("");

    const categories = ["Request Info", "Schedule a Visit"];

    const requestInfoActions = [
        { 
            icon: <Mail size={20} />, 
            label: "Submit" 
        },
        { 
            icon: <Phone size={20} />, 
            label: "Call" 
        },
        { 
            icon: <FaWhatsapp size={20} className="text-green-500" />, 
            label: "Whatsapp" 
        },
    ];

    const scheduleVisitActions = [
        {
            icon: <IoPersonOutline size={20} />,
            label: "In Person"
        },
        {
            icon: <IoVideocamOutline size={20} />,
            label: "Virtual"
        },
    ];

    useEffect(() => {
        // Retrieve the selected listing from local storage
        const listing = localStorage.getItem("apartmentRentals");
        if (listing) {
            setHouse(JSON.parse(listing));

            // Filter out the selected listing from all listings to get similar apartments
            const allListings = JSON.parse(localStorage.getItem("apartmentsForRent")) || [];
            const similar = allListings
                .filter(item => item.id !== JSON.parse(listing).id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 5); // get 5 random similar apartments

            setSimilarApartmentsForRent(similar);
        } else {
            setHouse(null);
        }
    }, []);

    if (!house) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
                No listing yet.
            </div>
        );
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleScheduleClick = (schedule) => {
        setSelectedSchedule(schedule);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if (!selectedDate) {
            toast.error("Please select a date and time for the visit.");
            return;
        }

        if (!scheduleVisitName.trim() || !scheduleVisitEmail.trim() || !scheduleVisitPhone.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        toast.success("Visit scheduled for " + selectedDate.toLocaleString());
        
        setSelectedDate(null);
        setScheduleVisitName("");
        setScheduleVisitEmail("");
        setScheduleVisitPhone("");
    };

    return (
        <div className="flex flex-col w-full mx-auto min-h-screen">
            <Navbar />

            {/* Breadcrumbs */}
            <div className="flex mt-24 mb-4 p-6 items-center">
                <Link to="/" className="text-gray-900 font-semibold hover:text-[rgb(0,0,122)] flex items-center justify-center text-lg sm:text-xl">
                    Home
                    <span className="mx-2"><FcNext /></span>
                </Link>
                <Link to="/houses-for-sale" className="text-gray-900 font-semibold hover:text-[rgb(0,0,122)] flex items-center justify-center text-lg sm:text-xl">
                    Apartments for Rent
                </Link>
            </div>

            {/* Details Section */}
            <div className="relative flex flex-col lg:flex-row w-full px-6">
                <section className="relative w-full lg:w-[60%] xl:w-[50%] 2xl:w-[60%] 3xl:w-[65%]">
                    {/* Custom Navigation Buttons */}
                    <div className={`absolute top-[250px] left-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-prev-${house.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
                        <ChevronLeft size={20} />
                    </div>
                    <div className={`absolute top-[250px] right-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-next-${house.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
                        <ChevronRight size={20} />
                    </div>

                    {/* Image Carousel */}
                    <Swiper 
                        spaceBetween={10} 
                        slidesPerView={1} 
                        loop={true}
                        navigation={{
                            nextEl: `.swiper-button-next-${house.id}`,
                            prevEl: `.swiper-button-prev-${house.id}`,
                        }}
                        pagination={{
                            // el: `.swiper-pagination-${listing.id}`,
                            clickable: true,
                            renderBullet: (index, className) => {
                            return `
                                <span class="${className} bg-black/50 p-1 rounded-full hover:bg-black/70">
                                <span class="block w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                                </span>`;
                            },
                        }}
                        modules={[Navigation, Pagination]}
                        className="h-[500px] w-full rounded-lg"
                    >
                        {house.images.map((img, index) => (
                            <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={house.title}
                                className="w-full h-[500px] object-cover rounded-lg"
                            />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Camera + count */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                        <Camera size={14} />
                        <span>{house.images.length || house.imageCount}</span>
                    </div>

                    {/* Content */}
                    <div className="mt-3">
                        <h2 className="text-gray-900 text-xl font-bold mb-3">{house.type} - {house.furnished}</h2>
                        <p className="text-lg text-[rgb(0,0,30)] font-semibold mb-3">KES{house.price}</p>
                        <p className="text-gray-900 mb-3">{house.description}</p>
                        
                        <h3 className="text-gray-900 text-xl font-semibold mb-2">Amenities</h3>
                        <ul className="list-disc list-inside mb-4">
                            {house.amenities.map((amenity, index) => (
                                <li 
                                    key={index}
                                    className="text-gray-900 mb-1"
                                >
                                    {amenity}
                                </li>
                            ))}
                        </ul>
                        <button className="bg-[rgb(0,0,30)] text-amber-500 px-4 py-2 rounded hover:bg-black transition hover:scale-105 hover:duration-700 hover:ease-in-out cursor-pointer">Contact Seller</button>
                    </div>
                </section>

                {/* Sidebar Section */}
                <section className="w-full mt-20 lg:mt-0 lg:w-[40%] xl:w-[50%] 2xl:w-[40%] 3xl:w-[35%] lg:pl-6 border-l">
                    {/* Sidebar or additional details can go here */}
                    <div className="grid grid-cols-2 mb-3">
                        {categories.map((category, index) => (
                            <div 
                                key={index} 
                                className={`text-center border border-gray-400 p-4 m-2 rounded-lg hover:shadow-lg cursor-pointer
                                    ${selectedCategory === category ? 'bg-[rgb(0,0,30)] text-amber-500' : 'bg-white text-gray-900'}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                    
                    {/* Additional content based on selected category can go here */}
                    {selectedCategory === "Request Info" && (
                        <div className="p-2">
                            <h3 className="text-gray-900 text-lg font-semibold mb-2">Request More Information</h3>
                            <p className="text-gray-700">Fill out the form below to request more information about this property.</p>
                            {/* Form fields can be added here */}
                            <form className="w-full mt-4 space-y-4">
                                <input 
                                    type="text"
                                    value={requestInfoName}
                                    onChange={(e) => setRequestInfoName(e.target.value)}
                                    placeholder="Your Name"
                                    className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-gray-300 px-3 py-4 rounded-lg"
                                />
                                <input 
                                    type="email"
                                    value={requestInfoEmail}
                                    onChange={(e) => setRequestInfoEmail(e.target.value)}
                                    placeholder="Your Email"
                                    className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-gray-300 px-3 py-4 rounded-lg"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    value={requestInfoMessage}
                                    onChange={(e) => setRequestInfoMessage(e.target.value)}
                                    className="resize-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-gray-300 px-3 py-4 rounded-lg"
                                    rows="6"
                                ></textarea>
                                {requestInfoActions.map((action, index) => (
                                    <button 
                                        key={index}
                                        type="button"
                                        className="flex justify-center gap-2 w-full bg-[rgb(0,0,30)] cursor-pointer text-amber-500 px-6 py-4 rounded-lg hover:bg-black transition"
                                    >
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))
                                }
                            </form>
                        </div>
                    )}
                    {selectedCategory === "Schedule a Visit" && (
                        <div className="p-2 w-full">
                            <h3 className="text-gray-900 text-lg font-semibold mb-2">Schedule a Visit</h3>
                            <p className="text-gray-700 mb-2 font-semibold">Choose a date and time to visit the property.</p>
                            {/* Date and time picker can be added here */}
                            <form className="w-full mt-4 space-y-4">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    showTimeSelect
                                    minDate={new Date()}
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                                    maxTime={setHours(setMinutes(new Date(), 30), 17)}
                                    placeholderText="Select Date and Time"
                                    className="w-full text-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 px-3 py-4 rounded-lg"
                                />
                                <div className="grid grid-cols-2 my-3 gap-2">
                                    {scheduleVisitActions.map((action, index) => (
                                        <div 
                                            key={index} 
                                            className={`flex items-center justify-center text-center gap-2 p-4 m-2 rounded-lg hover:shadow-lg cursor-pointer
                                                ${selectedSchedule === action.label ? 'bg-[rgb(0,0,30)] text-amber-500' : 'bg-white text-gray-900'}`}
                                            onClick={() => handleScheduleClick(action.label)}
                                        >
                                            {action.icon}
                                            {action.label}
                                        </div>
                                    ))
                                    }
                                </div>
                                <h3 className="text-gray-900 text-lg font-semibold mb-3">More Information</h3>
                                <input 
                                    type="text"
                                    value={scheduleVisitName}
                                    onChange={(e) => setScheduleVisitName(e.target.value)}
                                    placeholder="Your Name"
                                    className="text-gray-700 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-gray-300 px-3 py-4 rounded-lg"
                                />
                                <input 
                                    type="email"
                                    value={scheduleVisitEmail}
                                    onChange={(e) => setScheduleVisitEmail(e.target.value)}
                                    placeholder="Your Email"
                                    className="text-gray-700 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-gray-300 px-3 py-4 rounded-lg"
                                />
                                <input 
                                    type="number"
                                    value={scheduleVisitPhone}
                                    onChange={(e) => setScheduleVisitPhone(e.target.value)}
                                    placeholder="Your Phone Number"
                                    className="text-gray-700 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-gray-300 px-3 py-4 rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full bg-[rgb(0,0,30)] cursor-pointer text-amber-500 px-6 py-4 rounded-lg hover:bg-black transition"
                                >
                                    Schedule Visit
                                </button>
                            </form>
                        </div>
                    )}
                    {selectedCategory === "Make an Offer" && (
                        // <div className="p-4">
                        //     <h3 className="text-lg font-semibold mb-2">Make an Offer</h3>
                        //     <p className="text-gray-700">Submit your offer for this property.</p>
                        //     {/* Offer submission form can be added here */}
                        // </div>
                        <></>
                    )}
                </section>
            </div>

            {/* Similar Apartments Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 px-6">Similar Apartment Rentals</h2>
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6 px-6">
                    {similarApartmentsForRent.map((similarApartment) => (
                        <div 
                            key={similarApartment.id}
                            className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg hover:cursor-pointer hover:scale-[1.02] hover:transition duration-300 ease-in-out"
                        >
                            {/* Custom Navigation Buttons */}
                            <div className={`absolute top-1/4 left-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-prev-${similarApartment.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
                                <ChevronLeft size={20} />
                            </div>
                            <div className={`absolute top-1/4 right-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-next-${similarApartment.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
                                <ChevronRight size={20} />
                            </div>

                            {/* Image Carousel */}
                            <Swiper 
                                spaceBetween={10} 
                                slidesPerView={1} 
                                loop={true}
                                navigation={{
                                    nextEl: `.swiper-button-next-${similarApartment.id}`,
                                    prevEl: `.swiper-button-prev-${similarApartment.id}`,
                                }}
                                pagination={{
                                    // el: `.swiper-pagination-${listing.id}`,
                                    clickable: true,
                                    renderBullet: (index, className) => {
                                    return `
                                        <span class="${className} bg-black/50 p-1 rounded-full hover:bg-black/70">
                                        <span class="block w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                                        </span>`;
                                    },
                                }}
                                modules={[Navigation, Pagination]}
                                className="h-64 w-full"
                            >
                                {similarApartment.images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        alt={similarApartment.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Pagination container */}
                            {/* <div className={`swiper-pagination-${listing.id} absolute top-[48%] z-10 left-1/2 -translate-x-1/2 flex gap-2`}></div> */}

                            {/* Camera + count */}
                            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                                <Camera size={14} />
                                <span>{similarApartment.images.length || similarApartment.imageCount}</span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">KSH <span className="text-xl font-bold">{similarApartment.price}</span></p>
                            
                                <div className="flex items-center justify-between text-gray-700 mt-3 text-sm space-x-4">
                                    <span className="flex items-center"><Bed className="w-4 h-4 mr-1" /> {similarApartment.type}</span>
                                    <span>• {similarApartment.furnished}</span>
                                </div>

                                <div className="flex items-center justify-between text-gray-700 mt-3 text-sm">
                                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{similarApartment.location}</span>
                                    <span className="ml-2"> {similarApartment.category}</span>
                                </div>

                                <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                                    {similarApartment.description}
                                </p>

                                <button 
                                    className="text-blue-600 mt-3 text-sm font-medium hover:underline hover:cursor-pointer"
                                    // onClick={() => handleClick(similarApartment)}
                                >
                                    Read More
                                </button>

                                <div className="mt-4 flex items-center">
                                    <span className="text-gray-800 text-sm font-medium">{similarApartment.agent}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ApartmentForRentDetails;