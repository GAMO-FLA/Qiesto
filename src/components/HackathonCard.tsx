import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Users, Award } from 'lucide-react';

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
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          <Badge 
            variant="secondary" 
            className="absolute top-4 right-4 bg-white/90 text-gray-800"
          >
            {daysLeft} days left
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">by {organizer}</p>
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>{prize} in prizes</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{participants} participants</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Ends in {daysLeft} days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};