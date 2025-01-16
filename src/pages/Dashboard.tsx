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
import { useAuth } from '@/contexts/AuthContext';
import { cn } from "@/lib/utils";
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ProfileDropdown = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm"
        className="rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">
            {user?.fullName?.[0] || 'A'}
          </span>
        </div>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-40">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium truncate">{user?.fullName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onSignOut();
              }}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const MobileHeader = ({ user, onSignOut }) => (
  <div className={cn(
    "lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md",
    "border-b border-gray-200 px-3 py-2"
  )}>
    <div className="flex items-center justify-between gap-2">
      <Link to="/" className="flex items-center gap-1.5">
        <div className="p-1.5 bg-primary/10 rounded-lg">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <span className="font-semibold text-base">Qiesto</span>
      </Link>
      
      <div className="flex items-center gap-1">
        <NotificationsDropdown />
        <ProfileDropdown user={user} onSignOut={onSignOut} />
      </div>
    </div>
  </div>
);

const ChallengeCard = ({ challenge, index }) => {
  return (
    <motion.div
      key={challenge.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-gray-100 transition-all cursor-pointer"
    >
      <div className="flex flex-col space-y-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary/10 rounded-xl flex-shrink-0">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-base sm:text-lg group-hover:text-primary transition-colors truncate">
                {challenge.title}
              </h3>
              <Badge 
                variant="secondary"
                className={cn(
                  "shrink-0 text-xs rounded-lg px-2 py-1",
                  challenge.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                )}
              >
                {challenge.status}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {challenge.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
          <div className="flex items-center text-gray-500">
            <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{challenge.organization}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span>{challenge.participants} participants</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span>{challenge.daysLeft} days left</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm">
                <span className="text-gray-600">Prize:</span>
                <span className="ml-1 text-primary font-semibold">{challenge.prize}</span>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-gray-600">Submissions:</span>
                <span className="ml-1 font-medium">{challenge.submissions}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Progress</span>
                <span className="text-xs font-medium">{challenge.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>
          </div>
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

const MobileTabNav = ({ activeView, setActiveView }) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 px-1 pb-safe">
    <div className="flex justify-around py-1">
      {[
        { icon: LayoutDashboard, label: 'Overview', value: 'overview' },
        { icon: Trophy, label: 'Challenges', value: 'challenges' },
        { icon: Users, label: 'Teams', value: 'teams' },
        { icon: Settings, label: 'Settings', value: 'settings' }
      ].map(tab => (
        <button
          key={tab.value}
          onClick={() => setActiveView(tab.value)}
          className={cn(
            "flex flex-col items-center px-3 py-2 rounded-lg transition-colors",
            "active:bg-gray-100 touch-none select-none",
            activeView === tab.value 
              ? "text-primary" 
              : "text-gray-500"
          )}
        >
          <tab.icon className="h-5 w-5" />
          <span className="text-xs mt-1 font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const WelcomeSection = ({ user }) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8 mb-6">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-2"
    >
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
        Welcome {user?.fullName || 'Admin'} !
      </h1>
      <p className="text-gray-600 text-sm lg:text-base">
        Here's what's happening with your challenges
      </p>
    </motion.div>
  </div>
);

const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative mb-4">
        <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Loading your dashboard</h2>
      <p className="text-sm text-gray-500">Please wait while we fetch your data...</p>
    </motion.div>
  </div>
);

const Dashboard = () => {
  const { user: authUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error signing out');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!authUser) {
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

  const StatsCard = ({ stat, index }) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`p-1.5 sm:p-2 rounded-xl ${stat.bg}`}>
          <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
        </div>
        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
      </div>
      <p className="text-gray-600 text-xs sm:text-sm mb-1">{stat.label}</p>
      <p className="text-lg sm:text-xl font-bold mb-1">{stat.value}</p>
      <p className="text-green-500 text-xs flex items-center">
        <Activity className="h-3 w-3 mr-1" />
        {stat.change}
      </p>
    </motion.div>
  );

  const filteredChallenges = useChallenges(allChallenges, searchQuery, selectedFilter);
  const displayedChallenges = showAllChallenges ? filteredChallenges : filteredChallenges.slice(0, 3);

  const renderMainContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-5 sm:space-y-6 lg:space-y-8">
            <WelcomeSection user={authUser} />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <StatsCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Your Challenges</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:bg-primary/5"
                    onClick={() => setActiveView('challenges')}
                  >
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search challenges..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 py-2 text-sm"
                    />
                  </div>
                  
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {displayedChallenges.map((challenge, index) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1">Your Challenges</h2>
                <p className="text-sm text-gray-600">Manage and track your innovation challenges</p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search challenges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 py-2 text-sm w-full"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>

                  <Button 
                    size="sm"
                    className="bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">New Challenge</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredChallenges.map((challenge, index) => (
                <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
              ))}
            </div>

            {filteredChallenges.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                  <Trophy className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No challenges found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        );

      case 'teams':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1">Your Teams</h2>
                <p className="text-sm text-gray-600">Manage your innovation teams</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search teams..."
                    className="pl-9 py-2 text-sm w-full"
                  />
                </div>
                <Button 
                  size="sm"
                  className="bg-primary text-white rounded-lg hover:bg-primary/90 w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Create New Team
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teams.map((team) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg truncate">{team.name}</h3>
                      <p className="text-sm text-gray-600">{team.members} members</p>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">Active Challenges</p>
                            <p className="font-medium">{team.activeChallenges}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Completed</p>
                            <p className="font-medium">{team.completedChallenges}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Settings</h2>
              <p className="text-sm text-gray-600">Manage your account preferences</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-4"
            >
              <h3 className="text-base font-medium mb-3">Profile Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <Input 
                    value={authUser?.fullName || ''} 
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <Input 
                    value={authUser?.email || ''} 
                    className="w-full"
                    disabled
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Key className="h-4 w-4 mr-1.5" />
                  Change Password
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-4"
            >
              <h3 className="text-base font-medium mb-3">Notifications</h3>
              <div className="space-y-3">
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
                  <div key={setting.title} className="flex items-start justify-between gap-3 py-1">
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                        <setting.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{setting.title}</p>
                        <p className="text-xs text-gray-600">{setting.description}</p>
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
                    Welcome back, {authUser?.fullName || 'Admin'}
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatsCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 mb-8">
              <div className="flex flex-col space-y-4 mb-4">
                <h2 className="text-lg sm:text-xl font-semibold">Your Challenges</h2>
                <div className="flex flex-col space-y-3">
                  <div className="relative w-full">
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
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
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
      <MobileHeader 
        user={authUser}
        onSignOut={handleSignOut}
      />

      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50",
        "w-72 hidden lg:block"
      )}>
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
                    {authUser?.fullName?.[0] || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{authUser?.fullName || 'Admin User'}</p>
                  <p className="text-sm text-gray-500">{authUser?.email}</p>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>
        <main className={cn(
          "transition-all duration-200 ease-in-out",
          "lg:ml-72",
          "px-3 sm:px-6 lg:px-8",
          "pt-14 pb-20 lg:pb-12",
        )}>
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </main>

      <MobileTabNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default Dashboard; 