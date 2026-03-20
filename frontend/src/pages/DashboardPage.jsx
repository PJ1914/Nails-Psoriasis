import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ReportCard from '../components/ReportCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { fetchHistory } from '../services/reportService';
import { formatDate } from '../utils/formatters';

export default function DashboardPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await fetchHistory();
        setReports(response.reports || []);
      } catch (requestError) {
        setError(requestError.message || 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [user]);

  const latestReport = reports[0];
  const averageScore = reports.length
    ? Math.round(reports.reduce((total, report) => total + report.napsi_score, 0) / reports.length)
    : 0;

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Clinical severity dashboard"
        description="Track recent NAPSI measurements, review image-based assessments, and continue with new uploads."
        actions={<Link to="/upload" className="button-primary">New Scan</Link>}
      />

      {loading ? <LoadingSpinner label="Loading your scan history..." /> : null}
      {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      {!loading && !error ? (
        <>
          <div className="grid gap-5 md:grid-cols-3">
            <StatCard label="Total scans" value={reports.length} note="All stored reports linked to your account." />
            <StatCard
              label="Last NAPSI"
              value={latestReport ? latestReport.napsi_score : '--'}
              note={latestReport ? `Recorded ${formatDate(latestReport.created_at)}` : 'No scans yet.'}
            />
            <StatCard label="Average score" value={reports.length ? averageScore : '--'} note="Calculated from your full available history." />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slatebrand-900">Recent reports</h2>
              {reports.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {reports.slice(0, 4).map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No reports yet"
                  description="Upload your first nail image to generate a structured severity assessment."
                  action={<Link to="/upload" className="button-primary">Upload a scan</Link>}
                />
              )}
            </div>

            <div className="panel p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slatebrand-500">Quick actions</p>
              <div className="mt-6 grid gap-4">
                <Link to="/upload" className="rounded-3xl bg-slatebrand-900 p-5 text-white">
                  <p className="text-lg font-bold">Start a new assessment</p>
                  <p className="mt-2 text-sm text-slatebrand-100">Upload a fresh clinical image and trigger the prediction API.</p>
                </Link>
                <Link to="/history" className="rounded-3xl bg-white p-5 shadow-soft">
                  <p className="text-lg font-bold text-slatebrand-900">Review longitudinal history</p>
                  <p className="mt-2 text-sm text-slatebrand-600">Inspect previous results and monitor changes over time.</p>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
