import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('partner' | 'participant')[]
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user) {
  //   return <Navigate to="/signin" />;
  // }

  if (allowedRoles && user.role && !allowedRoles.includes(user.role as 'partner' | 'participant')) {
    return <Navigate to={user.role === 'partner' ? '/partner-dashboard' : '/dashboard'} />;
  }

  return <>{children}</>;
};