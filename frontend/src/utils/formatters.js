export function formatDate(value) {
  if (!value) {
    return 'Unavailable';
  }

  if (typeof value === 'object' && 'seconds' in value) {
    return new Date(value.seconds * 1000).toLocaleString();
  }

  return new Date(value).toLocaleString();
}

export function formatSeverity(severity) {
  return severity || 'Unknown';
}

export function severityTone(severity) {
  switch (severity) {
    case 'Severe':
      return 'bg-rose-100 text-rose-700';
    case 'Moderate':
      return 'bg-amber-100 text-amber-700';
    case 'Mild':
      return 'bg-emerald-100 text-emerald-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}
