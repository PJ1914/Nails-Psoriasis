import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import { fetchReports, fetchUsers } from '../services/reportService';
import { formatDate, severityTone } from '../utils/formatters';

const severityOptions = ['All', 'Mild', 'Moderate', 'Severe'];

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({ severity: 'All', date: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAdminData = async () => {
      setLoading(true);
      setError('');

      try {
        const [usersResponse, reportsResponse] = await Promise.all([
          fetchUsers(),
          fetchReports({
            severity: filters.severity !== 'All' ? filters.severity : undefined,
            date: filters.date || undefined,
          }),
        ]);

        setUsers(usersResponse.users || []);
        setReports(reportsResponse.reports || []);
      } catch (requestError) {
        setError(requestError.message || 'Unable to load doctor panel data.');
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [filters.date, filters.severity]);

  return (
    <div>
      <PageHeader
        eyebrow="Doctor controls"
        title="Clinical administration panel"
        description="Review registered users, inspect report volume, and filter reported severity across the workspace."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="panel p-5">
          <label className="mb-2 block text-sm font-semibold text-slatebrand-700">Severity</label>
          <select
            className="input-field"
            value={filters.severity}
            onChange={(event) => setFilters((current) => ({ ...current, severity: event.target.value }))}
          >
            {severityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="panel p-5">
          <label className="mb-2 block text-sm font-semibold text-slatebrand-700">Report date</label>
          <input
            type="date"
            className="input-field"
            value={filters.date}
            onChange={(event) => setFilters((current) => ({ ...current, date: event.target.value }))}
          />
        </div>
        <div className="panel flex items-center justify-center p-5 text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slatebrand-500">Current filters</p>
            <p className="mt-3 text-xl font-bold text-slatebrand-900">{filters.severity}</p>
          </div>
        </div>
      </div>

      {loading ? <LoadingSpinner label="Loading doctor panel..." /> : null}
      {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      {!loading && !error ? (
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="panel p-6">
            <h2 className="text-2xl font-bold text-slatebrand-900">Registered users</h2>
            <div className="mt-6 space-y-4">
              {users.map((user) => (
                <div key={user.uid} className="rounded-3xl border border-slatebrand-100 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-slatebrand-900">{user.name}</p>
                      <p className="mt-1 text-sm text-slatebrand-600">{user.email}</p>
                    </div>
                    <span className="rounded-full bg-slatebrand-100 px-3 py-2 text-xs font-bold uppercase text-slatebrand-700">
                      {user.role}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slatebrand-500">Created {formatDate(user.created_at)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="text-2xl font-bold text-slatebrand-900">Reported scans</h2>
            <div className="mt-6 space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="rounded-3xl border border-slatebrand-100 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-slatebrand-900">User {report.user_id}</p>
                      <p className="mt-1 text-sm text-slatebrand-600">NAPSI {report.napsi_score}</p>
                    </div>
                    <span className={`rounded-full px-3 py-2 text-xs font-bold ${severityTone(report.severity)}`}>
                      {report.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slatebrand-500">Created {formatDate(report.created_at)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
