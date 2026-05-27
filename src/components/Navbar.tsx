'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const NAV_LINKS = [
  { href: '/work', label: 'work' },
  { href: '/services', label: 'services' },
  { href: '/stack', label: 'stack' },
  { href: '/pricing', label: 'pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const wireControls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      wireControls.start({
        scaleX: 1,
        transition: { duration: 1.2, ease: 'easeInOut' },
      });
    }
  }, [wireControls]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(247, 246, 242, 0.80)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: '15px',
            letterSpacing: '0.08em',
            color: 'var(--fg)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            userSelect: 'none',
          }}
        >
          <span>THE</span>
          <span style={{ color: 'var(--spark)', fontSize: '12px', lineHeight: 1 }}>✦</span>
          <span>REWIRE</span>
        </Link>

        {/* Nav Links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  opacity: 0.75,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.75')}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            fontSize: '13px',
            color: 'var(--fg)',
            backgroundColor: 'var(--spark)',
            border: '1.5px solid var(--fg)',
            boxShadow: '3px 3px 0px var(--fg)',
            padding: '8px 18px',
            borderRadius: '2px',
            textDecoration: 'none',
            letterSpacing: '0.03em',
            transition: 'box-shadow 0.15s ease, transform 0.15s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = '5px 5px 0px var(--fg)';
            el.style.transform = 'translate(-2px, -2px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = '3px 3px 0px var(--fg)';
            el.style.transform = 'translate(0, 0)';
          }}
        >
          Book a Call
        </a>

        {/* Wire animation — bottom border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={wireControls}
          style={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'var(--spark)',
            transformOrigin: 'left center',
          }}
        />
      </nav>
    </header>
  );
}
