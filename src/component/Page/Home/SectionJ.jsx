import React from "react";

const blogs = [
  {
    id: 1,
    date: "May 12, 2024",
    category: "Inspiration",
    title: "Tips on Strengthening Family Connections",
    description:
      "Discover insights on family communication and connection strategies that strengthen ties in today's fast-paced world.",
    author: "Emily Carter",
    imageUrl:
      "https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/vxlnb5l9brz9wc6czuu0.jpg",
  },
  {
    id: 2,
    date: "May 12, 2024",
    category: "Inspiration",
    title: "Planning Your Family Reunions",
    description:
      "Learn effective ways to organize family reunions that foster connection and shared memories.",
    author: "John Smith",
    imageUrl:
      "https://res.cloudinary.com/dmuecdqxy/image/upload/v1732179051/vxlnb5l9brz9wc6czuu0.jpg",
  },
];

function SectionJ() {
  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl sm:text-5xl font-semibold text-black text-center">
        Connect and Engage
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col max-w-sm w-full p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md mx-auto"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-black">{blog.date}</p>
              <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border border-black">
                {blog.category}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">
              {blog.title}
            </h3>
            <p className="text-gray-700 mt-2 py-3 sm:py-5 text-sm sm:text-base">
              {blog.description}
            </p>
            <hr />
            <div className="flex items-center gap-3 mt-4">
              <img
                src={blog.imageUrl}
                alt={blog.author}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                {blog.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionJ;
