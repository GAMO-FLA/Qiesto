import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SearchBar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Find Your Next Innovation Challenge
          </h2>
          <p className="text-gray-600 text-center mb-8 text-lg">
            Search through hundreds of challenges from leading organizations
          </p>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex gap-3 bg-white rounded-xl p-2 shadow-xl border border-gray-100">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by technology, challenge type, or organization..."
                  className="w-full pl-12 pr-4 py-6 text-lg rounded-xl border-0 focus:ring-2 focus:ring-primary/20 bg-transparent"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-4">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Active Challenges</DropdownMenuItem>
                  <DropdownMenuItem>Upcoming</DropdownMenuItem>
                  <DropdownMenuItem>Prize Amount</DropdownMenuItem>
                  <DropdownMenuItem>Category</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                size="lg" 
                className="px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6 gap-4">
            <Badge variant="outline" className="px-3 py-1">
              Technology
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Healthcare
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Sustainability
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              FinTech
            </Badge>
          </div>
        </motion.div>
      </div>
    </div>
  );
};