import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (submissionError) {
      if (submissionError.code === 'auth/invalid-credential' || submissionError.code === 'auth/user-not-found' || submissionError.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else {
        setError(submissionError.message || 'Unable to sign in with the provided credentials.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (submissionError) {
      setError(submissionError.message || 'Unable to sign in with Google.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="panel p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slatebrand-500">Secure access</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slatebrand-900">Sign in to your workspace</h1>
        <p className="mt-3 muted-text">Use your email and password to access scan uploads, reports, and monitoring tools.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slatebrand-700">Email</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slatebrand-700">Password</label>
            <input
              type="password"
              className="input-field"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </div>
          {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
          <button type="submit" className="button-primary w-full" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <span className="w-1/5 border-b border-slatebrand-200 dark:border-slatebrand-700 lg:w-1/4"></span>
          <p className="text-xs text-center uppercase text-slatebrand-500 dark:text-slatebrand-400">or sign in with</p>
          <span className="w-1/5 border-b border-slatebrand-200 dark:border-slatebrand-700 lg:w-1/4"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="button-secondary mt-6 w-full gap-2"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>

        <p className="mt-6 text-sm text-slatebrand-600">
          Need an account?{' '}
          <Link to="/register" className="font-semibold text-slatebrand-800">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
