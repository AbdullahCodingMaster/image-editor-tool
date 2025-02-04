import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import { FiRotateCw, FiDownload } from "react-icons/fi";

const ImageCropper = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg shadow-lg w-[80%] mx-auto">
      <div className="relative w-full h-80 bg-black">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
        />
      </div>

      {/* Controls */}
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="flex justify-between text-white">
          <span>Zoom</span>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div className="flex justify-between text-white">
          <span>Rotate</span>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <FiRotateCw /> Reset
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
          <FiDownload /> Save
        </button>
      </div>
    </div>
  );
};

ImageCropper.propTypes = {
  image: PropTypes.string.isRequired, // Ensure `image` is a required string
};

export default ImageCropper;
