import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import {
  FaUndo,
  FaRedo,
  FaArrowsAlt,
  FaSave,
  FaRegCircle,
  FaRegSquare,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

function ImageEditor({ image, onSave }) {
  const imageRef = useRef(null);
  const cropperRef = useRef(null);
  const [originalImage, setOriginalImage] = useState(image);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  useEffect(() => {
    if (imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 16 / 9,
        viewMode: 1,
        scalable: true,
        zoomable: true,
        rotatable: true,
        cropBoxResizable: true,
        movable: true,
      });
    }
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, [image]);

  const handleSave = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      onSave(canvas.toDataURL());
    }
  };

  const handleRotate = (degree) => {
    if (cropperRef.current) cropperRef.current.rotate(degree);
  };

  const handleZoom = (factor) => {
    if (cropperRef.current) cropperRef.current.zoom(factor);
  };

  const handleFlipX = () => {
    if (cropperRef.current) {
      setScaleX(scaleX * -1);
      cropperRef.current.scaleX(scaleX * -1);
    }
  };

  const handleFlipY = () => {
    if (cropperRef.current) {
      setScaleY(scaleY * -1);
      cropperRef.current.scaleY(scaleY * -1);
    }
  };

  const handleAspectRatio = (ratio) => {
    if (cropperRef.current) cropperRef.current.setAspectRatio(ratio);
  };

  const handleReset = () => {
    if (cropperRef.current) cropperRef.current.reset();
    // Reset the image to its original state
    if (imageRef.current) {
      imageRef.current.src = originalImage;
    }
  };

  const handleClear = () => {
    if (cropperRef.current) cropperRef.current.clear();
  };

  const handleEnable = () => {
    if (cropperRef.current) cropperRef.current.enable();
  };

  const handleDisable = () => {
    if (cropperRef.current) cropperRef.current.disable();
  };

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-xl">
      <div className="relative w-full flex justify-center">
        <img
          ref={imageRef}
          src={image}
          alt="To be edited"
          className="max-w-full rounded-lg shadow-md"
        />
      </div>

      <div className="mt-6 grid grid-cols-4 gap-4 text-white">
        {/* Rotate Buttons */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleRotate(90)}
            className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 transition-all"
            title="Rotate 90°"
          >
            <FaRedo size={24} />
          </button>
          <span className="mt-2">Rotate</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => handleRotate(-90)}
            className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 transition-all"
            title="Rotate -90°"
          >
            <FaUndo size={24} />
          </button>
          <span className="mt-2">Rotate</span>
        </div>

        {/* Zoom Buttons */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 transition-all"
            title="Zoom In"
          >
            <FaPlus size={24} />
          </button>
          <span className="mt-2">Zoom In</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 transition-all"
            title="Zoom Out"
          >
            <FaMinus size={24} />
          </button>
          <span className="mt-2">Zoom Out</span>
        </div>

        {/* Flip and Move Buttons */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleFlipX}
            className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105 transition-all"
            title="Flip X"
          >
            <FaArrowsAlt size={24} />
          </button>
          <span className="mt-2">Flip X</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleFlipY}
            className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105 transition-all"
            title="Flip Y"
          >
            <FaArrowsAlt size={24} />
          </button>
          <span className="mt-2">Flip Y</span>
        </div>

        {/* Aspect Ratio Buttons */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleAspectRatio(1)}
            className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:scale-105 transition-all"
            title="1:1 Aspect Ratio"
          >
            <FaRegCircle size={24} />
          </button>
          <span className="mt-2">1:1</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => handleAspectRatio(16 / 9)}
            className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:scale-105 transition-all"
            title="16:9 Aspect Ratio"
          >
            <FaRegSquare size={24} />
          </button>
          <span className="mt-2">16:9</span>
        </div>

        {/* Save and Reset Buttons */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleReset}
            className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 transition-all"
            title="Reset"
          >
            <FaUndo size={24} />
          </button>
          <span className="mt-2">Reset</span>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleSave}
            className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 transition-all"
            title="Save Image"
          >
            <FaSave size={24} />
          </button>
          <span className="mt-2">Save</span>
        </div>
      </div>
    </div>
  );
}

ImageEditor.propTypes = {
  image: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ImageEditor;
