import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
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
