import React from 'react';
import { motion } from 'framer-motion';

export const Partners = () => {
  const partners = [
    'Bank of Kigali',
    'MTN Rwanda',
    'Kigali Innovation City',
    'AC Group',
    'Inkomoko Entrepreneur Development',
    'BK Tech House',
    'Zipline Rwanda'
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="bg-white py-16 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-semibold tracking-wider text-gray-500 mb-12"
        >
          TRUSTED BY RWANDA'S LEADING ORGANIZATIONS
        </motion.p>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center"
        >
          {partners.map((partner) => (
            <motion.div 
              key={partner}
              variants={item}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
              <div className="relative text-lg md:text-xl font-bold bg-gradient-to-r from-gray-600 to-gray-400 group-hover:from-primary group-hover:to-primary/80 bg-clip-text text-transparent transition-all duration-300 text-center p-4">
                {partner}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};