import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

export default function AdminRoute({ children }) {
  const { profile, loading } = useAuth();

  return (
    <ProtectedRoute>
      {loading ? null : profile?.role === 'doctor' ? children : <Navigate to="/dashboard" replace />}
    </ProtectedRoute>
  );
}
