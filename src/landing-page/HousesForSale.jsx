import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import { image } from "framer-motion";
import { Bed, MapPin, Camera, ChevronLeft, ChevronRight } from "lucide-react"; // icons (lucide-react)

const listings = [
  {
    id: 1,
    images: [
      "/houses-for-sale/img1.jpg", 
      "/houses-for-sale/interior-1/img1-1.jpg",
      "/houses-for-sale/interior-1/img1-2.jpg",
      "/houses-for-sale/interior-1/img1-3.jpg",
      "/houses-for-sale/interior-1/img1-4.jpg",
    ],
    amenities: ["Pool", "Garage", "Garden"],
    price: "7M",
    type: "2 bedroom",
    furnished: "furnished",
    location: "Mombasa Road",
    category: "Villa",
    description:
      "Mombasa Rd Villa, a majestic development, exclusively designed for those who appreciate good living. Offers an unrivaled living experience.",
    agent: "Mi Vida Homes",
    // imageCount: 5,
  },
  {
    id: 2,
    images: [
      "/houses-for-sale/img2.jpg",
      "/houses-for-sale/interior-2/img2-1.jpg",
      "/houses-for-sale/interior-2/img2-2.jpg",
    ],
    amenities: ["Pool", "Garage", "Garden", "Gym", "Playground"],
    price: "2.7M",
    type: "Studio apartment",
    furnished: "unfurnished",
    location: "Ruiru",
    category: "Bungalow",
    description:
      "Mi Vida Homes, a majestic development, exclusively designed for those who appreciate good living. Offers an unrivaled living experience.",
    agent: "Mi Vida Homes",
    // imageCount: 3,
  },
  {
    id: 3,
    images: [
      "/houses-for-sale/img3.jpg",
      "/houses-for-sale/interior-3/img3-1.jpg",
      "/houses-for-sale/interior-3/img3-2.jpg",
      "/houses-for-sale/interior-3/img3-3.jpg",
      "/houses-for-sale/interior-3/img3-4.jpg",
      "/houses-for-sale/interior-3/img3-5.jpg",
    ],
    amenities: ["Pool", "Garage", "Garden", "Gym"],
    price: "28M",
    type: "4 bedroom",
    furnished: "furnished",
    location: "Rongai",
    category: "Mansionette",
    description:
      "This majestic mansionette with impeccable finishing and very spacious bedrooms consists of 4 ensuite bedrooms with a spacious DSQ.",
    agent: "Max M.",
    // imageCount: 6,
  },
  {
    id: 4,
    images: [
      "/houses-for-sale/img4.jpg",
      "/houses-for-sale/interior-4/img4-1.jpg",
      "/houses-for-sale/interior-4/img4-2.jpg",
      "/houses-for-sale/interior-4/img4-3.jpg",
      "/houses-for-sale/interior-4/img4-4.jpg",
    ],
    amenities: ["Pool", "Garage", "Garden", "Gym", "Playground", "Sauna", "Tennis Court"],
    price: "13M",
    type: "4 bedroom",
    furnished: "furnished",
    location: "Kileleshwa",
    category: "Mansion",
    description:
      "This majestic mansion with impeccable finishing and very spacious bedrooms consists of 4 ensuite bedrooms with a spacious DSQ.",
    agent: "Max M.",
    // imageCount: 4,
  },
  {
    id: 5,
    images: [
      "/houses-for-sale/img5.jpg",
      "/houses-for-sale/interior-5/img5-1.jpg",
      "/houses-for-sale/interior-5/img5-2.jpg",
      "/houses-for-sale/interior-5/img5-3.jpg",
    ],
    amenities: ["Pool", "Garage", "Garden", "Gym", "Playground", "Sauna"],
    price: "8M",
    type: "4 bedroom",
    furnished: "unfurnished",
    location: "Karen",
    category: "Mansionette",
    description:
      "This majestic mansionette with impeccable finishing and very spacious bedrooms consists of 4 ensuite bedrooms with a spacious DSQ.",
    agent: "Max M.",
    // imageCount: 4,
  },
  {
    id: 6,
    images: [
      "/houses-for-sale/img6.jpg",
      "/houses-for-sale/interior-6/img6-1.jpg",
      "/houses-for-sale/interior-6/img6-2.jpg",
      "/houses-for-sale/interior-6/img6-3.jpg",
      "/houses-for-sale/interior-6/img6-4.jpg",
      "/houses-for-sale/interior-6/img6-5.jpg",
      "/houses-for-sale/interior-6/img6-6.jpg",
    ],
    amenities: ["Pool", "Garage", "Garden", "Gym", "Playground", "Sauna", "Tennis Court", "Home Theater", "Library"],
    price: "19M",
    type: "4 bedroom",
    furnished: "furnished",
    location: "Lavington",
    category: "Bungalow",
    description:
      "This majestic bungalow with impeccable finishing and very spacious bedrooms consists of 4 ensuite bedrooms with a spacious DSQ.",
    agent: "Max M.",
    // imageCount: 7,
  },
];

