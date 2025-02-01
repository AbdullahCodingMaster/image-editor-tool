import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ImageGallery from "./components/ImageGallery";
import ImageEditor from "./components/ImageEditor";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = (newImages) => {
    setImages([...images, ...newImages]);
  };

  const handleSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSave = (editedImage) => {
    const updatedImages = images.map((img) =>
      img === selectedImage ? editedImage : img
    );
    setImages(updatedImages);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Image Editor Tool</h1>
      <ImageUpload onUpload={handleUpload} />
      {selectedImage ? (
        <ImageEditor image={selectedImage} onSave={handleSave} />
      ) : (
        <ImageGallery images={images} onSelect={handleSelect} />
      )}
    </div>
  );
}

export default App;
