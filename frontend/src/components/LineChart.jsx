export default function LineChart({ data }) {
  if (!data.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-slatebrand-200 bg-white/70 text-sm text-slatebrand-500">
        No data available for trend visualization.
      </div>
    );
  }

  const width = 720;
  const height = 240;
  const padding = 32;
  const maxValue = Math.max(...data.map((item) => item.napsi_score), 1);
  const minValue = Math.min(...data.map((item) => item.napsi_score), 0);

  const coordinates = data.map((item, index) => {
    const x =
      data.length === 1
        ? width / 2
        : padding + (index * (width - padding * 2)) / (data.length - 1);
    const normalized = (item.napsi_score - minValue) / Math.max(maxValue - minValue, 1);
    const y = height - padding - normalized * (height - padding * 2);
    return { x, y };
  });

  const path = coordinates.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <div className="panel p-6">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full overflow-visible">
        {[0, 0.25, 0.5, 0.75, 1].map((value) => {
          const y = padding + value * (height - padding * 2);
          return (
            <line
              key={value}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke="#d7e2e6"
              strokeDasharray="4 6"
            />
          );
        })}
        <polyline fill="none" stroke="#406672" strokeWidth="4" points={path} strokeLinecap="round" />
        {coordinates.map((point, index) => (
          <g key={`${point.x}-${point.y}`}>
            <circle cx={point.x} cy={point.y} r="6" fill="#d9816f" />
            <text x={point.x} y={height - 8} textAnchor="middle" fontSize="12" fill="#406672">
              {index + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
