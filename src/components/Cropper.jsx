import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import defaultImg from "../assets/default-image.webp";
import {
  FiRefreshCcw,
  FiUpload,
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiRotateCcw,
  FiRotateCw,
} from "react-icons/fi";

const ImageCropper = () => {
  const [image, setImage] = useState(defaultImg);
  const [croppedImage, setCroppedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [rotation, setRotation] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setCroppedImage(null);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        setCroppedImage(canvas.toDataURL());
        setModalOpen(true);
      }
    }
  };

  const downloadImage = (format) => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const canvas = cropper.getCroppedCanvas();

      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL(`image/${format}`);
        link.download = `cropped-image.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const updateCropper = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.setData({
        x: xPosition,
        y: yPosition,
        width: width,
        height: height,
        rotate: rotation,
        scaleX: scaleX,
        scaleY: scaleY,
      });
    }
  };

  const handleInputChange = (e, setter) => {
    setter(Number(e.target.value));
    updateCropper();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto my-12 space-y-6 text-white"
    >
      <motion.div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-600">
        <Cropper
          ref={cropperRef}
          src={image}
          className="w-full h-full"
          aspectRatio={1}
          guides={false}
          background={true}
          zoomable={true}
          disabled={!isEnabled}
          viewMode={1} // Prevents the cropper from moving outside the image bounds
          dragMode="move" // Allows dragging the cropper within the image
          cropBoxResizable={true} // Prevent resizing beyond the image bounds
        />
      </motion.div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
      />

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full">
        {[
          {
            icon: FiUpload,
            label: "Upload",
            action: () => fileInputRef.current.click(),
            color: "bg-blue-500",
          },
          {
            icon: FiRefreshCcw,
            label: "Reset",
            action: () => cropperRef.current.cropper.reset(),
            color: "bg-gray-700",
          },
          {
            icon: FiArrowLeft,
            label: "Left",
            action: () => {
              setXPosition(xPosition - 10);
              updateCropper();
            },
            color: "bg-gray-700",
          },
          {
            icon: FiArrowRight,
            label: "Right",
            action: () => {
              setXPosition(xPosition + 10);
              updateCropper();
            },
            color: "bg-gray-700",
          },
          {
            icon: FiArrowUp,
            label: "Up",
            action: () => {
              setYPosition(yPosition - 10);
              updateCropper();
            },
            color: "bg-gray-700",
          },
          {
            icon: FiArrowDown,
            label: "Down",
            action: () => {
              setYPosition(yPosition + 10);
              updateCropper();
            },
            color: "bg-gray-700",
          },
          {
            icon: FiRotateCw,
            label: "Rotate",
            action: () => {
              setRotation(rotation + 90);
              updateCropper();
            },
            color: "bg-gray-700",
          },
          {
            icon: FiRotateCcw,
            label: "Rotate Reverse",
            action: () => {
              setRotation(rotation - 90);
              updateCropper();
            },
            color: "bg-gray-700",
          },
          {
            icon: FiX,
            label: isEnabled ? "Disable" : "Enable",
            action: () => setIsEnabled(!isEnabled),
            color: "bg-red-500",
          },
          {
            icon: FiUpload,
            label: "Crop",
            action: handleCrop,
            color: "bg-green-500",
          },
        ].map(({ icon: Icon, label, action, color }, index) => (
          <motion.button
            key={index}
            onClick={action}
            className={`flex flex-col items-center justify-center p-2 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all ${color} transform hover:scale-105`}
          >
            <Icon className="text-xl" />
            <span className="text-sm">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Inputs for Transformations */}
      <div className="space-y-4 w-full mt-4">
        <div className="flex justify-between">
          <label className="text-white">X:</label>
          <input
            type="number"
            value={xPosition}
            onChange={(e) => handleInputChange(e, setXPosition)}
            className="w-1/2 bg-gray-700 text-white p-2 rounded"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-white">Y:</label>
          <input
            type="number"
            value={yPosition}
            onChange={(e) => handleInputChange(e, setYPosition)}
            className="w-1/2 bg-gray-700 text-white p-2 rounded"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-white">Width:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => handleInputChange(e, setWidth)}
            className="w-1/2 bg-gray-700 text-white p-2 rounded"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-white">Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => handleInputChange(e, setHeight)}
            className="w-1/2 bg-gray-700 text-white p-2 rounded"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-white">Rotate:</label>
          <input
            type="number"
            value={rotation}
            onChange={(e) => handleInputChange(e, setRotation)}
            className="w-1/2 bg-gray-700 text-white p-2 rounded"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-white">ScaleX:</label>
          <input
            type="number"
            step="0.1"
            value={scaleX}
            onChange={(e) => handleInputChange(e, setScaleX)}
            className="w-1/2 bg-gray-700 text-white p-2 rounded"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-white">ScaleY:</label>
          <input
            type="number"
            step="0.1"
            value={scaleY}
            onChange={(e) => handleInputChange(e, setScaleY)}
            className="w-1/2 bg-gray-700 text-white p-2 rounded"
          />
        </div>
      </div>

      {/* Modal to Show Cropped Image */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setModalOpen(false)}
          >
            <div className="relative bg-white p-8 rounded-lg max-w-lg w-full">
              <button
                className="absolute top-2 right-2 text-black"
                onClick={() => setModalOpen(false)}
              >
                <FiX className="text-xl" />
              </button>
              <img
                src={croppedImage}
                alt="Cropped"
                className="w-full max-h-[500px] object-cover"
              />
              <div className="mt-4 text-center">
                <button
                  onClick={() => downloadImage("png")}
                  className="bg-green-500 text-white p-3 rounded-lg"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => downloadImage("jpeg")}
                  className="bg-blue-500 text-white p-3 rounded-lg ml-4"
                >
                  Download JPEG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageCropper;
