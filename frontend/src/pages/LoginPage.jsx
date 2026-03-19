import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
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
      setError(submissionError.message || 'Unable to sign in with the provided credentials.');
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
