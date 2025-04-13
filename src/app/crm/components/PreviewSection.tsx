'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from './ThemeContext';

const PreviewSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Powerful Interface, Intuitive Design
          </h2>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
            Discover how our CRM platform helps you manage your business with ease.
          </p>
        </motion.div>
        
        <motion.div
          style={{ scale, opacity, y }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1 md:p-2 rounded-3xl shadow-2xl">
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} rounded-2xl overflow-hidden`}>
              <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} py-2 px-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} flex items-center`}>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-5 h-[500px] md:h-[600px]">
                {/* Sidebar */}
                <div className={`col-span-1 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'} border-r ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} p-4`}>
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-md bg-indigo-600 mr-3"></div>
                    <div className={`font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>CRM Pro</div>
                  </div>
                  
                  <nav>
                    <ul className="space-y-2">
                      {['Dashboard', 'Contacts', 'Deals', 'Tasks', 'Calendar', 'Reports'].map((item, i) => (
                        <li key={i} className={`px-3 py-2 rounded-md ${i === 0 
                          ? `${theme === 'light' ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900/30 text-indigo-400'}` 
                          : `${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                {/* Main content */}
                <div className="col-span-4 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Dashboard</h3>
                    <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} rounded-full px-4 py-1`}>This Week</div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'New Leads', value: '24', change: '+12%' },
                      { label: 'Deals Won', value: '8', change: '+5%' },
                      { label: 'Revenue', value: '$16,204', change: '+18%' }
                    ].map((stat, i) => (
                      <div key={i} className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-4 rounded-xl shadow-sm border ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
                        <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
                        <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{stat.value}</div>
                        <div className="text-xs text-green-500">{stat.change}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-4 rounded-xl shadow-sm border ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'} mb-6 h-48`}>
                    <div className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-2`}>Sales Performance</div>
                    <div className="h-32 flex items-end space-x-2">
                      {[40, 65, 35, 50, 75, 80, 60].map((height, i) => (
                        <div key={i} className="w-full h-full flex items-end">
                          <div 
                            className={`w-full ${theme === 'light' ? 'bg-indigo-500' : 'bg-indigo-600'} rounded-t-sm`} 
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent activity */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Recent Activity</h4>
                      <span className={`text-sm ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>View All</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { user: 'Alex Morgan', action: 'created a new deal', time: '2h ago' },
                        { user: 'Sarah Chen', action: 'scheduled a meeting', time: '4h ago' },
                        { user: 'John Smith', action: 'updated contact information', time: '6h ago' }
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <div className={`w-8 h-8 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} mr-3`}></div>
                          <div>
                            <span className={`font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{activity.user}</span>
                            <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}> {activity.action}</span>
                            <span className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} ml-2`}>{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PreviewSection; 