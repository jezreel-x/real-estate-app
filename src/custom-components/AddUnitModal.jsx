import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export function AddUnitModal({ isOpen, onClose, onSubmit, data }) {
  const [formData, setFormData] = useState({
    label: "",
    unit_type: "Bedsitter",
    rent: 0,
    status: "Vacant",
    // tenant_id: "",
    tenant_name: "",
    images: [], // base64 previews (max 5)
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        label: data.label || '',
        unit_type: data.unit_type || 'Bedsitter',
        rent: data.rent || 0,
        status: data.status || 'Vacant',
        tenant_name: data.tenant_name || '',
        images: data.images || '',
        description: data.description || '',
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Indicate submission in progress
    try {
      await onSubmit(formData);
      setFormData({
        label: '',
        unit_type: 'Bedsitter',
        rent: 0,
        status: 'Vacant',
        tenant_name: '',
        images: [],
        description: '',
      });
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
            } Unit</h2>
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
                        Unit Label *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.label}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                        className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit Type *
                    </label>
                    <select 
                        value={formData.unit_type}
                        onChange={(e) => setFormData({ ...formData, unit_type: e.target.value })}
                        className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {[
                                { label: 'Single', value: 'Single' }, 
                                { label: 'Bedsitter', value: 'Bedsitter' }, 
                                { label: "1-bedroom", value: "1-bedroom" },
                                { label: "2-bedroom", value: "2-bedroom" },
                                { label: "3-bedroom", value: "3-bedroom" },
                                { label: "4-bedroom", value: "4-bedroom" },
                                { label: "5-bedroom", value: "5-bedroom" },
                                { label: "6-bedroom+", value: "6-bedroom+" }
                            ].map((item) => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rent *
                    </label>
                    <input
                        type="number"
                        inputMode='decimal'
                        required
                        min="0"
                        value={formData.rent}
                        onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                        className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tenant Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.tenant_name}
                        onChange={(e) => setFormData({ ...formData, tenant_name: e.target.value })}
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
                        <option value="Vacant">Vacant</option>
                        <option value="Occupied">Occupied</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload images (5 max.) *
                </label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full"
                    onChange={(e) => {
                        const files = Array.from(e.target.files).slice(0, 5 - formData.images.length);

                        files.forEach((file) => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setFormData((prev) => ({...prev, images: [...prev.images, reader.result]}));
                            };
                            reader.readAsDataURL(file);
                        });
                    }}
                />

                <div className="grid grid-cols-5 gap-2">
                    {formData.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            className="h-16 w-16 object-cover rounded"
                            alt="preview"
                        />
                    ))}
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
                    {isSubmitting ? 'Adding...' : data ? 'Update Unit' : 'Add Unit'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
