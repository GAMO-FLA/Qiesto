import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge variant="secondary">{daysLeft} days left</Badge>
        </div>
        <p className="text-gray-600 mb-2">by {organizer}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{prize} in prizes</span>
          <span>{participants} participants</span>
        </div>
      </CardContent>
    </Card>
  );
};