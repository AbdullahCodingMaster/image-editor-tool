import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

function ImageEditor({ image, onSave }) {
  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 16 / 9,
        viewMode: 1,
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

  return (
    <div className="p-4">
      <img
        ref={imageRef}
        src={image}
        alt="To be edited"
        className="max-w-full"
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </div>
  );
}

ImageEditor.propTypes = {
  image: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ImageEditor;
