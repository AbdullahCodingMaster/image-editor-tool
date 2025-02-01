import PropTypes from "prop-types";

function ImageGallery({ images, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {images.length > 0 ? (
        images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => onSelect(image)}
          >
            <img
              src={image}
              alt={`Uploaded Image ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg shadow-md border border-gray-700 group-hover:border-indigo-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition"></div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center col-span-full">
          No images uploaded yet.
        </p>
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGallery;
