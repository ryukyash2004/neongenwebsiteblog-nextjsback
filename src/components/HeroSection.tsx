"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-start px-4 z-10">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-64 sm:w-80 md:w-[28rem] h-64 sm:h-80 md:h-80 object-cover opacity-40 z-0 rounded-3xl mix-blend-screen filter blur-md"
      >
        <source src="/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="text-left max-w-xs sm:max-w-sm ml-4 sm:ml-8 z-20">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center space-x-2 glass-effect rounded-full px-3 py-1 mb-4"
        >
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-300">MOST POPULAR CHOICE</span>
          <Star className="w-4 h-4 text-yellow-400" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight"
        >
          Choose Our Pro Plan for Growing Businesses
        </motion.h1>

        {/* Pricing */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
        >
          <span className="text-blue-400">$8</span><span className="text-sm text-gray-300">/month</span>
        </motion.div>

        {/* Features */}
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm md:text-base text-gray-400 mb-8 space-y-1 italic"
        >
          <li>30GB NVMe Storage</li>
          <li>Priority Support</li>
          <li>Early Developer Features</li>
          <li>Access to VPN Services</li>
        </motion.ul>

        {/* CTAs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-3 justify-start items-start"
        >
          <button onClick={() => window.open("https://billing.neonnextgeneration.com/products/hosting-plans/pro-plan")} className="glass-effect border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
            <span>Get Pro Plan</span>
          </button>
          <button onClick={() => window.open("https://platform.neonnextgeneration.com/")}  className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300">
            Explore VPN
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;