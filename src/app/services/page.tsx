'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Reveal preset ───────────────────────────────────────────────────────────

const REVEAL = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 } as const,
  transition: { duration: 0.6 },
};

// ─── Shared sub-components ───────────────────────────────────────────────────

function PrimaryButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const style: React.CSSProperties = {
    fontFamily: 'var(--font-syne)',
    fontWeight: 600,
    fontSize: '13px',
    color: 'var(--fg)',
    backgroundColor: 'var(--spark)',
    border: '1.5px solid var(--fg)',
    boxShadow: '3px 3px 0px var(--fg)',
    padding: '10px 24px',
    borderRadius: '2px',
    textDecoration: 'none',
    display: 'inline-block',
    letterSpacing: '0.02em',
  };
  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        whileHover={{ boxShadow: '5px 5px 0px var(--fg)', x: -2, y: -2 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.div
      whileHover={{ x: -2, y: -2 }}
      transition={{ duration: 0.15 }}
      style={{ display: 'inline-block' }}
    >
      <Link href={href} style={style}>
        {children}
      </Link>
    </motion.div>
  );
}

// ─── DetailsCol ──────────────────────────────────────────────────────────────

interface DetailsColProps {
  num: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  dark?: boolean;
  ctaHref?: string;
}

function DetailsCol({
  num,
  name,
  tagline,
  description,
  bullets,
  dark,
  ctaHref = '/contact',
}: DetailsColProps) {
  const textMain = dark ? '#ffffff' : 'var(--fg)';
  const textMuted = dark ? 'rgba(255,255,255,0.6)' : 'var(--muted)';
  const textFaint = dark ? 'rgba(255,255,255,0.4)' : 'var(--muted)';
  const bulletText = dark ? 'rgba(255,255,255,0.8)' : 'var(--fg)';
  const numColor = dark ? 'rgba(255,255,255,0.06)' : '#f0efe9';
  const secondaryLinkColor = dark ? 'rgba(255,255,255,0.5)' : 'var(--muted)';

  return (
    <motion.div {...REVEAL} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Large background number */}
      <div
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: '96px',
          color: numColor,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {num}
      </div>

      {/* Service name — overlaps number */}
      <div style={{ marginTop: '-48px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: textMain,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          {name}
        </h2>

        {/* Tagline */}
        <div
          style={{
            fontFamily: 'var(--font-caveat)',
            fontWeight: 600,
            fontSize: '20px',
            color: dark ? 'rgba(255,255,255,0.5)' : 'var(--muted)',
            marginTop: '4px',
          }}
        >
          {tagline}
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: textMuted,
            lineHeight: 1.85,
            marginTop: '20px',
            maxWidth: '440px',
          }}
        >
          {description}
        </p>

        {/* Who it's for */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: textFaint,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginTop: '28px',
            marginBottom: '12px',
          }}
        >
          This is for you if
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {bullets.map((b) => (
            <div
              key={b}
              style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
            >
              <span
                style={{
                  color: 'var(--spark)',
                  flexShrink: 0,
                  lineHeight: 1.7,
                  fontSize: '12px',
                }}
              >
                ✦
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: bulletText,
                  lineHeight: 1.6,
                }}
              >
                {b}
              </span>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '32px',
            flexWrap: 'wrap',
          }}
        >
          <PrimaryButton href={ctaHref}>Start With a Free Audit →</PrimaryButton>
          <Link
            href="/pricing"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: secondaryLinkColor,
              textDecoration: 'none',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.textDecoration =
                'underline')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.textDecoration =
                'none')
            }
          >
            See pricing →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── CaseStudyCard ────────────────────────────────────────────────────────────

interface CaseStat {
  value: string;
  label: string;
}

interface CaseStudyCardProps {
  projectName: string;
  description: string;
  stats: CaseStat[];
  screenshot: string;
  screenshotAlt: string;
  workHref: string;
  dark?: boolean;
}

