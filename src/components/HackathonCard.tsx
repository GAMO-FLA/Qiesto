import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface HackathonCardProps {
  title: string;
  organizer: string;
  prize: string;
  participants: number;
  daysLeft: number;
  image: string;
}

export const HackathonCard = ({
  title,
  organizer,
  prize,
  participants,
  daysLeft,
  image
}: HackathonCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-primary/20 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-black">
          {title}
        </h3>
        <p className="text-gray-400 mb-4">{organizer}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="glass-effect px-4 py-2 rounded-full">
            <span className="text-primary font-semibold">{prize}</span>
          </div>
          <div className="text-sm text-gray-400">
            {participants} participants
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {daysLeft} days left
          </div>
          <Button variant="ghost" className="hover:bg-primary/10">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};