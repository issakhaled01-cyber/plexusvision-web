export default function PlexusLogo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PlexusVision logo"
    >
      {/* Concentric arc rings — center point sits at right edge, arcs open left */}
      <circle cx="72" cy="50" r="14" stroke="#C8DDEF" strokeWidth="5.5" />
      <circle cx="72" cy="50" r="28" stroke="#C8DDEF" strokeWidth="4.5" strokeOpacity="0.75" />
      <circle cx="72" cy="50" r="43" stroke="#C8DDEF" strokeWidth="3.5" strokeOpacity="0.5" />
      <circle cx="72" cy="50" r="58" stroke="#C8DDEF" strokeWidth="2.5" strokeOpacity="0.3" />
    </svg>
  );
}
