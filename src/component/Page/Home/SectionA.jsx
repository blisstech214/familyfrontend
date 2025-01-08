import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const SectionA = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/banners`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.data[0].items)) {
          setSlides(response.data.data[0].items);
        } else {
          console.error("Unexpected data structure:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full overflow-hidden">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="space-y-8 overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.slice(0, 3).map((slide, index) => {
              const currentImage = slide?.image || "/default-image.jpg";
              const imageUrl = `${process.env.REACT_APP_API_BASE_URL}${currentImage}`;
              const currentTitle = slide?.titles || "Default Title";
              const currentDescription =
                slide?.descriptions || "Default description";

              return (
                <div
                  key={index}
                  className="relative w-full flex-shrink-0"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-8 md:px-12 lg:px-20 space-y-4 sm:space-y-6 md:space-y-8">
                    <h1
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white text-center"
                      data-aos="fade-up"
                    >
                      {currentTitle}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white opacity-80 text-center">
                      {currentDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-all duration-300">
                        Get Started
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-blue-600 font-semibold text-sm sm:text-base bg-transparent hover:bg-gray-100 rounded-md">
                        <span>Explore Now</span>
                        <FaArrowRight className="text-base sm:text-lg ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionA;
