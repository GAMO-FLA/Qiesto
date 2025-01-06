import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Partners } from '@/components/Partners';
import { SearchBar } from '@/components/SearchBar';
import { HackathonCard } from '@/components/HackathonCard';

const Index = () => {
  const hackathons = [
    {
      title: "Rwanda Tech Innovation Challenge",
      organizer: "Rwanda ICT Chamber",
      prize: "$25,000",
      participants: 450,
      daysLeft: 14,
      image: "/lovable-uploads/e2721391-268f-467e-a649-b1423b9e99d5.png"
    },
    {
      title: "East African FinTech Hackathon",
      organizer: "Bank of Kigali",
      prize: "$30,000",
      participants: 380,
      daysLeft: 21,
      image: "/lovable-uploads/e2721391-268f-467e-a649-b1423b9e99d5.png"
    },
    {
      title: "Smart Cities Innovation Challenge",
      organizer: "City of Kigali",
      prize: "$20,000",
      participants: 290,
      daysLeft: 7,
      image: "/lovable-uploads/e2721391-268f-467e-a649-b1423b9e99d5.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Partners />
      <SearchBar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Hackathons</h2>
          <a href="#" className="text-primary hover:underline">
            View all hackathons
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.title} {...hackathon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;