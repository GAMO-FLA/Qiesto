import { motion } from 'framer-motion';
import { Stats } from './Stats';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, ChevronRight, Clock, Users, 
  FileText, ArrowUpRight, Activity 
} from 'lucide-react';
import { Challenge } from '@/types/user';

interface OverviewViewProps {
  stats: Array<{
    label: string;
    value: string;
    change: string;
    icon: any;
    color: string;
    bg: string;
  }>;
  recentChallenges: Challenge[];
  onViewAllChallenges: () => void;
  onViewChallenge: (challenge: Challenge) => void;
}

export const OverviewView = ({
  stats,
  recentChallenges,
  onViewAllChallenges,
  onViewChallenge
}: OverviewViewProps) => {
  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <Stats stats={stats} />

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Challenges */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Challenges</h3>
            <Button variant="ghost" size="sm" onClick={onViewAllChallenges}>
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentChallenges.slice(0, 3).map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onViewChallenge(challenge)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    challenge.status === 'active' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <FileText className={`h-5 w-5 ${
                      challenge.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {challenge.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {challenge.participants} participants
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-6">
            {[
              {
                type: 'submission',
                title: 'New submission received',
                challenge: 'AI Innovation Challenge',
                time: '2 hours ago',
                icon: FileText,
                color: 'text-blue-600',
                bg: 'bg-blue-100'
              },
              {
                type: 'participant',
                title: 'New participant joined',
                challenge: 'Sustainable Energy Challenge',
                time: '5 hours ago',
                icon: Users,
                color: 'text-green-600',
                bg: 'bg-green-100'
              },
              {
                type: 'deadline',
                title: 'Challenge deadline approaching',
                challenge: 'Healthcare Innovation',
                time: '1 day left',
                icon: Clock,
                color: 'text-yellow-600',
                bg: 'bg-yellow-100'
              }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className={`p-2 rounded-lg ${activity.bg}`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.challenge}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Challenge Performance</h3>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              label: 'Average Submissions',
              value: '24',
              change: '+12%',
              trend: 'up'
            },
            {
              label: 'Completion Rate',
              value: '78%',
              change: '+5%',
              trend: 'up'
            },
            {
              label: 'Participant Engagement',
              value: '92%',
              change: '+8%',
              trend: 'up'
            }
          ].map((metric, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
              <p className={`text-sm mt-2 flex items-center ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                {metric.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 