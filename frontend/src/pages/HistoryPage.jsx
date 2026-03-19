import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import LineChart from '../components/LineChart';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import ReportCard from '../components/ReportCard';
import { fetchHistory } from '../services/reportService';

export default function HistoryPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const response = await fetchHistory();
        const nextReports = response.reports || [];
        setReports(nextReports);
      } catch (requestError) {
        setError(requestError.message || 'Unable to load report history.');
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Longitudinal view"
        title="Historical NAPSI reports"
        description="Review previous image-based predictions and inspect score movement over time."
      />

      {loading ? <LoadingSpinner label="Loading report history..." /> : null}
      {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      {!loading && !error ? (
        reports.length ? (
          <div className="space-y-8">
            <LineChart data={[...reports].reverse()} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {reports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No historical reports"
            description="Start by uploading a scan, then come back here to track severity progression over time."
            action={<Link to="/upload" className="button-primary">Upload a scan</Link>}
          />
        )
      ) : null}
    </div>
  );
}
