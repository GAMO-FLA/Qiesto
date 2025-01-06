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

  // Duplicate the array to create seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="relative bg-white py-20 border-b border-gray-100 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-12">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-semibold tracking-wider text-gray-500"
        >
          TRUSTED BY RWANDA'S LEADING ORGANIZATIONS
        </motion.p>
      </div>

      {/* First Marquee - Left to Right */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
        <div className="overflow-hidden relative">
          <motion.div 
            className="flex space-x-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {duplicatedPartners.map((partner, idx) => (
              <div 
                key={`${partner}-${idx}`}
                className="inline-flex items-center justify-center group/item"
              >
                <span className="text-xl font-semibold bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent group-hover/item:from-primary group-hover/item:to-primary/80 transition-all duration-300">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Second Marquee - Right to Left (Offset) */}
      <div className="relative group mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
        <div className="overflow-hidden relative">
          <motion.div 
            className="flex space-x-12 whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15, // Slightly faster for visual interest
                ease: "linear",
              },
            }}
          >
            {duplicatedPartners.map((partner, idx) => (
              <div 
                key={`${partner}-reverse-${idx}`}
                className="inline-flex items-center justify-center group/item"
              >
                <span className="text-xl font-semibold bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent group-hover/item:from-primary group-hover/item:to-primary/80 transition-all duration-300">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pause on hover overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-transparent to-white z-10" />
    </section>
  );
};