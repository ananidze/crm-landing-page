'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

type Testimonial = {
  quote: string;
  author: string;
  position: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "This CRM has completely transformed how we manage our customer relationships. The intuitive interface and powerful features have helped us close 30% more deals in the last quarter.",
    author: "Sarah Johnson",
    position: "Sales Director",
    company: "TechGrowth Inc."
  },
  {
    quote: "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that have significantly improved our conversion rates and customer satisfaction.",
    author: "Michael Chen",
    position: "Marketing Manager",
    company: "Innovate Solutions"
  },
  {
    quote: "Implementation was seamless, and the support team was incredible. Our sales team was up and running in less than a day, and we&apos;ve seen measurable ROI within the first month.",
    author: "Jessica Williams",
    position: "Operations Lead",
    company: "Global Ventures"
  }
];

const TestimonialSection = () => {
  const { theme } = useTheme();
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  const handleNext = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setCurrent(index);
  };
  
  return (
    <section className={`py-20 ${theme === 'light' ? 'bg-indigo-50' : 'bg-gray-800/30'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            What Our Customers Say
          </h2>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
            Don&apos;t just take our word for it. See what businesses like yours have achieved with our CRM.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className={`relative overflow-hidden rounded-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-xl p-8 md:p-12 min-h-[300px]`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <svg className="w-12 h-12 text-indigo-400 mb-6" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.5c-1.662 0-3 1.338-3 3 0 .578.205 1.084.535 1.5-.535.416-.852 1.152-.852 2 0 1.662 1.338 3 3 3v-2c-.571 0-1-.429-1-1 0-.571.429-1 1-1h.172c.845 0 1.328-.672 1.328-1.5 0-.828-.655-1.5-1.5-1.5V8.5zm7 0c-1.662 0-3 1.338-3 3 0 .578.205 1.084.535 1.5-.535.416-.852 1.152-.852 2 0 1.662 1.338 3 3 3v-2c-.571 0-1-.429-1-1 0-.571.429-1 1-1h.172c.845 0 1.328-.672 1.328-1.5 0-.828-.655-1.5-1.5-1.5V8.5z" transform="rotate(180 16 16)" />
                  </svg>
                  <p className={`text-xl md:text-2xl font-medium mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'} leading-relaxed`}>
                    {testimonials[current].quote}
                  </p>
                </div>
                <div>
                  <p className={`font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {testimonials[current].author}
                  </p>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {testimonials[current].position}, {testimonials[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={handlePrev}
              className={`p-2 rounded-full ${theme === 'light' ? 'bg-white hover:bg-indigo-50' : 'bg-gray-800 hover:bg-gray-700'} shadow-md ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'} transition-colors`}
              aria-label="Previous testimonial"
              tabIndex={0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === current 
                      ? theme === 'light' ? 'bg-indigo-600' : 'bg-indigo-400' 
                      : theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === current ? 'true' : 'false'}
                  tabIndex={0}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className={`p-2 rounded-full ${theme === 'light' ? 'bg-white hover:bg-indigo-50' : 'bg-gray-800 hover:bg-gray-700'} shadow-md ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'} transition-colors`}
              aria-label="Next testimonial"
              tabIndex={0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 