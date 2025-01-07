import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, Settings, LogOut, Plus,
  ChevronRight, Sparkles, TrendingUp, Activity, BarChart,
  Search, Filter, Building2, ArrowRight, Bell, Mail, Shield,
  PenTool, Eye, Archive, Calendar, DollarSign, Award, Trophy,
  Play, CheckCircle, Download, InboxIcon, Github, List, LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Challenge } from '@/types/user';
import { Switch } from "@/components/ui/switch";
import { getCurrentUser, signOut } from '@/services/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { Stats } from '@/components/partner-dashboard/Stats';
import { NewChallengeForm } from '@/components/partner-dashboard/NewChallengeForm';
import { SubmissionsTable } from '@/components/partner-dashboard/SubmissionsTable';
import { OverviewView } from '@/components/partner-dashboard/OverviewView';
import { SettingsView } from '@/components/partner-dashboard/SettingsView';

const PartnerDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showNewChallengeModal, setShowNewChallengeModal] = useState(false);
  const navigate = useNavigate();
  //const [user, setUser] = useState<User | null>(null);
  const user: User = {
    id: '1',
    fullName: 'John Doe',
    email: 'partner-approved@qiesta.com',
    userType: 'partner',
    app_metadata: {},
    user_metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    aud: 'authenticated'
  }

  // New challenge form state
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    prize: '',
    deadline: '',
    requirements: '',
    categories: '',
    status: 'draft',
    maxParticipants: '',
    submissionFormat: 'github', // or 'file' or 'url'
    evaluationCriteria: '',
    termsAndConditions: ''
  });

  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({
    score: '',
    comments: '',
    status: 'pending'
  });

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const currentUser = await getCurrentUser();
  //     if (!currentUser) {
  //       navigate('/signin');
  //     } else if (currentUser.role !== 'partner') {
  //       navigate('/dashboard');
  //     } else if (currentUser.status === 'pending') {
  //       navigate('/partner-pending');
  //     }
  //     setUser(currentUser);
  //   };
  //   loadUser();
  // }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    // Add challenge creation logic here
    toast.success('Challenge created successfully!');
    setShowNewChallengeModal(false);
  };

  // Mock data with more realistic information
  const stats = [
    {
      label: 'Active Challenges',
      value: '5',
      change: '+2 this month',
      icon: Trophy,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Total Participants',
      value: '842',
      change: '+156 this month',
      icon: Users,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      label: 'Total Prize Pool',
      value: '$175K',
      change: '+$45K this month',
      icon: DollarSign,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      label: 'Success Rate',
      value: '87%',
      change: '+12% this month',
      icon: Award,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'AI Innovation Challenge 2024',
      description: 'Looking for breakthrough AI solutions in healthcare',
      organization: 'TechCorp International',
      status: 'active',
      participants: 234,
      submissions: 89,
      progress: 75,
      daysLeft: 12,
      prize: '$75,000',
      deadline: '2024-05-20',
      categories: ['AI', 'Healthcare'],
      createdAt: '2024-01-15',
      updatedAt: '2024-03-01'
    },
    {
      id: '2',
      title: 'Sustainable Energy Challenge',
      description: 'Developing renewable energy solutions for rural areas',
      organization: 'TechCorp International',
      status: 'draft',
      participants: 0,
      submissions: 0,
      progress: 0,
      daysLeft: 30,
      prize: '$50,000',
      deadline: '2024-06-15',
      categories: ['CleanTech', 'Sustainability'],
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01'
    }
  ];

  const submissions = [
    {
      id: '1',
      title: 'AI Healthcare Assistant',
      challengeId: '1',
      challengeTitle: 'AI Innovation Challenge 2024',
      participant: {
        name: 'John Smith',
        email: 'john@example.com',
        avatar: 'https://ui-avatars.com/api/?name=John+Smith'
      },
      status: 'pending',
      submittedAt: '2024-03-15T10:30:00Z',
      score: null,
      feedback: '',
      githubUrl: 'https://github.com/johnsmith/ai-healthcare'
    },
    {
      id: '2',
      title: 'Smart Diagnosis System',
      challengeId: '1',
      challengeTitle: 'AI Innovation Challenge 2024',
      participant: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson'
      },
      status: 'reviewed',
      submittedAt: '2024-03-14T15:45:00Z',
      score: 85,
      feedback: 'Excellent implementation with good documentation.'
    }
  ];

  const renderMainContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <OverviewView
            stats={stats}
            recentChallenges={challenges}
            onViewAllChallenges={() => setActiveView('challenges')}
            onViewChallenge={(challenge) => {
              console.log('View challenge:', challenge);
              // Add your view challenge logic here
            }}
          />
        );

      case 'challenges':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Challenge Management</h2>
                <p className="text-gray-600">Create and manage your innovation challenges</p>
              </div>
              <Button 
                onClick={() => setShowNewChallengeModal(true)}
                className="bg-primary text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Challenge
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all" className="flex-1">All Challenges</TabsTrigger>
                <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                <TabsTrigger value="draft" className="flex-1">Drafts</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6">
                  {challenges.map((challenge) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                              {challenge.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              {challenge.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {challenge.categories.map((category) => (
                                <Badge 
                                  key={category}
                                  variant="secondary" 
                                  className="bg-primary/10 text-primary"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge 
                            variant="secondary"
                            className={`${
                              challenge.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : challenge.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            } rounded-lg px-3 py-1`}
                          >
                            {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                          </Badge>
                          <p className="text-primary font-semibold">
                            {challenge.prize}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="grid grid-cols-3 gap-6">
                            <div>
                              <p className="text-sm text-gray-500">Participants</p>
                              <p className="font-medium">{challenge.participants}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Submissions</p>
                              <p className="font-medium">{challenge.submissions}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Time Left</p>
                              <p className="font-medium">{challenge.daysLeft} days</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <PenTool className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            {challenge.status === 'draft' ? (
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                <Play className="h-4 w-4 mr-1" />
                                Publish
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Archive className="h-4 w-4 mr-1" />
                                Archive
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'submissions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Submissions</h2>
                <p className="text-gray-600">Review and evaluate challenge submissions</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="text-gray-600">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline" className="text-gray-600">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <InboxIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    Today
                  </Badge>
                </div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-gray-600">New Submissions</p>
              </div>
              {/* Add more stat cards */}
            </div>

            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search submissions..."
                        className="pl-10 w-[300px]"
                      />
                    </div>
                    <select className="border border-gray-200 rounded-lg px-3 py-2">
                      <option value="all">All Challenges</option>
                      {challenges.map(challenge => (
                        <option key={challenge.id} value={challenge.id}>
                          {challenge.title}
                        </option>
                      ))}
                    </select>
                    <select className="border border-gray-200 rounded-lg px-3 py-2">
                      <option value="all">All Status</option>
                      <option value="pending">Pending Review</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Challenge
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Participant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-primary/10 rounded-lg mr-3">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{submission.title}</div>
                              {submission.githubUrl && (
                                <a 
                                  href={submission.githubUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline flex items-center"
                                >
                                  <Github className="h-3 w-3 mr-1" />
                                  View Repository
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mr-2"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setShowSubmissionModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {submission.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-primary"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setShowFeedbackModal(true);
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing 1 to 10 of 97 submissions
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission View Modal */}
            <Dialog open={showSubmissionModal} onOpenChange={setShowSubmissionModal}>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Submission Details</DialogTitle>
                </DialogHeader>
                {selectedSubmission && (
                  <div className="space-y-6">
                    {/* Add submission details */}
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Feedback Modal */}
            <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Review Submission</DialogTitle>
                </DialogHeader>
                <form className="space-y-6">
                  {/* Add feedback form */}
                </form>
              </DialogContent>
            </Dialog>
          </div>
        );

      case 'settings':
        return (
          <SettingsView
            user={user}
            onSaveChanges={() => {
              toast.success('Settings saved successfully!');
              // Add your save logic here
            }}
          />
        );

      default:
        return null;
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
            <div className="space-y-6">
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                  Main
                </div>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      activeView === 'overview' 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveView('overview')}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Overview
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      activeView === 'challenges' 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveView('challenges')}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Challenges
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      activeView === 'submissions' 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveView('submissions')}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Submissions
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                  Settings
                </div>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      activeView === 'settings' 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveView('settings')}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 p-8">
        {renderMainContent()}
      </main>

      {/* New Challenge Modal */}
      <Dialog open={showNewChallengeModal} onOpenChange={setShowNewChallengeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Create New Challenge</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateChallenge} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                    placeholder="Enter challenge title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-gray-200 p-2"
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                    placeholder="Describe your challenge"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Prize</label>
                  <Input
                    value={newChallenge.prize}
                    onChange={(e) => setNewChallenge({ ...newChallenge, prize: e.target.value })}
                    placeholder="e.g. $10,000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Categories</label>
                  <Input
                    value={newChallenge.categories}
                    onChange={(e) => setNewChallenge({ ...newChallenge, categories: e.target.value })}
                    placeholder="e.g. AI, Healthcare (comma separated)"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Deadline</label>
                  <Input
                    type="date"
                    value={newChallenge.deadline}
                    onChange={(e) => setNewChallenge({ ...newChallenge, deadline: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Max Participants</label>
                  <Input
                    type="number"
                    value={newChallenge.maxParticipants}
                    onChange={(e) => setNewChallenge({ ...newChallenge, maxParticipants: e.target.value })}
                    placeholder="Enter maximum participants"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Submission Format</label>
                  <select
                    value={newChallenge.submissionFormat}
                    onChange={(e) => setNewChallenge({ ...newChallenge, submissionFormat: e.target.value })}
                    className="w-full rounded-md border border-gray-200 p-2"
                    required
                  >
                    <option value="github">GitHub Repository</option>
                    <option value="file">File Upload</option>
                    <option value="url">Project URL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Evaluation Criteria</label>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-gray-200 p-2"
                    value={newChallenge.evaluationCriteria}
                    onChange={(e) => setNewChallenge({ ...newChallenge, evaluationCriteria: e.target.value })}
                    placeholder="Enter evaluation criteria"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Terms and Conditions</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-gray-200 p-2"
                value={newChallenge.termsAndConditions}
                onChange={(e) => setNewChallenge({ ...newChallenge, termsAndConditions: e.target.value })}
                placeholder="Enter terms and conditions"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowNewChallengeModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Create Challenge
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnerDashboard; 