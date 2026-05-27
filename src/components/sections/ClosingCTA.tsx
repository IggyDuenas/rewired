'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  // once: true — fires once when 30% of section enters viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const sparkControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      sparkControls.start({
        x: '100vw',
        transition: { duration: 1.5, ease: 'easeInOut', delay: 0.2 },
      });
    }
  }, [isInView, sparkControls]);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#f7f6f2',
        padding: '60px 32px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Top wire with scroll-triggered spark */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--border)',
          overflow: 'visible',
        }}
      >
        <motion.div
          initial={{ x: 0 }}
          animate={sparkControls}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--spark)',
            marginTop: '-3px',
            filter: 'drop-shadow(0 0 8px var(--spark))',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Headline — whileInView is the correct API for scroll-triggered entry */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 42px)',
            color: 'var(--fg)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
          }}
        >
          Ready to outgrow your template?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--muted)',
            margin: '0 0 32px',
            lineHeight: 1.7,
          }}
        >
          One call. No hard sell. Just an honest look at what&apos;s possible.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              fontSize: '14px',
              color: 'var(--fg)',
              backgroundColor: 'var(--spark)',
              border: '1.5px solid var(--fg)',
              boxShadow: '3px 3px 0px var(--fg)',
              padding: '11px 28px',
              borderRadius: '2px',
              textDecoration: 'none',
              display: 'inline-block',
              letterSpacing: '0.03em',
              
            }}
            whileHover={{ boxShadow: '5px 5px 0px var(--fg)', x: -2, y: -2 }}
            transition={{ duration: 0.15 }}
          >
            Book a Free Call
          </motion.a>
        </motion.div>

        {/* Reply note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--muted)',
            marginTop: '16px',
            letterSpacing: '0.04em',
          }}
        >
          ↳ Usually respond within 24 hours
        </motion.p>
      </div>
    </section>
  );
}