function CaseStudyCard({
  projectName,
  description,
  stats,
  screenshot,
  screenshotAlt,
  workHref,
  dark,
}: CaseStudyCardProps) {
  const cardBg = dark ? 'rgba(255,255,255,0.05)' : '#ffffff';
  const cardBorder = dark
    ? '1.5px solid rgba(255,255,255,0.15)'
    : '1.5px solid var(--fg)';
  const cardShadow = dark
    ? '4px 4px 0px rgba(255,255,255,0.1)'
    : '4px 4px 0px var(--fg)';
  const labelColor = dark ? 'rgba(255,255,255,0.4)' : 'var(--muted)';
  const nameColor = dark ? '#ffffff' : 'var(--fg)';
  const descColor = dark ? 'rgba(255,255,255,0.55)' : 'var(--muted)';
  const statLabelColor = dark ? 'rgba(255,255,255,0.4)' : 'var(--muted)';
  const statValueColor = dark ? 'var(--spark)' : 'var(--fg)';
  const dividerColor = dark ? 'rgba(255,255,255,0.1)' : 'var(--border)';
  const linkColor = dark ? 'rgba(255,255,255,0.5)' : 'var(--muted)';

  return (
    <motion.div
      {...REVEAL}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{
        backgroundColor: cardBg,
        border: cardBorder,
        boxShadow: cardShadow,
        borderRadius: '4px',
        padding: '28px',
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: labelColor,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Real Example
      </div>

      {/* Project name */}
      <div
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          fontSize: '20px',
          color: nameColor,
          marginTop: '8px',
          letterSpacing: '-0.01em',
        }}
      >
        {projectName}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: descColor,
          lineHeight: 1.75,
          marginTop: '8px',
          marginBottom: 0,
        }}
      >
        {description}
      </p>

      {/* Mini stats */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginTop: '20px',
          flexWrap: 'wrap',
        }}
      >
        {stats.map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: '22px',
                color: statValueColor,
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: statLabelColor,
                marginTop: '3px',
                letterSpacing: '0.02em',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          backgroundColor: dividerColor,
          margin: '20px 0',
        }}
      />

      {/* Screenshot */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        <Image
          src={screenshot}
          alt={screenshotAlt}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* View project link */}
      <Link
        href={workHref}
        style={{
          display: 'inline-block',
          marginTop: '14px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: linkColor,
          textDecoration: 'none',
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--spark)')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = linkColor)
        }
      >
        View Case Study →
      </Link>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main>
      {/* ── SECTION 1: HEADLINE ───────────────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 80px' }}>
        <motion.div {...REVEAL} style={{ textAlign: 'center' }}>
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
            What We Do
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
            Three problems.
            <br />
            One studio that solves them.
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
            Every project we take on fits one of three scenarios. Find yours
            below — and see exactly how we have solved it before.
          </p>
        </motion.div>
      </div>

      {/* ── SECTION 2: SERVICE 01 — MIGRATION ────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '80px 40px',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          <DetailsCol
            num="01"
            name="Migration"
            tagline="outgrown your template?"
            description="You built your business on Wix, Squarespace, or a basic Shopify theme. It worked — until it did not. Now your site is slow, your competitors are outranking you, and every new feature requires a paid plugin that still does not quite do what you need. You have not outgrown the internet. You have outgrown your platform."
            bullets={[
              'Your mobile PageSpeed score is under 70',
              'You are paying $200+ per month in platform apps and plugins',
              'You have features you want that your platform cannot support',
              'Your site looks like a template because it is one',
            ]}
          />
          <CaseStudyCard
            projectName="Footy Dept."
            description="A full ecommerce storefront migrated from a basic Shopify theme to a custom Next.js stack. Built in 6-8 days. Platform fees eliminated. Conversion rate up 62%."
            stats={[
              { value: '+62%', label: 'Conversion Rate' },
              { value: '$340/mo', label: 'Fees Eliminated' },
              { value: '100/95', label: 'PageSpeed D/M' },
            ]}
            screenshot="/screenshots/househub.png"
            screenshotAlt="Footy Dept website"
            workHref="/work"
          />
        </div>
      </section>

      {/* ── SECTION 3: SERVICE 02 — NEW BUILD ────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#f7f6f2',
          borderBottom: '1px solid var(--border)',
          padding: '80px 40px',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Case study LEFT, details RIGHT — CSS order trick for mobile stacking */}
          <div style={{ order: 1 }}>
            <CaseStudyCard
              projectName="Footy Dept."
              description="Conceived, designed, and built from zero as a premium football culture ecommerce brand. Full custom stack, live in under 8 days, built to scale from day one."
              stats={[
                { value: '6-8 Days', label: 'Idea to Launch' },
                { value: '+45%', label: 'Overall ROI' },
                { value: '0', label: 'Templates Used' },
              ]}
              screenshot="/screenshots/househub.png"
              screenshotAlt="Footy Dept website"
              workHref="/work"
            />
          </div>
          <div style={{ order: 0 }}>
            <DetailsCol
              num="02"
              name="New Build"
              tagline="starting from scratch, done properly"
              description="You have an idea that deserves more than a template. Maybe it is a brand you are launching, a product you are releasing, or a business you are scaling. You want it built right from day one — fast, custom, ownable. Not something you will need to rebuild in 18 months because you hit a ceiling."
              bullets={[
                'You have a clear vision but no technical co-founder',
                'You want to own your code, not rent a platform',
                'You need something live in days not months',
                'You have tried builders and none of them fit',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SERVICE 03 — CUSTOM PRODUCT ───────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--fg)',
          padding: '80px 40px',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          <DetailsCol
            num="03"
            name="Custom Product"
            tagline="if they said it could not be done"
            description="Some ideas do not fit in a website builder. They need real architecture — a database, user authentication, real-time features, custom interfaces. If you have been told your idea is too complex or too custom, that is exactly the kind of project we exist for. No template could have built what we build. We build it anyway."
            bullets={[
              'Your idea requires user accounts or a membership system',
              'You need a custom dashboard, portal, or internal tool',
              'You have real-time or interactive features that builders cannot support',
              'You have an idea no one has built before',
            ]}
            dark
          />
          <CaseStudyCard
            projectName="TheHouseHub"
            description="A browser-based music production platform with drag and drop sample sequencing, real-time audio playback, user authentication, and free and paid tiers. No template could have built this. We built it anyway."
            stats={[
              { value: '847', label: 'Active Users' },
              { value: '2.5 Weeks', label: 'Build Time' },
              { value: '4.8/5', label: 'User Rating' },
            ]}
            screenshot="/screenshots/footydept.png"
            screenshotAlt="TheHouseHub website"
            workHref="/work"
            dark
          />
        </div>
      </section>

      {/* ── SECTION 5: CLOSING CTA ────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: '80px 40px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <motion.div
          {...REVEAL}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--fg)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px',
            }}
          >
            Not sure which one fits?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--muted)',
              maxWidth: '440px',
              margin: '0 auto 32px',
              lineHeight: 1.8,
            }}
          >
            That is what the free audit call is for. We will look at your
            situation and tell you honestly what you need — even if that means
            telling you to stay where you are.
          </p>

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
                fontSize: '15px',
                color: 'var(--fg)',
                backgroundColor: 'var(--spark)',
                border: '1.5px solid var(--fg)',
                boxShadow: '3px 3px 0px var(--fg)',
                padding: '14px 32px',
                borderRadius: '2px',
                textDecoration: 'none',
                display: 'inline-block',
                letterSpacing: '0.02em',
                transition: 'box-shadow 0.15s',
              }}
            >
              Book a Free Audit →
            </Link>
          </motion.div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--muted)',
              marginTop: '16px',
              letterSpacing: '0.04em',
            }}
          >
            ↳ 30 minutes. No pitch. Just an honest look.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
