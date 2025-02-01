import PropTypes from "prop-types";

function ImageGallery({ images, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-6">
      {images.length > 0 ? (
        images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg rounded-lg"
            onClick={() => onSelect(image)}
            role="button" // Adding role for accessibility
            aria-label={`Select image ${index + 1}`} // Better accessibility
          >
            <img
              src={image}
              alt={`Uploaded Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-700 group-hover:border-indigo-500 transition-all"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150"; // Default placeholder image if error occurs
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-full p-2 text-white text-center bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all">
              Image {index + 1}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center col-span-full text-xl">
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
