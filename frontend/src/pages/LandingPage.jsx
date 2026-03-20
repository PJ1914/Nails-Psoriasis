import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Database, UploadCloud, Cpu, LineChart } from 'lucide-react';

const highlights = [
  { text: 'NAPSI-based severity scoring for structured clinical reporting.', icon: Activity },
  { text: 'Role-aware workflows for patients and doctors.', icon: ShieldCheck },
  { text: 'Firebase-backed authentication, storage, and longitudinal history.', icon: Database },
];

import { useAuth } from '../hooks/useAuth';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/60 dark:border-white/10 bg-gradient-to-br from-white to-slatebrand-50 dark:from-slatebrand-800 dark:to-slatebrand-950 px-6 py-16 text-slatebrand-900 dark:text-white shadow-2xl lg:px-16 lg:py-20 xl:py-24 transition-colors duration-500">
        {/* Decorative Background Elements */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal-100/60 dark:bg-slatebrand-600/30 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-slatebrand-100/60 dark:bg-emerald-500/20 blur-[100px]" />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slatebrand-200/50 dark:border-white/20 bg-slatebrand-50/50 dark:bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slatebrand-600 dark:text-slatebrand-100">
                AI Diagnostic Platform
              </p>
            </div>
            <h1 className="mt-8 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl leading-[1.15]">
              Automated nail severity scoring with clinical precision.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slatebrand-600 dark:text-slatebrand-200 sm:text-xl font-medium">
              Upload nail images, generate structured severity predictions, and track progression over time using a workflow designed for real-world AI integration.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {isAuthenticated ? (
                <Link to="/upload" className="inline-flex items-center justify-center rounded-2xl bg-slatebrand-900 dark:bg-white text-white dark:text-slatebrand-900 font-bold dark:hover:bg-slatebrand-100 hover:bg-slatebrand-800 shadow-xl md:hover:shadow-2xl md:hover:-translate-y-1 transition-all duration-300 px-8 py-4 text-base">
                  Get Started
                </Link>
              ) : (
                <>
                  <Link to="/register" className="inline-flex items-center justify-center rounded-2xl bg-slatebrand-900 dark:bg-white text-white dark:text-slatebrand-900 font-bold dark:hover:bg-slatebrand-100 hover:bg-slatebrand-800 shadow-xl md:hover:shadow-2xl md:hover:-translate-y-1 transition-all duration-300 px-8 py-4 text-base">
                    Get Started
                  </Link>
                  <Link to="/login" className="button-secondary border-slatebrand-200 dark:border-white/20 bg-white/50 dark:bg-white/5 text-slatebrand-700 dark:text-white hover:bg-white dark:hover:bg-white/15 backdrop-blur-sm shadow-lg md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 px-8 py-4 text-base">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-5 relative group perspective-1000">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="rounded-3xl border border-slatebrand-200 dark:border-white/10 bg-white/60 dark:bg-white/10 p-6 backdrop-blur-md shadow-xl transition-all duration-500 ease-out md:hover:-translate-y-2 md:hover:rotate-1 hover:bg-white dark:hover:bg-white/15"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slatebrand-100 dark:bg-slatebrand-800/80 shadow-inner">
                      <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-base font-semibold leading-relaxed text-slatebrand-800 dark:text-slatebrand-50">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            step: '01',
            title: 'Capture & Upload',
            description: 'Securely upload nail images through Firebase Storage with a guided interface supporting drag-and-drop workflows.',
            icon: UploadCloud,
            color: 'text-blue-500 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-900/20'
          },
          {
            step: '02',
            title: 'Score with AI Pipeline',
            description: 'The Flask API triggers the inference layer and returns structured NAPSI results using a robust classifier stack.',
            icon: Cpu,
            color: 'text-emerald-500 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-900/20'
          },
          {
            step: '03',
            title: 'Monitor Longitudinally',
            description: 'Review historical reports, visualize score changes over time, and provide filtered access for clinicians.',
            icon: LineChart,
            color: 'text-purple-500 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-900/20'
          }
        ].map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div 
              key={idx} 
              className="panel relative overflow-hidden p-8 group transition-all duration-500 md:hover:-translate-y-2 md:hover:shadow-2xl dark:md:hover:shadow-slatebrand-900/50"
            >
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-50 ${feature.bg}`} />
              
              <div className="flex items-center justify-between mb-8">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-black text-slatebrand-100 dark:text-slatebrand-800/50 transition-colors duration-300">
                  {feature.step}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-slatebrand-900 dark:text-white transition-colors duration-300">{feature.title}</h2>
              <p className="mt-4 muted-text transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
