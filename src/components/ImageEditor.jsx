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
  FaRegClone,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

function ImageEditor({ image, onSave }) {
  const imageRef = useRef(null);
  const cropperRef = useRef(null);
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

  const handleMove = (x, y) => {
    if (cropperRef.current) cropperRef.current.move(x, y);
  };

  const handleAspectRatio = (ratio) => {
    if (cropperRef.current) cropperRef.current.setAspectRatio(ratio);
  };

  const handleReset = () => {
    if (cropperRef.current) cropperRef.current.reset();
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

  const handleGetData = () => {
    if (cropperRef.current) console.log(cropperRef.current.getData());
  };

  const handleGetCanvasData = () => {
    if (cropperRef.current) console.log(cropperRef.current.getCanvasData());
  };

  const handleGetCropBoxData = () => {
    if (cropperRef.current) console.log(cropperRef.current.getCropBoxData());
  };

  const handleGetImageData = () => {
    if (cropperRef.current) console.log(cropperRef.current.getImageData());
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="relative w-full flex justify-center">
        <img
          ref={imageRef}
          src={image}
          alt="To be edited"
          className="max-w-full rounded-lg shadow-lg"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
        <button
          onClick={() => handleRotate(90)}
          className="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:bg-blue-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaRedo /> Rotate 90°
        </button>
        <button
          onClick={() => handleRotate(-90)}
          className="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:bg-blue-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaUndo /> Rotate -90°
        </button>

        <button
          onClick={() => handleZoom(0.1)}
          className="btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:bg-green-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaPlus /> Zoom In
        </button>
        <button
          onClick={() => handleZoom(-0.1)}
          className="btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:bg-green-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaMinus /> Zoom Out
        </button>

        <button
          onClick={handleFlipX}
          className="btn bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 active:bg-yellow-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaArrowsAlt /> Flip X
        </button>
        <button
          onClick={handleFlipY}
          className="btn bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 active:bg-yellow-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaArrowsAlt /> Flip Y
        </button>

        <button
          onClick={() => handleMove(10, 0)}
          className="btn bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:bg-indigo-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaArrowsAlt /> Move Right
        </button>
        <button
          onClick={() => handleMove(-10, 0)}
          className="btn bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:bg-indigo-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaArrowsAlt /> Move Left
        </button>
        <button
          onClick={() => handleMove(0, -10)}
          className="btn bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:bg-indigo-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaArrowsAlt /> Move Up
        </button>
        <button
          onClick={() => handleMove(0, 10)}
          className="btn bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:bg-indigo-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaArrowsAlt /> Move Down
        </button>

        <button
          onClick={() => handleAspectRatio(1)}
          className="btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 active:bg-purple-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaRegCircle /> 1:1
        </button>
        <button
          onClick={() => handleAspectRatio(16 / 9)}
          className="btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 active:bg-purple-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaRegSquare /> 16:9
        </button>
        <button
          onClick={() => handleAspectRatio(NaN)}
          className="btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 active:bg-purple-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaRegClone /> Free
        </button>

        <button
          onClick={handleReset}
          className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:bg-red-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaUndo /> Reset
        </button>
        <button
          onClick={handleClear}
          className="btn bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 active:bg-yellow-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaRegCircle /> Clear
        </button>
        <button
          onClick={handleEnable}
          className="btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:bg-green-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaSave /> Enable
        </button>
        <button
          onClick={handleDisable}
          className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 active:bg-gray-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaRegCircle /> Disable
        </button>

        <button
          onClick={handleGetData}
          className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 active:bg-gray-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaSave /> Get Data
        </button>
        <button
          onClick={handleGetCanvasData}
          className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 active:bg-gray-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaSave /> Get Canvas
        </button>
        <button
          onClick={handleGetCropBoxData}
          className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 active:bg-gray-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaSave /> Get CropBox
        </button>
        <button
          onClick={handleGetImageData}
          className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 active:bg-gray-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaSave /> Get Image
        </button>

        <button
          onClick={handleSave}
          className="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:bg-blue-700 focus:outline-none rounded-lg py-2 px-4 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaSave /> Save Image
        </button>
      </div>
    </div>
  );
}

ImageEditor.propTypes = {
  image: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ImageEditor;
