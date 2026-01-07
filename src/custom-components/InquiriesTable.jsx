import { Trash2 } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

// Create a reusable InquiriesTable component
const InquiriesTable = ({ requests, columns, handleDeleteRequest, markAsRead }) => {

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg shadow-sm">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                        {columns.map((col) => (
                            <th key={col} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id} className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-300 animate-[fadeInUp_0.3s_ease-in-out]
                            ${request.isRead ? 'bg-white' : 'bg-[rgb(255,250,240)] font-medium'}`}>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {!request.isRead && (
                                    <span className="inline-block w-2 h-2 mr-2 bg-blue-600 rounded-full" />
                                )}
                                {request.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{request.email}</td>
                            <td 
                                className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"
                                data-tooltip-id={`message-${request.id}`}
                                data-tooltip-content={request.message}
                            >
                                <Tooltip id={`message-${request.id}`} place="top" effect="solid" className='max-w-lg text-wrap' />
                                {request.message}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{new Date(request.dateSubmitted).toLocaleString()}</td>
                            <td className="flex items-center justify-between flex-shrink-0 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {/* Additional actions can be added here if needed */}
                                <button 
                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                    onClick={() => handleDeleteRequest(request.id)}
                                >
                                    {/* include a delete/trash icon instead of text */}
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => markAsRead(request.id)}
                                    className={`bg-[rgb(0,0,30)] transition-opacity duration-300 text-amber-500 rounded-lg px-4 py-2
                                        ${request.isRead ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                                    disabled={request.isRead}
                                >
                                    {request.isRead ? "Read" : "Mark as read"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default InquiriesTable;