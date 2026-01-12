"use client";

import React from 'react';
import StarField from '@/components/StarField';
import SpaceElements from '@/components/SpaceElements';
import { motion } from 'framer-motion';

const Privacy = () => {
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
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <h1 className="text-4xl font-bold mb-8 italic text-center">Privacy Policy</h1>
          <p className="text-gray-400 mb-8 italic text-center">Effective Date: January 13, 2026</p>

          <p className="mb-8 italic">
            At Neon Next Generation PTY LTD (“we,” “our,” or “us”), your privacy and security are our top priorities. This Privacy Policy explains how we collect, use, share, and protect your personal data in compliance with applicable privacy frameworks.
            By using our services, you agree that your personal data may be processed under applicable privacy laws depending on your location.
          </p>

          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect personal data lawfully and transparently. This includes:
          </p>
          <ul className="mb-8 italic">
            <li>Contact details: name, email, phone number, mailing address, company name (if applicable)</li>
            <li>Account and service usage data: login activity, VPN connection timestamps, IP addresses, server usage, browser type, device info.</li>
            <li>Payment information: billing details, invoices, subscription plan details (handled securely via third-party payment processors)</li>
            <li>Cookies and tracking data <a href="#cookies-and-tracking">(see Section 4)</a></li>
            <li>Voluntarily provided information: support requests, feedback, forms, surveys, and messages</li>
          </ul>
          <p className="mb-8 italic">
            We collect sensitive data only with explicit consent and never sell personal information.
          </p>

          <h2 className="text-2xl font-bold mb-4">Legal Basis for Processing</h2>
          <p className="mb-4">
            We process personal data under applicable privacy laws using the following bases:
          </p>
          <ul className="mb-8 italic">
            <li>Consent: For marketing communications, newsletters, or non-essential cookies</li>
            <li>Contractual necessity: To provide VPN, hosting, or related services</li>
            <li>Legal obligations: Compliance with taxation, law enforcement, anti-fraud, or other mandatory regulations</li>
            <li>Legitimate interests: Security, fraud prevention, service improvement, infrastructure maintenance, provided these do not override your rights</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use personal data for purposes including:
          </p>
          <ul className="mb-8 italic">
            <li>Service delivery: Account creation, subscription management, VPN and hosting services, technical support</li>
            <li>Communication: Service updates, maintenance notifications, product announcements, promotional offers (with consent)</li>
            <li>Improvement and development: Evaluating service performance, fixing bugs, enhancing functionality</li>
            <li>Security and fraud prevention: Monitoring accounts, servers, and network activity to prevent abuse or attacks</li>
            <li>Legal compliance: Responding to lawful requests and regulatory obligations</li>
          </ul>

          <h2 id="cookies-and-tracking" className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar technologies to enhance services and user experience.
          </p>
          <p className="mb-4">
            Cookie types:
          </p>
          <ul className="mb-8 italic">
            <li>Essential cookies: Required for account login, authentication, and core service functionality</li>
            <li>Performance/analytical cookies: Collect anonymized data to improve service performance</li>
            <li>Functional cookies: Store user preferences, display language, and settings</li>
            <li>Marketing/advertising cookies: Used with consent for relevant offers</li>
          </ul>
          <p className="mb-4">
            Non-essential cookies are activated only after explicit consent. Users can withdraw consent or manage cookies at any time via browser settings. Cookies may expire at session end or persist for up to 12 months for analytics and preferences.
          </p>

          <h2 className="text-2xl font-bold mb-4">Sharing and Disclosure of Data</h2>
          <p className="mb-4">
            We do not sell personal data. Data may be shared with:
          </p>
          <ul className="mb-8 italic">
            <li>Service providers: Hosting, cloud storage, payment processors, analytics providers</li>
            <li>Legal and regulatory authorities: When required by law</li>
            <li>Other third parties: Only with explicit consent or legal permission</li>
          </ul>
          <p className="mb-4">
            International transfers:
          </p>
          <ul className="mb-8 italic">
            <li>Personal data may be transferred outside your country</li>
            <li>Transfers are protected by Standard Contractual Clauses or equivalent safeguards</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">User Rights</h2>
          <p className="mb-4">
            You have the following rights regarding your personal data:
          </p>
          <ul className="mb-8 italic">
            <li>Access and obtain a copy of personal data</li>
            <li>Correct or update inaccurate data</li>
            <li>Request erasure (“right to be forgotten”)</li>
            <li>Restrict or object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with your Data Protection Authority</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Data Security & Retention</h2>
          <p className="mb-4">
            We use industry-standard security measures to protect personal data, including:
          </p>
          <ul className="mb-8 italic">
            <li>Encryption for VPN traffic and sensitive data</li>
            <li>Role-based access controls and authentication</li>
            <li>Secure hosting environments with regular audits</li>
          </ul>
          <p className="mb-4">
            Retention periods:
          </p>
          <ul className="mb-8 italic">
            <li>Account information: While active and up to 2 years after termination</li>
            <li>Financial records: Up to 7 years</li>
            <li>Logs and usage data: Up to 12 months, anonymised where possible</li>
          </ul>
          <p className="mb-8 italic">
            Data is regularly reviewed and securely deleted or anonymised when no longer required.
          </p>

          <h2 className="text-2xl font-bold mb-4">Children’s Privacy</h2>
          <ul className="mb-8 italic">
            <li>Services are not intended for children under 13 (or local minimum age)</li>
            <li>Data from children under this age is deleted immediately</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">VPN & Hosting Monitoring</h2>
          <ul className="mb-8 italic">
            <li>VPN usage: No logging of browsing activity, traffic content, or connection destinations. Minimal operational metrics (server load, uptime) collected for service stability</li>
            <li>Hosting/network monitoring: Only to:</li>
            <ul className="mb-8 italic">
              <li>Ensure compliance with Terms of Service</li>
              <li>Detect and prevent fraud, abuse, or security threats</li>
              <li>Respond to legal obligations</li>
              <li>Investigate reports of illegal activity</li>
            </ul>
          </ul>
          <p className="mb-8 italic">
            Monitoring is limited, transparent, and necessary for service integrity.
          </p>

          <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time as required:
          </p>
          <ul className="mb-8 italic">
            <li>Updates are posted with a revised effective date</li>
            <li>Users should review periodically</li>
            <li>Continued use of services constitutes acceptance of changes</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="mb-8 italic">
            Email: contact@neonnextgeneration.com
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;