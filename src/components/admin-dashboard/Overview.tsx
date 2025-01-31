import StatsCard from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { 
    Users, MessagesSquare, Building2, Timer,
    ChevronRight, ArrowUpRight, CheckCircle, XCircle
  } from 'lucide-react';

export default function Overview({ setActiveView }) {
    // Mock stats data
  const stats = [
    { 
      label: 'Pending Applications', 
      value: '12', 
      change: '+3 today',
      icon: Timer,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    { 
      label: 'Active Partners', 
      value: '156', 
      change: '+12 this month',
      icon: Building2,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      label: 'Open Tickets', 
      value: '28', 
      change: '-5 this week',
      icon: MessagesSquare,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      label: 'Total Users', 
      value: '2.4k', 
      change: '+240 this month',
      icon: Users,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    }
  ];

  return (
    <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatsCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>

            {/* Recent Partner Applications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Partner Applications</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveView('partners')}
                >
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="divide-y divide-gray-100">
                {/* Sample partner applications */}
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">TechCorp International</h3>
                        <p className="text-sm text-gray-500">Applied 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Tickets Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Support Tickets</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveView('support')}
                >
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="divide-y divide-gray-100">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <MessagesSquare className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Payment Issue</h3>
                        <p className="text-sm text-gray-500">From: john@example.com</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
  )
}
