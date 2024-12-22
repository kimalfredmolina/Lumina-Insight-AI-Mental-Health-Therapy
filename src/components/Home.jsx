import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mt-2 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Your AI Companion for Mental Wellness
        </h1>
        <p className="text-lg text-white mb-6 mt-6">
          Find solace, guidance, and clarity as you share your thoughts <br />
          with your trusted AI confidant.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/bot">
            <button className="group relative">
              <div className="relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-20 font-medium text-white transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:text-blue-700 group-active:translate-x-0 group-active:translate-y-0">
                Start Conversation
              </div>
              <div className="absolute inset-0 z-0 h-full w-full rounded-md transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:[box-shadow:5px_5px_#a3a3a3,10px_10px_#d4d4d4,15px_15px_#e5e5e5] group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
