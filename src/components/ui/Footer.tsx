'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Stack', href: '/stack' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        color: hovered ? '#ffffff' : 'rgba(255,255,255,0.6)',
        textDecoration: 'none',
        transition: 'color 0.15s',
        display: 'block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const [auditHovered, setAuditHovered] = useState(false);

  return (
    <footer
      style={{
        backgroundColor: 'var(--fg)',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Top spark wire */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--spark)',
          opacity: 0.3,
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '48px 40px 32px',
        }}
      >
        {/* Three-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Column 1 — Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: '18px',
                color: '#ffffff',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              THE{' '}
              <span style={{ color: 'var(--spark)' }}>✦</span>
              {' '}REWIRE
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8,
                maxWidth: '220px',
                margin: 0,
              }}
            >
              Built for brands that have outgrown their template. Based
              anywhere, building everywhere.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              Pages
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {NAV_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Column 3 — Book */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: '16px',
                color: '#ffffff',
                marginBottom: '8px',
              }}
            >
              Ready to start?
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '20px',
                lineHeight: 1.6,
              }}
            >
              First call is free. No commitment.
            </p>
            <a
              href="https://cal.com/therewire/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 600,
                fontSize: '13px',
                color: 'var(--fg)',
                backgroundColor: 'var(--spark)',
                border: '1.5px solid var(--fg)',
                boxShadow: auditHovered
                  ? '5px 5px 0px var(--fg)'
                  : '3px 3px 0px var(--fg)',
                padding: '10px 20px',
                borderRadius: '2px',
                textDecoration: 'none',
                display: 'inline-block',
                transform: auditHovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
                transition: 'box-shadow 0.15s, transform 0.15s',
              }}
              onMouseEnter={() => setAuditHovered(true)}
              onMouseLeave={() => setAuditHovered(false)}
            >
              Book a Free Audit
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            marginTop: '40px',
            marginBottom: '24px',
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.02em',
            }}
          >
            © 2026 The Rewire. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.02em',
            }}
          >
            Built with Next.js · Supabase · Vercel
          </span>
        </div>
      </div>
    </footer>
  );
}
