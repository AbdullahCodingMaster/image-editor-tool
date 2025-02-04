import ImageCropper from "../components/Cropper";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header Section */}
      <header className="w-full bg-blue-700 py-8 px-12">
        <h1 className="text-4xl font-bold text-left text-white">
          Smart Cropper
        </h1>
        <p className="text-gray-300 text-left mt-2 text-lg">
          Intelligent and user-friendly cropping tool.
        </p>
      </header>

      {/* Main Content Section */}
      <section className="">
        <ImageCropper />
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-blue-700 text-center py-6 text-gray-200">
        © {new Date().getFullYear()} All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
