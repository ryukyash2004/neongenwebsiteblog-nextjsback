"use client";

import React from 'react';
import StarField from './StarField';
import SpaceElements from './SpaceElements';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import MissionSection from './MissionSection';
import PricingSection from './PricingSection';

const LandingPage = () => {
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

      {/* Hero Section */}
      <HeroSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Mission and About Sections in Grid */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <MissionSection />
            <AboutSection />
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;