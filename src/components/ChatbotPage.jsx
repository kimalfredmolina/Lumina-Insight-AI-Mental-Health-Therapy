import React, { useState, useRef, useEffect } from "react";
import { GiSpeaker } from "react-icons/gi";
import { GoPaperclip } from "react-icons/go";
import { FaArrowCircleUp } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
//ano tong import na to? nawawala yung mga design eh
// import { send } from "vite";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction:
//     "You are Lumina, a compassionate and empathetic therapist. Your role is to actively listen to the patient, validate their emotions, and provide thoughtful, supportive, and practical feedback. Speak in a warm, understanding tone that helps the patient feel safe, heard, and respected. As a therapist, focus on creating a nonjudgmental space for them to express themselves while offering helpful insights or strategies tailored to their needs. also talk to me like a human would talk, specifically casual talk.",
// });
// const chat = model.startChat({
//   history: [],
//   generationConfig: {
//     maxOutputTokens: 500,
//   },
// });

const allChatSuggestions = [
  {
    title: "Dealing with Anxiety",
    prompt: "I've been feeling anxious lately and would like to talk about it.",
    icon: "😟"
  },
  {
    title: "Managing Depression",
    prompt: "I've been feeling down and want to discuss ways to cope.",
    icon: "😔"
  },
  {
    title: "Work Stress",
    prompt: "I'm struggling with work-related stress.",
    icon: "💼"
  },
  {
    title: "Relationship Issues",
    prompt: "I need advice about my relationships.",
    icon: "❤️"
  },
  {
    title: "Sleep Problems",
    prompt: "I'm having trouble sleeping and it's affecting my mental health.",
    icon: "😴"
  },
  {
    title: "Self-Esteem",
    prompt: "I want to work on building my self-confidence.",
    icon: "✨"
  },
  {
    title: "Burnout",
    prompt: "I'm feeling overwhelmed and exhausted with everything.",
    icon: "🔥"
  },
  {
    title: "Social Anxiety",
    prompt: "I feel nervous in social situations.",
    icon: "🤝"
  },
  {
    title: "Life Changes",
    prompt: "I'm going through major life changes and need support.",
    icon: "🌱"
  },
  {
    title: "Motivation Issues",
    prompt: "I'm struggling to find motivation lately.",
    icon: "🎯"
  },
  {
    title: "Grief and Loss",
    prompt: "I'm dealing with the loss of a loved one and need support.",
    icon: "🕊️"
  },
  {
    title: "Loneliness",
    prompt: "I feel lonely and want to discuss how to cope with it.",
    icon: "🌌"
  },
  {
    title: "Body Image Concerns",
    prompt: "I'm struggling with my body image and self-acceptance.",
    icon: "🪞"
  },
  {
    title: "Parenting Stress",
    prompt: "I'm finding it challenging to balance parenting and self-care.",
    icon: "👶"
  },
  {
    title: "Trauma Recovery",
    prompt: "I'm working through past trauma and need guidance.",
    icon: "🛡️"
  },
  {
    title: "Anger Management",
    prompt: "I'm having trouble controlling my anger and want advice.",
    icon: "😡"
  },
  {
    title: "Financial Stress",
    prompt: "I'm stressed about my financial situation and need support.",
    icon: "💰"
  },
  {
    title: "Identity Struggles",
    prompt: "I'm exploring my identity and would like to talk about it.",
    icon: "🌈"
  },
  {
    title: "Chronic Illness Support",
    prompt: "I'm living with a chronic illness and need emotional support.",
    icon: "💊"
  },
  {
    title: "Perfectionism",
    prompt: "I struggle with perfectionism and want to find balance.",
    icon: "🎨"
  }
];


