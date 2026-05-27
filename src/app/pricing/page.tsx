'use client';

import { motion } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: '01',
    title: 'Free Audit Call',
    description:
      'We look at your current site together, identify exactly what is holding it back, and tell you honestly whether a rebuild makes sense. No pitch. Just diagnosis.',
  },
  {
    num: '02',
    title: 'Custom Proposal',
    description:
      'Based on what we find, we send a scoped proposal within 24 hours. Exact deliverables, exact timeline, exact price. No surprises, no hidden fees.',
  },
  {
    num: '03',
    title: 'Build & Launch',
    description:
      'We build, you review, we launch. Most projects go live within 14 days. You own everything — the code, the content, the domain. Forever.',
  },
];

interface TableRow {
  label: string;
  wix: string;
  shopify: string;
  rewire: string;
  highlight?: boolean;
  wixAnnotation?: string;
}

const TABLE_ROWS: TableRow[] = [
  {
    label: 'Monthly Platform Fee',
    wix: '$23–$49/mo',
    shopify: '$39–$105/mo',
    rewire: '$0',
  },
  {
    label: 'Paid Apps & Plugins',
    wix: '$100–$400/mo',
    shopify: '$150–$500/mo',
    rewire: '$0',
  },
  {
    label: 'Mobile PageSpeed Score',
    wix: '35–60',
    shopify: '45–65',
    rewire: '95–100',
  },
  {
    label: 'Custom Features',
    wix: '✗',
    shopify: 'Limited',
    rewire: '✓',
  },
  {
    label: 'You Own The Code',
    wix: '✗',
    shopify: '✗',
    rewire: '✓',
  },
  {
    label: 'SEO Ceiling',
    wix: 'Platform-limited',
    shopify: 'Platform-limited',
    rewire: 'None',
  },
  {
    label: 'Avg. 3-Year Platform Cost',
    wix: '$3,700–$16,000',
    shopify: '$7,000–$21,000',
    rewire: '~$300',
    highlight: true,
    wixAnnotation: 'with nothing to show for it',
  },
  {
    label: 'Delivery Time',
    wix: 'Instant (template)',
    shopify: 'Instant (template)',
    rewire: '14 Days',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const REVEAL = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.6 },
} as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '52px' }}>
      <span
        style={{
          fontFamily: 'var(--font-caveat)',
          fontWeight: 600,
          fontSize: '24px',
          color: 'var(--muted)',
          borderBottom: '2px wavy var(--border)',
          paddingBottom: '4px',
          display: 'inline-block',
        }}
      >
        {children}
      </span>
    </div>
  );
}

function isCross(val: string) {
  return val === '✗';
}

function isCheck(val: string) {
  return val === '✓';
}

function isZero(val: string) {
  return val === '$0';
}

