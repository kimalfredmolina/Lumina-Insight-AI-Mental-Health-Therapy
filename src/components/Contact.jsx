import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_46rgdfm', // replace with your EmailJS Service ID
      'template_ndyo47j', // replace with your EmailJS Template ID
      formData,
      'KmdcuCE96WnVklega' // replace with your EmailJS User ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Email sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert('Failed to send email. Please try again.');
    });
  };

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.h2 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5 }}
          className="text-black text-5xl sm:text-6xl font-bold text-center mb-16 mt-16">
          Contact Us
        </motion.h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="text-white mb-8 md:mb-0 md:w-1/2">
            <div className="text-xl text-black font-semibold mb-4">
                <p>We understand that reaching out can be difficult, but you don’t</p>
                <p>have to face your challenges alone.</p>
                <p>Our team is here to listen, guide, and</p>
                <p>support you in your mental health journey.</p>
                <p>Let’s take the first step together.</p>
            </div>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            className="bg-gray-700 p-8 rounded-lg md:w-1/2 w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-white rounded"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}/>
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-white rounded"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}/>
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="subject">Subject</label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-white rounded"
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Your Subject"
                  value={formData.subject}
                  onChange={handleChange}/>
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="message">Message</label>
                <textarea
                  className="w-full px-3 py-2 text-gray-700 bg-white rounded"
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500"
                  type="submit">
                  <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
                    Send Email
                  </div>
                  <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"> 
                    <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;