import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/providers/AuthProvider';
import { AppRoutes } from './components/AppRoutes';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
