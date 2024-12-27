'use client';

import { motion } from 'framer-motion'; // For animations, install with: npm install framer-motion

const ContactHero = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src="/images/office.jpg" // Replace with your image path
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.h1
            className="text-white text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
        </div>
      </div>

      {/* Floating Contact Section */}
      <div className="relative -mt-16 z-10">
        <motion.div
          className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Section */}
            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-5xl text-blue-600">
                <i className="fas fa-envelope"></i> {/* FontAwesome Email Icon */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                karniinteriors9@gmail.com
              </h3>
              <h3 className=" text-xl font-semibold text-gray-800 mt-4">
                Contact no. 9845102493
              </h3>
            </motion.div>


            {/* HRBR Layout */}
            <motion.div
              className="flex flex-col items-center text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-5xl text-red-600">
                <i className="fas fa-map-marker-alt"></i> {/* FontAwesome Location Icon */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                Akshay Nagar
              </h3>
              <p className="text-gray-600">
                #19 , Akshaya Nagar , Beside Canara Bank
                <br />
                Yelenahalli Main Road , DLF New Town , Banglore - 560068
              </p>
              <p className="text-gray-800 font-medium mt-2">6204446180</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactHero;