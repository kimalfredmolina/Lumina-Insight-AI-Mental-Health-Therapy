import React, { useState } from 'react';
import bg1 from '../assets/bg1.gif';
import bg2 from '../assets/bg2.gif';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const Description = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the AI Mental Health Assistant maintain confidentiality?",
      answer: "Our AI assistant ensures complete privacy and confidentiality. All conversations are encrypted, and no personal information is stored. The system operates on a session-based approach, meaning each conversation starts fresh without any historical data.",
      icon: "🔒"
    },
    {
      question: "What kind of support can I expect from the AI Assistant?",
      answer: "The AI Assistant provides emotional support, active listening, and coping strategies for common mental health challenges. It can help with stress management, anxiety, mild depression, and daily emotional wellness. However, it's important to note that it's not a replacement for professional mental health care.",
      icon: "💭"
    },
    {
      question: "Is the AI Assistant available 24/7?",
      answer: "Yes, our AI Mental Health Assistant is available round-the-clock, providing support whenever you need it. You can access help at any time, day or night, making it a reliable resource for emotional support.",
      icon: "⏰"
    },
    {
      question: "How can I get the most out of my conversations with the AI Assistant?",
      answer: "To maximize benefits, be open and honest about your feelings, regularly engage in conversations, use the provided coping tools and exercises, and set personal goals for your mental wellness journey. Remember to take your time and be patient with the process.",
      icon: "🎯"
    },
    {
      question: "What should I do in case of a mental health emergency?",
      answer: "While our AI Assistant can provide support, it's not equipped to handle emergencies. In case of a crisis, please contact emergency services, call your local mental health crisis hotline, or reach out to a mental health professional immediately. Your safety is our top priority.",
      icon: "🆘"
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.img
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0 , y: -100}}
            transition={{duration: 1.5}}
            src={bg1}
            alt="Counseling session illustration"
            className="w-78 h-64 object-cover rounded-md"
          />
          <motion.p 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.5 }}
            className="mt-4 text-gray-700 text-xl font-bold">
            Mental health is just as important as physical health. Taking the
            first step toward seeking help can be life-changing. Let's break
            the stigma together and create a safe space for healing.
          </motion.p>
        </div>

        <div className="flex items-center text-center px-4">
        </div>

        <div className="flex flex-col items-center text-center">
          <motion.img
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0 , y: -100}}
            transition={{duration: 1.5}}
            src={bg2}
            alt="Mind illustration"
            className="w-64 h-64 object-cover rounded-md"
          />
          <motion.p 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.5 }}
            className="mt-4 text-gray-700 text-xl font-bold">
            Our AI is designed to be a compassionate listener, offering a
            judgment-free space for you to share your feelings. Remember,
            you're never alone in this journey.
          </motion.p>
        </div>
      </div>
      
      <div className="mt-8 max-w-2xl text-center">
        <motion.p 
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0 , y: -100}}
            transition={{duration: 1.5}}
            className="text-gray-700 text-xl font-bold mt-16">
            Mental health awareness is about understanding the challenges we all
            face and supporting each other through compassion and kindness.
            Prioritize self-care and reach out for help when you need it.
            Together, we can foster a world where mental health is valued and
            supported.
        </motion.p>
      </div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mt-16 px-4 mb-16 w-full"
      >
        <motion.div 
         whileInView={{opacity: 1, y: 0}}
         initial={{opacity: 0 , y: -100}}
         transition={{duration: 1.5}}
         className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 mt-32 text-purple-500 mr-2" />
            <h2 className="text-3xl font-bold mt-32 text-gray-800">Frequently Asked Questions</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our AI Mental Health Assistant and how it can support your well-being journey.
          </p>
        </motion.div>
      
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className={`w-full px-8 py-6 text-left flex justify-between items-center transition-colors duration-200 ${
                  openIndex === index ? 'bg-purple-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{faq.icon}</span>
                  <span className="font-semibold text-gray-800 text-lg">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`w-6 h-6 ${
                    openIndex === index ? 'text-purple-500' : 'text-gray-400'
                  }`} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 py-6 text-gray-600 border-t border-gray-100 bg-white rounded-b-xl">
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="leading-relaxed text-lg"
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Description;
