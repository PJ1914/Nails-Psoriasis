import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);

    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (submissionError) {
      setError(submissionError.message || 'Unable to create your account.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch (submissionError) {
      setError(submissionError.message || 'Unable to sign in with Google.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="panel p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slatebrand-500">New account</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slatebrand-900">Create your Nail Psoriasis profile</h1>
        <p className="mt-3 muted-text">Choose a role, connect your identity, and start collecting structured severity reports.</p>

        <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slatebrand-700">Full name</label>
            <input
              type="text"
              className="input-field"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </div>
          <div className="sm:col-span-2">
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
          <div>
            <label className="mb-2 block text-sm font-semibold text-slatebrand-700">Role</label>
            <select
              className="input-field"
              value={form.role}
              onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:col-span-2">{error}</p> : null}
          <button type="submit" className="button-primary sm:col-span-2" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <span className="w-1/5 border-b border-slatebrand-200 dark:border-slatebrand-700 lg:w-1/4"></span>
          <p className="text-xs text-center uppercase text-slatebrand-500 dark:text-slatebrand-400">or continue with</p>
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
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-slatebrand-800">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
