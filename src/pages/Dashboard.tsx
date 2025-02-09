import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signOut } from '@/services/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  LayoutDashboard, Users, Trophy, Settings, LogOut, Plus,
  ChevronRight, ChevronDown, Sparkles, TrendingUp, Activity,
  Target, Search, Star, Key, Bell, Mail, Shield,
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import NotificationsDropdown from '@/components/dashboard/NotificationsDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from "@/lib/utils";
import MobileHeader from '@/components/dashboard/MobileHeader';
import ChallengeCard from '@/components/dashboard/ChallengeCard';
import SearchAndFilter from '@/components/dashboard/SearchAndFilter';
import useChallenges from '@/components/dashboard/useChallenges';
import MobileTabNav from '@/components/dashboard/MobileTabNav';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import LoadingScreen from '@/components/dashboard/LoadingScreen';
import StatsCard from '@/components/dashboard/StatsCard';
import Logo from '@/components/Logo';

const Dashboard = () => {
  const { user: authUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
                
                <SearchAndFilter 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                />
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
                
                <SearchAndFilter 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                />
              
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

              <SearchAndFilter 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />

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
            <Logo class_name="ml-4" />
            
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {MENU_ITEMS.map((menu) => (
                  <div key={menu.label}>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                      {menu.label}
                    </div>
                    {menu.items.map((item) => (
                      <Button 
                        key={item.text}
                        variant="ghost" 
                        className={`w-full justify-start ${
                          activeView === item.text.toLowerCase() 
                            ? 'text-primary bg-primary/5'
                            : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                        } rounded-xl`}
                        onClick={item.action}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.text}
                      </Button>
                    ))}
                  </div>
                ))}
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
          "transition-all duration-200 mt-5 ease-in-out",
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