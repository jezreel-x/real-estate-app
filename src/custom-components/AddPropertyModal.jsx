import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export function AddPropertyModal({ isOpen, onClose, onSubmit, data, units }) {
  const [formData, setFormData] = useState({
    property_name: '',
    property_type: 'Rentals',
    property_category: 'Apartments',
    total_units: units.length,
    location: '',
    description: '',
    status: 'active',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      // Filter units that belong to this property
      const propertyUnits = units.filter((u) => u.property_id === data.id);
      setFormData({
        property_name: data.property_name || '',
        property_type: data.property_type || 'Rentals',
        property_category: data.property_category || 'Apartments',
        total_units: propertyUnits.length,  // Count units for THIS property
        location: data.location || '',
        description: data.description || '',
        status: data.status || 'active',
      });
    } else {
      // Reset to default when adding a new property
      setFormData({
        property_name: '',
        property_type: 'Rentals',
        property_category: 'Apartments',
        total_units: 0,  // Default to 0 for new properties
        location: '',
        description: '',
        status: 'active',
      });
    }
  }, [data, units]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Indicate submission in progress
    try {
      await onSubmit(formData);
      // setFormData({
      //   property_name: '',
      //   property_type: 'Rentals',
      //   property_category: 'Apartments',
      //   total_units: '',
      //   location: '',
      //   description: '',
      //   status: 'active',
      // });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{
            data ? 'Edit' : 'Add'
            } Property</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Name *
              </label>
              <input
                type="text"
                required
                value={formData.property_name}
                onChange={(e) => setFormData({ ...formData, property_name: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type *
              </label>
              <select 
                value={formData.property_type}
                onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {[{ label: 'Rentals', value: 'rentals' }, { label: "Sales", value: "sales" }].map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Category *
              </label>
              <select 
                value={formData.property_category}
                onChange={(e) => setFormData({ ...formData, property_category: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {[
                        { label: 'Apartments', value: 'Apartments' }, 
                        { label: "Houses", value: "Houses" },
                        { label: "Villas", value: "Villas" },
                        { label: "Mansions", value: "Mansions" }
                    ].map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Units *
              </label>
              <input
                type="number"
                inputMode='decimal'
                required
                min="0"
                readOnly
                value={formData.total_units}
                onChange={(e) => setFormData({ ...formData, total_units: e.target.value })}
                className="w-full bg-gray-300 text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="under-renovation">Under renovation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              type="text"
              rows={6}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
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
              {isSubmitting ? 'Adding...' : data ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
