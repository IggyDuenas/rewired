'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type Grade = 'S' | 'A' | 'B' | 'C' | 'D';

interface Platform {
  id: string;
  name: string;
  grade: Grade;
  verdict: string;
  fallsShortLabel: string;
  fallsShort: string[];
  goodFor: string[];
  dealbreaker: string;
  isRewire?: boolean;
}

interface Tier {
  grade: Grade;
  bg: string;
  color: string;
  platforms: Platform[];
  empty?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PLATFORMS: Platform[] = [
  {
    id: 'rewire',
    name: 'The Rewire',
    grade: 'S',
    verdict: 'Built for businesses that are serious about growth.',
    fallsShortLabel: 'WHY S TIER',
    fallsShort: [
      '100/100 desktop PageSpeed — we eat our own cooking',
      'You own every line of code, forever',
      'Custom architecture means no ceiling, ever',
      'Built and shipped in days, not months',
    ],
    goodFor: ['Any growing business that needs a website that works as hard as they do'],
    dealbreaker: 'Every other platform on this list has a ceiling. We don\'t.',
    isRewire: true,
  },
  {
    id: 'webflow',
    name: 'Webflow',
    grade: 'B',
    verdict: 'Powerful for designers. Expensive for everyone else.',
    fallsShortLabel: 'WHERE IT FALLS SHORT',
    fallsShort: [
      'Hosting costs $23–$39/mo minimum with no flexibility',
      'Still a platform ceiling — complex custom features hit a wall fast',
      'Steep learning curve means most clients need a Webflow specialist forever',
      'CMS is rigid — anything outside their structure requires workarounds',
    ],
    goodFor: ['Designers who want visual control without writing code'],
    dealbreaker: 'When you outgrow Webflow, you have to rebuild from scratch anyway — so why not build it right the first time?',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    grade: 'C',
    verdict: 'Perfect for starting. Painful for scaling.',
    fallsShortLabel: 'WHERE IT FALLS SHORT',
    fallsShort: [
      'Basic plan requires 3rd party apps for features that should be standard',
      'Average Shopify store pays $150–$500/mo in apps on top of platform fees',
      'Custom checkout is locked behind Shopify Plus at $2,000/mo',
      'Transaction fees on every sale unless you use Shopify Payments',
    ],
    goodFor: ['First-time ecommerce stores testing product-market fit'],
    dealbreaker: 'Your checkout, your customer data, and your store logic are all owned by Shopify — not you.',
  },
  {
    id: 'squarespace',
    name: 'Squarespace',
    grade: 'C',
    verdict: 'Beautiful out of the box. Stuck in the box forever.',
    fallsShortLabel: 'WHERE IT FALLS SHORT',
    fallsShort: [
      'Mobile PageSpeed scores consistently 35–55 with no way to fix it',
      'Zero ability to add custom functionality beyond their app market',
      'SEO is platform-limited — you cannot touch the code that matters',
      'Ecommerce is basic at best — no custom flows, no real inventory logic',
    ],
    goodFor: ['Portfolios, photographers, simple brochure sites with no growth ambition'],
    dealbreaker: 'Your entire site lives inside Squarespace. If they shut down, change pricing, or limit features — you have no recourse.',
  },
  {
    id: 'wix',
    name: 'Wix',
    grade: 'C',
    verdict: 'Easy to start. Impossible to outgrow.',
    fallsShortLabel: 'WHERE IT FALLS SHORT',
    fallsShort: [
      'Wix injects its own tracking scripts you cannot remove — they tank your PageSpeed',
      'Average mobile PageSpeed score: 35–55',
      'Plugin costs stack to $100–$400/mo for features custom code does for free',
      'Your content is trapped inside Wix — exporting is painful and incomplete',
    ],
    goodFor: ['Absolute beginners building a first website with no technical help'],
    dealbreaker: 'Every dollar you spend on Wix apps is money you will never get back — and you still won\'t own the result.',
  },
  {
    id: 'lovable',
    name: 'Lovable',
    grade: 'D',
    verdict: 'Great for prototyping. Dangerous for production.',
    fallsShortLabel: 'WHERE IT FALLS SHORT',
    fallsShort: [
      'AI-generated code is unstructured and unmaintainable — a real developer inheriting it starts from scratch',
      'No real database architecture — Supabase integration is bolted on, not designed',
      'Zero performance optimization — nobody is running PageSpeed audits on Lovable outputs',
      'When it breaks — and it will — you have no idea how to fix it',
    ],
    goodFor: ['Validating an idea quickly before investing in a real build'],
    dealbreaker: 'Lovable is a great way to prove an idea. It is a terrible way to build a business.',
  },
  {
    id: 'ai-builders',
    name: 'AI Builders',
    grade: 'D',
    verdict: 'The fastest way to build technical debt.',
    fallsShortLabel: 'WHERE IT FALLS SHORT',
    fallsShort: [
      'Generated code has no consistent architecture — impossible to hand off or scale',
      'Performance is an afterthought — speed, accessibility, and SEO are all sacrificed',
      'You own nothing — the moment the tool changes or shuts down you start over',
      'Every customization beyond the prompt is a battle you will lose',
    ],
    goodFor: ['Internal tools, throwaway prototypes, and proof of concepts only'],
    dealbreaker: 'The code that AI builders generate today will be your biggest technical problem in 12 months.',
  },
];

const TIERS: Tier[] = [
  {
    grade: 'S',
    bg: '#FFD60A',
    color: '#1a1a1a',
    platforms: PLATFORMS.filter((p) => p.grade === 'S'),
  },
  {
    grade: 'A',
    bg: '#22c55e',
    color: '#ffffff',
    platforms: [],
    empty: true,
  },
  {
    grade: 'B',
    bg: '#60A5FA',
    color: '#ffffff',
    platforms: PLATFORMS.filter((p) => p.grade === 'B'),
  },
  {
    grade: 'C',
    bg: '#f97316',
    color: '#ffffff',
    platforms: PLATFORMS.filter((p) => p.grade === 'C'),
  },
  {
    grade: 'D',
    bg: '#e63946',
    color: '#ffffff',
    platforms: PLATFORMS.filter((p) => p.grade === 'D'),
  },
];

const TIER_META: Record<Grade, { bg: string; color: string }> = {
  S: { bg: '#FFD60A', color: '#1a1a1a' },
  A: { bg: '#22c55e', color: '#ffffff' },
  B: { bg: '#60A5FA', color: '#ffffff' },
  C: { bg: '#f97316', color: '#ffffff' },
  D: { bg: '#e63946', color: '#ffffff' },
};

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
  platform,
  onClose,
}: {
  platform: Platform;
  onClose: () => void;
}) {
  const meta = TIER_META[platform.grade];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid var(--fg)',
          boxShadow: '6px 6px 0px var(--fg)',
          borderRadius: '4px',
          padding: '40px',
          maxWidth: '520px',
          width: '90%',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
          }}
        >
          ✕ close
        </button>

        {/* Grade badge */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: meta.bg,
            color: meta.color,
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: '13px',
            padding: '4px 10px',
            borderRadius: '4px',
            marginBottom: '12px',
            letterSpacing: '0.05em',
          }}
        >
          {platform.grade} TIER
        </div>

        {/* Platform name */}
        <h2
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: '28px',
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {platform.name}
        </h2>

        {/* Verdict */}
        <div
          style={{
            fontFamily: 'var(--font-caveat)',
            fontWeight: 600,
            fontSize: '18px',
            color: 'var(--muted)',
            marginTop: '6px',
          }}
        >
          {platform.verdict}
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'var(--border)',
            margin: '20px 0',
          }}
        />

        {/* Falls Short / Why S Tier */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '10px',
          }}
        >
          {platform.fallsShortLabel}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {platform.fallsShort.map((item) => (
            <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span
                style={{
                  color: 'var(--spark)',
                  flexShrink: 0,
                  lineHeight: 1.75,
                  fontSize: '11px',
                }}
              >
                ✦
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--fg)',
                  lineHeight: 1.75,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Good For */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '10px',
          }}
        >
          GOOD FOR
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {platform.goodFor.map((item) => (
            <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span
                style={{
                  color: '#22c55e',
                  flexShrink: 0,
                  lineHeight: 1.75,
                  fontSize: '11px',
                }}
              >
                ✦
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--fg)',
                  lineHeight: 1.75,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Dealbreaker */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '10px',
          }}
        >
          THE DEALBREAKER
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--muted)',
            fontStyle: 'italic',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {platform.dealbreaker}
        </p>

        {/* Footer */}
        <div style={{ marginTop: '24px' }}>
          {platform.isRewire ? (
            <div
              style={{
                fontFamily: 'var(--font-caveat)',
                fontSize: '18px',
                color: 'var(--muted)',
              }}
            >
              This is where you belong.
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--muted)',
                }}
              >
                Ready to move off {platform.name}?
              </span>
              <Link
                href="/contact"
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--spark)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Book a free audit →
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PlatformTierList() {
  const [activeModal, setActiveModal] = useState<Platform | null>(null);

  return (
    <>
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: '80px 40px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Label */}
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
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
              Platform Tier List
            </span>
          </div>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--muted)',
              textAlign: 'center',
              marginBottom: '40px',
              lineHeight: 1.7,
            }}
          >
            Not all platforms are created equal. Click any platform to see
            exactly where it falls short — or why it earns its place.
          </p>

          {/* Tier rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {TIERS.map((tier) => (
              <div
                key={tier.grade}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Grade square */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    flexShrink: 0,
                    backgroundColor: tier.bg,
                    border: '1.5px solid var(--fg)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 800,
                    fontSize: '20px',
                    color: tier.color,
                  }}
                >
                  {tier.grade}
                </div>

                {/* Cards or empty label */}
                {tier.empty ? (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    No one else here.
                  </span>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                    }}
                  >
                    {tier.platforms.map((platform) => (
                      <motion.button
                        key={platform.id}
                        onClick={() => setActiveModal(platform)}
                        whileHover={{
                          x: -1,
                          y: -1,
                          boxShadow: '3px 3px 0px var(--fg)',
                        }}
                        transition={{ duration: 0.15 }}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1.5px solid var(--fg)',
                          boxShadow: '2px 2px 0px var(--fg)',
                          borderRadius: '4px',
                          padding: '10px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-syne)',
                          fontWeight: 600,
                          fontSize: '14px',
                          color: 'var(--fg)',
                        }}
                      >
                        {platform.isRewire ? (
                          <span style={{ color: 'var(--spark)', fontSize: '12px' }}>✦</span>
                        ) : (
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              backgroundColor: tier.bg,
                              flexShrink: 0,
                            }}
                          />
                        )}
                        {platform.name}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <Modal
            platform={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
