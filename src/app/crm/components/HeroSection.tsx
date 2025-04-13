'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const HeroSection = () => {
  const { theme } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const floatVariant = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const statCounters = [
    { label: "Happy Customers", value: 5000, suffix: "+" },
    { label: "Data Points", value: 1000000, suffix: "+" },
    { label: "Hours Saved", value: 120000, suffix: "+" }
  ];

  return (
    <section className="py-20 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className={`absolute -top-20 -left-20 w-64 h-64 ${theme === 'light' ? 'bg-indigo-500/5' : 'bg-indigo-500/20'} rounded-full blur-3xl z-0`} aria-hidden="true" />
      <div className={`absolute top-40 -right-20 w-80 h-80 ${theme === 'light' ? 'bg-purple-500/5' : 'bg-purple-500/20'} rounded-full blur-3xl z-0`} aria-hidden="true" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r ${theme === 'light' ? 'from-indigo-600 to-purple-700' : 'from-indigo-400 to-purple-500'} bg-clip-text text-transparent mb-6`}
              variants={itemVariants}
            >
              Transform Your Business With Our CRM Solution
            </motion.h1>
            
            <motion.p 
              className={`text-xl md:text-2xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-10`}
              variants={itemVariants}
            >
              Streamline your sales and marketing processes in one place. Boost productivity and watch your business grow.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-12"
              variants={itemVariants}
            >
              <motion.button
                className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Get started with the CRM platform"
                tabIndex={0}
              >
                Get Started
              </motion.button>
              
              <motion.button
                className={`px-8 py-4 rounded-full bg-transparent border-2 ${theme === 'light' ? 'border-indigo-600 text-indigo-600' : 'border-indigo-400 text-indigo-400'} font-semibold transition-colors duration-300`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Learn more about the CRM platform features"
                tabIndex={0}
              >
                Learn More
              </motion.button>
            </motion.div>
            
            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
              variants={itemVariants}
            >
              {statCounters.map((stat, index) => (
                <StatCounter 
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  theme={theme}
                />
              ))}
            </motion.div>
          </div>
          
          {/* Dashboard Illustration */}
          <motion.div
            className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-full h-full max-w-[500px] max-h-[500px]"
              initial="initial"
              animate="animate"
              variants={floatVariant}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'light' ? 'from-indigo-500/10 to-purple-500/10' : 'from-indigo-500/20 to-purple-500/20'} rounded-2xl shadow-xl backdrop-blur-sm transform -rotate-3`} />
              <div className={`absolute inset-0 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-2xl shadow-xl transform rotate-3 border ${theme === 'light' ? 'border-indigo-200' : 'border-indigo-900'}`} />
              
              <div className={`absolute inset-0 m-1 overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-2xl border ${theme === 'light' ? 'border-indigo-300' : 'border-indigo-900/50'} shadow-lg`}>
                <div className={`h-10 w-full bg-gradient-to-r ${theme === 'light' ? 'from-indigo-600 to-purple-700' : 'from-indigo-500 to-purple-600'} flex items-center px-4`}>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                </div>
                
                <div className="p-4 grid grid-cols-4 gap-4">
                  <div className="col-span-1 space-y-4">
                    <div className={`h-8 w-full ${theme === 'light' ? 'bg-indigo-200' : 'bg-gray-700'} rounded`} />
                    <div className={`h-8 w-full ${theme === 'light' ? 'bg-indigo-200' : 'bg-gray-700'} rounded`} />
                    <div className={`h-8 w-full ${theme === 'light' ? 'bg-indigo-200' : 'bg-gray-700'} rounded`} />
                    <div className={`h-8 w-full ${theme === 'light' ? 'bg-indigo-200' : 'bg-gray-700'} rounded`} />
                    <div className={`h-8 w-full ${theme === 'light' ? 'bg-indigo-200' : 'bg-gray-700'} rounded`} />
                  </div>
                  
                  <div className="col-span-3 space-y-4">
                    <div className={`h-32 w-full ${theme === 'light' ? 'bg-indigo-100' : 'bg-gray-700'} rounded-lg`} />
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`h-24 w-full ${theme === 'light' ? 'bg-purple-100' : 'bg-gray-700'} rounded-lg`} />
                      <div className={`h-24 w-full ${theme === 'light' ? 'bg-blue-100' : 'bg-gray-700'} rounded-lg`} />
                    </div>
                    <div className={`h-24 w-full ${theme === 'light' ? 'bg-indigo-100' : 'bg-gray-700'} rounded-lg`} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

interface StatCounterProps {
  label: string;
  value: number;
  suffix?: string;
  theme: 'light' | 'dark';
}

const StatCounter = ({ label, value, suffix = "", theme }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000; // ms
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    const increment = value / totalFrames;
    
    let currentFrame = 0;
    
    const timer = setInterval(() => {
      currentFrame++;
      const newValue = Math.min(Math.floor(increment * currentFrame), value);
      setCount(newValue);
      
      if (currentFrame >= totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / framesPerSecond);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <div className="flex flex-col items-center lg:items-start">
      <div className={`text-3xl font-bold ${theme === 'light' ? 'text-indigo-700' : 'text-indigo-400'}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} font-medium`}>
        {label}
      </div>
    </div>
  );
};

export default HeroSection; 