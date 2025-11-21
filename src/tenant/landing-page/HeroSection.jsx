import { useState, useEffect } from 'react';
import bg from '../../assets/apartments.jpg';


export default function HeroSection() {
    // const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState('');

    useEffect(() => {
        const fetchSuggestions = async () => {
          if (deliveryAddress.length < 3) return; // start after 3 characters
    
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(deliveryAddress)}&addressdetails=1&limit=5`
          );
          const data = await res.json();
          setSuggestions(data);
        };
    
        const delayDebounce = setTimeout(() => {
          fetchSuggestions();
        }, 400); // debounce delay
    
        return () => clearTimeout(delayDebounce);
    }, [deliveryAddress]);

  return (
    <div
      className="relative mt-24 mb-12 h-96 w-full animate-[bgZoom_8s_ease-in-out_infinite] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className='flex flex-col items-center justify-center z-10 px-4'>
            {/* Text */}
            <h1 className="relative text-white text-6xl font-bold z-10">
                Find Your Dream Home Today
            </h1>

            <div className='relative mt-12 w-[80%] z-10 text-gray-800'>
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* You can replace this with your preferred icon set */}
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Search by city, neighborhood, or address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full pl-10 bg-white pr-4 py-4 border text-xl border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {suggestions.length > 0 && (
                <ul className="min-w-2xl mt-2 border border-gray-300 rounded-lg bg-white shadow overflow-auto">
                {suggestions.map((place, index) => (
                    <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => {
                        setDeliveryAddress(place.display_name);
                        setSuggestions([]);
                        // onSelect(place); // pass selected location back
                    }}
                    >
                        {place.display_name}
                    </li>
                ))}
                </ul>
            )}
        </div>
        
    </div>
  );
}
