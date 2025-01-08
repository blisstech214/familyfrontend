// import React from "react";

// const SectionH = () => {
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1300px] mx-auto p-0 bg-transparent rounded-[36px]">
//       {/* Left Block - Image */}
//       <div className="w-full md:max-w-[636px] h-[600px] rounded-[36px] overflow-hidden">
//         <img
//           src="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/xc8cgdvbcad7swt6pq1f.jpg"
//           alt="sl"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Right Block */}
//       <div className="flex flex-col w-full md:max-w-[525px] bg-transparent rounded-[36px] p-0">
//         {/* Heading */}
//         <h1 className="font-inter font-semibold text-2xl md:text-3xl text-gray-800 leading-[34px]">
//           Discover Your Family Connections Easily
//         </h1>

//         {/* Subheading */}
//         <p className="font-inter font-normal text-base md:text-lg text-gray-600 leading-[26px] mt-4">
//           FamilyConnect Directory features a user-friendly interface,
//           intelligent search filters, and secure access to family contacts,
//           making connections simpler than ever.
//         </p>

//         {/* Stats Section */}
//         <div className="flex justify-start items-start gap-8 mt-6">
//           {/* Stat Item */}
//           <div className="flex flex-col">
//             <p className="font-inter font-semibold text-3xl text-gray-800">
//               500+
//             </p>
//             <p className="font-inter font-normal text-sm text-gray-600">
//               Total Families
//             </p>
//           </div>
//           <div className="flex flex-col">
//             <p className="font-inter font-semibold text-3xl text-gray-800">
//               90%
//             </p>
//             <p className="font-inter font-normal text-sm text-gray-600">
//               User Satisfaction
//             </p>
//           </div>
//           <div className="flex flex-col">
//             <p className="font-inter font-semibold text-3xl text-gray-800">
//               1000+
//             </p>
//             <p className="font-inter font-normal text-sm text-gray-600">
//               Active Users
//             </p>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-start items-center gap-4 mt-10">
//           <button className="px-7 py-2 bg-blue-600 text-white text-sm font-semibold rounded-[18px]">
//             Get Connected
//           </button>
//           <button className="px-7 py-2 border border-blue-600 text-blue-600 text-sm font-semibold rounded-[18px]">
//             Become A Member
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionH;
import React from "react";

const SectionH = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 bg-transparent rounded-[36px]">
      {/* Left Block - Image */}
      <div className="w-full md:max-w-[636px] h-[400px] sm:h-[500px] md:h-[600px] rounded-[36px] overflow-hidden mb-6 md:mb-0">
        <img
          src="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/xc8cgdvbcad7swt6pq1f.jpg"
          alt="Family Connections"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Block */}
      <div className="flex flex-col w-full md:max-w-[525px] bg-transparent rounded-[36px] p-4 sm:p-6 md:p-8">
        {/* Heading */}
        <h1 className="font-inter font-semibold text-xl sm:text-2xl md:text-3xl text-gray-800 leading-[28px] sm:leading-[32px] md:leading-[34px] text-center md:text-left">
          Discover Your Family Connections Easily
        </h1>

        {/* Subheading */}
        <p className="font-inter font-normal text-sm sm:text-base md:text-lg text-gray-600 leading-[20px] sm:leading-[24px] md:leading-[26px] mt-4 text-center md:text-left">
          FamilyConnect Directory features a user-friendly interface,
          intelligent search filters, and secure access to family contacts,
          making connections simpler than ever.
        </p>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center md:justify-start items-start gap-6 mt-6">
          {/* Stat Item */}
          <div className="flex flex-col text-center md:text-left">
            <p className="font-inter font-semibold text-2xl sm:text-3xl text-gray-800">
              500+
            </p>
            <p className="font-inter font-normal text-xs sm:text-sm text-gray-600">
              Total Families
            </p>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <p className="font-inter font-semibold text-2xl sm:text-3xl text-gray-800">
              90%
            </p>
            <p className="font-inter font-normal text-xs sm:text-sm text-gray-600">
              User Satisfaction
            </p>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <p className="font-inter font-semibold text-2xl sm:text-3xl text-gray-800">
              1000+
            </p>
            <p className="font-inter font-normal text-xs sm:text-sm text-gray-600">
              Active Users
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 mt-8">
          <button className="w-full sm:w-auto px-7 py-2 bg-blue-600 text-white text-sm font-semibold rounded-[18px] text-center">
            Get Connected
          </button>
          <button className="w-full sm:w-auto px-7 py-2 border border-blue-600 text-blue-600 text-sm font-semibold rounded-[18px] text-center">
            Become A Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionH;
