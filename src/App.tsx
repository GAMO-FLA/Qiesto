import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Challenges from './pages/Challenges';
import Projects from './pages/Projects';
import Community from './pages/Community';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import PartnerPending from './pages/PartnerPending';
import PartnerDashboard from './pages/PartnerDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { User } from '@/types/user';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/services/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  // Create a route renderer function to ensure we have fresh user data
  const renderDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    return currentUser?.role === 'partner' ? <PartnerDashboard /> : <Dashboard />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/community" element={<Community />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {renderDashboard()}
            </ProtectedRoute>
          }
        />
        <Route path="/partner-pending" element={<PartnerPending />} />
      </Routes>
    </Router>
  );
}

export default App;
