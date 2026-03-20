export default function LoadingSpinner({ label }) {
  return (
    <div className="flex w-full flex-col gap-5 animate-pulse pt-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-3xl bg-slatebrand-200 dark:bg-slatebrand-800/50"></div>
        <div className="space-y-3">
          <div className="h-5 w-56 rounded bg-slatebrand-200 dark:bg-slatebrand-800/50"></div>
          <div className="h-3 w-40 rounded bg-slatebrand-100 dark:bg-slatebrand-800/30"></div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="panel h-48 w-full p-6 space-y-4 shadow-sm border-transparent">
            <div className="h-4 w-1/3 rounded bg-slatebrand-200 dark:bg-slatebrand-800/50"></div>
            <div className="h-8 w-1/2 rounded bg-slatebrand-200 dark:bg-slatebrand-800/50"></div>
            <div className="h-3 w-3/4 rounded bg-slatebrand-100 dark:bg-slatebrand-800/30"></div>
            <div className="mt-8 flex gap-2">
               <div className="h-10 flex-1 rounded-xl bg-slatebrand-100 dark:bg-slatebrand-800/30"></div>
               <div className="h-10 w-12 rounded-xl bg-slatebrand-100 dark:bg-slatebrand-800/30"></div>
            </div>
          </div>
        ))}
      </div>
      {label && <p className="mt-8 text-center text-sm font-semibold tracking-wide text-slatebrand-500 animate-bounce">{label}</p>}
    </div>
  );
}
