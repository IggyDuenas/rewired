'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

interface Project {
  bg: string;
  // Per-project accent palette
  accent: string;
  pillBorder: string;
  pillText: string;
  tagBg: string;
  tagText: string;
  btnBg: string;
  btnColor: string;
  btnBorder: string;
  btnShadow: string;
  // Background FX
  vignette?: boolean;
  glow?: string;
  noise?: boolean;
  marquee?: boolean;
  tag: string;
  name: string;
  oneLiner: string;
  stats: Stat[];
  features: string[];
  stack: string[];
  href: string;
  screenshot: string;
  screenshotAlt: string;
  reverse: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    bg: '#000000',
    accent: '#60A5FA',
    pillBorder: 'rgba(96,165,250,0.3)',
    pillText: 'rgba(96,165,250,0.7)',
    tagBg: 'rgba(255,255,255,0.08)',
    tagText: 'rgba(255,255,255,0.5)',
    btnBg: '#60A5FA',
    btnColor: '#0a0a0a',
    btnBorder: 'var(--fg)',
    btnShadow: 'var(--fg)',
    vignette: true,
    marquee: true,
    tag: 'Ecommerce · 2026',
    name: 'Footy Dept.',
    oneLiner: 'Premium football culture. Full ecommerce storefront built from zero.',
    stats: [
      { value: '+45%', label: 'Increase in Overall ROI' },
      { value: '+62%', label: 'Mobile Conversion Rate' },
      { value: '3.2x', label: 'Faster Load Time' },
      { value: '91/100', label: 'PageSpeed Score' },
      { value: '$340/mo', label: 'Platform Fees Eliminated' },
      { value: '6–8 Days', label: 'Full Build Time' },
    ],
    features: [
      'Full ecommerce storefront with Stripe checkout',
      'National team, club, and retro collection filtering',
      'Custom admin dashboard for inventory management',
      'Mobile-first responsive design with 91/100 PageSpeed',
    ],
    stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel', 'Tailwind'],
    href: 'https://footy-dept.vercel.app',
    screenshot: '/screenshots/footydept.png',
    screenshotAlt: 'Footy Dept website',
    reverse: false,
  },
  {
    bg: '#0A0A0A',
    accent: '#6EE7B7',
    pillBorder: 'rgba(110,231,183,0.3)',
    pillText: 'rgba(110,231,183,0.7)',
    tagBg: 'rgba(110,231,183,0.08)',
    tagText: 'rgba(110,231,183,0.5)',
    btnBg: '#6EE7B7',
    btnColor: '#0A0A0A',
    btnBorder: '#0A0A0A',
    btnShadow: '#6EE7B7',
    glow: 'radial-gradient(ellipse at 30% 50%, rgba(110,231,183,0.06) 0%, transparent 60%)',
    noise: true,
    tag: 'Audio Platform · 2026',
    name: 'TheHouseHub',
    oneLiner:
      'Browser-based music production. No template could have built this — we built it anyway.',
    stats: [
      { value: '847', label: 'Active Users Month One' },
      { value: '1,200+', label: 'Tracks in Live Library' },
      { value: '2.5 Weeks', label: 'Full Build Time' },
      { value: '94/100', label: 'PageSpeed Score' },
      { value: '4.8/5', label: 'Average User Rating' },
      { value: '2 Tiers', label: 'Free & Paid Plans' },
    ],
    features: [
      'Drag and drop browser-based music builder',
      'Full user authentication with free and paid tiers',
      'Custom sample library with 1,200+ tracks',
      'Real-time audio playback built entirely in Next.js',
    ],
    stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel', 'Tailwind'],
    href: 'https://thehousehub.xyz',
    screenshot: '/screenshots/househub.png',
    screenshotAlt: 'TheHouseHub website',
    reverse: true,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScreenshotCol({
  src,
  alt,
  marquee,
}: {
  src: string;
  alt: string;
  marquee?: boolean;
}) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Scrolling marquee text — sits behind the image as texture */}
      {marquee && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              animation: 'marquee 18s linear infinite',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#ffffff',
              opacity: 0.03,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} style={{ paddingRight: '2em' }}>
                FOOTY DEPT · FOOTBALL CULTURE · BUILT FOR MATCHDAY ·&nbsp;
              </span>
            ))}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        style={{
          border: '1.5px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
          borderRadius: '8px',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10',
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}

function DetailsCol({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* Tag */}
      <div style={{ display: 'inline-block', alignSelf: 'flex-start' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: project.tagText,
            backgroundColor: project.tagBg,
            padding: '4px 12px',
            borderRadius: '20px',
          }}
        >
          {project.tag}
        </span>
      </div>

      {/* Name */}
      <h2
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(32px, 4vw, 52px)',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          margin: '16px 0 8px',
        }}
      >
        {project.name}
      </h2>

      {/* One liner */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '15px',
          color: 'rgba(255,255,255,0.6)',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {project.oneLiner}
      </p>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }} />

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px 12px' }}>
        {project.stats.map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: '28px',
                color: project.accent,
                lineHeight: 1,
                marginBottom: '4px',
                letterSpacing: '-0.01em',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.4,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }} />

      {/* Features */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}
      >
        What We Built
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {project.features.map((f) => (
          <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: project.accent, flexShrink: 0, lineHeight: 1.6 }}>✦</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* Stack pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
        {project.stack.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: project.pillText,
              border: `1px solid ${project.pillBorder}`,
              borderRadius: '20px',
              padding: '4px 12px',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: '24px' }}>
        <motion.a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 600,
            fontSize: '13px',
            color: project.btnColor,
            backgroundColor: project.btnBg,
            border: `1.5px solid ${project.btnBorder}`,
            boxShadow: `3px 3px 0px ${project.btnShadow}`,
            padding: '10px 24px',
            borderRadius: '2px',
            textDecoration: 'none',
            display: 'inline-block',
            letterSpacing: '0.02em',
          }}
          whileHover={{
            boxShadow: `5px 5px 0px ${project.btnShadow}`,
            x: -2,
            y: -2,
          }}
          transition={{ duration: 0.15 }}
        >
          View Live Site →
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  return (
    <main>
      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── SECTION 1: INTRO ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <div
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--muted)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              padding: '5px 16px',
              marginBottom: '28px',
              letterSpacing: '0.04em',
            }}
          >
            Our Work
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: 'var(--fg)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '0 0 24px',
            }}
          >
            Products built from scratch.
            <br />
            No shortcuts.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              color: 'var(--muted)',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Every project below was designed, architected, and built in-house
            using our full custom stack. No templates, no page builders, no
            compromises.
          </p>
        </motion.div>
      </div>

      {/* ── SECTION 2: PROJECT CARDS ──────────────────────────────────────── */}
      {PROJECTS.map((project) => (
        <section
          key={project.name}
          style={{
            backgroundColor: project.bg,
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '80px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Vignette overlay — Footy Dept */}
          {project.vignette && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          )}

          {/* Teal ambient glow — HouseHub */}
          {project.glow && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: project.glow,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          )}

          {/* Noise texture overlay — HouseHub */}
          {project.noise && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px',
                opacity: 0.02,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          )}

          {/* Content */}
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '60px',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {project.reverse ? (
              <>
                <DetailsCol project={project} />
                <ScreenshotCol
                  src={project.screenshot}
                  alt={project.screenshotAlt}
                  marquee={project.marquee}
                />
              </>
            ) : (
              <>
                <ScreenshotCol
                  src={project.screenshot}
                  alt={project.screenshotAlt}
                  marquee={project.marquee}
                />
                <DetailsCol project={project} />
              </>
            )}
          </div>
        </section>
      ))}

      {/* ── SECTION 3: NEXT PROJECT ───────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          width: '100%',
          padding: '80px 40px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '2px dashed var(--fg)',
            boxShadow: '5px 5px 0px var(--fg)',
            borderRadius: '4px',
            padding: '48px',
            transform: 'rotate(-0.5deg)',
            textAlign: 'center',
          }}
        >
          {/* Label */}
          <div
            style={{
              fontFamily: 'var(--font-caveat)',
              fontWeight: 400,
              fontSize: '18px',
              color: 'var(--muted)',
            }}
          >
            next project...
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-caveat)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: 'var(--fg)',
              margin: '8px 0 12px',
              lineHeight: 1.1,
            }}
          >
            Your New Website
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--muted)',
              maxWidth: '360px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            This slot is yours. We have one opening available for a new project.
            Let us build something worth showing off.
          </p>

          {/* Dashed divider */}
          <div style={{ borderTop: '1px dashed var(--border)', margin: '28px 0' }} />

          {/* Mini stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
            {[
              { value: '14 Days', label: 'Average Delivery' },
              { value: '1 Spot', label: 'Currently Available' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: '24px',
                    color: 'var(--fg)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--muted)',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: '28px' }}>
            <motion.div
              whileHover={{ x: -2, y: -2 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'inline-block' }}
            >
              <Link
                href="/contact"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'var(--fg)',
                  backgroundColor: 'var(--spark)',
                  border: '1.5px solid var(--fg)',
                  boxShadow: '3px 3px 0px var(--fg)',
                  padding: '12px 28px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  letterSpacing: '0.02em',
                  transition: 'box-shadow 0.15s',
                }}
              >
                Start Here →
              </Link>
            </motion.div>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--muted)',
                marginTop: '12px',
                letterSpacing: '0.04em',
              }}
            >
              ↳ Free audit call to get started
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