function ChatbotPage() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [, setShowSuggestions] = useState(true);
  const [isClickProcessing, setIsClickProcessing] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);


  const getRandomSuggestions = (count = 4) => {
    const shuffled = [...allChatSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setCurrentSuggestions(getRandomSuggestions());
  }, []);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const sessionId = Date.now().toString();
    localStorage.setItem("currentSessionId", sessionId);

    initializeChat();

    return () => {
      localStorage.removeItem("currentSessionId");
      stopSpeechSynthesis(); // Stop speech synthesis when the component unmounts
    };
  }, []);

  useEffect(() => {
    const currentSessionId = localStorage.getItem("currentSessionId");
    if (currentSessionId) {
      localStorage.setItem(
        `chatHistory-${currentSessionId}`,
        JSON.stringify(messages)
      );
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSuggestionClick = (prompt) => {
    // If this suggestion is already selected and in the input box, send it
    if (selectedSuggestion === prompt && inputText === prompt) {
      handleResponse();
      setSelectedSuggestion(null); // Reset selection after sending
    } else {
      // First click - just put it in the input box
      setShowSuggestions(false);
      setInputText(prompt);
      setSelectedSuggestion(prompt);
    }
  };

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setMessages([
        {
          text: `Hi ${userName}, nice to meet you! Tell me about what's on your mind.`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setNameSubmitted(true);
    } else {
      alert("Please enter your name!");
    }
  };

  //Limitation for prompting
  const initializeChat = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are Lumina, a compassionate and empathetic therapist who specializes in mental health. Your role is to be a warm, understanding presence—someone the person can talk to freely, like a close, caring friend who really gets them. Your focus is on actively listening, validating their feelings, and offering thoughtful, supportive feedback that feels natural and relatable. Keep your tone casual, warm, and down-to-earth, creating a space where they feel safe, understood, and respected without it feeling clinical or distant. Speak in a way that flows like a normal conversation, sprinkling in little things like 'I hear you,' or 'That makes sense,' to show you're engaged and present.While staying curious and open, ensure you provide clear, supportive insights or actionable takeaways to help the person feel they are making progress. Avoid asking too many follow-up questions unless necessary, and instead, summarize what you’ve heard and offer helpful suggestions or reflections to guide the conversation forward. If the conversation veers into unrelated topics, gently steer it back by saying something like, 'I totally get why that’s interesting, but I’m here to support you emotionally. Let’s focus on how you’re feeling—what’s on your mind?'The goal is to help the person feel deeply heard, supported, and like they’ve gained something meaningful from the interaction—whether it’s clarity, relief, or a sense of direction—while keeping the tone light, conversational, and supportive.",
    });

    const newChat = model.startChat({
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    setChat(newChat);
  };

  const stopSpeechSynthesis = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop the ongoing speech
    }
  };


  const handleResponse = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
        text: inputText,
        sender: "user",
        timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);
    setError(null);
    setSelectedSuggestion(null); // Reset selection after sending

    try {

        const result = await chat.sendMessage(inputText);
        const rawText = await result.response.text();
        const formattedText = rawText.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );

        
        const aiMessage = {
            text: formattedText,
            sender: "ai",
            timestamp: new Date(),
        };

        // Add the AI's response to the chat history
        setMessages((prev) => [...prev, aiMessage]);

        // Trigger text-to-speech for the AI's response
        textToSpeech(rawText);
    } catch (err) {
        // Set error state and attempt to reinitialize the chat
        setError("Failed to process your message. Please try again.");
        console.error("Error while processing message:", err);
        await initializeChat();
    } finally {
        // Reset loading state and clear the input text
        setLoading(false);
        setInputText("");
    }
};

  // Text-to-Speech response of AI
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const maxChunkSize = 150; // Adjust this to control chunk size or text to read
      const utteranceQueue = [];

      for (let i = 0; i < text.length; i += maxChunkSize) {
        utteranceQueue.push(text.slice(i, i + maxChunkSize));
      }

      const speakChunks = () => {
        if (utteranceQueue.length === 0) return;

        const utterance = new SpeechSynthesisUtterance(utteranceQueue.shift());
        utterance.lang = "en-US"; // Set language
        utterance.rate = 1; // Adjust speaking rate
        utterance.pitch = 1;

        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(
          (voice) =>
            voice.lang.startsWith("en") &&
            (voice.name.toLowerCase().includes("female") ||
              voice.name.toLowerCase().includes("woman"))
        );

        if (femaleVoice) {
          utterance.voice = femaleVoice;
        } else {
          const fallbackVoice = voices.find((voice) =>
            voice.lang.startsWith("en")
          );
          if (fallbackVoice) utterance.voice = fallbackVoice;
        }

        utterance.onend = speakChunks;
        window.speechSynthesis.speak(utterance);
      };

      const ensureVoicesAvailable = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          speakChunks();
        } else {
          window.speechSynthesis.onvoiceschanged = ensureVoicesAvailable;
        }
      };

      ensureVoicesAvailable();
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  // for voice recognition
  const startListening = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US"; // Set language
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Stop speech synthesis when the page is refreshed or navigated away
  useEffect(() => {
    window.onbeforeunload = () => {
      stopSpeechSynthesis();
    };

    return () => {
      window.onbeforeunload = null; // Cleanup when component unmounts
    };
  }, []);

  return (
    <div className="h-screen w-screen p-4 flex justify-center items-center">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="max-w-7xl w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl rounded-lg p-4 flex"
      >
        {!nameSubmitted ? (
          <div className="w-full flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
              {/* Logo and Header */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                >
                  <img
                    src="/src/assets/web_logo.jpeg"
                    alt="Lumina AI"
                    className="w-24 h-24 mx-auto rounded-full shadow-lg object-cover"
                  />
                </motion.div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome to Lumina</h1>
                <p className="text-gray-600">Your AI Therapeutic Companion</p>
              </div>

              {/* Name Input Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    What should I call you?
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNameSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                >
                  Begin Your Journey
                </motion.button>

                <p className="text-center text-sm text-gray-500">
                  Your safe space for open conversation and support
                </p>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <>
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
                className="w-80 h-80 rounded-3xl mt-16 object-cover mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-800 text-center">
                Lumina AI Therapy
              </h1>
              <p className="text-gray-600 text-center mt-2">
                Talk with your AI Therapy <br /> and find clarity and support.
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
                    className={`message ${message.sender === "user" ? "user" : "ai"
                      }`}
                  >
                    <div
                      className={`p-4 rounded-lg mb-4 ${message.sender === "user"
                          ? "bg-blue-200 text-right"
                          : "bg-green-200 text-left"
                        }`}
                    >
                      {message.sender === "ai" ? (
                        <p
                          className="message-text"
                          dangerouslySetInnerHTML={{ __html: message.text }}
                        />
                      ) : (
                        <p className="message-text">{message.text}</p>
                      )}
                      <span className="text-xs text-gray-500">
                        {dayjs(message.timestamp).format("MM.DD.YYYY h:mm A")}
                      </span>
                    </div>
                  </div>
                ))}
                {loading && <p className="text-center text-gray-600">Loading...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}
              </div>
                {messages.length === 1 && (
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {currentSuggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSuggestionClick(suggestion.prompt)}
                          className={`bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow flex items-center space-x-2 border border-gray-200 
                  ${selectedSuggestion === suggestion.prompt ? 'ring-2 ring-blue-500' : ''}`}
                        >
                          <span className="text-xl">{suggestion.icon}</span>
                          <span className="text-sm text-gray-700">{suggestion.title}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => setCurrentSuggestions(getRandomSuggestions())}
                      className="mt-3 w-full text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200 py-2 px-4 rounded-lg border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100"
                    >
                      Show different suggestions
                    </motion.button>
                  </div>
                )}

              {/* Input Section */}
              <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                <button
                  onClick={startListening}
                  className={`p-2 rounded-lg mr-2 ${isListening
                      ? "bg-green-400 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
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
          </>
        )}
      </motion.div>
    </div>
  );
}

export default ChatbotPage;
