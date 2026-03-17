"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { GlassEffect } from './GlassEffect';
import { ThemeToggle } from './ui/ThemeToggle';

const FooterBar = () => {
  return (
    
    <>
    <ThemeToggle />
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-0 left-0 right-0 flex justify-center z-50"
    >
      <GlassEffect className="px-6 py-3 rounded-full flex items-center space-x-8">
        {/* Logo */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
          <a href="/" className="md:pointer-events-none flex w-full h-full rounded-full items-center justify-center overflow-hidden">
            <img src="/favico.png" alt="Website Logo" className="w-full h-full object-cover" />
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="https://dashboard.neonnextgeneration.com/" target="_blank" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
        </div>

        {/* Mobile Links */}
        <div className="flex md:hidden items-center space-x-4">
          <a href="/" className="text-gray-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </a>
          <a href="https://dashboard.neonnextgeneration.com/" target="_blank" className="text-gray-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </a>
        </div>

        {/* Call to Action */}
        <a href="https://dashboard.neonnextgeneration.com/signup" target="_blank" className="ml-6 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm flex items-center space-x-2 hover:bg-white/20 transition-colors">
          <UserPlus className="w-4 h-4" />
          <span>Join Us</span>
        </a>
      </GlassEffect>
    </motion.div>
    </>
    
  );
};

export default FooterBar;