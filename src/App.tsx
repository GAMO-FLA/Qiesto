import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/providers/AuthProvider';
import { Header } from './components/Header';
import { Toaster } from 'sonner';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="pt-16"> {/* Add padding to account for fixed header */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/community" element={<Community />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes with Role Checks */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['participant']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/partner-dashboard"
              element={
                <ProtectedRoute allowedRoles={['partner']}>
                  <PartnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/partner-pending" 
              element={
                <ProtectedRoute allowedRoles={['partner']}>
                  <PartnerPending />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
