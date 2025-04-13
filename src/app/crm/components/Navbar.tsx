'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from './ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggle();
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300 ${
        scrolled ? 'bg-opacity-90 backdrop-blur-sm shadow-md' : 'bg-opacity-0'
      } ${scrolled ? (theme === 'light' ? 'bg-white' : 'bg-gray-900') : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/crm" className="text-2xl font-bold tracking-tight">
            CRM<span className="text-blue-500">Pro</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="#features" className="hover:text-blue-500 transition-colors">Features</Link>
          <Link href="#preview" className="hover:text-blue-500 transition-colors">Preview</Link>
          <Link href="#testimonials" className="hover:text-blue-500 transition-colors">Testimonials</Link>
          <Link href="#contact" className="hover:text-blue-500 transition-colors">Contact</Link>
          <Link 
            href="#demo" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Request Demo
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            tabIndex={0}
            className="focus:outline-none"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span 
                className={`h-0.5 w-full transform transition-all duration-300 ${
                  isOpen 
                    ? `rotate-45 translate-y-2 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}` 
                    : theme === 'light' ? 'bg-gray-900' : 'bg-white'
                }`}
              />
              <span 
                className={`h-0.5 w-full transition-all duration-300 ${
                  isOpen ? 'opacity-0' : theme === 'light' ? 'bg-gray-900' : 'bg-white'
                }`}
              />
              <span 
                className={`h-0.5 w-full transform transition-all duration-300 ${
                  isOpen 
                    ? `-rotate-45 -translate-y-2 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}` 
                    : theme === 'light' ? 'bg-gray-900' : 'bg-white'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden absolute left-0 right-0 ${
          isOpen ? 'block' : 'hidden'
        } ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} shadow-lg`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
          <Link 
            href="#features" 
            className="py-2 hover:text-blue-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link 
            href="#preview" 
            className="py-2 hover:text-blue-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Preview
          </Link>
          <Link 
            href="#testimonials" 
            className="py-2 hover:text-blue-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            href="#contact" 
            className="py-2 hover:text-blue-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="#demo" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-center"
            onClick={() => setIsOpen(false)}
          >
            Request Demo
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar; 