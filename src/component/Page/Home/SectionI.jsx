// import React from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Card = ({ imageSrc, name, title }) => {
//   return (
//     <div className="w-full  space-y-10 relative group">
//       <div className="rounded-xl space-y-10">
//         <img
//           src={imageSrc}
//           alt={name}
//           className="w-full h-80 object-cover rounded-xl"
//         />
//         <div className="">
//           <h3 className="text-center text-xl font-semibold">{name}</h3>
//           <p className="text-center text-md text-gray-500">{title}</p>
//         </div>
//       </div>
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
//         <div className="flex space-x-4">
//           <i className="fab fa-facebook text-white text-3xl"></i>
//           <i className="fab fa-instagram text-white text-3xl"></i>
//           <i className="fab fa-youtube text-white text-3xl"></i>
//         </div>
//       </div>
//     </div>
//   );
// };

// function SectionI() {
//   return (
//     <div className=" mx-auto px-4  space-y-10 ">
//       <h2 className="text-4xl font-bold text-center">Meet Our Team</h2>
//       <div className="flex justify-center gap-8">
//         <Card
//           imageSrc="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/abhejjiykjjoalsbf6rw.jpg"
//           name="Michael Brown"
//           title="Web Developer"
//         />
//         <Card
//           imageSrc="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/abhejjiykjjoalsbf6rw.jpg"
//           name="Jane Doe"
//           title="Designer"
//         />
//         <Card
//           imageSrc="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/abhejjiykjjoalsbf6rw.jpg"
//           name="John Smith"
//           title="Project Manager"
//         />
//         <Card
//           imageSrc="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/abhejjiykjjoalsbf6rw.jpg"
//           name="Sarah Lee"
//           title="UX/UI Expert"
//         />
//       </div>
//     </div>
//   );
// }

// export default SectionI;
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Card = ({ imageSrc, name, title }) => {
  return (
    <div className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-96 space-y-6 relative group">
      <div className="rounded-xl space-y-6">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-80 object-cover rounded-xl"
        />
        <div className="text-center">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-md text-gray-500">{title}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
        <div className="flex space-x-4">
          <i className="fab fa-facebook text-white text-3xl"></i>
          <i className="fab fa-instagram text-white text-3xl"></i>
          <i className="fab fa-youtube text-white text-3xl"></i>
        </div>
      </div>
    </div>
  );
};

function SectionI() {
  return (
    <div className="mx-auto px-4 space-y-10">
      <h2 className="text-4xl font-bold text-center">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <Card
          imageSrc="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/abhejjiykjjoalsbf6rw.jpg"
          name="Michael Brown"
          title="Web Developer"
        />
        <Card
          imageSrc="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/abhejjiykjjoalsbf6rw.jpg"
          name="Jane Doe"
          title="Designer"
        />
        <Card
          imageSrc="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/abhejjiykjjoalsbf6rw.jpg"
          name="John Smith"
          title="Project Manager"
        />
        <Card
          imageSrc="https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/abhejjiykjjoalsbf6rw.jpg"
          name="Sarah Lee"
          title="UX/UI Expert"
        />
      </div>
    </div>
  );
}

export default SectionI;
