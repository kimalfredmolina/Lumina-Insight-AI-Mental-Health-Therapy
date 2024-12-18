import React, { useState } from "react";

function Generate() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState(null);

  const handleGenerateRecipe = () => {  
    setResponse({
      title: "Garlic Butter Chicken Recipe",
      ingredients: [
        "4 boneless, skinless chicken breasts",
        "3 tablespoons butter",
        "4 garlic cloves, minced",
        "1 cup chicken broth",
        "1 cup heavy cream",
        "1/2 cup grated Parmesan cheese",
        "1 teaspoon Italian seasoning",
        "Salt and pepper to taste",
        "Fresh parsley for garnish",
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <img
              src="https://via.placeholder.com/100"
              alt="Chef Icon"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-800">AI Recipe Finder</h1>
            <p className="text-gray-600">
              Generate your Recipe here by inserting a photo or text.
            </p>
          </div>
        </div>

        {/* Chat Box */}
        <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
          {/* User Input */}
          <div className="flex justify-end">
            <div className="bg-gray-200 rounded-lg p-2 max-w-sm">
              <p className="text-gray-800">Can you give me recipe for chicken</p>
            </div>
          </div>

          {/* AI Response */}
          {response && (
            <div className="flex items-start space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="AI"
                className="w-10 h-10 rounded-full"
              />
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
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Generate your Recipe here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGenerateRecipe}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default Generate;
