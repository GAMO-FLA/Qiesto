import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HackathonCard } from '@/components/HackathonCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin, Calendar, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Challenges = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const hackathons = [
    {
      title: "Rwanda Tech Innovation Challenge",
      organizer: "Rwanda ICT Chamber",
      prize: "$25,000",
      participants: 450,
      daysLeft: 14,
      image: "/lovable-uploads/e2721391-268f-467e-a649-b1423b9e99d5.png",
      type: "featured"
    },
    // Add more hackathons...
  ];

  const categories = [
    { id: 'all', label: 'All Challenges', count: 42 },
    { id: 'featured', label: 'Featured', count: 12 },
    { id: 'upcoming', label: 'Upcoming', count: 18 },
    { id: 'active', label: 'Active', count: 8 },
    { id: 'past', label: 'Past', count: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Discover Innovation Challenges
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300"
            >
              Join hackathons, build projects, and connect with Rwanda's tech community
            </motion.p>
          </div>

          {/* Search and Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search challenges..." 
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-4 mb-8 pb-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              onClick={() => setActiveFilter(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Trophy, label: "Total Prize Pool", value: "$125,000" },
            { icon: Users, label: "Active Participants", value: "2,500+" },
            { icon: Calendar, label: "Upcoming Events", value: "18" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl p-6 shadow-sm">
              <Icon className="w-8 h-8 text-primary mb-4" />
              <p className="text-gray-600">{label}</p>
              <h3 className="text-2xl font-bold">{value}</h3>
            </div>
          ))}
        </div>

        {/* Hackathon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.title} {...hackathon} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Challenges; 