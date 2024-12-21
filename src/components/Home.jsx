import React from 'react'
import foodbg from "../assets/foodbg.jpg"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mt-2 bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-transparent">
          Generate your favorite dishes and recipe
        </h1>
        <p className="text-lg text-white mb-6 mt-6">
          Discover delectable cuisine and unforgettable moments <br />
          in our welcoming culinary haven.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/generate">
            <button class="group relative">
              <div class="relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-20 font-medium text-white transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:text-blue-700 group-active:translate-x-0 group-active:translate-y-0">
                Generate Recipe</div>
                <div class="absolute inset-0 z-0 h-full w-full rounded-md transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:[box-shadow:5px_5px_#a3a3a3,10px_10px_#d4d4d4,15px_15px_#e5e5e5] group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none"></div>
            </button>   
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home