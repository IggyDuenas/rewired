'use client';

const STATS = [
  { value: '+40%', label: 'Avg. Conversion Lift' },
  { value: '$500/mo', label: 'Platform Fees Eliminated' },
  { value: '3x', label: 'Faster Than Traditional Agencies' },
  { value: '7 Days', label: 'From Brief to Live' },
];

export default function StatBar() {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#1a1a1a',
        padding: '48px 32px',
        overflow: 'hidden',
      }}
    >
      {/* Top wire */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--spark)',
          opacity: 0.4,
        }}
      />
      {/* Bottom wire */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--spark)',
          opacity: 0.4,
        }}
      />

      <div
        className="stats-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-item"
            style={{
              textAlign: 'center',
              padding: '16px 48px',
              flex: '1 1 0',
              borderRight:
                i < STATS.length - 1
                  ? '1px solid rgba(255,255,255,0.15)'
                  : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: '32px',
                color: 'var(--spark)',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                marginTop: '8px',
                letterSpacing: '0.04em',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
