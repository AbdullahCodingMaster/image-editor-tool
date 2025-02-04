import { useState } from "react";
import ImageCropper from "../components/Cropper";
import PropTypes from "prop-types";

const Home = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">Image Cropper</h1>

      {!image ? (
        <label className="cursor-pointer bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      ) : (
        <ImageCropper image={image} />
      )}
    </div>
  );
};

Home.propTypes = {
  image: PropTypes.string,
};

export default Home;
