export default function StatCard({ label, value, note }) {
  return (
    <div className="panel p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slatebrand-500 dark:text-slatebrand-400">
        {label}
      </p>
      <p className="mt-4 text-4xl font-extrabold tracking-tight text-slatebrand-900 dark:text-white">
        {value}
      </p>
      {note ? <p className="mt-3 text-sm text-slatebrand-600 dark:text-slatebrand-300">{note}</p> : null}
    </div>
  );
}
