export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-slatebrand-500">
            {eyebrow}
          </p>
        )}
        <h1 className="section-title">{title}</h1>
        {description && <p className="mt-3 max-w-2xl muted-text">{description}</p>}
      </div>
      {actions ? <div className="flex gap-3">{actions}</div> : null}
    </div>
  );
}
