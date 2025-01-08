import React from "react";
import Slider from "react-slick";
import { GiLightBulb, GiPencil, GiWrench } from "react-icons/gi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../../assets/c.jpg";
import image2 from "../../../assets/b.jpg";

import a from "../../../assets/directory19.png";
import b from "../../../assets/directory17.png";

// Sample data for the cards
const cardData = [
  {
    image: image1,
    title: "Your Vision, Our Technology",
    description: "Driving success in the digital era with your vision.",
    icon: <GiLightBulb size={40} className="text-blue-500" />,
  },
  {
    image: image2,
    title: "Creative Ideas Through Technology",
    description: "Transforming ideas into tangible solutions.",
    icon: <GiPencil size={40} className="text-red-500" />,
  },
  {
    image: image1,
    title: "Empowering Your Vision",
    description: "Custom solutions tailored to your goals.",
    icon: <GiWrench size={40} className="text-pink-500" />,
  },
];

// Reusable carousel component
const Carousel = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div key={index} className="p-4">
          <div className=" rounded-lg p-6">
            <div className="">
              <img
                src={item.image}
                alt={item.title}
                className="mb-4 rounded-full w-20 h-20"
              />
              <h3 className="text-lg font-bold text-center">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2 text-center">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

// Custom next arrow for the slider
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
    onClick={onClick}
  >
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

// Custom previous arrow for the slider
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
    onClick={onClick}
  >
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </div>
);

// Main Section Component
const SectionE = () => {
  return (
    <div className="relative py-10 px-4 bg-ab overflow-hidden m-20 rounded-3xl">
      {/* Background Images */}
      <img
        src={b}
        alt="Background Left"
        className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-50"
      />
      <img
        src={a}
        alt="Background Right"
        className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-50"
      />

      <h2 className="text-center text-2xl font-bold mb-6">
        Empowering Digital Journeys
      </h2>

      {/* Carousel 1 */}
      <div className="mb-8">
        <Carousel data={cardData} />
      </div>
    </div>
  );
};

export default SectionE;
