'use client';

import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import ServicesSection from './components/ServicesSection';
import PartnersSection from './components/PartnersSection';
import BlogSection from './components/BlogSection';
import PricingSection from './components/PricingSection';
import PreviewSection from './components/PreviewSection';
import TestimonialSection from './components/TestimonialSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';
import FluidCursor from './components/FluidCursor';
import { useTheme } from './components/ThemeContext';

export default function CRMPage() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <FluidCursor 
        color={theme === 'dark' ? '#3b82f6' : '#1d4ed8'} 
        size={20}
        trailLength={8}
        trailOpacity={0.3}
        speed={0.5}
      />
      
      <Navbar />
      
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24"
      >
        <HeroSection />
        <FeatureSection />
        <ServicesSection />
        <PreviewSection />
        <PartnersSection />
        <PricingSection />
        <TestimonialSection />
        <BlogSection />
        <Footer />
      </motion.div>
    </div>
  );
} 