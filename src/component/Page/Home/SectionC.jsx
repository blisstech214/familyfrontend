// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function SectionC() {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const categoryEndpoint =
//           selectedCategory === "all"
//             ? `${process.env.REACT_APP_API_BASE_URL}/gallery`
//             : `${process.env.REACT_APP_API_BASE_URL}/gallery/category/${selectedCategory}`;

//         const response = await axios.get(categoryEndpoint);
//         setImages(response.data);
//       } catch (err) {
//         console.error("Error fetching images:", err);
//         setError("Failed to load images. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, [selectedCategory]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setSelectedImage(null);
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleCloseZoom = () => {
//     setSelectedImage(null);
//   };

//   const handleNextImage = () => {
//     const currentIndex = images.findIndex(
//       (image) => image._id === selectedImage._id
//     );
//     const nextIndex = (currentIndex + 1) % images.length;
//     setSelectedImage(images[nextIndex]);
//   };

//   const handlePrevImage = () => {
//     const currentIndex = images.findIndex(
//       (image) => image._id === selectedImage._id
//     );
//     const prevIndex = (currentIndex - 1 + images.length) % images.length;
//     setSelectedImage(images[prevIndex]);
//   };

//   return (
//     <div className="p-8 bg-gray-50 m-32">
//       {/* Category Selection */}
//       <div className="flex space-x-4 mb-4">
//         <button
//           onClick={() => handleCategoryChange("all")}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           All
//         </button>
//         <button
//           onClick={() => handleCategoryChange("cricket")}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Cricket
//         </button>
//         <button
//           onClick={() => handleCategoryChange("family")}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Family
//         </button>
//         <button
//           onClick={() => handleCategoryChange("events")}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Events
//         </button>
//       </div>

//       {/* Images Grid */}
//       {loading ? (
//         <p>Loading images...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : images.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
//           {images.map((image) => (
//             <div
//               key={image._id}
//               className="relative w-80 h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer bg-white"
//               onClick={() => handleImageClick(image)}
//             >
//               <img
//                 src={`${process.env.REACT_APP_API_BASE_URL}${image.imageUrl}`} // Use env variable for base URL
//                 alt={image.alt || "Gallery Image"}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No images available in this category.</p>
//       )}

//       {/* Zoom Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75"
//           onDoubleClick={handleCloseZoom}
//         >
//           <div className="relative w-3/4 max-w-lg p-4 bg-white rounded-lg">
//             <button
//               onClick={handleCloseZoom}
//               className="absolute top-2 right-2 text-white bg-black px-2 py-1 rounded"
//             >
//               Close
//             </button>
//             <div className="flex justify-between items-center">
//               <button onClick={handlePrevImage} className="text-base font-bold">
//                 {"<"}
//               </button>
//               <img
//                 src={`${process.env.REACT_APP_API_BASE_URL}${selectedImage.imageUrl}`} // Use env variable for base URL
//                 alt={selectedImage.alt || "Gallery Image"}
//                 className="object-contain w-80 h-80"
//               />
//               <button onClick={handleNextImage} className="text-base font-bold">
//                 {">"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SectionC;
import React, { useState, useEffect } from "react";
import axios from "axios";

function SectionC() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoryEndpoint =
          selectedCategory === "all"
            ? `${process.env.REACT_APP_API_BASE_URL}/gallery`
            : `${process.env.REACT_APP_API_BASE_URL}/gallery/category/${selectedCategory}`;

        const response = await axios.get(categoryEndpoint);
        setImages(response.data);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedImage(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseZoom = () => {
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex(
      (image) => image._id === selectedImage._id
    );
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = images.findIndex(
      (image) => image._id === selectedImage._id
    );
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <div className="p-4 px-10 sm:p-8 bg-gray-50">
      {/* Category Selection */}
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4">
        {["all", "cricket", "family", "events"].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base ${
              selectedCategory === category
                ? "bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-lg transition-all`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      {loading ? (
        <p className="text-center">Loading images...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image._id}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer bg-white"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}${image.imageUrl}`}
                alt={image.alt || "Gallery Image"}
                className="object-cover w-full h-40 sm:h-60"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No images available in this category.</p>
      )}

      {/* Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
          onDoubleClick={handleCloseZoom}
        >
          <div className="relative w-full max-w-sm md:max-w-lg p-4 bg-white rounded-lg">
            <button
              onClick={handleCloseZoom}
              className="absolute top-2 right-2 text-white bg-black px-2 py-1 rounded"
            >
              Close
            </button>
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevImage}
                className="text-xl font-bold px-2"
              >
                {"<"}
              </button>
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}${selectedImage.imageUrl}`}
                alt={selectedImage.alt || "Gallery Image"}
                className="object-contain max-h-80 w-full"
              />
              <button
                onClick={handleNextImage}
                className="text-xl font-bold px-2"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SectionC;
