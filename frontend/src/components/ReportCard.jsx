import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { formatDate, severityTone } from '../utils/formatters';

export default function ReportCard({ report, onDelete, onEdit }) {
  return (
    <div className="panel p-5 transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slatebrand-500 dark:text-slatebrand-400">
            Scan Report
          </p>
          <h3 className="mt-2 text-xl font-bold text-slatebrand-900 dark:text-white">
            NAPSI {report.napsi_score}
          </h3>
          <p className="mt-2 text-sm text-slatebrand-600 dark:text-slatebrand-300">{formatDate(report.created_at)}</p>
        </div>
        <span className={`rounded-full px-3 py-2 text-xs font-bold ${severityTone(report.severity)}`}>
          {report.severity}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slatebrand-600">
        {Object.entries(report.features || {}).map(([key, enabled]) => (
          <span
            key={key}
            className={`rounded-full px-3 py-2 ${enabled ? 'bg-slatebrand-100 text-slatebrand-800 dark:bg-slatebrand-700 dark:text-slatebrand-200' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}
          >
            {key}
          </span>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <Link to={`/results/${report.id}`} className="button-secondary flex-1">
          View Details
        </Link>
        {onEdit && (
          <button
            onClick={() => onEdit(report)}
            className="flex items-center justify-center rounded-xl border-2 border-slatebrand-200 dark:border-slatebrand-700 px-4 py-2 text-sm font-semibold text-slatebrand-700 dark:text-slatebrand-300 hover:border-slatebrand-300 dark:hover:border-slatebrand-500 hover:bg-slatebrand-50 dark:hover:bg-slatebrand-800 transition-colors"
            title="Edit report"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(report)}
            className="flex items-center justify-center rounded-xl border-2 border-rose-200 dark:border-rose-900/50 px-4 py-2 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:border-rose-300 dark:hover:border-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
            title="Delete report"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
