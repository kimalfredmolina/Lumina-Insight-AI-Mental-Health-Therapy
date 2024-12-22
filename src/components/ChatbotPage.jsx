import React, { useState, useRef, useEffect } from "react";
import { GiSpeaker } from "react-icons/gi";
import { GoPaperclip } from "react-icons/go";
import { FaArrowCircleUp } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function ChatbotPage() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const mentalHealthKeywords = [
    "anxiety",
    "depression",
    "stress",
    "mental health",
    "therapy",
    "counseling",
    "well-being",
    "emotions",
    "feeling",
    "sad",
    "happy",
    "overwhelmed",
    "burnout",
  ];

  const isMentalHealthRelated = (text) => {
    return mentalHealthKeywords.some((keyword) =>
      text.toLowerCase().includes(keyword)
    );
  };

  const handleResponse = async () => {
    if (!inputText.trim()) return;

    if (!isMentalHealthRelated(inputText)) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "It seems your question is not related to mental health. Let's focus on your feelings or concerns.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setInputText("");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", timestamp: new Date() },
    ]);
    setLoading(true);
    setError(null);

    try {
      const result = await model.generateContent(inputText);
      const text = result.response.text();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      setError("Failed to process your message. Please try again.");
    } finally {
      setLoading(false);
      setInputText("");
    }
  };

  return (
    <div className="h-screen w-screen p-4 flex justify-center items-center">
      <div className="max-w-7xl w-full h-full bg-gray-200 shadow-md rounded-lg p-4 flex">
        {/* Sidebar */}
        <div className="flex flex-col items-center w-1/3 p-4">
          <div className="w-full flex justify-start mb-4">
            <Link
              to="/"
              className="p-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
            >
              <IoMdHome className="h-6 w-6" />
            </Link>
          </div>
          <img
            src="/src/assets/web_logo.jpeg"
            alt="AI Companion Icon"
            className="w-80 h-80 rounded-3xl object-cover mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            AI Mental Health Companion
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Talk with your AI counselor <br /> and find clarity and support.
          </p>
        </div>

        {/* Main Section */}
        <div className="flex flex-col w-full h-full">
          {/* Chat Container */}
          <div
            className="flex-grow overflow-auto chat-container p-2 border rounded-lg bg-gray-50"
            ref={chatContainerRef}
            style={{ maxHeight: "100%", marginBottom: "10px" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user" : "ai"
                }`}
              >
                <div
                  className={`p-4 rounded-lg mb-4 ${
                    message.sender === "user"
                      ? "bg-blue-200 text-right"
                      : "bg-green-200 text-left"
                  }`}
                >
                  <p className="message-text">{message.text}</p>
                  <span className="text-xs text-gray-500">
                    {dayjs(message.timestamp).format("MM.DD.YYYY HH:mm:ss")}
                  </span>
                </div>
              </div>
            ))}
            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
          </div>

          {/* Input Section */}
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <button
              onClick={() => alert("File upload feature coming soon!")}
              className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-2"
              aria-label="Upload File"
            >
              <GoPaperclip className="h-5 w-5" />
            </button>
            <button
              onClick={() => alert("Voice input feature coming soon!")}
              className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-2"
              aria-label="Voice Input"
            >
              <GiSpeaker className="h-5 w-5" />
            </button>

            <textarea
              placeholder="Share your thoughts or concerns..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleResponse();
                }
              }}
              className="flex-grow p-2 border-none resize-none h-12 bg-transparent focus:outline-none"
            />

            <button
              onClick={handleResponse}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              aria-label="Send Message"
            >
              <FaArrowCircleUp className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;
