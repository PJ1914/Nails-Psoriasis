import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Upload, History, Stethoscope, Activity, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const authenticatedLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/history', label: 'History', icon: History },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, profile, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed left-0 right-0 top-4 z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="flex items-center justify-between rounded-full border border-white/60 dark:border-white/10 bg-white/75 dark:bg-slatebrand-900/80 px-4 py-3 sm:px-6 lg:px-8 shadow-soft backdrop-blur-md relative z-50">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slatebrand-700 to-slatebrand-900 dark:from-slatebrand-600 dark:to-slatebrand-800 text-white shadow-md">
            <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-slatebrand-500 dark:text-slatebrand-400">
              Clinical AI
            </p>
            <p className="text-base font-extrabold tracking-tight text-slatebrand-900 dark:text-white sm:text-lg">
              Nail Psoriasis
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {isAuthenticated &&
            authenticatedLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-slatebrand-900 text-white shadow-md dark:bg-white dark:text-slatebrand-900'
                        : 'text-slatebrand-600 hover:bg-slatebrand-100 hover:text-slatebrand-900 dark:text-slatebrand-300 dark:hover:bg-slatebrand-800/50 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          {profile?.role === 'doctor' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md dark:bg-emerald-500'
                    : 'text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300'
                }`
              }
            >
              <Stethoscope className="h-4 w-4" />
              Doctor Panel
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <div className="hidden text-right leading-tight xl:block">
                <p className="text-sm font-bold text-slatebrand-900 dark:text-white truncate max-w-[150px]">
                  {profile?.name || user?.displayName || 'User'}
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slatebrand-500 dark:text-slatebrand-400">
                  {profile?.role || 'user'}
                </p>
              </div>
              <button 
                type="button" 
                className="hidden md:flex items-center justify-center gap-2 rounded-full border border-slatebrand-200 dark:border-slatebrand-700 bg-white dark:bg-slatebrand-800 p-2.5 sm:px-4 sm:py-2.5 text-sm font-semibold text-slatebrand-700 dark:text-slatebrand-200 transition-all hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 dark:hover:border-rose-800" 
                onClick={handleLogout}
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden text-sm font-bold text-slatebrand-700 dark:text-slatebrand-200 hover:text-slatebrand-900 dark:hover:text-white md:block px-2 transition-colors">
                Log in
              </Link>
              <Link to="/register" className="hidden md:inline-flex button-primary !rounded-full !py-2.5 !px-5 text-sm shadow-md">
                Get Started
              </Link>
            </>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            type="button" 
            className="md:hidden flex items-center justify-center rounded-xl p-2 text-slatebrand-700 dark:text-slatebrand-200 hover:bg-slatebrand-100 dark:hover:bg-slatebrand-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-4 right-4 top-20 rounded-3xl border border-white/60 dark:border-white/10 bg-white/95 dark:bg-slatebrand-900/95 p-6 shadow-2xl backdrop-blur-xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <div className="mb-2 pb-4 border-b border-slatebrand-100 dark:border-slatebrand-800">
                  <p className="text-sm font-bold text-slatebrand-900 dark:text-white truncate">
                    {profile?.name || user?.displayName || 'User'}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slatebrand-500 dark:text-slatebrand-400">
                    {profile?.role || 'user'}
                  </p>
                </div>
                {authenticatedLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-slatebrand-900 text-white dark:bg-white dark:text-slatebrand-900'
                          : 'text-slatebrand-600 hover:bg-slatebrand-50 dark:text-slatebrand-300 dark:hover:bg-slatebrand-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
                {profile?.role === 'doctor' && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                      location.pathname === '/admin'
                        ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                        : 'text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30'
                    }`}
                  >
                    <Stethoscope className="h-5 w-5" />
                    Doctor Panel
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="button-secondary w-full">
                  Log in
                </Link>
                <Link to="/register" onClick={closeMenu} className="button-primary w-full">
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
