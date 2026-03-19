export default function EmptyState({ title, description, action }) {
  return (
    <div className="panel flex min-h-72 flex-col items-center justify-center p-8 text-center">
      <h3 className="text-2xl font-bold text-slatebrand-900">{title}</h3>
      <p className="mt-3 max-w-lg text-sm leading-6 text-slatebrand-600">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
