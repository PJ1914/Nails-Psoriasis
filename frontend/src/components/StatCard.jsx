export default function StatCard({ label, value, note }) {
  return (
    <div className="panel p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slatebrand-500">
        {label}
      </p>
      <p className="mt-4 text-4xl font-extrabold tracking-tight text-slatebrand-900">
        {value}
      </p>
      {note ? <p className="mt-3 text-sm text-slatebrand-600">{note}</p> : null}
    </div>
  );
}
