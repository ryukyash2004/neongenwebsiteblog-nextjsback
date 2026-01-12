"use client";

import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import StarField from '@/components/StarField';
import SpaceElements from '@/components/SpaceElements';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Rocket, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* Background with radial gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-[800px] h-[75vh] bg-gradient-radial from-white/10 via-white/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Starry Background */}
      <StarField />

      {/* Space Elements */}
      <SpaceElements />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="flex justify-center mb-6">
              <Rocket className="w-16 h-16 text-blue-400 animate-bounce" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Lost in Space
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              The page you're looking for seems to have drifted off into the cosmos.
              Don't worry, even astronauts get lost sometimes!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              <span>Return Home</span>
            </Button>
            <Button
              onClick={() => window.history.back()}
            
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-200"
            >
              Go Back
            </Button>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-sm text-gray-500"
          >
            <p>
              Need help? Check out our{' '}
              <a href="/faq" className="text-blue-400 hover:text-blue-300 underline">
                FAQ
              </a>{' '}
              or{' '}
              <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                contact us
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
