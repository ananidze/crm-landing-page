'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useState } from 'react';

type ServiceProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
  index: number;
  isActive: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
};

const Service = ({ title, description, icon, image, features, index, isActive, onClick, theme }: ServiceProps) => {
  return (
    <motion.div 
      className={`cursor-pointer relative ${isActive ? 'z-10' : 'z-0'}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.div 
        className={`
          flex flex-col md:flex-row items-center gap-4 p-4 md:p-6 rounded-2xl
          ${isActive 
            ? `${theme === 'light' ? 'bg-white shadow-2xl' : 'bg-gray-800 shadow-xl shadow-indigo-500/10'}` 
            : `${theme === 'light' ? 'bg-gray-100/80 hover:bg-gray-100' : 'bg-gray-800/50 hover:bg-gray-800/80'}`
          }
          transition-all duration-300 ease-in-out
        `}
        animate={{ 
          y: isActive ? 0 : 0,
          scale: isActive ? 1 : 0.98,
          opacity: isActive ? 1 : 0.7
        }}
        whileHover={{ 
          y: -5,
          scale: isActive ? 1 : 0.99,
          opacity: isActive ? 1 : 0.9
        }}
      >
        <div className={`
          rounded-xl overflow-hidden ${isActive ? 'md:w-1/3' : 'md:w-20'}
          transition-all duration-500 flex-shrink-0
        `}>
          <div 
            className="w-full aspect-square bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className={`
              p-2 rounded-xl
              ${theme === 'light' 
                ? `${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-700'}`
                : `${isActive ? 'bg-indigo-900/50 text-indigo-400' : 'bg-gray-700/80 text-gray-400'}`}
              transition-colors duration-300
            `}>
              {icon}
            </div>
            <h3 className={`text-xl md:text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {title}
            </h3>
          </div>
          
          <p className={`
            mb-4 text-base
            ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}
            ${!isActive && 'line-clamp-2 md:line-clamp-1'}
          `}>
            {description}
          </p>
          
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <div className={`mt-1 flex-shrink-0 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-6 flex justify-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <button
                  className={`
                    px-5 py-2 rounded-xl text-sm font-medium
                    ${theme === 'light' 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    }
                    transition-colors duration-300 flex items-center gap-2 shadow-md
                  `}
                  aria-label={`Explore ${title}`}
                  tabIndex={0}
                  onClick={(e) => e.stopPropagation()}
                >
                  Explore solution
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {isActive && (
        <motion.div
          className={`absolute -inset-1.5 rounded-3xl -z-10 ${theme === 'light' ? 'bg-gradient-to-br from-indigo-100 via-white to-indigo-50' : 'bg-gradient-to-br from-indigo-900/40 via-transparent to-purple-900/30'}`}
          layoutId="serviceBg"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.div>
  );
};

const ServicesSection = () => {
  const { theme } = useTheme();
  const [activeService, setActiveService] = useState(0);
  
  const services = [
    {
      title: "Sales Automation",
      description: "Streamline your sales process from lead generation to closing deals with our intelligent automation tools.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        "AI-powered lead scoring and prioritization",
        "Automated follow-up sequences",
        "Pipeline visualization and forecasting",
        "Deal analytics and insights",
        "Sales performance dashboards",
        "Territory management"
      ]
    },
    {
      title: "Customer Support",
      description: "Deliver exceptional customer service with our omnichannel support platform designed to enhance customer satisfaction.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        "Unified inbox for email, chat, and social media",
        "AI-powered ticket routing and prioritization",
        "Knowledge base and self-service portals",
        "Customer satisfaction metrics",
        "SLA management and performance tracking",
        "Advanced reporting and analytics"
      ]
    },
    {
      title: "Marketing Automation",
      description: "Create, execute, and measure marketing campaigns that drive engagement and conversion with our integrated marketing suite.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        "Email campaign design and automation",
        "Customer segmentation and targeting",
        "Multi-channel campaign orchestration",
        "A/B testing and optimization",
        "ROI tracking and campaign analytics",
        "Social media management integration"
      ]
    },
    {
      title: "Analytics Dashboard",
      description: "Gain powerful insights into your business with customizable dashboards that visualize critical metrics and performance indicators.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        "Real-time data visualization",
        "Customizable dashboard widgets",
        "Cross-department reporting",
        "KPI tracking and goal setting",
        "Data export and integration options",
        "AI-powered trend identification"
      ]
    }
  ];

  return (
    <section className={`py-20 ${theme === 'light' ? 'bg-gradient-to-b from-white to-gray-50' : 'bg-gradient-to-b from-gray-900 to-gray-900/90'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block">
            <motion.div 
              className={`
                px-4 py-1 rounded-full text-sm font-medium
                ${theme === 'light' ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100' : 'bg-indigo-950 text-indigo-300 ring-1 ring-indigo-800'}
                inline-block mb-3 backdrop-blur-sm
              `}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-indigo-500' : 'bg-indigo-400'}`}></span>
                Enterprise Solutions
              </span>
            </motion.div>
          </div>
          
          <h2 className={`
            text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4
            ${theme === 'light' ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400'}
          `}>
            Comprehensive CRM Services
          </h2>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
            Explore our suite of integrated services designed to transform your customer relationships and grow your business.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {services.map((service, index) => (
              <motion.button
                key={`tab-${index}`}
                onClick={() => setActiveService(index)}
                className={`
                  px-4 py-3 text-center rounded-xl text-sm font-medium transition-all duration-300
                  ${activeService === index 
                    ? `${theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'} shadow-md` 
                    : `${theme === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`
                  }
                `}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {service.title}
              </motion.button>
            ))}
          </div>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <Service
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                features={service.features}
                index={index}
                isActive={activeService === index}
                onClick={() => setActiveService(index)}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 