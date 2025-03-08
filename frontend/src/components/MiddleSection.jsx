import React from "react";

const MiddleSection = () => {
  return (
    <div className="bg-gray-100">
      {/* Section 1: Progressive Programs */}
      <div className="bg-gray-800 text-white py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 px-8">
            <h2 className="text-4xl font-bold mb-4">Progressive Programs</h2>
            <p className="mb-6 text-lg leading-relaxed">
              Students from every part of the globe can choose from more than
              230 associate’s, bachelor’s, master’s, and doctoral online
              degrees and study in a flexible virtual classroom environment on
              their own schedule. Your online degree will help you reach your
              career goals. Make the best choice for your education.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-700">
              Read More
            </button>
          </div>

          {/* Right Content (Image or Icon Section) */}
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <img
              src="../assets/wallpaper.jpg"
              alt="Progressive Programs Illustration"
              className="w-3/4"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Welcome Section */}
      <div className="py-16 bg-white text-center">
        <h3 className="text-red-500 font-bold uppercase mb-2">
          A few words about us
        </h3>
        <h2 className="text-3xl font-bold mb-4">Welcome</h2>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700">
          Our Company is a pioneer in developing online, high-quality degree
          programs for adults. It has experienced significant growth since its
          inception by focusing on academic quality and learner success in the
          growing market for online, post-secondary education.
        </p>

        {/* Progress Bar */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">International Students</span>
            <span className="text-sm text-gray-600">25%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-red-500 h-2 rounded"
              style={{ width: "25%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
