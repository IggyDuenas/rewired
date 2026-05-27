'use client';

import { motion } from 'framer-motion';

function HoverButton({
  children,
  href,
  primary,
  style,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    fontSize: '13px',
    letterSpacing: '0.03em',
    color: 'var(--fg)',
    backgroundColor: primary ? 'var(--spark)' : 'transparent',
    border: '1.5px solid var(--fg)',
    boxShadow: '3px 3px 0px var(--fg)',
    padding: '10px 22px',
    borderRadius: '2px',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'none',
    ...style,
  };
  return (
    <motion.a
      href={href}
      style={base}
      whileHover={{ boxShadow: '5px 5px 0px var(--fg)', x: -2, y: -2 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '64px',
      }}
    >
      {/* ── Left wire decoration ── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          opacity: 0.9,
        }}
      >
        <svg width="80" height="600" style={{ overflow: 'visible' }}>
          {/* path: horizontal left then vertical down */}
          <polyline
            points="80,60 0,60 0,540"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {/* top node (start of horizontal) */}
          <circle cx="80" cy="60" r="2" fill="var(--spark)" />
          {/* corner node */}
          <circle cx="0" cy="60" r="2" fill="var(--spark)" />
          {/* bottom node */}
          <circle cx="0" cy="540" r="2" fill="var(--spark)" />

          {/* Spark: travels from (80,60) → (0,60) → (0,540) */}
          <motion.circle
            cx={80}
            cy={60}
            r={3}
            fill="var(--spark)"
            style={{ filter: 'drop-shadow(0 0 6px var(--spark))' }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, -80, -80],
              y: [0, 0, 480],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              times: [0, 0.143, 0.9, 1],
              delay: 0.6,
            }}
          />
        </svg>
      </div>

      {/* ── Right wire decoration ── */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          opacity: 0.9,
        }}
      >
        <svg width="80" height="600" style={{ overflow: 'visible' }}>
          <polyline
            points="0,60 80,60 80,540"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle cx="0" cy="60" r="2" fill="var(--spark)" />
          <circle cx="80" cy="60" r="2" fill="var(--spark)" />
          <circle cx="80" cy="540" r="2" fill="var(--spark)" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '820px',
          padding: '0 32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Pill tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--muted)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            padding: '5px 16px',
            marginBottom: '32px',
            letterSpacing: '0.04em',
          }}
        >
          Web Development &amp; Migration Studio
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: 'var(--fg)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 28px',
          }}
        >
          Built for brands that have{' '}
          <span
            style={{
              background: 'linear-gradient(transparent 60%, var(--spark) 60%)',
            }}
          >
            outgrown
          </span>{' '}
          their template.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '15px',
            color: 'var(--muted)',
            maxWidth: '520px',
            margin: '0 auto 44px',
            lineHeight: 1.75,
          }}
        >
          We migrate growing businesses from no-code builders to fast,
          custom-built websites that scale.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <HoverButton href="/work" primary>
            See Our Work
          </HoverButton>
          <HoverButton href="https://cal.com">Book a Call</HoverButton>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1 }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}
