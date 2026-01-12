"use client";

import React, { useState } from 'react';
import StarField from '@/components/StarField';
import SpaceElements from '@/components/SpaceElements';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // For now, just show an alert
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 mb-12 italic text-center max-w-2xl mx-auto"
          >
            Have questions about our services? Need support? Get in touch with the Neon Next Generation team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Contact Form */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Send us a message</CardTitle>
                <CardDescription className="text-gray-400">
                  Contact form coming soon. Please use the options below to get in touch.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 opacity-50 pointer-events-none">
                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      disabled
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled
                    className="w-full bg-gray-600 text-white cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Get in Touch</CardTitle>
                  <CardDescription className="text-gray-400">
                    Multiple ways to reach our team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <a href="mailto:contact@neonnextgeneration.com" className="text-blue-400 hover:text-blue-300">
                      contact@neonnextgeneration.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Discord</h3>
                    <a href="https://discord.gg/TCyUSF3dbH" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      Join our Discord server
                    </a>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Business Hours</h3>
                    <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM AEST</p>
                    <p className="text-gray-400">Response time: Within 24 hours</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Support Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Technical Support</h3>
                    <p className="text-gray-400">For VPN or hosting issues</p>
                    <a href="mailto:support@neonnextgeneration.com" className="text-blue-400 hover:text-blue-300">
                      support@neonnextgeneration.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Billing Inquiries</h3>
                    <p className="text-gray-400">Questions about payments or subscriptions</p>
                    <a href="mailto:billing@neonnextgeneration.com" className="text-blue-400 hover:text-blue-300">
                      billing@neonnextgeneration.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Community Support</h3>
                    <p className="text-gray-400">Join our Discord for community discussions</p>
                    <a href="https://discord.gg/TCyUSF3dbH" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      discord.gg/TCyUSF3dbH
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;