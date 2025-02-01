import PropTypes from "prop-types";

function ImageGallery({ images, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Uploaded ${index}`}
          className="cursor-pointer"
          onClick={() => onSelect(image)}
        />
      ))}
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGallery;
