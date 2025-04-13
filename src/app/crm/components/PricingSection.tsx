'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useState } from 'react';

type PricingTier = 'monthly' | 'annual';

type PlanFeature = {
  name: string;
  included: boolean;
  highlighted?: boolean;
};

type PricingPlanProps = {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  ctaText: string;
  theme: 'light' | 'dark';
  pricingTier: PricingTier;
};

const PricingPlan = ({ name, price, description, features, isPopular, ctaText, theme, pricingTier }: PricingPlanProps) => {
  return (
    <motion.div 
      className={`
        relative rounded-3xl overflow-hidden
        ${theme === 'light' 
          ? 'bg-white border-2 border-gray-100' 
          : 'bg-gray-800 border-2 border-gray-700'
        }
        ${isPopular 
          ? theme === 'light' ? 'shadow-[0_20px_50px_rgba(79,70,229,0.15)]' : 'shadow-[0_20px_50px_rgba(79,70,229,0.2)]' 
          : 'shadow-xl'
        }
        h-full
        backdrop-blur-sm
      `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -right-12 top-7 rotate-45 w-40 py-1 text-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-md z-10">
          Most Popular
        </div>
      )}
      
      {/* Background gradient for popular plan */}
      {isPopular && (
        <div className={`absolute inset-0 -z-10 ${theme === 'light' ? 'opacity-5' : 'opacity-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-3xl" />
        </div>
      )}
      
      {/* Plan content */}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Plan name */}
          <h3 className={`text-2xl font-bold mb-3 ${isPopular ? theme === 'light' ? 'text-indigo-600' : 'text-indigo-400' : theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {name}
          </h3>
          
          {/* Description */}
          <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {description}
          </p>
          
          {/* Price */}
          <div className={`mb-6 p-5 rounded-2xl ${isPopular ? theme === 'light' ? 'bg-indigo-50' : 'bg-indigo-900/20' : theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'}`}>
            <div className="flex items-baseline">
              <span className={`text-5xl font-extrabold tracking-tight ${isPopular ? theme === 'light' ? 'text-indigo-600' : 'text-indigo-400' : theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                ${pricingTier === 'monthly' ? price.monthly : price.annual}
              </span>
              <span className={`ml-2 text-xl ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                /{pricingTier === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
            
            {/* Savings tag */}
            {pricingTier === 'annual' && (
              <div className="mt-2 bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full inline-block">
                Save ${(price.monthly * 12 - price.annual).toFixed(0)}/year
              </div>
            )}
          </div>
          
          {/* Features */}
          <div className="space-y-4 mb-8">
            <p className={`text-sm font-semibold uppercase tracking-wider ${isPopular ? theme === 'light' ? 'text-indigo-600' : 'text-indigo-400' : theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Features included:
            </p>
            
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className={`flex items-start gap-3 ${feature.highlighted ? 'p-2 -mx-2 rounded-lg ' + (theme === 'light' ? 'bg-indigo-50' : 'bg-indigo-900/10') : ''}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={`flex-shrink-0 mt-1 ${
                  feature.included 
                    ? (feature.highlighted 
                      ? 'text-indigo-600 bg-indigo-100 rounded-full p-0.5' 
                      : theme === 'light' ? 'text-indigo-600' : 'text-indigo-400')
                    : theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.included ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${
                  feature.included 
                    ? (feature.highlighted 
                      ? 'font-medium text-gray-900 dark:text-white' 
                      : theme === 'light' ? 'text-gray-700' : 'text-gray-300') 
                    : theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {feature.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Button */}
        <motion.button
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-center 
            ${isPopular 
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
              : theme === 'light' 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200' 
                : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
            }
            transition-all duration-200 transform
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={`Sign up for ${name} plan`}
          tabIndex={0}
        >
          {ctaText}
        </motion.button>
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const { theme } = useTheme();
  const [pricingTier, setPricingTier] = useState<PricingTier>('monthly');
  
  const plans = [
    {
      name: "Basic",
      price: {
        monthly: 29,
        annual: 290,
      },
      description: "Everything you need to get started with your small business or startup.",
      features: [
        { name: "Up to 5 team members", included: true },
        { name: "1,000 contacts", included: true },
        { name: "Email support", included: true },
        { name: "Basic analytics dashboard", included: true },
        { name: "Sales pipeline management", included: true },
        { name: "Mobile app access", included: true },
        { name: "Advanced automation", included: false },
        { name: "Custom reporting", included: false },
        { name: "API access", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      ctaText: "Start Free Trial",
      isPopular: false,
    },
    {
      name: "Pro",
      price: {
        monthly: 79,
        annual: 790,
      },
      description: "Powerful tools for growing teams with advanced needs and priority support.",
      features: [
        { name: "Up to 20 team members", included: true },
        { name: "10,000 contacts", included: true },
        { name: "Priority email & chat support", included: true, highlighted: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Sales pipeline management", included: true },
        { name: "Mobile app access", included: true },
        { name: "Advanced automation", included: true, highlighted: true },
        { name: "Custom reporting", included: true, highlighted: true },
        { name: "API access", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      ctaText: "Start Free Trial",
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: {
        monthly: 199,
        annual: 1990,
      },
      description: "Custom solutions for organizations needing maximum scalability and support.",
      features: [
        { name: "Unlimited team members", included: true, highlighted: true },
        { name: "Unlimited contacts", included: true, highlighted: true },
        { name: "24/7 phone & priority support", included: true, highlighted: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Sales pipeline management", included: true },
        { name: "Mobile app access", included: true },
        { name: "Advanced automation", included: true },
        { name: "Custom reporting", included: true },
        { name: "API access", included: true, highlighted: true },
        { name: "Dedicated account manager", included: true, highlighted: true },
      ],
      ctaText: "Contact Sales",
      isPopular: false,
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-3">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${theme === 'light' ? 'bg-indigo-100 text-indigo-800' : 'bg-indigo-900/50 text-indigo-300'} inline-block`}>
              Transparent Pricing
            </span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Choose Your Plan
          </h2>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto mb-10`}>
            Select the perfect plan for your business needs with our simple, no-hidden-fees pricing.
          </p>
          
          {/* Toggle switch */}
          <div className="flex justify-center items-center mb-12">
            <span className={`mr-3 ${pricingTier === 'monthly' ? 'font-semibold ' + (theme === 'light' ? 'text-gray-900' : 'text-white') : theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Monthly
            </span>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={pricingTier === 'annual'}
                onChange={() => setPricingTier(pricingTier === 'monthly' ? 'annual' : 'monthly')}
                aria-label="Toggle between monthly and annual pricing"
              />
              <div className={`
                w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 
                rounded-full peer dark:bg-gray-700 
                peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border 
                after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 
                peer-checked:bg-indigo-600
              `}></div>
            </label>
            
            <div className="ml-3 flex items-center">
              <span className={`${pricingTier === 'annual' ? 'font-semibold ' + (theme === 'light' ? 'text-gray-900' : 'text-white') : theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Annual
              </span>
              {pricingTier === 'annual' && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Save 20%
                </span>
              )}
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              ctaText={plan.ctaText}
              theme={theme}
              pricingTier={pricingTier}
            />
          ))}
        </div>
        
        <div className="mt-20 text-center max-w-3xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <h3 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Enterprise Solutions
          </h3>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-5`}>
            Need a custom solution tailored to your specific business requirements?
          </p>
          <motion.button
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Contact our sales team for custom solutions"
            tabIndex={0}
          >
            Contact Sales Team
          </motion.button>
        </div>
        
        <div className="mt-10 text-center">
          <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-sm max-w-2xl mx-auto`}>
            All plans include a 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 