import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!isAuthenticated() || !user) {
    return <Navigate to="/signin" replace />;
  }

  // If roles are specified, check if user has permission
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect partners to partner dashboard and participants to regular dashboard
    return <Navigate to={user.role === 'partner' ? '/partner-dashboard' : '/dashboard'} replace />;
  }

  return <>{children}</>;
}; 