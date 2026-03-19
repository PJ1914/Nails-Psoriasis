import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

export default function AdminRoute({ children }) {
  const { profile } = useAuth();

  return (
    <ProtectedRoute>
      {profile?.role === 'doctor' ? children : <Navigate to="/dashboard" replace />}
    </ProtectedRoute>
  );
}
