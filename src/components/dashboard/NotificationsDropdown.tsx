import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, User, Trophy, MessageSquare } from "lucide-react";
import { motion } from 'framer-motion';

const notifications = [
  {
    id: 1,
    type: 'submission',
    title: 'New Challenge Submission',
    message: 'John Doe submitted a solution to Rwanda Tech Innovation Challenge',
    time: '2 minutes ago',
    icon: Trophy,
  },
  {
    id: 2,
    type: 'participant',
    title: 'New Participant',
    message: 'Alice Smith joined the FinTech Hackathon',
    time: '1 hour ago',
    icon: User,
  },
  {
    id: 3,
    type: 'comment',
    title: 'New Comment',
    message: 'Bob left a comment on your challenge',
    time: '2 hours ago',
    icon: MessageSquare,
  },
];

const NotificationsDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-primary/10 text-primary`}>
                  <notification.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-gray-600 text-sm">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-2 border-t border-gray-100">
          <Button variant="ghost" className="w-full text-sm text-primary">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown; 