export default function HousesForSale() {

  const navigate = useNavigate();

  const storeListings = () => {
    // Store all listings in localStorage for later retrieval
    localStorage.setItem("allListings", JSON.stringify(listings));
  };

  const handleClick = (listing) => {
    // save a listing to local storage
    localStorage.setItem("selectedListing", JSON.stringify(listing));

    // ensure all listings are stored
    storeListings();

    // navigate to the listing details page
    navigate("/houses-for-sale/details");
  }

  return (
    <div className="px-6 py-4 mb-12">
        <p className="flex items-center mb-6 justify-between max-w-2xs">
            <h1 className="text-2xl font-bold text-gray-800">Houses For Sale</h1>
            <span className="text-xl font-bold text-blue-600 hover:underline hover:cursor-pointer">View All</span>
        </p>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg hover:cursor-pointer hover:scale-[1.02] hover:transition duration-300 ease-in-out"
          >
            {/* Image
            <img
              src={listing.image}
              alt={listing.type}
              className="h-64 w-full object-cover"
            /> */}

            {/* Custom Navigation Buttons */}
            <div className={`absolute top-1/4 left-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-prev-${listing.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
              <ChevronLeft size={20} />
            </div>
            <div className={`absolute top-1/4 right-2 z-10 -translate-y-1/2 cursor-pointer swiper-button-next-${listing.id} bg-black/50 p-2 rounded-full text-white hover:bg-black/70`}>
              <ChevronRight size={20} />
            </div>

            {/* Image Carousel */}
            <Swiper 
              spaceBetween={10} 
              slidesPerView={1} 
              loop={true}
              navigation={{
                nextEl: `.swiper-button-next-${listing.id}`,
                prevEl: `.swiper-button-prev-${listing.id}`,
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
              {listing.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={listing.title}
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
                <span>{listing.images.length || listing.imageCount}</span>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-600 text-sm">KSH <span className="text-xl font-bold">{listing.price}</span></p>
              
              <div className="flex items-center justify-between text-gray-700 mt-3 text-sm space-x-4">
                <span className="flex items-center"><Bed className="w-4 h-4 mr-1" /> {listing.type}</span>
                <span>• {listing.furnished}</span>
              </div>

              <div className="flex items-center justify-between text-gray-700 mt-3 text-sm">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{listing.location}</span>
                <span className="ml-2"> {listing.category}</span>
              </div>

              <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                {listing.description}
              </p>

              <button 
                className="text-blue-600 mt-3 text-sm font-medium hover:underline hover:cursor-pointer"
                onClick={() => handleClick(listing)}
              >
                Read More
              </button>

              <div className="mt-4 flex items-center">
                <span className="text-gray-800 text-sm font-medium">{listing.agent}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
