'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useState, useRef, useEffect } from 'react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  image: string;
  index: number;
  theme: 'light' | 'dark';
  isActive: boolean;
  onClick: () => void;
};

const FeatureCard = ({ icon, title, description, benefits, image, index, theme, isActive, onClick }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      setCardDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      setMousePosition({ x, y });
    }
  };

  // Calculate rotation based on mouse position
  const rotateX = isHovered ? (mousePosition.y / cardDimensions.height - 0.5) * 10 : 0;
  const rotateY = isHovered ? -(mousePosition.x / cardDimensions.width - 0.5) * 10 : 0;
  
  // Calculate highlight position
  const highlightX = (mousePosition.x / cardDimensions.width) * 100;
  const highlightY = (mousePosition.y / cardDimensions.height) * 100;

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        ${theme === 'light' 
          ? isActive ? 'bg-white border-2 border-indigo-100' : 'bg-white/90 border border-gray-100 hover:border-indigo-100' 
          : isActive ? 'bg-gray-800 border-2 border-indigo-900' : 'bg-gray-800/90 border border-gray-700 hover:border-indigo-800'
        }
        ${isActive 
          ? 'shadow-2xl shadow-indigo-500/10' 
          : 'shadow-lg'
        }
        transform transition-all duration-300 h-full
      `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: "1000px",
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` 
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      }}
    >
      {/* Reflection/shine effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${highlightX}% ${highlightY}%, ${theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(99, 102, 241, 0.15)'} 0%, ${theme === 'light' ? 'rgba(255, 255, 255, 0)' : 'rgba(99, 102, 241, 0)'} 60%)`,
            opacity: 0.8,
            zIndex: 5
          }}
        />
      )}
      
      {/* Active indicator bar */}
      {isActive && (
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"
          layoutId="activeFeatureIndicator"
        />
      )}
      
      {/* Background effect */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 -z-10 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-indigo-500/80 to-purple-500/80' : 'bg-gradient-to-br from-indigo-800/80 to-purple-900/80'}`}></div>
        </motion.div>
      )}
      
      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
        {/* Icon with animated background */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div 
            className={`
              relative w-16 h-16 rounded-2xl flex items-center justify-center
              ${isActive 
                ? theme === 'light' ? 'bg-indigo-100' : 'bg-indigo-900/30' 
                : theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
              }
              overflow-hidden
            `}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {/* Animated background pattern */}
            {isActive && (
              <motion.div 
                className="absolute inset-0 opacity-20"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.2,
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.8) 0%, transparent 70%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
              />
            )}
            
            <div className={`relative z-10 ${isActive ? (theme === 'light' ? 'text-indigo-600' : 'text-indigo-400') : (theme === 'light' ? 'text-gray-700' : 'text-gray-400')}`}>
              {icon}
            </div>
          </motion.div>
          
          {/* Title */}
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${isActive ? (theme === 'light' ? 'text-indigo-600' : 'text-indigo-400') : (theme === 'light' ? 'text-gray-900' : 'text-white')}`}>
              {title}
            </h3>
            
            {/* Feature pill */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  theme === 'light' ? 'bg-indigo-100 text-indigo-800' : 'bg-indigo-900 text-indigo-200'
                }`}
              >
                Featured
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          {description}
        </p>
        
        {/* Expandable benefits list */}
        <div className="mt-auto">
          <AnimatePresence>
            {isActive && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <div className={`pt-4 mt-2 border-t ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
                  <p className={`text-sm font-semibold mb-3 flex items-center gap-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-200'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Key Benefits
                  </p>
                  <ul className="space-y-2">
                    {benefits.map((benefit, idx) => (
                      <motion.li 
                        key={idx}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.1 }}
                      >
                        <div className={`mt-1 flex-shrink-0 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.button
                    className={`
                      mt-6 px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2
                      ${theme === 'light' 
                        ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' 
                        : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
                      }
                      transition-colors duration-200
                    `}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Learn more about ${title}`}
                    tabIndex={0}
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureSection = () => {
  const { theme } = useTheme();
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Real-time Analytics",
      description: "Track your team's performance with powerful dashboards and insights, helping you make data-driven decisions.",
      benefits: [
        "Interactive performance dashboards",
        "Customizable KPI tracking",
        "Visual data representations",
        "Export reports in multiple formats"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Pipeline Management",
      description: "Visualize and optimize your sales process from lead to close, ensuring no opportunity falls through the cracks.",
      benefits: [
        "Visual kanban board for deal stages",
        "Custom pipeline creation",
        "Automated stage progression",
        "Revenue forecasting tools"
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "Customer Communication",
      description: "Keep all your customer interactions in one place with integrated email, chat, and call tracking features.",
      benefits: [
        "Unified inbox for all channels",
        "Call recording and transcription",
        "Email templates and sequences",
        "Automated follow-up reminders"
      ],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Task Automation",
      description: "Eliminate repetitive tasks and focus on what matters with intelligent workflow automation.",
      benefits: [
        "No-code automation builder",
        "Trigger-based workflows",
        "Multi-step process automation",
        "Time-saving templates"
      ],
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
    }
  ];

  // Automatically rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className={`py-32 relative overflow-hidden ${theme === 'light' ? 'bg-gradient-to-b from-white to-indigo-50/40' : 'bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-900/20'}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-2/3 h-64 bg-gradient-to-bl from-indigo-500/5 to-transparent blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-2/3 h-64 bg-gradient-to-tr from-indigo-500/5 to-transparent blur-3xl" aria-hidden="true"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-float-slow" aria-hidden="true"></div>
      <div className="absolute bottom-1/3 left-1/5 w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 blur-3xl animate-float-slower" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className={`
              px-4 py-1.5 rounded-full text-sm font-medium 
              ${theme === 'light' ? 'bg-indigo-100 text-indigo-800' : 'bg-indigo-900/50 text-indigo-300'}
              inline-flex items-center gap-2
            `}>
              <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-indigo-500' : 'bg-indigo-400'} animate-pulse`}></span>
              Powerful Capabilities
            </span>
          </motion.div>
          
          <h2 className={`
            text-4xl md:text-5xl font-bold mb-6 
            ${theme === 'light' 
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600' 
              : 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400'
            }
          `}>
            Features That Drive Growth
          </h2>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
            Our comprehensive CRM platform provides everything you need to manage customer relationships effectively and scale your business.
          </p>
          
          {/* Feature selection tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-10 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <motion.button
                key={index}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${activeFeature === index
                    ? theme === 'light'
                      ? 'bg-indigo-100 text-indigo-800 ring-2 ring-indigo-200'
                      : 'bg-indigo-900/70 text-indigo-100 ring-2 ring-indigo-700'
                    : theme === 'light'
                      ? 'bg-gray-100 text-gray-800 hover:bg-indigo-50 hover:text-indigo-700'
                      : 'bg-gray-800 text-gray-200 hover:bg-indigo-900/40 hover:text-indigo-300'
                  }
                `}
                onClick={() => setActiveFeature(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
              >
                {feature.title}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              benefits={feature.benefits}
              image={feature.image}
              index={index}
              theme={theme}
              isActive={activeFeature === index}
              onClick={() => setActiveFeature(index)}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            className={`
              px-8 py-4 rounded-xl text-white font-medium
              relative overflow-hidden group
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Explore all features of our CRM platform"
            tabIndex={0}
          >
            {/* Button background with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 bg-size-200 animate-shimmer"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
              Explore All Features
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection; 