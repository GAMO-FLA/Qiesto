import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCurrentUser, signOut } from '@/services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  LayoutDashboard, Users, Trophy, Settings, LogOut, Plus,
  ChevronRight, ChevronDown, Sparkles, TrendingUp, Activity,
  Target, Search, Filter, Clock, Star, Building2, ArrowRight, Key, Bell, Mail, Shield
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import NewChallengeModal from '@/components/dashboard/NewChallengeModal';
import NotificationsDropdown from '@/components/dashboard/NotificationsDropdown';
import { User } from '@/types/user';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('overview');
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  // Challenge data
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

  const filteredChallenges = allChallenges
    .filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.organization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || challenge.status.toLowerCase() === selectedFilter;
      return matchesSearch && matchesFilter;
    });

  const displayedChallenges = showAllChallenges ? filteredChallenges : filteredChallenges.slice(0, 3);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate('/signin');
      } else if (currentUser.role === 'partner') {
        navigate('/partner-dashboard');
      }
      setUser(currentUser);
    };
    loadUser();
  }, [navigate]);

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
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {challenge.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-gray-500">
                            <Building2 className="h-4 w-4 mr-1" />
                            {challenge.organization}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            {challenge.participants} participants
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {challenge.daysLeft} days left
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge 
                        variant="secondary"
                        className={`${
                          challenge.status === 'Active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        } rounded-lg px-3 py-1`}
                      >
                        {challenge.status}
                      </Badge>
                      <p className="text-primary font-semibold">
                        {challenge.prize}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm text-gray-600">Submissions</p>
                          <p className="font-medium">{challenge.submissions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Progress</p>
                          <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${challenge.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-primary">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
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
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.fullName || 'Admin'}
                  </h1>
                  <p className="text-gray-600">
                    Here's what's happening with your challenges
                  </p>
                </motion.div>
              </div>
              <div className="flex items-center space-x-4">
                <NotificationsDropdown />
                <Link to="/challenges" className="hover:no-underline">
                  <Button className="bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                    <Plus className="mr-2 h-5 w-5" />
                    Browse Challenges
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-green-500 text-sm flex items-center">
                    <Activity className="h-4 w-4 mr-1" />
                    {stat.change}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Challenges Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Challenges</h2>
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search challenges..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  {/* Filter */}
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

              {/* Challenges List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {displayedChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <Trophy className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                              {challenge.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              {challenge.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center text-gray-500">
                                <Building2 className="h-4 w-4 mr-1" />
                                {challenge.organization}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Users className="h-4 w-4 mr-1" />
                                {challenge.participants} participants
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {challenge.daysLeft} days left
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge 
                            variant="secondary"
                            className={`${
                              challenge.status === 'Active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            } rounded-lg px-3 py-1`}
                          >
                            {challenge.status}
                          </Badge>
                          <p className="text-primary font-semibold">
                            {challenge.prize}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="text-sm text-gray-600">Submissions</p>
                              <p className="font-medium">{challenge.submissions}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Progress</p>
                              <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                                <div 
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${challenge.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" className="text-primary">
                            View Details
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
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
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 z-50">
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

      {/* Main Content */}
      <main className="ml-72 p-8">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Dashboard; 