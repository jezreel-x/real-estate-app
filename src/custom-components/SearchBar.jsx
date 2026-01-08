import { Search } from "lucide-react";

const SearchBar = ({ query, setSearchQuery, setCurrentPage, placeholder }) => {
    return (
        <div className="mb-4 relative">
            {/* Add an icon inside the search input if desired */}
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
                type="text"
                value={query}
                placeholder={placeholder}
                className="w-[50%] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                text-gray-900 pl-10 transition-all duration-300"
                onChange={
                    (e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1); // Reset to first page on new search
                    }
                }
                // Add onChange handler to update search state here
            />
        </div>
    );
};

export default SearchBar;