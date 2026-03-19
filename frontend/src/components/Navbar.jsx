import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const authenticatedLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/upload', label: 'Upload' },
  { to: '/history', label: 'History' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slatebrand-800 text-lg font-extrabold text-white">
            NP
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slatebrand-500">
              Clinical AI
            </p>
            <p className="text-lg font-extrabold tracking-tight text-slatebrand-900">
              Nail Psoriasis Severity
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {isAuthenticated &&
            authenticatedLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-slatebrand-100 text-slatebrand-800'
                      : 'text-slatebrand-600 hover:bg-white hover:text-slatebrand-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          {profile?.role === 'doctor' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slatebrand-100 text-slatebrand-800'
                    : 'text-slatebrand-600 hover:bg-white hover:text-slatebrand-900'
                }`
              }
            >
              Doctor Panel
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden rounded-2xl bg-white px-4 py-2 text-right shadow-soft sm:block">
                <p className="text-sm font-semibold text-slatebrand-900">
                  {profile?.name || 'Authenticated User'}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-slatebrand-500">
                  {profile?.role || 'user'}
                </p>
              </div>
              <button type="button" className="button-secondary" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="button-secondary">
                Login
              </Link>
              <Link to="/register" className="button-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
