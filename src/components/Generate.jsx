import React, { useState } from "react";
import { GiSpeaker } from "react-icons/gi";
import { GoPaperclip } from "react-icons/go";
import { FaArrowCircleUp } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

function Generate() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [showIcons, setShowIcons] = useState(true);

  const handleGenerateRecipe = () => {
  };
  const handleRespose = () => {
    alert("You pressed Enter");
  };

  const handleVoiceInput = () => {
    // Handle voice input
    alert("Voice Input clicked");
  };

  const handleFileUpload = (e) => {
    alert("File Input clicked");
  };

  const handleInputFocus = () => {
    setShowIcons(true);
  };

  const handleInputBlur = () => {
    if (!showFileInput) {
      setShowIcons(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Container */}
      <div className="max-w-7xl mx-auto bg-gray-200 shadow-md rounded-lg p-4 flex">
        {/* Sidebar */}
        <div className="flex flex-col items-center w-1/3 p-4">
          <div className="w-full flex justify-start mb-4">
            <a href="/Home" className="p-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400">
              <IoMdHome className="h-6 w-6" />
            </a>
          </div>
          <img
            src="/src/assets/app_logo.png"
            alt="Chef Icon"
            className="w-80 h-80 rounded-3xl object-cover mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 text-center">AI Recipe Finder</h1>
          <p className="text-gray-600 text-center mt-2">
            Generate your Recipe here <br></br>by inserting a photo or text.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-2/3">
          <div className="bg-gray-50 border rounded-lg p-4 space-y-2 mb-4 flex flex-col h-[550px]">
            {/* Chat Content (Messages) */}
            <div className="flex-grow overflow-auto">
              {/* User Input */}
              <div className="flex justify-end">
                <div className="bg-gray-200 rounded-lg p-2 max-w-sm">
                  <p className="text-gray-800">Can you give me recipe for chicken</p>
                </div>
              </div>

              {/* AI Response */}
              {response && (
                <div className="flex items-start space-x-2">
                  <div className="self-end">
                    <img
                      src="/src/assets/app_logo.png"
                      alt="AI"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="bg-gray-200 rounded-lg p-2 max-w-sm">
                    <h2 className="font-bold">{response.title}</h2>
                    <ul className="list-disc list-inside">
                      {response.ingredients.map((item, index) => (
                        <li key={index} className="text-sm text-gray-800">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 font-semibold text-gray-600">
                      Enjoy your delicious Garlic Butter Chicken!
                    </p>
                  </div>
                </div>
              )}
            </div>


            {/* Input Box */}
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="text"
                placeholder="Generate your Recipe here"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleRespose}
                className="p-2 bg-white-200 text-gray-700 rounded-full hover:bg-gray-300"
                aria-label="Generate Recipe"
              >
                <FaArrowCircleUp className="h-5 w-5" />
              </button>
            </div>
          </div>


          {/* Icons (appear when input is focused) */}
          {showIcons && !showFileInput && (
            <div className="mt-2 flex space-x-2">
              <button
                onClick={handleFileUpload}
                className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 relative group"
                aria-label="Upload File"
              >
                <GoPaperclip className="h-5 w-5" />
                <span className="absolute -bottom-11 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-50">Upload File</span>
              </button>
              <button
                onClick={handleVoiceInput}
                className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 relative group"
                aria-label="Voice Input"
              >
                <GiSpeaker className="h-5 w-5" />
                <span className="absolute -bottom-11 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-50">Use Voice</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Generate;
