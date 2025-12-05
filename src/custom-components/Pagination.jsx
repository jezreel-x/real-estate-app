import React, { useState } from "react";

// Pagination.jsx
const Pagination = ({ currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, handlePageChange, totalPages }) => {

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4">
            {/* Records per page selector */}
            <div className="flex items-center gap-2">
                <span className="text-gray-700">Rows per page:</span>

                <select
                    className="border px-2 py-1 rounded-lg text-gray-900 cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to page 1 on change
                    }}
                >
                {[5, 10, 20, 30, 50, 100].map((num) => (
                    <option key={num} value={num}>
                    {num}
                    </option>
                ))}
                </select>
            </div>

            {/* Page buttons */}
            <div className="flex items-center gap-2">
                <button
                    className={`px-3 py-1 border border-gray-300 text-gray-900 rounded-lg
                        ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {/* {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 border rounded-lg ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                    }`}
                >
                    {i + 1}
                </button>
                ))} */}
                <span className="px-3 py-1 bg-[rgb(0,0,30)] text-amber-500 rounded-lg">{currentPage} of {totalPages}</span>

                <button
                    className={`px-3 py-1 border border-gray-300 text-gray-900 rounded-lg
                        ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
