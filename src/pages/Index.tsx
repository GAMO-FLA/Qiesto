import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Partners } from '@/components/Partners';
import { SearchBar } from '@/components/SearchBar';
import { HackathonCard } from '@/components/HackathonCard';

const Index = () => {
  const hackathons = [
    {
      title: "Google Cloud x MLB(TM) Hackathon",
      organizer: "Google Cloud",
      prize: "$98,700",
      participants: 4478,
      daysLeft: 7,
      image: "/placeholder.svg"
    },
    {
      title: "AWS Game Builder Challenge",
      organizer: "Amazon Web Services",
      prize: "$160,000",
      participants: 3583,
      daysLeft: 14,
      image: "/placeholder.svg"
    },
    {
      title: "Accelerate App Development",
      organizer: "GitHub",
      prize: "$10,000",
      participants: 2309,
      daysLeft: 21,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Partners />
      <SearchBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Hackathons for you</h2>
          <a href="#" className="text-primary hover:underline">
            Edit your recommendations
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.title} {...hackathon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;