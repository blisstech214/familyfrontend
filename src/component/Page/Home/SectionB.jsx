import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import HappyFamily from "../../../assets/family.jpg";
function SectionB() {
  const features = [
    {
      icon: "fas fa-cog",
      title: "Family Listings",
      description:
        "FamilyConnect Directory features easy-to-navigate family listings, contact details, and search functionalities for seamless connections.",
      bgColor: "#448c7419",
      iconColor: "#448c74", // Green color
    },
    {
      icon: "fas fa-envelope",
      title: "Easy Search",
      description:
        "With FamilyConnect, find and connect with family members quickly and easily. Search by name, location, or relationship!",
      bgColor: "#edcb5019",
      iconColor: "#3f7fca", // Blue color
    },
    {
      icon: "fas fa-lightbulb",
      title: "Family Collaboration",
      description:
        "With FamilyConnect, find and connect with family members quickly and easily. Search by name, location, or relationship!",
      bgColor: "#3f7fca19",
      iconColor: "#edcb50", // Yellow color
    },
    {
      icon: "fa fa-mouse-pointer",
      title: "Event Scheduling",
      description:
        "Search families by name, location, or relationship, making connections just a click away.",
      bgColor: "#ed505019",
      iconColor: "#ed5050", // Red color
    },
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 md:px-8 flex flex-wrap justify-around">
        {/* Left Section */}
        <div className="flex flex-col ">
          <div className="left-block flex flex-col gap-6 max-w-[325px]">
            <h1 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
              Family Directory
            </h1>
            <div className="flex flex-col text-black gap-2">
              <div className="flex items-center gap-2 text-primary">
                <FaArrowRight className="text-lg text-black" />

                <p className="text-black">All Your Family Contacts Together</p>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <FaArrowRight className="text-lg text-black" />

                <p className=" text-black">
                  Explore Family Listings Effortlessly
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <FaArrowRight className="text-lg text-black" />

                <p className="text-black">Family Members at Your Fingertips</p>
              </div>
            </div>
            <button className="bg-primary text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-primary-dark transition duration-300 ease-in-out">
              Discover Families
            </button>
          </div>

          <img src={HappyFamily} alt="family" className=" h-96 w-96" />
        </div>

        {/* Right Section */}
        <div className="right-block grid grid-cols-1 sm:grid-cols-2 gap-10 md:max-w-[700px] w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-10 flex flex-col gap-4 rounded-3xl shadow-lg transition transform hover:scale-105"
              style={{ backgroundColor: feature.bgColor }}
            >
              <i
                className={`${feature.icon} text-4xl`}
                style={{ color: feature.iconColor }} // Inline style for icon color
              />
              <h2 className="text-xl text-black font-semibold ">
                {feature.title}
              </h2>
              <p className="text-sm text-black leading-[24px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionB;
