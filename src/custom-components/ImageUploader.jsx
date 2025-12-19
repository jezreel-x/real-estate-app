// import { useEffect } from 'react';
import { Camera } from 'lucide-react';
import PropTypes from 'prop-types';

const ImageUploader = ({ images, setImages }) => {
  // Handle deletion
  const handleDelete = (indexToDelete) => {
    const updated = [...images];
    URL.revokeObjectURL(updated[indexToDelete].url); // Clean up memory
    updated.splice(indexToDelete, 1);
    setImages(updated);
  };

  // Handle image selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const readers = files.map((file, i) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            file,
            label: `Image ${images.length + i + 1}`,
            dataUrl: reader.result, // this is the base64-encoded string
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
  
    Promise.all(readers).then((newImages) => {
      const updated = [...images, ...newImages];
      setImages(updated);
      // updateImagesAndStorage(updated); // Save to localStorage or pass upward
    });
  }

  return (
    <div className='flex w-full space-x-2'>
      <div className="flex flex-wrap gap-6">
        {images.map((img, index) => (
          <div key={index} className="flex w-28 h-28 flex-col items-center relative aspect-square border-gray-500 rounded overflow-hidden">
           
            {/* {
            index === 0 && (
              <span className="mb-1 text-sm font-medium">Front Elevation</span>
            )}
            {index === 1 && (
              <span className="mb-1 text-sm font-medium">Back Elevation</span>
            )}
            {index === 2 && (
              <span className="mb-1 text-sm font-medium">Side Elevation</span>
            )}   */}
           
            <img
              src={img.dataUrl}
              alt={`Uploaded ${index + 1}`}
              className="object-cover rounded w-28 h-28"
            />
            <button
              type='button'
              className="absolute top-1 left-1 text-red-500 bg-white p-1 hover:cursor-pointer rounded-full hover:text-red-700"
              onClick={() => handleDelete(index)}
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          </div>
        ))}
      </div>
        

     
      {images.length < 5 && (
        <label className="w-28 h-28 flex flex-col gap-2 items-center justify-center border-2 border-gray-400 border-dashed rounded cursor-pointer aspect-square hover:border-teal-500">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
          <span className="text-teal-600 text-2xl"><Camera color="grey" size={24} /></span>
        </label>
      )}
  </div>
);
}

ImageUploader.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.object.isRequired,
      dataUrl: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  setImages: PropTypes.func.isRequired,
};

export default ImageUploader;
