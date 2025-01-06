import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, MessageSquare, Trophy, ArrowRight, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  timeAgo: string;
}

const Community = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Jean Paul Habimana',
        avatar: '/lovable-uploads/e2721391-268f-467e-a649-b1423b9e99d5.png',
        role: 'Full Stack Developer'
      },
      content: 'Just completed the Rwanda Tech Innovation Challenge! Excited to share our team\'s solution for smart urban mobility. Check out our project showcase! 🚀',
      image: '/lovable-uploads/e2721391-268f-467e-a649-b1423b9e99d5.png',
      likes: 124,
      comments: 28,
      shares: 15,
      tags: ['Innovation', 'TechRwanda', 'SmartCity'],
      timeAgo: '2 hours ago'
    },
    // Add more posts...
  ];

  const categories = [
    { id: 'trending', label: 'Trending', count: 28 },
    { id: 'latest', label: 'Latest', count: 45 },
    { id: 'following', label: 'Following', count: 12 },
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
              Join Rwanda's Tech Community
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300"
            >
              Connect, share, and grow with fellow innovators and tech enthusiasts
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Create Post */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm mb-8"
          >
            <div className="flex gap-4">
              <Avatar className="w-10 h-10" />
              <div className="flex-1">
                <Input 
                  placeholder="Share your thoughts with the community..." 
                  className="bg-gray-50 border-0"
                />
              </div>
              <Button>Post</Button>
            </div>
          </motion.div>

          {/* Category Filters */}
          <div className="flex overflow-x-auto gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeTab === category.id ? "default" : "outline"}
                onClick={() => setActiveTab(category.id)}
                className="whitespace-nowrap"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12" />
                    <div>
                      <h3 className="font-semibold">{post.author.name}</h3>
                      <p className="text-sm text-gray-500">{post.timeAgo}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{post.content}</p>

                  {post.image && (
                    <div className="relative h-64 mb-4 rounded-xl overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        {post.shares}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community; 