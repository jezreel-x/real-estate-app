import { FileText } from "lucide-react";

// Create a reusable InquiriesEmptyState component
const InquiriesEmptyState = ({ title, message }) => (
    <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
    </div>
);

export default InquiriesEmptyState;