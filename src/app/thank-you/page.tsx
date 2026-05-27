'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    /*
     * position:fixed covers the entire viewport — including the root layout's
     * Navbar and dot-grid — so this page appears fully standalone and dark.
     */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
        overflowY: 'auto',
      }}
    >
      {/* ── Spark ✦ ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: '64px',
          color: 'var(--spark)',
          lineHeight: 1,
          marginBottom: '32px',
          display: 'inline-block',
        }}
      >
        {/* Continuous pulse after landing */}
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          style={{ display: 'inline-block' }}
        >
          ✦
        </motion.span>
      </motion.div>

      {/* ── Headline ───────────────────────────────────────────────────── */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 56px)',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 16px',
        }}
      >
        We&apos;re excited to get started.
      </motion.h1>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '15px',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '420px',
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        Expect a message back to your email as soon as we can. In the
        meantime, feel free to explore the rest of the site.
      </motion.p>

      {/* ── Divider line ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          width: '120px',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          margin: '32px auto',
        }}
      />

      {/* ── Buttons ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Primary: Book audit — native anchor for external URL */}
        <a
          href="https://cal.com/therewire/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 600,
            fontSize: '14px',
            color: 'var(--fg)',
            backgroundColor: 'var(--spark)',
            border: '1.5px solid var(--fg)',
            boxShadow: '3px 3px 0px var(--fg)',
            borderRadius: '4px',
            padding: '12px 28px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'box-shadow 0.15s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.boxShadow = '5px 5px 0px var(--fg)';
            el.style.transform = 'translate(-2px, -2px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.boxShadow = '3px 3px 0px var(--fg)';
            el.style.transform = 'translate(0, 0)';
          }}
        >
          Book Your Free Audit →
        </a>

        {/* Ghost: back home */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 600,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            backgroundColor: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.2)',
            borderRadius: '4px',
            padding: '12px 28px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = 'var(--spark)';
            el.style.color = 'var(--spark)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = 'rgba(255,255,255,0.2)';
            el.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          ← Back to The Rewire
        </Link>
      </motion.div>

      {/* ── Footer copyright ───────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.04em',
          margin: 0,
        }}
      >
        © 2026 The Rewire
      </motion.p>
    </div>
  );
}
