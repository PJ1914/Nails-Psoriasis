import { Link } from 'react-router-dom';
import { formatDate, severityTone } from '../utils/formatters';

export default function ReportCard({ report }) {
  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slatebrand-500">
            Scan Report
          </p>
          <h3 className="mt-2 text-xl font-bold text-slatebrand-900">
            NAPSI {report.napsi_score}
          </h3>
          <p className="mt-2 text-sm text-slatebrand-600">{formatDate(report.created_at)}</p>
        </div>
        <span className={`rounded-full px-3 py-2 text-xs font-bold ${severityTone(report.severity)}`}>
          {report.severity}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slatebrand-600">
        {Object.entries(report.features || {}).map(([key, enabled]) => (
          <span
            key={key}
            className={`rounded-full px-3 py-2 ${enabled ? 'bg-slatebrand-100 text-slatebrand-800' : 'bg-slate-100 text-slate-500'}`}
          >
            {key}
          </span>
        ))}
      </div>
      <Link to={`/results/${report.id}`} className="button-secondary mt-6">
        View Details
      </Link>
    </div>
  );
}
