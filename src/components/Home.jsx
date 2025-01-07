import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 3, delay: delay },
  },
});

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <motion.h1
          variants={container(0)}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mt-2 bg-gradient-to-r from-blue-600 via-purple-500 to-sky-500 bg-clip-text text-transparent"
        >
          Your AI Companion for Mental Wellness
        </motion.h1>
        <motion.p
          variants={container(1)}
          initial="hidden"
          animate="visible"
          className="text-lg text-black mb-6 mt-6"
        >
          Find solace, guidance, and clarity as you share your thoughts <br />
          with your trusted AI confidant.
        </motion.p>
        <div className="flex justify-center gap-4">
          <Link to="/bot">
            <button className="group relative">
              <div className="text-xl relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-black bg-transparent px-20 font-medium text-black transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:text-blue-700 group-active:translate-x-0 group-active:translate-y-0">
                Start Conversation
              </div>
              <div className="absolute inset-0 z-0 h-full w-full rounded-md transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:[box-shadow:5px_5px_#a3a3a3,10px_10px_#d4d4d4,15px_15px_#e5e5e5] group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
