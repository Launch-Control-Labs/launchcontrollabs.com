export function Logo({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Launch Control Labs"
    >
      <defs>
        <path id="topArc" d="M 100,100 m -70,0 a 70,70 0 0,1 140,0" />
        <path id="bottomArc" d="M 100,100 m 70,0 a 70,70 0 0,1 -140,0" />
      </defs>

      <circle cx="100" cy="100" r="85" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="55" strokeWidth="1.5" />

      <line x1="100" y1="15" x2="100" y2="22" strokeWidth="1.5" />
      <line x1="185" y1="100" x2="178" y2="100" strokeWidth="1.5" />
      <line x1="100" y1="185" x2="100" y2="178" strokeWidth="1.5" />
      <line x1="15" y1="100" x2="22" y2="100" strokeWidth="1.5" />

      <polygon points="100,25 103,28 100,31 97,28" strokeWidth="1.5" transform="rotate(-90, 100, 100)" />
      <polygon points="100,25 103,28 100,31 97,28" strokeWidth="1.5" transform="rotate(90, 100, 100)" />

      <text
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        style={{
          fontSize: '9px',
          fontWeight: 700,
          fontFamily: 'var(--font-space-grotesk), ui-monospace, monospace',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          LAUNCH CONTROL
        </textPath>
      </text>

      <text
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        style={{
          fontSize: '9px',
          fontWeight: 700,
          fontFamily: 'var(--font-space-grotesk), ui-monospace, monospace',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          LABS
        </textPath>
      </text>

      <line x1="75" y1="70" x2="75" y2="130" strokeWidth="4" strokeLinecap="square" />
      <line x1="75" y1="130" x2="105" y2="130" strokeWidth="4" strokeLinecap="square" />
      
      <path d="M 125 70 A 30 30 0 1 0 125 130" strokeWidth="4" strokeLinecap="square" />
    </svg>
  )
}
