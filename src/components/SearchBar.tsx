import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Find your next hackathon"
            className="w-full pl-10 pr-4 py-2 text-lg"
          />
        </div>
        <Button size="lg" className="whitespace-nowrap">
          Search hackathons
        </Button>
      </div>
    </div>
  );
};