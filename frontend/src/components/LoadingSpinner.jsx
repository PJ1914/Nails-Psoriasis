export default function LoadingSpinner({ label = 'Loading data...' }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-slatebrand-600">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slatebrand-200 border-t-slatebrand-700" />
      <span>{label}</span>
    </div>
  );
}
