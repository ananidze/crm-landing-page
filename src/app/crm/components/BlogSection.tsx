'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

type BlogPostProps = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  delay: number;
  theme: 'light' | 'dark';
};

const BlogPost = ({ title, excerpt, author, date, image, category, delay, theme }: BlogPostProps) => {
  return (
    <motion.div
      className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-lg overflow-hidden transform transition-all`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute top-4 left-4">
          <span 
            className={`${theme === 'light' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-indigo-500 text-white'} 
              px-3 py-1 rounded-full text-xs font-semibold`}
          >
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{title}</h3>
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-4 text-sm line-clamp-2`}>{excerpt}</p>
        
        <div className="flex justify-between items-center">
          <span className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-sm`}>{author}</span>
          <span className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-sm`}>{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

const BlogSection = () => {
  const { theme } = useTheme();
  
  const blogPosts = [
    {
      title: "5 Ways CRM Can Transform Your Sales Process",
      excerpt: "Discover how implementing a modern CRM solution can dramatically improve your sales pipeline and boost conversion rates.",
      author: "Sarah Johnson",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Sales"
    },
    {
      title: "Integrating AI Into Your Customer Support Workflow",
      excerpt: "Learn how artificial intelligence can enhance your customer support team's efficiency while improving satisfaction rates.",
      author: "Michael Chen",
      date: "May 28, 2023",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Technology"
    },
    {
      title: "The Future of Remote Work and Team Collaboration",
      excerpt: "Explore how CRM platforms are evolving to support distributed teams and maintain productivity in remote environments.",
      author: "Alex Rivera",
      date: "April 12, 2023",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Productivity"
    }
  ];

  return (
    <section className={`py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Latest From Our Blog</h2>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto`}>
            Insights, strategies, and expertise to help your business thrive.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              author={post.author}
              date={post.date}
              image={post.image}
              category={post.category}
              delay={index * 0.1}
              theme={theme}
            />
          ))}
        </div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            className={`px-6 py-3 rounded-full ${
              theme === 'light' 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            } font-semibold transition-colors duration-300`}
            aria-label="View all blog posts"
            tabIndex={0}
          >
            View All Posts
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection; 