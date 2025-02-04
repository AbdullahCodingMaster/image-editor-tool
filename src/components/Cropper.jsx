import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { FiRotateCw, FiDownload, FiZoomIn, FiZoomOut } from "react-icons/fi";

const ImageCropper = ({ image }) => {
  const imageRef = useRef(null);
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1); // Square aspect ratio by default
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [selectedFormat, setSelectedFormat] = useState("png"); // Default format is PNG

  useEffect(() => {
    if (imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        viewMode: 1,
        dragMode: "move",
        aspectRatio: aspectRatio,
        autoCropArea: 0.8,
        background: false,
        zoomable: true,
        rotatable: true,
        crop(event) {
          console.log("Crop Box:", event.detail);
        },
      });
    }

    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, [image, aspectRatio]);

  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      if (canvas) {
        setCroppedImage(canvas.toDataURL());
      }
    }
  };

  const handleReset = () => {
    if (cropperRef.current) {
      cropperRef.current.reset();
      setCroppedImage(null);
      setZoomLevel(1);
    }
  };

  const handleZoom = (zoomIn) => {
    const newZoomLevel = zoomIn ? zoomLevel + 0.1 : zoomLevel - 0.1;
    setZoomLevel(newZoomLevel);
    cropperRef.current.zoom(zoomIn ? 0.1 : -0.1);
  };

  const handleAspectRatioToggle = () => {
    setAspectRatio(aspectRatio === 1 ? NaN : 1); // Toggle between square and free aspect ratio
  };

  const handleBrightnessChange = (e) => {
    const value = e.target.value;
    setBrightness(value);
    if (imageRef.current) {
      imageRef.current.style.filter = `brightness(${value}%) contrast(${contrast}%)`;
    }
  };

  const handleContrastChange = (e) => {
    const value = e.target.value;
    setContrast(value);
    if (imageRef.current) {
      imageRef.current.style.filter = `brightness(${brightness}%) contrast(${value}%)`;
    }
  };

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
      <div className="relative w-full h-[400px] md:h-[500px] bg-black rounded-lg overflow-hidden flex justify-center items-center">
        <img
          ref={imageRef}
          src={image}
          alt="Crop"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Controls */}
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
          onClick={handleAspectRatioToggle}
        >
          Aspect Ratio: {aspectRatio === 1 ? "Fixed" : "Free"}
        </button>
      </div>

      {/* Brightness & Contrast Controls */}
      <div className="flex flex-wrap gap-6 w-full justify-center md:justify-start text-white">
        <div className="w-1/2 md:w-1/3 flex flex-col items-center">
          <label className="block text-lg font-medium">Brightness</label>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={handleBrightnessChange}
            className="w-full mt-2 bg-gray-800 rounded-lg"
          />
        </div>
        <div className="w-1/2 md:w-1/3 flex flex-col items-center">
          <label className="block text-lg font-medium">Contrast</label>
          <input
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={handleContrastChange}
            className="w-full mt-2 bg-gray-800 rounded-lg"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 w-full">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleReset}
        >
          <FiRotateCw className="text-xl" /> Reset
        </button>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-green-700 transition duration-300 ease-in-out"
          onClick={handleCrop}
        >
          <FiDownload className="text-xl" /> Crop
        </button>
      </div>

      {/* Download Dropdown */}
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
