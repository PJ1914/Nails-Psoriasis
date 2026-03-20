import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import LineChart from '../components/LineChart';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import ReportCard from '../components/ReportCard';
import { useAuth } from '../hooks/useAuth';
import { fetchHistory, updateReport, deleteReport } from '../services/reportService';

export default function HistoryPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingReport, setEditingReport] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editForm, setEditForm] = useState({
    notes: '',
    needs_review: false
  });

  useEffect(() => {
    const loadReports = async () => {
      if (!user) {
        return;
      }

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
  }, [user]);

  const handleEdit = (report) => {
    setEditingReport(report);
    setEditForm({
      notes: report.notes || '',
      needs_review: report.needs_review || false
    });
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      await updateReport(editingReport.id, editForm);
      
      // Reload reports
      const response = await fetchHistory();
      setReports(response.reports || []);
      setEditingReport(null);
      setError('');
    } catch (requestError) {
      setError(requestError.message || 'Failed to update report.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (report) => {
    setDeleteConfirm(report);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await deleteReport(deleteConfirm.id);
      
      // Remove from local state
      setReports(reports.filter(r => r.id !== deleteConfirm.id));
      setDeleteConfirm(null);
      setError('');
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete report.');
    } finally {
      setLoading(false);
    }
  };

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
                <ReportCard
                  key={report.id}
                  report={report}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
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

      {/* Edit Modal */}
      {editingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="panel m-4 w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-slatebrand-900">Edit Report</h2>
            <p className="mt-2 text-sm text-slatebrand-600">
              Update notes or review status for this report.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slatebrand-700">
                  Notes
                </label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  rows={4}
                  className="mt-2 w-full rounded-xl border-2 border-slatebrand-200 px-4 py-3 text-slatebrand-900 focus:border-slatebrand-400 focus:outline-none"
                  placeholder="Add any notes about this report..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="needs_review"
                  checked={editForm.needs_review}
                  onChange={(e) => setEditForm({ ...editForm, needs_review: e.target.checked })}
                  className="h-5 w-5 rounded border-slatebrand-300 text-slatebrand-600 focus:ring-slatebrand-500"
                />
                <label htmlFor="needs_review" className="text-sm font-semibold text-slatebrand-700">
                  Needs Review
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSaveEdit}
                className="button-primary flex-1"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingReport(null)}
                className="button-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="panel m-4 w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-rose-900">Delete Report?</h2>
            <p className="mt-2 text-sm text-slatebrand-600">
              Are you sure you want to delete this report? This action cannot be undone.
            </p>

            <div className="mt-4 rounded-xl bg-slatebrand-50 p-4">
              <div className="text-sm">
                <p className="font-semibold text-slatebrand-900">
                  NAPSI Score: {deleteConfirm.napsi_score}
                </p>
                <p className="text-slatebrand-600">
                  Severity: {deleteConfirm.severity}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl border-2 border-rose-600 bg-rose-600 px-6 py-3 font-bold text-white hover:border-rose-700 hover:bg-rose-700"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="button-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
