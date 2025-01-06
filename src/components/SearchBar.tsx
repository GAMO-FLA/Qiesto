import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const SearchBar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Discover Your Next Challenge
          </h2>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex gap-3 bg-white rounded-lg p-1 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search hackathons by technology, challenge, or organization"
                  className="w-full pl-12 pr-4 py-6 text-lg rounded-lg border-gray-200 focus:border-primary focus:ring-primary bg-transparent"
                />
              </div>
              <Button 
                size="lg" 
                className="px-8 whitespace-nowrap text-lg bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};