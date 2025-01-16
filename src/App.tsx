import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import PartnerDashboard from '@/pages/PartnerDashboard';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Index from '@/pages/Index';
import Challenges from '@/pages/Challenges';
import Projects from '@/pages/Projects';
import Community from '@/pages/Community';
import Dashboard from '@/pages/Dashboard';
import ForgotPassword from '@/pages/ForgotPassword';
import PartnerPending from '@/pages/PartnerPending';

const PartnerRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'partner') {
      navigate('/signin');
    }
  }, [user, navigate]);

  return user?.role === 'partner' ? children : null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/partner-pending" element={<PartnerPending />} />
          <Route 
            path="/partner-dashboard" 
            element={
              <PartnerRoute>
                <PartnerDashboard />
              </PartnerRoute>
            } 
          />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
