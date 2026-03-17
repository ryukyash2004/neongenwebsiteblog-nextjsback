"use client";

import React from 'react';
import { Github, Instagram } from 'lucide-react';
import { footerData } from '@/lib/footer-constants';
import SpaceElements from './SpaceElements';
import StarField from './StarField';

const Footer = () => {
  return (
    <footer className="bg-black py-8 px-4">
       {/* Starry Background */}
      <StarField />

      {/* Space Elements */}
      <SpaceElements />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Social */}
          <div>
            <div className="flex items-center mb-4">
              <img src={footerData.logo.src} alt={footerData.logo.alt} className="w-8 h-8 mr-2" />
              <span className="text-white text-xl font-bold">{footerData.logo.name}</span>
            </div>
            <div className="flex space-x-4 mt-3 md:mt-0">
              {footerData.socialLinks.map((link, index) => (
                <a key={index} href={link.url} className="text-gray-400 hover:text-white transition-colors duration-200" aria-label={link.ariaLabel}>
                  {link.image ? (
                    <img src={link.image} alt={link.ariaLabel} className="w-6 h-6" />
                  ) : (
                    <>
                      {link.icon === 'github' && <Github className="w-6 h-6" />}
                      {link.icon === 'instagram' && <Instagram className="w-6 h-6" />}
                    </>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {footerData.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}><a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">{link.text}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Neon Next Generation PTY LTD. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;