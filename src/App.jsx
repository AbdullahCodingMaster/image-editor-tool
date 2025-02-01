import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ImageGallery from "./components/ImageGallery";
import ImageEditor from "./components/ImageEditor"; // Now used correctly
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
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <header className="w-full text-center mb-6">
        <h1 className="text-4xl font-extrabold text-indigo-400 drop-shadow-lg">
          Image Editor Tool
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Upload, edit, and manage your images seamlessly.
        </p>
      </header>

      <div className="bg-gray-800 shadow-xl rounded-xl p-6 w-full max-w-4xl">
        <ImageUpload onUpload={handleUpload} />
        {selectedImage ? (
          <ImageEditor image={selectedImage} onSave={handleSave} />
        ) : (
          <ImageGallery images={images} onSelect={handleSelect} />
        )}
      </div>

      <footer className="mt-10 text-gray-500 text-sm text-center">
        <p>&copy; 2024 Image Editor Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
