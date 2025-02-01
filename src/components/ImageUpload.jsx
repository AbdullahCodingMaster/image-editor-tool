import { useState } from "react";
import PropTypes from "prop-types";

function ImageUpload({ onUpload }) {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages(newImages);
    onUpload(newImages);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />
    </div>
  );
}

ImageUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
