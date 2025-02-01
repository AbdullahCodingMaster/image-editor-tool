import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ImageGallery from "./components/ImageGallery";
import ImageEditor from "./components/ImageEditor";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = (newImages) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSave = (editedImage) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img === selectedImage ? editedImage : img))
    );
    setSelectedImage(null); // Optionally reset selection after save
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <header className="w-full text-center mb-6">
        <h1 className="text-5xl font-extrabold text-indigo-400 drop-shadow-lg">
          Image Editor Tool
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Upload, edit, and manage your images seamlessly.
        </p>
      </header>

      <div className="bg-gray-800 shadow-xl rounded-xl p-6 w-full max-w-7xl">
        {/* Conditional rendering for image editor */}
        {selectedImage ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Left Column - Image Gallery */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-3 bg-gray-700 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-200 mb-4">
                Image Gallery
              </h2>
              <ImageGallery images={images} onSelect={handleSelect} />
            </div>

            {/* Center Column - Image Editing Canvas */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-6 bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-200 mb-4">
                Image Editor
              </h2>
              <ImageEditor image={selectedImage} onSave={handleSave} />
            </div>

            {/* Right Column - Edited Image Preview and Save */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-3 bg-gray-700 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-200 mb-4">
                Preview & Save
              </h2>
              <div className="flex justify-center mb-4">
                {/* Preview the edited image */}
                <img
                  src={selectedImage?.src}
                  alt="Edited"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <button
                onClick={() => handleSave(selectedImage)} // Trigger the save
                className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md focus:outline-none transition-all"
              >
                Save Image
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Image Upload Section */}
            <div className="mb-6 w-full max-w-2xl">
              <ImageUpload onUpload={handleUpload} />
            </div>

            {/* Image Gallery */}
            <div className="w-full max-w-6xl">
              <ImageGallery images={images} onSelect={handleSelect} />
            </div>
          </div>
        )}
      </div>

      <footer className="mt-10 text-gray-500 text-sm text-center">
        <p>&copy; 2024 Image Editor Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
