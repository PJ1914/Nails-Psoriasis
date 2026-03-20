import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/LoadingSpinner';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-sand dark:bg-[#1e292e] text-slatebrand-900 dark:text-sand transition-colors duration-300">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-8 pt-28 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand dark:bg-[#1e292e] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl pt-28">
           <LoadingSpinner label="Authenticating session..." />
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <LoadingSpinner label="Loading module..." />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results/:reportId"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
