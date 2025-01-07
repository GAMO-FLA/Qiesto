import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Badge } from './ui/badge';

export const Partners = () => {
  const partners = [
    {
      name: 'Bank of Kigali',
      type: 'Financial Partner',
      logo: '/logos/bk.svg'
    },
    {
      name: 'MTN Rwanda',
      type: 'Technology Partner',
      logo: '/logos/mtn.svg'
    },
    {
      name: 'Kigali Innovation City',
      type: 'Innovation Hub',
      logo: '/logos/kic.svg'
    },
    {
      name: 'AC Group',
      type: 'Technology Partner',
      logo: '/logos/ac.svg'
    },
    {
      name: 'Inkomoko',
      type: 'Development Partner',
      logo: '/logos/inkomoko.svg'
    },
    {
      name: 'BK Tech House',
      type: 'Technology Partner',
      logo: '/logos/bktech.svg'
    },
    {
      name: 'Zipline Rwanda',
      type: 'Innovation Partner',
      logo: '/logos/zipline.svg'
    }
  ];

  // Duplicate the array to create seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white" />
      
      {/* Animated Dots Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-4 p-1.5 pl-2 pr-3 rounded-full bg-primary/5 text-primary">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Backed by Rwanda's Leading Organizations
          </h2>
          <p className="text-gray-600 text-lg">
            Collaborating with top institutions to drive innovation across East Africa
          </p>
        </motion.div>

        {/* Marquee Sections */}
        <div className="space-y-2">
          {/* First Row - Left to Right */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
            <motion.div 
              className="flex space-x-16 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.map((partner, idx) => (
                <motion.div
                  key={`${partner.name}-${idx}`}
                  whileHover={{ y: -5 }}
                  className="relative group/item"
                >
                  <div className="w-60 h-15 bg-white rounded-2xl shadow-lg shadow-black/[0.03] border border-gray-100 flex flex-col items-center justify-center px-4 py-3 hover:border-primary/20 transition-colors duration-300">
                    <span 
                      className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover/item:from-primary group-hover/item:to-primary/80 transition-all duration-300 truncate w-full text-center -translate-y-0.5 group-hover/item:-translate-y-2" 
                      title={partner.name}
                    >
                      {partner.name}
                    </span>
                    <span 
                      className="text-xs text-gray-500 mt-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 truncate w-full text-center absolute transform translate-y-2 group-hover/item:translate-y-1" 
                      title={partner.type}
                    >
                      {partner.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
            <motion.div 
              className="flex space-x-16 py-4"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.reverse().map((partner, idx) => (
                <motion.div
                  key={`${partner.name}-reverse-${idx}`}
                  whileHover={{ y: -5 }}
                  className="relative group/item"
                >
                  <div className="w-60 h-15 bg-white rounded-2xl shadow-lg shadow-black/[0.03] border border-gray-100 flex flex-col items-center justify-center px-4 py-3 hover:border-primary/20 transition-colors duration-300">
                    <span 
                      className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover/item:from-primary group-hover/item:to-primary/80 transition-all duration-300 truncate w-full text-center -translate-y-0.5 group-hover/item:-translate-y-2" 
                      title={partner.name}
                    >
                      {partner.name}
                    </span>
                    <span 
                      className="text-xs text-gray-500 mt-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 truncate w-full text-center absolute transform translate-y-2 group-hover/item:translate-y-1" 
                      title={partner.type}
                    >
                      {partner.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};