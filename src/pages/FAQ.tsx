"use client";

import React from 'react';
import StarField from '@/components/StarField';
import SpaceElements from '@/components/SpaceElements';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from '@/lib/faq-constants';

const FAQ = () => {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-4 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold mb-8 italic text-center"
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 mb-12 italic text-center max-w-2xl mx-auto"
          >
            Find answers to common questions about our VPN and hosting services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.filter(section => section.title === "VPN Services").map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    {section.badge && (
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  {section.items.map((item) => (
                    <AccordionItem key={item.value} value={item.value} className="border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4">
                      <AccordionTrigger className="text-white hover:text-blue-400">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              ))}

              {faqData.filter(section => section.title === "Hosting Services").map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    {section.badge && (
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  {section.items.map((item) => (
                    <AccordionItem key={item.value} value={item.value} className="border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4">
                      <AccordionTrigger className="text-white hover:text-blue-400">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              ))}

          
              {/* General Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">General</h2>
                <AccordionItem value="general-1" className="border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4">
                  <AccordionTrigger className="text-white hover:text-blue-400">
                    How do I get started?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Getting started is easy! Visit hosting.neonnextgeneration.com for web hosting services. Choose your plan
                    and complete the purchase. After purchasing, you'll see a "Login Control Panel" button on your
                    <a href="https://billing.neonnextgeneration.com/services/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">billing dashboard</a>.
                    Our control panel provides easy setup guides and 24/7 support.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="general-2" className="border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4">
                  <AccordionTrigger className="text-white hover:text-blue-400">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    We accept Stripe, PayPal, and all major credit cards via our <a href="https://billing.neonnextgeneration.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">billing platform</a>.
                    All payments are processed securely through encrypted connections.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="general-3" className="border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4">
                  <AccordionTrigger className="text-white hover:text-blue-400">
                    How can I contact support?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Our support team is available 24/7 through multiple channels:
                    Email us at <a href="mailto:support@neonnextgeneration.com" className="text-blue-400 hover:text-blue-300 underline">support@neonnextgeneration.com</a> for technical issues,
                    <a href="mailto:billing@neonnextgeneration.com" className="text-blue-400 hover:text-blue-300 underline">billing@neonnextgeneration.com</a> for payment inquiries,
                    or join our <a href="https://discord.gg/TCyUSF3dbH" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Discord community</a> for real-time help and discussions.
                    Average response time is within 24 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="general-4" className="border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4">
                  <AccordionTrigger className="text-white hover:text-blue-400">
                    How to reset my password on the hosting portal?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    To reset your hosting panel account password, first log in via your billing dashboard following the steps in our "How do I get started?" section above if you haven't already.

                  <br></br> <br></br> <strong>Steps to reset your password:</strong>
                    <ol className="list-decimal list-inside mt-2 mb-4 space-y-1">
                      <li>Navigate to your <a href="https://billing.neonnextgeneration.com/services/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">services</a> and select the service you've purchased</li>
                      <li>Click on the "Login Control Panel" button available in the actions</li>
                      <li>Once on your hosting panel account, go to the settings page or click <a href="https://hosting.neonnextgeneration.com/profile" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">here</a> directly</li>
                      <li>Reset your password through the profile settings</li>
                    </ol>

                    <strong>If you haven't reset your password before:</strong> You can request a password reset from us by providing account proof through our <a href="https://discord.gg/TCyUSF3dbH" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">company Discord server</a>.
                  </AccordionContent>
                </AccordionItem>


              </div>
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-4">
              Can't find what you're looking for?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-black rounded-full transition-colors duration-200 hover:bg-gray-100"
            >
              Contact Our Support Team
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;