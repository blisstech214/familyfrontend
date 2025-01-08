// import React from "react";

// function SectionF() {
//   const imageData = [
//     {
//       id: "logoipsum-263g8iQ",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771481/static/logoipsum-263svg_1701771238_99696.svg",
//       alt: "logo 1",
//     },
//     {
//       id: "logoipsum-2635X76",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771480/static/logoipsum-325svg_1701771238_96325.svg",
//       alt: "logo 2",
//     },
//     {
//       id: "logoipsum-263vEfy",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771480/static/logoipsum-219svg_1701771238_64867.svg",
//       alt: "logo 3",
//     },
//     {
//       id: "logoipsum-263yPzf",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-211svg_1701771238_74325.svg",
//       alt: "logo 4",
//     },
//     {
//       id: "logoipsum-263kvo0",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-213svg_1701771238_51737.svg",
//       alt: "logo 5",
//     },
//     {
//       id: "logoipsum-263rImd",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-217svg_1701771238_65992.svg",
//       alt: "logo 6",
//     },
//     {
//       id: "logoipsum-263r92i",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-218svg_1701771238_44959.svg",
//       alt: "logo 7",
//     },
//     {
//       id: "logoipsum-263FatN",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-286svg_1701771238_77143.svg",
//       alt: "logo 8",
//     },
//     {
//       id: "logoipsum-263H17E",
//       src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-216svg_1701771238_38514.svg",
//       alt: "logo 9",
//     },
//   ];

//   return (
//     <div className="bg-blue-100 m-28 rounded-3xl p-16">
//       <div className="flex flex-col md:flex-row  gap-6 text-black justify-center">
//         {/* Left Section: Text and Button */}
//         <div className="flex flex-col gap-4 max-w-full md:max-w-[325px] mb-8 md:mb-0">
//           <h1 className="text-3xl md:text-4xl text-black font-bold">
//             Connecting Generations for a Brighter Future
//           </h1>
//           <p className="text-xl">
//             Explore our visionary directory fostering connections among
//             families, strengthening relationships and nurturing communities into
//             the future.
//           </p>
//           <button className="text-white bg-blue-700 py-2 px-4 rounded-lg font-semibold">
//             Join Us Today
//           </button>
//         </div>

//         {/* Right Section: Logo Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-center md:ml-16">
//           {imageData.map((image) => (
//             <div
//               key={image.id}
//               className="flex justify-center items-center bg-gray-400 rounded-lg p-3 h-24 w-32 md:w-44"
//             >
//               <img
//                 src={image.src}
//                 alt={image.alt}
//                 className="w-full h-full object-contain"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SectionF;
import React from "react";

function SectionF() {
  const imageData = [
    {
      id: "logoipsum-263g8iQ",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771481/static/logoipsum-263svg_1701771238_99696.svg",
      alt: "logo 1",
    },
    {
      id: "logoipsum-2635X76",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771480/static/logoipsum-325svg_1701771238_96325.svg",
      alt: "logo 2",
    },
    {
      id: "logoipsum-263vEfy",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771480/static/logoipsum-219svg_1701771238_64867.svg",
      alt: "logo 3",
    },
    {
      id: "logoipsum-263yPzf",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-211svg_1701771238_74325.svg",
      alt: "logo 4",
    },
    {
      id: "logoipsum-263kvo0",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-213svg_1701771238_51737.svg",
      alt: "logo 5",
    },
    {
      id: "logoipsum-263rImd",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-217svg_1701771238_65992.svg",
      alt: "logo 6",
    },
    {
      id: "logoipsum-263r92i",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-218svg_1701771238_44959.svg",
      alt: "logo 7",
    },
    {
      id: "logoipsum-263FatN",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-286svg_1701771238_77143.svg",
      alt: "logo 8",
    },
    {
      id: "logoipsum-263H17E",
      src: "https://res.cloudinary.com/dbyioi2qq/q_auto/v1701771479/static/logoipsum-216svg_1701771238_38514.svg",
      alt: "logo 9",
    },
  ];

  return (
    <div className="bg-blue-100 m-4 sm:m-8 md:m-28 rounded-3xl p-6 sm:p-10 md:p-16">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Left Section: Text and Button */}
        <div className="flex flex-col gap-4 text-center md:text-left max-w-full md:max-w-[350px]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            Connecting Generations for a Brighter Future
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-black">
            Explore our visionary directory fostering connections among
            families, strengthening relationships, and nurturing communities
            into the future.
          </p>
          <button className="text-white bg-blue-700 py-2 px-4 rounded-lg font-semibold hover:bg-blue-800">
            Join Us Today
          </button>
        </div>

        {/* Right Section: Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-1 w-full justify-items-center">
          {imageData.map((image) => (
            <div
              key={image.id}
              className="flex justify-center items-center bg-gray-400 rounded-lg p-3 h-20 w-24 sm:h-24 sm:w-32 md:h-28 md:w-36 lg:h-32 lg:w-40"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionF;
