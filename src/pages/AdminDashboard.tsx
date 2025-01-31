import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signOut } from '@/services/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  LayoutDashboard, Users, Shield, Settings, LogOut, 
  MessagesSquare, BarChart, Building2, Timer,
  ChevronRight, Search, ArrowUpRight, CheckCircle, XCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from "@/lib/utils";
import MobileHeader from '@/components/dashboard/MobileHeader';
import LoadingScreen from '@/components/dashboard/LoadingScreen';
import Overview from '@/components/admin-dashboard/Overview';
import Partners from '@/components/admin-dashboard/Partners';
import Communities from '@/components/admin-dashboard/Communities';
import Support from '@/components/admin-dashboard/Support';
import Analytics from '@/components/admin-dashboard/Analytics';
import SettingsPanel from '@/components/admin-dashboard/SettingsPanel';

const AdminDashboard = () => {
  const { user: authUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

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
          icon: Building2, 
          text: 'Partner Applications', 
          action: () => setActiveView('partners') 
        },
        { 
          icon: Users, 
          text: 'Communities', 
          action: () => setActiveView('communities') 
        },
        { 
          icon: MessagesSquare, 
          text: 'Support', 
          action: () => setActiveView('support') 
        },
      ]
    },
    {
      label: 'System',
      items: [
        { 
          icon: BarChart, 
          text: 'Analytics', 
          action: () => setActiveView('analytics') 
        },
        { 
          icon: Settings, 
          text: 'Settings', 
          action: () => setActiveView('settings') 
        },
      ]
    }
  ];

  

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

  if (loading) return <LoadingScreen />;
  
  if (!authUser || authUser.role !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  const renderMainContent = () => {
    switch (activeView) {
      case 'overview':
        return <Overview setActiveView={setActiveView}/>;
      case 'partners':
        return <Partners />;
      case 'communities':
        return <Communities />;
      case 'support':
        return <Support />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsPanel />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <MobileHeader 
        user={authUser}
        onSignOut={handleSignOut}
      />

      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-zinc-900 border-r border-zinc-800 z-50",
        "w-72 hidden lg:block"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-zinc-800">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Admin Panel
              </h1>
            </Link>
          </div>
          
          <nav className="flex-1 p-4">
            <div className="space-y-6">
              {MENU_ITEMS.map((menu) => (
                <div key={menu.label}>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                    {menu.label}
                  </div>
                  {menu.items.map((item) => (
                    <Button 
                      key={item.text}
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start mb-1",
                        "text-gray-300 hover:text-white hover:bg-white/10",
                        activeView === item.text.toLowerCase() && "bg-white/10 text-white"
                      )}
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

          <div className="p-4 border-t border-zinc-800">
            <div className="rounded-xl p-4 bg-white/5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {authUser?.fullName?.[0] || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">Admin</p>
                  <p className="text-sm text-gray-400">{authUser?.email}</p>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
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
        "px-4 sm:px-6 lg:px-8",
        "py-8"
      )}>
        <div className="max-w-7xl mx-auto">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;