function isRewirePositive(val: string) {
  return isCheck(val) || val === '95–100' || val === 'None' || val === '14 Days' || val === '~$300';
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <main
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '80px 24px 120px',
      }}
    >
      {/* ── SECTION 1: HEADLINE ───────────────────────────────────────────── */}
      <motion.div
        {...REVEAL}
        style={{ textAlign: 'center', marginBottom: '100px' }}
      >
        {/* Pill */}
        <div
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
          Transparent Pricing
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: '0 0 28px',
          }}
        >
          Every project is different.
          <br />
          Every proposal is honest.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '15px',
            color: 'var(--muted)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          We don&apos;t believe in flat rates that don&apos;t fit your
          situation. Book a free audit call — we&apos;ll look at your site
          together and tell you exactly what it needs.
        </p>
      </motion.div>

      {/* ── SECTION 2: HOW IT WORKS ───────────────────────────────────────── */}
      <section style={{ marginBottom: '100px' }}>
        <motion.div {...REVEAL}>
          <SectionLabel>How It Works</SectionLabel>
        </motion.div>

        {/* Wire connector + cards */}
        <motion.div
          {...REVEAL}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ position: 'relative' }}
        >
          {/* Horizontal wire behind cards (desktop only) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: 'calc(33.33% - 1px)',
              right: 'calc(33.33% - 1px)',
              height: '1px',
              backgroundColor: 'var(--border)',
              zIndex: 0,
              // Hidden on mobile via inline — we use a media query workaround below
            }}
            className="wire-line"
          />

          {/* Node at 1/3 mark */}
          <div
            aria-hidden="true"
            className="wire-node"
            style={{
              position: 'absolute',
              top: 'calc(50% - 3px)',
              left: 'calc(33.33% - 3px)',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--spark)',
              zIndex: 1,
            }}
          />

          {/* Node at 2/3 mark */}
          <div
            aria-hidden="true"
            className="wire-node"
            style={{
              position: 'absolute',
              top: 'calc(50% - 3px)',
              left: 'calc(66.66% - 3px)',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--spark)',
              zIndex: 1,
            }}
          />

          {/* Step cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid var(--fg)',
                  boxShadow: '3px 3px 0px var(--fg)',
                  borderRadius: '4px',
                  padding: '28px',
                  position: 'relative',
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 800,
                    fontSize: '48px',
                    color: 'var(--spark)',
                    lineHeight: 1,
                    marginBottom: '16px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.num}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: 'var(--fg)',
                    marginBottom: '12px',
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 3: COMPARISON TABLE ───────────────────────────────────── */}
      <section style={{ marginBottom: '100px' }}>
        <motion.div {...REVEAL}>
          <SectionLabel>The Real Cost of Staying Put</SectionLabel>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: '-32px',
              marginBottom: '48px',
            }}
          >
            What three years on a template builder actually costs you.
          </p>
        </motion.div>

        <motion.div
          {...REVEAL}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ overflowX: 'auto' }}
        >
          <table
            style={{
              width: '100%',
              maxWidth: '900px',
              margin: '0 auto',
              borderCollapse: 'collapse',
              border: '1.5px solid var(--fg)',
              tableLayout: 'fixed',
            }}
          >
            {/* Header */}
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: 'var(--fg)',
                    color: 'transparent', // empty label col
                    padding: '16px 20px',
                    width: '28%',
                    textAlign: 'left',
                    borderRight: '1px solid rgba(255,255,255,0.15)',
                  }}
                />
                {['Wix / Squarespace', 'Shopify Basic'].map((col) => (
                  <th
                    key={col}
                    style={{
                      backgroundColor: 'var(--fg)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 500,
                      padding: '16px 20px',
                      textAlign: 'center',
                      width: '24%',
                      letterSpacing: '0.02em',
                      borderRight: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {col}
                  </th>
                ))}
                {/* The Rewire — dark column header with spark text */}
                <th
                  style={{
                    backgroundColor: 'var(--fg)',
                    color: 'var(--spark)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '16px 20px',
                    textAlign: 'center',
                    width: '24%',
                    letterSpacing: '0.02em',
                  }}
                >
                  The Rewire
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {TABLE_ROWS.map((row, i) => {
                const rowBg = row.highlight
                  ? '#e8e7e0'
                  : i % 2 === 0
                  ? '#ffffff'
                  : '#f0efe9';
                return (
                  <tr key={row.label}>
                    {/* Label */}
                    <td
                      style={{
                        backgroundColor: rowBg,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--fg)',
                        padding: '14px 20px',
                        borderRight: '1px solid var(--border)',
                        borderBottom: '1px solid var(--border)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {row.label}
                    </td>

                    {/* Wix */}
                    <td
                      style={{
                        backgroundColor: rowBg,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: isCross(row.wix) ? '#e63946' : 'var(--muted)',
                        padding: '14px 20px',
                        textAlign: 'center',
                        borderRight: '1px solid var(--border)',
                        borderBottom: '1px solid var(--border)',
                        position: 'relative',
                      }}
                    >
                      {row.wix === '35–60' ? (
                        <>
                          {row.wix}
                          <br />
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              color: 'var(--muted)',
                              fontWeight: 400,
                            }}
                          >
                            loads in 3–5 seconds
                          </span>
                        </>
                      ) : (
                        row.wix
                      )}
                      {row.wixAnnotation && (
                        <span
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-caveat)',
                            fontSize: '13px',
                            color: 'var(--muted)',
                            transform: 'rotate(-1deg)',
                            marginTop: '2px',
                            opacity: 0.8,
                          }}
                        >
                          {row.wixAnnotation}
                        </span>
                      )}
                    </td>

                    {/* Shopify */}
                    <td
                      style={{
                        backgroundColor: rowBg,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: isCross(row.shopify) ? '#e63946' : 'var(--muted)',
                        padding: '14px 20px',
                        textAlign: 'center',
                        borderRight: '1px solid var(--border)',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      {row.shopify === '45–65' ? (
                        <>
                          {row.shopify}
                          <br />
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              color: 'var(--muted)',
                              fontWeight: 400,
                            }}
                          >
                            loads in 2–4 seconds
                          </span>
                        </>
                      ) : (
                        row.shopify
                      )}
                    </td>

                    {/* The Rewire — always dark bg, spark or white text */}
                    <td
                      style={{
                        backgroundColor: '#1a1a1a',
                        fontFamily: isZero(row.rewire)
                          ? 'var(--font-syne)'
                          : 'var(--font-mono)',
                        fontWeight: isZero(row.rewire) ? 700 : 400,
                        fontSize: isZero(row.rewire) ? '15px' : '13px',
                        color: isRewirePositive(row.rewire)
                          ? 'var(--spark)'
                          : 'rgba(255,255,255,0.7)',
                        padding: '14px 20px',
                        textAlign: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        borderLeft: '1.5px solid var(--fg)',
                      }}
                    >
                      {row.rewire === '95–100' ? (
                        <>
                          {row.rewire}
                          <br />
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              color: 'rgba(255,255,255,0.5)',
                              fontWeight: 400,
                            }}
                          >
                            loads in under 1 second
                          </span>
                        </>
                      ) : (
                        row.rewire
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* ── SECTION 4: CLOSING CTA ────────────────────────────────────────── */}
      <motion.section
        {...REVEAL}
        style={{
          textAlign: 'center',
          padding: '80px 0',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
          Not sure what you need?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--muted)',
            margin: '0 0 36px',
            lineHeight: 1.7,
          }}
        >
          That is exactly why the first call is free. No commitment, no
          proposal until you ask for one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
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
            }}
            whileHover={{ boxShadow: '5px 5px 0px var(--fg)', x: -2, y: -2 }}
            transition={{ duration: 0.15 }}
          >
            Book a Free Audit
          </motion.a>
        </motion.div>

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
          ↳ 30 minutes. No hard sell. Just an honest look at your site.
        </motion.p>
      </motion.section>
    </main>
  );
}
