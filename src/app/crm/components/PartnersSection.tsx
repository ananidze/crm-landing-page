'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useEffect, useRef, useState } from 'react';

type PartnerProps = {
  name: string;
  logo: React.ReactNode;
  description: string;
  theme: 'light' | 'dark';
};

const Partner = ({ name, logo, description, theme }: PartnerProps) => {
  return (
    <motion.div
      className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-md p-6 min-w-[280px] h-full flex flex-col items-center transform transition-all mx-3`}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
    >
      <div className={`mb-5 text-center ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>{logo}</div>
      <h3 className={`text-xl font-bold mb-2 text-center ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{name}</h3>
      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-center text-sm`}>{description}</p>
    </motion.div>
  );
};

const PartnersSection = () => {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [isHovering, setIsHovering] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const partners = [
    {
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" strokeWidth="2" stroke="currentColor" fill="none"/>
          <path d="M15.5 9C15.5 10.3807 14.3807 11.5 13 11.5C11.6193 11.5 10.5 10.3807 10.5 9C10.5 7.61929 11.6193 6.5 13 6.5C14.3807 6.5 15.5 7.61929 15.5 9Z" fill="currentColor"/>
          <path d="M8.5 15C8.5 16.3807 7.38071 17.5 6 17.5C4.61929 17.5 3.5 16.3807 3.5 15C3.5 13.6193 4.61929 12.5 6 12.5C7.38071 12.5 8.5 13.6193 8.5 15Z" fill="currentColor"/>
          <path d="M20.5 15C20.5 16.3807 19.3807 17.5 18 17.5C16.6193 17.5 15.5 16.3807 15.5 15C15.5 13.6193 16.6193 12.5 18 12.5C19.3807 12.5 20.5 13.6193 20.5 15Z" fill="currentColor"/>
        </svg>
      ),
      name: "TechFlow",
      description: "Enterprise technology solutions partner specializing in cloud infrastructure."
    },
    {
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9.5L12 4L22 9.5M2 9.5L12 15M2 9.5V19L12 15M22 9.5L12 15M22 9.5V19L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "DataCube",
      description: "Industry leader in business intelligence and data analytics solutions."
    },
    {
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      name: "NetConnect",
      description: "Global networking and security services for growing businesses."
    },
    {
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "CommsAI",
      description: "AI-enhanced customer communication and support platform."
    },
    {
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "DocuSign Pro",
      description: "Comprehensive document workflow and e-signature solutions."
    },
    {
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      name: "IntegrateX",
      description: "Business workflow integration and automation specialists."
    },
    // Duplicate partners to create continuous loop effect
    {
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" strokeWidth="2" stroke="currentColor" fill="none"/>
          <path d="M15.5 9C15.5 10.3807 14.3807 11.5 13 11.5C11.6193 11.5 10.5 10.3807 10.5 9C10.5 7.61929 11.6193 6.5 13 6.5C14.3807 6.5 15.5 7.61929 15.5 9Z" fill="currentColor"/>
          <path d="M8.5 15C8.5 16.3807 7.38071 17.5 6 17.5C4.61929 17.5 3.5 16.3807 3.5 15C3.5 13.6193 4.61929 12.5 6 12.5C7.38071 12.5 8.5 13.6193 8.5 15Z" fill="currentColor"/>
          <path d="M20.5 15C20.5 16.3807 19.3807 17.5 18 17.5C16.6193 17.5 15.5 16.3807 15.5 15C15.5 13.6193 16.6193 12.5 18 12.5C19.3807 12.5 20.5 13.6193 20.5 15Z" fill="currentColor"/>
        </svg>
      ),
      name: "TechFlow",
      description: "Enterprise technology solutions partner specializing in cloud infrastructure."
    },
    {
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9.5L12 4L22 9.5M2 9.5L12 15M2 9.5V19L12 15M22 9.5L12 15M22 9.5V19L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      name: "DataCube",
      description: "Industry leader in business intelligence and data analytics solutions."
    }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      setScrollWidth(scrollRef.current.scrollWidth);
      setContainerWidth(scrollRef.current.offsetWidth);
    }

    // Handle window resize
    const handleResize = () => {
      if (scrollRef.current) {
        setScrollWidth(scrollRef.current.scrollWidth);
        setContainerWidth(scrollRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxScroll = scrollWidth - containerWidth;
    
    if (!isHovering && maxScroll > 0) {
      // Start automatic scrolling animation
      controls.start({
        x: -maxScroll,
        transition: {
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }
      });
    } else {
      // Pause animation when hovering
      controls.stop();
    }
  }, [controls, isHovering, scrollWidth, containerWidth]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={`py-12 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900/50'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Trusted Partners</h2>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
            We collaborate with industry leaders to deliver exceptional solutions for your business.
          </p>
        </motion.div>
        
        <div className="relative max-w-full overflow-hidden">
          {/* Left Control */}
          <button 
            onClick={() => handleScroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-white shadow-md text-gray-700 hover:bg-gray-100' : 'bg-gray-800 shadow-md text-gray-200 hover:bg-gray-700'}`}
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Right Control */}
          <button 
            onClick={() => handleScroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-white shadow-md text-gray-700 hover:bg-gray-100' : 'bg-gray-800 shadow-md text-gray-200 hover:bg-gray-700'}`}
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Gradient masks for fade effect */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 z-[1] pointer-events-none ${theme === 'light' ? 'bg-gradient-to-r from-gray-50 to-transparent' : 'bg-gradient-to-r from-gray-900/50 to-transparent'}`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-16 z-[1] pointer-events-none ${theme === 'light' ? 'bg-gradient-to-l from-gray-50 to-transparent' : 'bg-gradient-to-l from-gray-900/50 to-transparent'}`}></div>
          
          {/* Scrollable content */}
          <div 
            className="relative overflow-x-auto py-10 no-scrollbar"
            ref={scrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="flex"
              animate={controls}
              drag="x"
              dragConstraints={scrollRef}
              onDragStart={() => setIsHovering(true)}
              onDragEnd={() => setIsHovering(false)}
            >
              {partners.map((partner, index) => (
                <Partner
                  key={index}
                  logo={partner.logo}
                  name={partner.name}
                  description={partner.description}
                  theme={theme}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 