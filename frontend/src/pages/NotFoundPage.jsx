import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="panel max-w-xl p-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slatebrand-500">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-slatebrand-900">Page not found</h1>
        <p className="mt-4 muted-text">The requested page does not exist in this workspace.</p>
        <Link to="/" className="button-primary mt-6">
          Return Home
        </Link>
      </div>
    </div>
  );
}