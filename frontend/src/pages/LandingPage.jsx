import { Link } from 'react-router-dom';

const highlights = [
  'NAPSI-based severity scoring for structured clinical reporting.',
  'Role-aware workflows for patients and doctors.',
  'Firebase-backed authentication, storage, and longitudinal report history.',
];

export default function LandingPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 overflow-hidden rounded-[2rem] bg-slatebrand-900 px-8 py-12 text-white shadow-soft lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-slatebrand-200">
            Nail Psoriasis Assessment Platform
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Automated nail severity scoring with a clinical workflow built for NAPSI.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slatebrand-100 sm:text-lg">
            Upload nail images, generate structured severity predictions, and track progression over time using a Firebase-backed diagnostic workflow designed for real-world AI integration.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="button-primary bg-coral hover:bg-[#c96e5e]">
              Create Account
            </Link>
            <Link to="/login" className="button-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid gap-4 self-stretch">
          {highlights.map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-lg font-semibold leading-8">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="panel p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slatebrand-500">Step 1</p>
          <h2 className="mt-4 text-2xl font-bold text-slatebrand-900">Capture and upload</h2>
          <p className="mt-4 muted-text">
            Securely upload nail images through Firebase Storage with a guided interface that supports drag-and-drop and file picker workflows.
          </p>
        </div>
        <div className="panel p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slatebrand-500">Step 2</p>
          <h2 className="mt-4 text-2xl font-bold text-slatebrand-900">Score with AI pipeline</h2>
          <p className="mt-4 muted-text">
            The Flask API verifies identity, triggers the inference layer, and returns structured NAPSI results designed to drop into a YOLOv8 plus classifier stack later.
          </p>
        </div>
        <div className="panel p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slatebrand-500">Step 3</p>
          <h2 className="mt-4 text-2xl font-bold text-slatebrand-900">Monitor longitudinally</h2>
          <p className="mt-4 muted-text">
            Review historical reports, visualize score changes over time, and give doctors filtered access to user and report activity.
          </p>
        </div>
      </section>
    </div>
  );
}
