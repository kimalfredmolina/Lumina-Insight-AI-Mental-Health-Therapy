import React from 'react'
import { motion } from "framer-motion";
import logo1 from '../assets/fb.png';
import logo2 from '../assets/github.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <div className="pb-16">
        <motion.h2 
          whileInView={{opacity: 1, y:0}}
          initial={{opacity: 0, y: -100}}
          transition={{duration: 0.5}}
          className="text-black text-4xl font-bold text-center mb-8 mt-16">
              Get in Touch
        </motion.h2>
        <div className="text-center tracking-tighter">
          <motion.p 
            whileInView={{opacity: 1, x:0}}
            initial={{opacity: 0, x: -100}}
            transition={{duration: 1}}
            className="my-4 text-black">
                Taguig City, Philippines
          </motion.p>
          <motion.p 
            whileInView={{opacity: 1, x:0}}
            initial={{opacity: 0, x: 100}}
            transition={{duration: 1}}
            className="my-4 text-black">
              01983123
          </motion.p>
          <a href="mailto:kimalfredmolina1224@gmail.com" className="border-b text-black">
              kimalfredmolina1224@gmail.com
          </a>
          <div className="flex mt-4 justify-center space-x-4">
              <a href="https://www.facebook.com/kimalfred.amolina"><img src={logo1} alt="Facebook" className="w-8 h-8"/></a>             
              <a href="https://github.com/kimalfredmolina"><img src={logo2} alt="Github" className="w-8 h-8"/></a>
          </div>
        </div>
        <div className="text-center mt-4 text-black">
          &copy; {currentYear} Kim Alfred Molina. All rights reserved.
        </div>
      </div>
    );
  };
  
  export default Footer;