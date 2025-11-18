import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Bed, MapPin, Camera, ChevronLeft, ChevronRight } from "lucide-react"; // icons (lucide-react)

const HousesForRent = () => {
    const [houses, setHouses] = useState([]);

    const navigate = useNavigate();

    const storedListings = () => {
        localStorage.setItem("allHouseRentals", JSON.stringify(houses));
    }

    const handleClick = (listing) => {
    // save a listing to local storage
        localStorage.setItem("houseRentals", JSON.stringify(listing));

        // save all listings to local storage
        storedListings();

        // navigate to the listing details page
        navigate("/houses-for-rent/details");
    }

    useEffect(() => {
        // Fetch house data from an API or database
        const fetchHouses = async () => {
            const data = [
                {
                    id: 1,
                    images: [
                        "/houses-for-rent/img1.jpg",
                        "/houses-for-rent/interior-1/img1-1.jpg",
                        "/houses-for-rent/interior-1/img1-2.jpg",
                        "/houses-for-rent/interior-1/img1-3.jpg",
                        "/houses-for-rent/interior-1/img1-4.jpg",
                        "/houses-for-rent/interior-1/img1-5.jpg",
                    ],
                    amenities: ["Pool", "Garage", "Garden"],
                    price: "150K",
                    type: "3 bedroom",
                    furnished: "furnished",
                    location: "Runda",
                    category: "House",
                    description:
                        "A beautiful 3 bedroom house located in the serene environment of Runda. Close to amenities and public transport.",
                    agent: "Luxury Estates",
                    // imageCount: 6,
                },
                {
                    id: 2,
                    images: [
                        "/houses-for-rent/img2.jpg",
                        "/houses-for-rent/interior-2/img2-1.jpg",
                        "/houses-for-rent/interior-2/img2-2.jpg",
                        "/houses-for-rent/interior-2/img2-3.jpg",
                    ],
                    amenities: ["Pool", "Garage", "Garden", "Gym", "Playground", "Sauna", "Tennis Court", "Home Theater", "Library"],
                    price: "100K",
                    type: "2 bedroom",
                    furnished: "unfurnished",
                    location: "Karen",
                    category: "House",
                    description:
                        "A modern 2 bedroom house in Karen. Perfect for small families or professionals.",
                    agent: "Green Homes",
                    // imageCount: 4,
                },
                {
                    id: 3,
                    images: [
                        "/houses-for-rent/img3.jpg",
                        "/houses-for-rent/interior-3/img3-1.jpg",
                        "/houses-for-rent/interior-3/img3-2.jpg",
                        "/houses-for-rent/interior-3/img3-3.jpg",
                        "/houses-for-rent/interior-3/img3-4.jpg",
                    ],
                    amenities: ["Playground", "Sauna", "Tennis Court", "Home Theater"],
                    price: "200K",
                    type: "4 bedroom",
                    furnished: "furnished",
                    location: "Lavington",
                    category: "House",
                    description:
                        "Spacious 4 bedroom house in Lavington with great views and amenities.",
                    agent: "Prime Properties",
                    // imageCount: 5,
                },
                {
                    id: 4,
                    images: [
                        "/houses-for-rent/img4.jpg",
                        "/houses-for-rent/interior-4/img4-1.jpg",
                        "/houses-for-rent/interior-4/img4-2.jpg",
                    ],
                    amenities: ["Pool", "Garage", "Garden", "Gym", "Playground", "Library"],
                    price: "120K",
                    type: "2 bedroom",
                    furnished: "furnished",
                    location: "Ngong Road",
                    category: "House",
                    description:
                        "Cozy 2 bedroom house on Ngong Road, close to shopping centers and schools.",
                    agent: "Urban Living",
                    // imageCount: 3,
                },
                {
                    id: 5,
                    images: [
                        "/houses-for-rent/img5.jpg",
                        "/houses-for-rent/interior-5/img5-1.jpg",
                        "/houses-for-rent/interior-5/img5-2.jpg",
                        "/houses-for-rent/interior-5/img5-3.jpg",
                    ],
                    amenities: ["Pool", "Garage", "Garden", "Gym", "Playground", "Sauna"],
                    price: "180K",
                    type: "3 bedroom",
                    furnished: "unfurnished",
                    location: "Westlands",
                    category: "House",
                    description:
                        "A lovely 3 bedroom house in Westlands, ideal for families looking for comfort and convenience.",
                    agent: "City Realtors",
                    // imageCount: 4,
                },
                {
                    id: 6,
                    images: [
                        "/houses-for-rent/img6.jpg",
                        "/houses-for-rent/interior-6/img6-1.jpg",
                        "/houses-for-rent/interior-6/img6-2.jpg",
                        "/houses-for-rent/interior-6/img6-3.jpg",
                        "/houses-for-rent/interior-6/img6-4.jpg",
                        "/houses-for-rent/interior-6/img6-5.jpg",
                        "/houses-for-rent/interior-6/img6-6.jpg",
                    ],
                    amenities: ["Pool", "Garage", "Garden", "Gym", "Playground", "Sauna", "Tennis Court", "Home Theater", "Library"],
                    price: "250K",
                    type: "5 bedroom",
                    furnished: "furnished",
                    location: "Muthaiga",
                    category: "House",
                    description:
                        "Luxurious 5 bedroom house in Muthaiga with top-notch facilities and a beautiful garden.",
                    agent: "Elite Estates",
                    // imageCount: 7,
                },
            ];
            setHouses(data);
        };

        fetchHouses();
    }, []);

    return (
        <div className="px-6 py-4 mb-12">
            <p className="flex items-center mb-6 justify-between max-w-[400px]">
                <h1 className="text-2xl font-bold text-gray-800">Houses For Rent</h1>
                <span className="text-xl font-bold text-blue-600 hover:underline hover:cursor-pointer">View All</span>
            </p>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {houses.map((house) => (
                <div
                    key={house.id}
                    className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg hover:cursor-pointer hover:scale-[1.02] hover:transition duration-300 ease-in-out"
                >
                    {/* Image */}
                    {/* <img
                      src={house.image}
                      alt={house.type}
                      className="h-64 w-full object-cover"
                    /> */}

                    {/* Custom Navigation Buttons */}
                    <div className={`absolute top-1/4 left-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-prev-${house.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
                        <ChevronLeft size={20} />
                    </div>
                    <div className={`absolute top-1/4 right-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-next-${house.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
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
                            // el: `.swiper-pagination-${house.id}`,
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
                    {house.images.map((img, index) => (
                        <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={house.title}
                            className="w-full h-64 object-cover"
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
                    <div className="p-4">
                        <p className="text-gray-600 text-sm">KSH <span className="text-xl font-bold">{house.price}</span></p>
                      
                        <div className="flex items-center justify-between text-gray-700 mt-3 text-sm space-x-4">
                            <span className="flex items-center"><Bed className="w-4 h-4 mr-1" /> {house.type}</span>
                            <span>• {house.furnished}</span>
                        </div>
        
                        <div className="flex items-center justify-between text-gray-700 mt-3 text-sm">
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{house.location}</span>
                            <span className="ml-2"> {house.category}</span>
                        </div>
        
                        <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                            {house.description}
                        </p>
        
                        <button 
                            className="text-blue-600 mt-3 text-sm font-medium hover:underline hover:cursor-pointer"
                            onClick={() => handleClick(house)}
                        >
                            Read More
                        </button>
        
                        <div className="mt-4 flex items-center">
                            <span className="text-gray-800 text-sm font-medium">{house.agent}</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
};

export default HousesForRent;