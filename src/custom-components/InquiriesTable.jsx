// Create a reusable InquiriesTable component
const InquiriesTable = ({ requests, columns }) => (
    <div className="overflow-x-auto">
        <table className="w-full border-collapse">
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
                {requests.map((request, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{request.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{request.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{request.message}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{request.dateSubmitted || new Date().toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default InquiriesTable;