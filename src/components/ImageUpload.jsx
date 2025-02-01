import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ImageUpload({ onUpload }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Cleanup the object URLs when the component unmounts
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length !== files.length) {
      setError("Only image files (JPG, PNG, etc.) are allowed.");
      return;
    }

    setError(""); // Clear error message if file types are valid

    // Generate preview URLs
    const newImages = validImages.map((file) => URL.createObjectURL(file));

    // Update images state and call the onUpload prop function
    setImages((prev) => [...prev, ...newImages]);
    onUpload(newImages);
  };

  const handleImageSelect = (image) => {
    // Trigger the selection of an image for editing
    onUpload([image]);
  };

  return (
    <div className="p-4">
      <label className="block text-gray-300 text-sm font-semibold mb-2">
        Upload Images
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
          file:rounded-lg file:border-0 file:text-sm file:font-semibold 
          file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 cursor-pointer"
      />
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}{" "}
      {/* Error message */}
      {images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => handleImageSelect(img)} // Ensure the image is selected
            >
              <img
                src={img}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-700 shadow transition-transform transform hover:scale-105"
              />
              {/* Black overlay with hover effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ImageUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
