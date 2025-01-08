import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

function DashBoard() {
  const [membersCount, setMembersCount] = useState(0);
  const [familiesCount, setFamiliesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to animate count from 0 to actual value
  const animateCount = (setCount, count) => {
    let currentCount = 0;
    const increment = count / 100; // Incremental step for smooth animation

    const interval = setInterval(() => {
      if (currentCount < count) {
        currentCount += increment;
        setCount(Math.round(currentCount)); // Set rounded value
      } else {
        setCount(count);
        clearInterval(interval);
      }
    }, 30); // Update every 30 milliseconds
  };

  const fetchFamilyData = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/AllFamilyGet`)
      .then((res) => {
        const members = res.data.data || [];
        const totalMembers = members.length;
        animateCount(setMembersCount, totalMembers); // Animate member count
      })
      .catch((error) => {
        console.error("Error fetching family members:", error); // Log errors
      });

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/userData`)
      .then((res) => {
        const families = res.data.data || [];
        animateCount(setFamiliesCount, families.length); // Animate family count
      })
      .catch((error) => {
        console.error("Error fetching family data:", error); // Log errors
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchFamilyData();
  }, []);

  return (
    <div className="bg-ab h-screen p-4">
      <h1 className="text-4xl font-bold text-center mb-6" data-aos="fade-down">
        Family Dashboard
      </h1>
      {/* Grid layout for smaller screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Family Group Card */}
        <div
          className="border border-white rounded-lg p-6 shadow-lg bg-orange-600 text-white hover:bg-opacity-75"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Total Families
          </h2>
          <p className="text-center text-5xl text-white font-bold">
            {familiesCount}
          </p>
        </div>

        {/* Family Members Card */}
        <div
          className="border border-white rounded-lg p-6 shadow-lg bg-orange-600 text-white hover:bg-opacity-75"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Total Members
          </h2>
          {loading ? (
            <p className="text-center text-xl">Loading...</p>
          ) : (
            <p className="text-center text-5xl text-white font-bold">
              {membersCount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
