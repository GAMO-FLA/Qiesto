import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Discover Your Next Challenge
          </h2>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search hackathons by technology, challenge, or organization"
                className="w-full pl-12 pr-4 py-6 text-lg rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
            <Button size="lg" className="px-8 whitespace-nowrap text-lg">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};