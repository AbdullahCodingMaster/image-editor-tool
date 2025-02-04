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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto my-12 space-y-6 text-white"
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
      />

      <motion.div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-600">
        <Cropper
          ref={cropperRef}
          src={image}
          className="w-full h-full"
          aspectRatio={1}
          guides={true}
          background={true}
          zoomable={true}
          disabled={!isEnabled}
        />
      </motion.div>

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
            action: () => cropperRef.current.cropper.move(-10, 0),
            color: "bg-gray-700",
          },
          {
            icon: FiArrowRight,
            label: "Right",
            action: () => cropperRef.current.cropper.move(10, 0),
            color: "bg-gray-700",
          },
          {
            icon: FiArrowUp,
            label: "Up",
            action: () => cropperRef.current.cropper.move(0, -10),
            color: "bg-gray-700",
          },
          {
            icon: FiArrowDown,
            label: "Down",
            action: () => cropperRef.current.cropper.move(0, 10),
            color: "bg-gray-700",
          },
          {
            icon: FiRotateCw,
            label: "Flip H",
            action: () =>
              cropperRef.current.cropper.scaleX(
                -cropperRef.current.cropper.getData().scaleX
              ),
            color: "bg-gray-700",
          },
          {
            icon: FiRotateCcw,
            label: "Flip V",
            action: () =>
              cropperRef.current.cropper.scaleY(
                -cropperRef.current.cropper.getData().scaleY
              ),
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
            className={`flex flex-col items-center justify-center p-3 rounded-lg font-semibold transition ${color} hover:scale-110`}
          >
            <Icon className="text-2xl" />
            {label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && croppedImage && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 text-black">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                onClick={() => setModalOpen(false)}
              >
                <FiX size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Cropped Image
              </h2>
              <img
                src={croppedImage}
                alt="Cropped"
                className="w-full rounded-lg shadow-md"
              />
              <div className="mt-4 flex gap-2 justify-center">
                {["png", "jpg", "webp", "bmp", "gif"].map((format) => (
                  <button
                    key={format}
                    onClick={() => downloadImage(format)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageCropper;
