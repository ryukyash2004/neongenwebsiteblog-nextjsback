"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Check,
  MailCheck,
  Gauge,
  Network,
  Database,
  Globe,
  Hourglass,
  MailPlus,
  HelpCircle,
  Infinity,
  HandHelping,
  LaptopMinimalCheck,
  HeartHandshake,
  Shield,
  PlusSquare,
  Users,
  UserCheck,
  Lock
} from 'lucide-react';
import { pricingTabs, pricingPlans } from '@/lib/pricing-constants';
import ComparisonTable from './ComparisonTable';

const iconMap = {
  cpu: Cpu,
  'memory-stick': MemoryStick,
  'hard-drive': HardDrive,
  check: Check,
  'mail-check': MailCheck,
  gauge: Gauge,
  network: Network,
  database: Database,
  globe: Globe,
  hourglass: Hourglass,
  'mail-plus': MailPlus,
  'help-circle': HelpCircle,
  infinity: Infinity,
  'hand-helping': HandHelping,
  'laptop-minimal-check': LaptopMinimalCheck,
  'heart-handshake': HeartHandshake,
  shield: Shield,
  'plus-square': PlusSquare,
  users: Users,
  'user-check': UserCheck,
  lock: Lock,
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [showComparison, setShowComparison] = useState(false);

  const renderFeature = (feature: any) => {
    const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Check;
    return (
      <div key={feature.text} className={`flex items-center space-x-2 ${feature.opacity ? 'opacity-50' : ''}`}>
        <IconComponent className={`w-4 h-4 ${feature.color}`} />
        <span className="text-sm text-gray-300">{feature.text}</span>
        {feature.badges && feature.badges.map((badge: any, idx: number) => (
          <Badge key={idx} className={`text-xs ${badge.class}`}>
            {badge.text}
          </Badge>
        ))}
      </div>
    );
  };

  const renderPlan = (plan: any) => (
    <motion.div
      key={plan.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative"
    >
      <Card className={`relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm ${plan.featured ? 'ring-2 ring-blue-500' : ''}`}>
        {plan.badge && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-600 text-white">{plan.badge}</Badge>
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
          <CardDescription className="text-gray-400">{plan.description}</CardDescription>
          <div className="text-3xl font-bold text-white mt-4">
            ${plan.price}
            <span className="text-sm text-gray-400">/{plan.period}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-6">
            {plan.features.map(renderFeature)}
          </div>
          <Button
            className="w-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border border-white/20 transition-colors"
            onClick={() => window.open(plan.buttonUrl, '_blank')}
          >
            {plan.buttonText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
      >
        Our Plans
      </motion.h2>

      <div className="text-center text-gray-400 text-sm mb-6">
        (All prices are in AUD)
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/10">
          {pricingTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              disabled={tab.id === 'vpn'}
              className={`text-white data-[state=active]:bg-blue-600 ${
                tab.id === 'vpn' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{tab.label}</span>
                {tab.id === 'vpn' && (
                  <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                    Coming Soon
                  </span>
                )}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {pricingTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingPlans[tab.id]?.map(renderPlan)}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 text-center hidden md:block">
        <Button
          onClick={() => setShowComparison(!showComparison)}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-colors"
        >
          {showComparison ? 'Hide Comparison' : 'Compare Plans'}
        </Button>
      </div>

      {showComparison && (
        <ComparisonTable plans={pricingPlans[activeTab] || []} />
      )}
    </div>
  );
};

export default Pricing;