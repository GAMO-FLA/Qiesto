import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signOut, getCurrentUser } from '@/services/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  LayoutDashboard, Users, Trophy, Settings, LogOut, Plus,
  ChevronRight, ChevronDown, Sparkles, TrendingUp, Activity,
  Target, Search, Filter, Clock, Star, Building2, ArrowRight, Key, Bell, Mail, Shield, Menu, X
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import NewChallengeModal from '@/components/dashboard/NewChallengeModal';
import NotificationsDropdown from '@/components/dashboard/NotificationsDropdown';
import { User } from '@/types/user';
import { useAuth } from '@/lib/auth';
import { cn } from "@/lib/utils";
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { supabase } from '@/lib/supabase';

const ChallengeCard = ({ challenge, index }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  return (
    <motion.div
      key={challenge.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-gray-50 rounded-xl p-4 lg:p-6 hover:bg-gray-100 transition-all cursor-pointer"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-start space-x-4">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-xl flex-shrink-0">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors truncate">
              {challenge.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {challenge.description}
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center text-gray-500 min-w-[140px]">
                <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{challenge.organization}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{challenge.participants} participants</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{challenge.daysLeft} days left</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start space-y-0 lg:space-y-2 flex-shrink-0">
          <Badge 
            variant="secondary"
            className={cn(
              "rounded-lg px-3 py-1",
              challenge.status === 'Active' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            )}
          >
            {challenge.status}
          </Badge>
          <p className="text-primary font-semibold">
            {challenge.prize}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <p className="text-sm text-gray-600">Submissions</p>
              <p className="font-medium">{challenge.submissions}</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-sm text-gray-600">Progress</p>
              <div className="w-full sm:w-32 h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>
          </div>
          <Button variant="ghost" className="text-primary w-full sm:w-auto justify-center">
            View Details
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const SearchAndFilter = ({ searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search challenges..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 w-full"
      />
    </div>
    
    <select
      value={selectedFilter}
      onChange={(e) => setSelectedFilter(e.target.value)}
      className="w-full sm:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm"
    >
      <option value="all">All Status</option>
      <option value="active">Active</option>
      <option value="upcoming">Upcoming</option>
      <option value="completed">Completed</option>
    </select>
  </div>
);

const useChallenges = (allChallenges, searchQuery, selectedFilter) => {
  return useMemo(() => {
    return allChallenges.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.organization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || challenge.status.toLowerCase() === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [allChallenges, searchQuery, selectedFilter]);
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const allChallenges = [
    {
      id: '1',
      title: "Rwanda Tech Innovation Challenge",
      description: "Develop solutions for digital transformation in Rwanda",
      organization: "Rwanda ICT Chamber",
      participants: 450,
      status: "Active",
      submissions: 125,
      progress: 65,
      daysLeft: 14,
      prize: "$50,000",
      deadline: "2024-05-15"
    },
    // ... more challenges
  ];

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  }, [isMobileMenuOpen]);

  const filteredChallenges = useChallenges(allChallenges, searchQuery, selectedFilter);
  const displayedChallenges = showAllChallenges ? filteredChallenges : filteredChallenges.slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  const MENU_ITEMS = [
    {
      label: 'Main',
      items: [
        { 
          icon: LayoutDashboard, 
          text: 'Overview', 
          action: () => setActiveView('overview') 
        },
        { 
          icon: Trophy, 
          text: 'Challenges', 
          action: () => setActiveView('challenges') 
        },
        { 
          icon: Users, 
          text: 'Teams', 
          action: () => setActiveView('teams') 
        },
      ]
    },
    {
      label: 'Settings',
      items: [
        { 
          icon: Settings, 
          text: 'Settings', 
          action: () => setActiveView('settings') 
        },
      ]
    }
  ];

  // Stats data
  const stats = [
    { 
      label: 'Active Challenges', 
      value: '8', 
      change: '+2 this month',
      icon: Trophy,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      label: 'Team Members', 
      value: '24', 
      change: '+5 this month',
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      label: 'Total Submissions', 
      value: '156', 
      change: '+32 this week',
      icon: Target,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    { 
      label: 'Success Rate', 
      value: '92%', 
      change: '+8% this month',
      icon: Star,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    }
  ];

  const teams = [
    {
      id: '1',
      name: 'Innovation Squad',
      members: 5,
      activeChallenges: 3,
      completedChallenges: 8,
    },
    {
      id: '2',
      name: 'Tech Pioneers',
      members: 4,
      activeChallenges: 2,
      completedChallenges: 5,
    },
    {
      id: '3',
      name: 'Digital Transformers',
      members: 6,
      activeChallenges: 4,
      completedChallenges: 10,
    }
  ];

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/signin')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  const StatsCard = ({ stat, index }) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 sm:p-3 rounded-xl ${stat.bg}`}>
          <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
        </div>
        <TrendingUp className="h-4 w-4 text-green-500" />
      </div>
      <p className="text-gray-600 text-xs sm:text-sm mb-1">{stat.label}</p>
      <p className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</p>
      <p className="text-green-500 text-xs sm:text-sm flex items-center">
        <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
        {stat.change}
      </p>
    </motion.div>
  );

  const Header = () => (
    <div className={cn(
      "fixed top-0 right-0 lg:left-72 left-0 z-40 transition-all duration-200",
      "bg-gray-50/80 backdrop-blur-sm",
      isScrolled ? "shadow-sm" : ""
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4 lg:p-0">
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          {/* <div className="flex-1 lg:flex lg:items-center lg:justify-between">
            {/* <div className="lg:flex lg:items-center lg:space-x-6">
              <h2 className="hidden lg:block text-xl font-semibold text-gray-800">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              </h2>
            </div> */}
            {/* <div className="flex items-center space-x-4">
              <NotificationsDropdown />
              <Link to="/challenges" className="hover:no-underline">
                <Button className="bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                  <Plus className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Browse Challenges</span>
                  <span className="sm:hidden">Browse</span>
                </Button>
              </Link>
            </div> 
          </div> */}
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeView) {
      case 'challenges':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Challenges</h2>
                <p className="text-gray-600">Manage and track your innovation challenges</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search challenges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredChallenges.map((challenge, index) => (
                <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
              ))}
            </div>

            {filteredChallenges.length > 3 && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAllChallenges(!showAllChallenges)}
                  className="text-primary hover:bg-primary/5"
                >
                  {showAllChallenges ? 'Show Less' : 'View All Challenges'}
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAllChallenges ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </div>
        );

      case 'teams':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Teams</h2>
                <p className="text-gray-600">Manage your innovation teams</p>
              </div>
              <Button className="bg-primary text-white rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Create New Team
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map((team) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {team.name}
                        </h3>
                        <p className="text-gray-600">{team.members} members</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-primary">
                      Manage
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-gray-600">Active Challenges</p>
                        <p className="font-medium">{team.activeChallenges}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="font-medium">{team.completedChallenges}</p>
                      </div>
                    </div>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Settings</h2>
              <p className="text-gray-600">Manage your account preferences</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input 
                    value={user?.fullName || ''} 
                    className="max-w-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input 
                    value={user?.email || ''} 
                    className="max-w-md"
                    disabled
                  />
                </div>
                <Button variant="outline">
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Challenge Updates',
                    description: 'Get notified about changes to your challenges',
                    icon: Bell
                  },
                  {
                    title: 'Team Messages',
                    description: 'Receive messages from your team members',
                    icon: Mail
                  },
                  {
                    title: 'Security Alerts',
                    description: 'Get important security notifications',
                    icon: Shield
                  }
                ].map((setting) => (
                  <div key={setting.title} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <setting.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{setting.title}</p>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      default:
        return (
          <>          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-6 lg:space-y-0 p-2 lg:p-1">
            <div className="flex-1 lg:flex lg:items-center lg:justify-between gap-8">
              <div className="lg:flex lg:items-center lg:space-x-8 mb-6 lg:mb-0" >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-3 p-2 lg:p-4"
                >
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    Welcome back, {user?.fullName || 'Admin'}
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                    Here's what's happening with your challenges
                  </p>
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-4 w-full lg:w-auto">
                <NotificationsDropdown />
                <Link to="/challenges" className="hover:no-underline">
                  <Button 
                    className="bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                    variant="default"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    <span className="hidden sm:inline">Browse Challenges</span>
                    <span className="sm:hidden">Browse</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatsCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                <h2 className="text-xl font-semibold">Your Challenges</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search challenges..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                  
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full sm:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {displayedChallenges.map((challenge, index) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
                  ))}
                </AnimatePresence>
              </div>

              {filteredChallenges.length > 3 && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllChallenges(!showAllChallenges)}
                    className="text-primary hover:bg-primary/5"
                  >
                    {showAllChallenges ? 'Show Less' : 'View All Challenges'}
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAllChallenges ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50",
        "w-72 transition-transform duration-200 ease-in-out",
        "lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Qiesto
              </h1>
            </Link>
          </div>
          
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                Main
              </div>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${
                  activeView === 'overview' 
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                } rounded-xl`}
                onClick={() => setActiveView('overview')}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Overview
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${
                  activeView === 'challenges' 
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                } rounded-xl`}
                onClick={() => setActiveView('challenges')}
              >
                <Trophy className="mr-3 h-5 w-5" />
                Challenges
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${
                  activeView === 'teams' 
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                } rounded-xl`}
                onClick={() => setActiveView('teams')}
              >
                <Users className="mr-3 h-5 w-5" />
                Teams
              </Button>

              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2 mt-8">
                Settings
              </div>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${
                  activeView === 'settings' 
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                } rounded-xl`}
                onClick={() => setActiveView('settings')}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Button>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {user?.fullName?.[0] || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user?.fullName || 'Admin User'}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>
        {/* Update the main content */}
        <main className={cn(
          "transition-all duration-200 ease-in-out",
          "lg:ml-72 px-4 sm:px-6 lg:px-8",
          "pt-16 sm:pt-20 pb-12" // Reduced from pt-20 sm:pt-24
        )}>
          <div className="max-w-7xl mx-auto space-y-4"> {/* Reduced from space-y-6 */}
            {renderMainContent()}
          </div>
        </main>
    </div>
  );
};

export default Dashboard; 