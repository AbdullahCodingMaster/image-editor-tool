import { useState } from "react";
import PropTypes from "prop-types";

function ImageUpload({ onUpload }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length !== files.length) {
      setError("Only image files (JPG, PNG, etc.) are allowed.");
      return;
    }

    setError("");
    const newImages = validImages.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
    onUpload(newImages);
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

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Preview ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg border border-gray-700 shadow"
            />
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
