import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Select from 'react-select';
import CustomStyles from '@custom-components/CustomStyles';

const AddExpenseModal = ({ isOpen, onClose, onSubmit, properties, units, data }) => {
    const [formData, setFormData] = useState({
        // Define your form fields here
        property: '',
        unit: '',
        amount: 0,
        date: '',
        category: '',
        vendor: '',
        status: 'Unpaid',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 
    useEffect(() => {
        if (data) {
            setFormData({
                ...data // populate form with existing data for editing
            });
        }
    }, [data]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission
        setIsSubmitting(true);

        try {
            await onSubmit(formData);
            setFormData({
                property: '',
                unit: '',
                amount: 0,
                date: '',
                category: '',
                vendor: '',
                status: 'paid',
                description: '',
            });
            onClose();
        } 
        catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* Modal content goes here */}
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"> {/* Overlay */}
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"> {/* Modal box */}

                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Create Expense</h2>
                        <button
                            onClick={onClose} // Close modal on click
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6 cursor-pointer" />
                        </button>
                    </div>

                    {/* Form content */}
                    <form onSubmit={handleSubmit} className='p-6 space-y-4'>
                        {/* Form fields go here */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Property *
                                </label>
                                {/* <select
                                    required
                                    value={formData.property}
                                    onChange={(e) => {
                                        setFormData({ 
                                            ...formData, 
                                            property: e.target.value
                                        })
                                    }}
                                    className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option className='text-gray-900' value="" disabled>Select a property</option>
                                    {properties.map((property) => (
                                        <option className='text-gray-900' key={property.id} value={property.property_name}>
                                            {property.property_name}
                                        </option>
                                    ))}
                                </select> */}
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select a property"
                                    value={formData.property ? { label: formData.property, value: formData.property } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            property: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={properties.map((property) => ({
                                        label: property.property_name,
                                        value: property.property_name
                                    }))}
                                    styles={CustomStyles}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Unit *
                                </label>
                                {/* <select
                                    required
                                    value={formData.unit}
                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option className='text-gray-900' value="" disabled>Select a unit</option>
                                    {units.filter(u => u.property_id === properties.find(p => p.property_name === formData.property)?.id).map((unit) => (
                                        <option className='text-gray-900' key={unit.id} value={unit.label}>
                                            {unit.label}
                                        </option>
                                    ))}
                                </select> */}
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select a unit"
                                    value={formData.unit ? { label: formData.unit, value: formData.unit } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            unit: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={units.filter(u => u.property_id === properties.find(p => p.property_name === formData.property)?.id).map((unit) => ({
                                        label: unit.label,
                                        value: unit.label
                                    }))}
                                    styles={CustomStyles}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount *
                                </label>
                                <input
                                    type="number"
                                    inputMode='decimal'
                                    required
                                    min="0"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Expense Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category *
                                </label>
                                {/* <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option className='text-gray-900' value="" disabled>Select a category</option>
                                    {[{ label: 'Maintenance', value: 'maintenance' }, { label: 'Utilities', value: 'utilities' }, { label: 'Supplies', value: 'supplies' }, { label: 'Other', value: 'other' }].map((cat) => (
                                        <option className='text-gray-900' key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select> */}
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select a category"
                                    value={formData.category ? { label: formData.category, value: formData.category } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            category: selectedOption ? selectedOption.value : ''
                                        });
                                    }}
                                    options={[{ label: 'Maintenance', value: 'Maintenance' }, { label: 'Utilities', value: 'Utilities' }, { label: 'Supplies', value: 'Supplies' }, { label: 'Other', value: 'Other' }]}
                                    styles={CustomStyles}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vendor *
                                </label>
                                <input
                                    type="text"
                                    value={formData.vendor}
                                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status *
                                </label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select status"
                                    value={formData.status ? { label: formData.status, value: formData.status } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({ 
                                            ...formData, 
                                            status: selectedOption ? selectedOption.value : 'unpaid'
                                        });
                                    }}
                                    options={[{ label: 'Paid', value: 'Paid' }, { label: 'Unpaid', value: 'Unpaid' }]}
                                    styles={CustomStyles}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (optional)
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
                                placeholder="Brief description of the expense"
                            />
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 cursor-pointer px-4 py-2 bg-[rgb(0,0,30)] text-amber-500 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : data ? 'Update Expense' : 'Add Expense'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExpenseModal;