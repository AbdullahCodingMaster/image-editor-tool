import { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FiZoomIn, FiZoomOut, FiRefreshCcw, FiDownload } from "react-icons/fi";
import PropTypes from "prop-types";

const ImageCropper = ({ image }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("png");

  const cropperRef = useRef(null);

  // Crop the image
  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        setCroppedImage(canvas.toDataURL());
      } else {
        console.error("Cropper instance not found!");
      }
    }
  };

  // Zoom the image
  const handleZoom = (zoomIn) => {
    const newZoomLevel = zoomIn ? zoomLevel + 0.1 : zoomLevel - 0.1;
    setZoomLevel(newZoomLevel);
    cropperRef.current.cropper.zoom(zoomIn ? 0.1 : -0.1);
  };

  // Flip the image horizontally
  const handleFlipX = () => {
    setFlipX(!flipX);
    cropperRef.current.cropper.scaleX(flipX ? 1 : -1);
  };

  // Flip the image vertically
  const handleFlipY = () => {
    setFlipY(!flipY);
    cropperRef.current.cropper.scaleY(flipY ? 1 : -1);
  };

  // Reset the image to its default state
  const handleReset = () => {
    setZoomLevel(1);
    setFlipX(false);
    setFlipY(false);
    setCroppedImage(null);
    cropperRef.current.cropper.reset();
  };

  // Download the cropped image
  const handleDownload = (format) => {
    if (croppedImage) {
      const link = document.createElement("a");
      link.href = croppedImage;
      link.download = `cropped-image.${format}`;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 p-6 rounded-xl shadow-xl w-[90%] md:w-[80%] lg:w-[60%] mx-auto my-8 space-y-6">
      {/* Image Display */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-black rounded-lg overflow-hidden flex justify-center items-center">
        <Cropper
          ref={cropperRef}
          src={image}
          style={{ height: "100%", width: "100%" }}
          aspectRatio={1}
          guides={false}
          background={false}
          zoomable={true}
          rotatable={true}
          scalable={true}
        />
      </div>

      {/* Image Controls */}
      <div className="flex flex-wrap gap-4 p-4 w-full justify-center md:justify-start text-white">
        <button
          className="bg-gray-700 p-3 rounded-xl flex items-center gap-2 hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={() => handleZoom(true)}
        >
          <FiZoomIn className="text-xl" /> Zoom In
        </button>
        <button
          className="bg-gray-700 p-3 rounded-xl flex items-center gap-2 hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={() => handleZoom(false)}
        >
          <FiZoomOut className="text-xl" /> Zoom Out
        </button>
        <button
          className="bg-gray-700 p-3 rounded-xl flex items-center gap-2 hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={handleReset}
        >
          <FiRefreshCcw className="text-xl" /> Reset
        </button>
        <button
          className="bg-gray-700 p-3 rounded-xl flex items-center gap-2 hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={handleCrop}
        >
          <FiDownload className="text-xl" /> Crop
        </button>
      </div>

      {/* Flip Controls */}
      <div className="flex justify-center gap-8 w-full">
        <button
          className="bg-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-yellow-700 transition duration-300 ease-in-out"
          onClick={handleFlipX}
        >
          Flip Horizontal
        </button>
        <button
          className="bg-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-yellow-700 transition duration-300 ease-in-out"
          onClick={handleFlipY}
        >
          Flip Vertical
        </button>
      </div>

      {/* Image Preview */}
      {croppedImage && (
        <div className="mt-6 w-full text-center">
          <h3 className="text-white text-2xl font-semibold mb-4">
            Cropped Preview:
          </h3>
          <img
            src={croppedImage}
            alt="Cropped"
            className="mx-auto rounded-lg shadow-md border border-gray-600 max-w-full"
          />
          <div className="mt-4">
            <label className="text-white text-lg font-medium">
              Select Format:
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="jpeg">JPEG</option>
              <option value="gif">GIF</option>
              <option value="bmp">BMP</option>
              <option value="tiff">TIFF</option>
              <option value="webp">WEBP</option>
            </select>
          </div>
          <button
            onClick={() => handleDownload(selectedFormat)}
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Download {selectedFormat.toUpperCase()}
          </button>
        </div>
      )}
    </div>
  );
};

ImageCropper.propTypes = {
  image: PropTypes.string.isRequired,
};

export default ImageCropper;
