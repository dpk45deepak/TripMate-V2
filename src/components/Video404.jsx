// src/components/Video404.jsx
import React from "react";
import StoneAge from "../assets/StoneAge.mp4";

const Video404 = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src={StoneAge} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Content Overlay */}
      <div className="relative z-10 text-white text-center p-4">
        <h1
          className="text-6xl md:text-8xl font-bold mb-4
            bg-gradient-to-r from-blue-500 to-teal-500
            bg-clip-text text-transparent inline-block"
        >
          404
        </h1>
        <p className="text-xl md:text-2xl font-light text-blue-400">
          Uh oh, looks like this connection is a bit... primitive.
        </p>
        <a
          href="/home"
          className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-blue-400 via-teal-600 to-indigo-500 text-gray-200 rounded-full font-semibold hover:bg-gray-200 transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  );
};

export default Video404;
