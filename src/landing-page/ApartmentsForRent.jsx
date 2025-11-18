import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Bed, MapPin, Camera, ChevronLeft, ChevronRight } from "lucide-react"; // icons (lucide-react)

const ApartmentsForRent = () => {
    const [apartments, setApartments] = useState([]);

    const navigate = useNavigate();

    const storeListings = () => {
        localStorage.setItem("apartmentsForRent", JSON.stringify(apartments));
    };

    const handleClick = (listing) => {
        // save a listing to local storage
        localStorage.setItem("apartmentRentals", JSON.stringify(listing));

        // ensure listings are stored
        storeListings();

        // navigate to the listing details page
        navigate("/apartments-for-rent/details");
    }

    useEffect(() => {
        // Fetch apartment data from an API or database
        const fetchApartments = async () => {
            const data = [
                {
                    id: 1,
                    images: [
                        "/apartments-for-rent/img1.jpg",
                        "/apartments-for-rent/interior-1/img1-1.jpg",
                        "/apartments-for-rent/interior-1/img1-2.jpg",
                        "/apartments-for-rent/interior-1/img1-3.jpg"
                    ],
                    amenities: ["Balcony", "Elevator", "Security"],
                    price: "80K",
                    type: "2 bedroom",
                    furnished: "furnished",
                    location: "Kileleshwa",
                    category: "Apartment",
                    description:
                        "A beautiful 2 bedroom apartment located in the serene environment of Kileleshwa. Close to amenities and public transport.",
                    agent: "Urban Living",
                    // imageCount: 4,
                },
                {
                    id: 2,
                    images: [
                        "/apartments-for-rent/img2.jpg",
                        "/apartments-for-rent/interior-2/img2-1.jpg",
                        "/apartments-for-rent/interior-2/img2-2.jpg"
                    ],
                    amenities: ["Security", "Parking", "Laundry", "Gym", "Balcony"],
                    price: "15K",
                    type: "bed-sitter",
                    furnished: "unfurnished",
                    location: "Kawangware",
                    category: "Apartment",
                    description:
                        "A modern bed-sitter apartment in Kawangware. Perfect for singles or students.",
                    agent: "Affordable Homes",
                    // imageCount: 3,
                },
                {
                    id: 3,
                    images: [
                        "/apartments-for-rent/img3.jpg",
                        "/apartments-for-rent/interior-3/img3-1.jpg",
                        "/apartments-for-rent/interior-3/img3-2.jpg"
                    ],
                    amenities: ["Elevator", "Security", "Parking", "Gym", "Balcony", "WiFi", "Laundry", "Pool", "Garbage Disposal"],
                    price: "7K",
                    type: "1 bedroom",
                    furnished: "unfurnished",
                    location: "Ngong Road",
                    category: "Apartment",
                    description:
                        "Cozy 1 bedroom apartment on Ngong Road, close to shopping centers and schools.",
                    agent: "City Rentals",
                    // imageCount: 2,
                },
                {
                    id: 4,
                    images: [
                        "/apartments-for-rent/img4.jpg",
                        "/apartments-for-rent/interior-4/img4-1.jpg"
                    ],
                    amenities: ["Security", "Parking", "Laundry", "Balcony", "WiFi", "Garbage Disposal", "Elevator", "Gym", "Pool", "Study Room"],
                    price: "4500",
                    type: "single room",
                    furnished: "unfurnished",
                    location: "Kasarani",
                    category: "Apartment",
                    description:
                        "Affordable single room apartment in Kasarani, ideal for students and young professionals.",
                    agent: "Budget Stays",
                    // imageCount: 1,
                },
                {
                    id: 5,
                    images: [
                        "/apartments-for-rent/img5.jpg",
                        "/apartments-for-rent/interior-5/img5-1.jpg",
                        "/apartments-for-rent/interior-5/img5-2.jpg",
                        "/apartments-for-rent/interior-5/img5-3.jpg",
                        "/apartments-for-rent/interior-5/img5-4.jpg"
                    ],
                    amenities: ["Pool", "Gym", "Security", "Parking", "Balcony", "Elevator", "WiFi", "Laundry"],
                    price: "60K",
                    type: "3 bedroom",
                    furnished: "furnished",
                    location: "Westlands",
                    category: "Apartment",
                    description:
                        "Spacious 3 bedroom apartment in Westlands with great views and amenities.",
                    agent: "Luxury Rentals",
                    // imageCount: 5,
                },
                {
                    id: 6,
                    images: [
                        "/apartments-for-rent/img6.jpg",
                        "/apartments-for-rent/interior-6/img6-1.jpg",
                        "/apartments-for-rent/interior-6/img6-2.jpg"
                    ],
                    amenities: ["Security", "Parking", "Balcony", "WiFi"],
                    price: "20K",
                    type: "1 bedroom",
                    furnished: "unfurnished",
                    location: "Ruiru",
                    category: "Apartment",
                    description:
                        "A modern 1 bedroom apartment in Ruiru. Perfect for small families or professionals.",
                    agent: "Home Finders",
                    // imageCount: 3,
                }
            ];
            setApartments(data);
        };

        fetchApartments();
    }, []);

    return (
        <div className="px-6 py-4 mb-12">
            <p className="flex items-center mb-6 justify-between max-w-[400px]">
                <h1 className="text-2xl font-bold text-gray-800">Apartments For Rent</h1>
                <span className="text-xl font-bold text-blue-600 hover:underline hover:cursor-pointer">View All</span>
            </p>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {apartments.map((apartment) => (
                <div
                    key={apartment.id}
                    className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg hover:cursor-pointer hover:scale-[1.02] hover:transition duration-300 ease-in-out"
                >
                    {/* Image */}
                    {/* <img
                      src={apartment.image}
                      alt={apartment.type}
                      className="h-64 w-full object-cover"
                    /> */}

                    {/* Custom Navigation Buttons */}
                    <div className={`absolute top-1/4 left-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-prev-${apartment.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
                        <ChevronLeft size={20} />
                    </div>
                    <div className={`absolute top-1/4 right-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-next-${apartment.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
                        <ChevronRight size={20} />
                    </div>
                    
                    {/* Image Carousel */}
                    <Swiper 
                        spaceBetween={10} 
                        slidesPerView={1} 
                        loop={true}
                        navigation={{
                            nextEl: `.swiper-button-next-${apartment.id}`,
                            prevEl: `.swiper-button-prev-${apartment.id}`,
                        }}
                        pagination={{
                            // el: `.swiper-pagination-${apartment.id}`,
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
                    {apartment.images.map((img, index) => (
                        <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={apartment.title}
                            className="w-full h-64 object-cover"
                        />
                        </SwiperSlide>
                    ))}
                    </Swiper>
        
                    {/* Camera + count */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                        <Camera size={14} />
                        <span>{apartment.images.length || apartment.imageCount}</span>
                    </div>
        
                    {/* Content */}
                    <div className="p-4">
                        <p className="text-gray-600 text-sm">KSH <span className="text-xl font-bold">{apartment.price}</span></p>
                      
                        <div className="flex items-center justify-between text-gray-700 mt-3 text-sm space-x-4">
                            <span className="flex items-center"><Bed className="w-4 h-4 mr-1" /> {apartment.type}</span>
                            <span>• {apartment.furnished}</span>
                        </div>
        
                        <div className="flex items-center justify-between text-gray-700 mt-3 text-sm">
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{apartment.location}</span>
                            <span className="ml-2"> {apartment.category}</span>
                        </div>
        
                        <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                            {apartment.description}
                        </p>
        
                        <button 
                            className="text-blue-600 mt-3 text-sm font-medium hover:underline hover:cursor-pointer"
                            onClick={() => handleClick(apartment)}
                        >
                            Read More
                        </button>
        
                        <div className="mt-4 flex items-center">
                            <span className="text-gray-800 text-sm font-medium">{apartment.agent}</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
};

export default ApartmentsForRent;