'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CardData {
  // Section bg
  bg: string;
  // Glow overlay (optional, shown behind card when active)
  glow?: string;
  // Card chrome
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  // Text
  textColor: string;
  descColor: string;
  // Tag pill
  tag: string;
  tagFont: 'mono' | 'caveat';
  tagBg: string;
  tagTextColor: string;
  tagBorder: string;
  // Project name
  name: string;
  nameFont: 'syne' | 'caveat';
  // Description
  description: string;
  descFont?: 'caveat';
  // Stack pills
  stack: string[];
  pillBorder: string;
  pillText: string;
  // Screenshot
  screenshot?: string;
  // Live link
  link?: string;
  linkColor: string;
  // Sketched card variant
  dashed?: boolean;
  rotation?: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CARDS: CardData[] = [
  // 0 — TheHouseHub
  {
    bg: '#0A0A0A',
    glow: 'radial-gradient(ellipse at 30% 50%, rgba(110,231,183,0.06) 0%, transparent 60%)',
    cardBg: '#0A0A0A',
    cardBorder: '1.5px solid rgba(110,231,183,0.15)',
    cardShadow: '4px 4px 0px rgba(110,231,183,0.1)',
    textColor: '#ffffff',
    descColor: 'rgba(255,255,255,0.6)',
    tag: 'Audio Platform',
    tagFont: 'mono',
    tagBg: 'rgba(110,231,183,0.08)',
    tagTextColor: 'rgba(110,231,183,0.6)',
    tagBorder: '1px solid rgba(110,231,183,0.2)',
    name: 'TheHouseHub',
    nameFont: 'syne',
    description: 'Browser-based music production. Drag, drop, create.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    pillBorder: 'rgba(110,231,183,0.3)',
    pillText: 'rgba(110,231,183,0.7)',
    link: 'thehousehub.xyz',
    linkColor: '#6EE7B7',
    screenshot: '/screenshots/footydept.png',
  },
  // 1 — Footy Dept.
  {
    bg: '#000000',
    cardBg: '#000000',
    cardBorder: '1.5px solid rgba(96,165,250,0.15)',
    cardShadow: '4px 4px 0px rgba(96,165,250,0.1)',
    textColor: '#ffffff',
    descColor: 'rgba(255,255,255,0.6)',
    tag: 'Ecommerce',
    tagFont: 'mono',
    tagBg: 'rgba(96,165,250,0.08)',
    tagTextColor: 'rgba(96,165,250,0.6)',
    tagBorder: '1px solid rgba(96,165,250,0.2)',
    name: 'Footy Dept.',
    nameFont: 'syne',
    description: 'Full ecommerce storefront. Football culture, built properly.',
    stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel'],
    pillBorder: 'rgba(96,165,250,0.3)',
    pillText: 'rgba(96,165,250,0.7)',
    link: 'footy-dept.com',
    linkColor: '#60A5FA',
    screenshot: '/screenshots/househub.png',
  },
  // 2 — Your New Website (sketched, light)
  {
    bg: '#f7f6f2',
    cardBg: '#ffffff',
    cardBorder: '2px dashed #1a1a1a',
    cardShadow: '4px 4px 0px #1a1a1a',
    textColor: '#1a1a1a',
    descColor: 'var(--muted)',
    tag: 'next project...',
    tagFont: 'caveat',
    tagBg: 'transparent',
    tagTextColor: 'var(--muted)',
    tagBorder: 'none',
    name: 'Your New Website',
    nameFont: 'caveat',
    description: "This slot is yours. Let's build something worth showing off.",
    descFont: 'caveat',
    stack: [],
    pillBorder: 'var(--border)',
    pillText: 'var(--muted)',
    linkColor: 'var(--fg)',
    dashed: true,
    rotation: -0.8,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const CARD_WIDTH = 340;
const CARD_GAP = 40;
const CARD_SPACING = CARD_WIDTH + CARD_GAP;

// ─── CarouselCard ─────────────────────────────────────────────────────────────

function CarouselCard({ card }: { card: CardData }) {
  const isDashed = card.dashed;

  return (
    <div
      style={{
        backgroundColor: card.cardBg,
        border: card.cardBorder,
        boxShadow: card.cardShadow,
        borderRadius: '6px',
        overflow: 'hidden',
        color: card.textColor,
        transform: card.rotation ? `rotate(${card.rotation}deg)` : undefined,
      }}
    >
      {/* Screenshot / placeholder */}
      <div style={{ margin: '20px 20px 0', borderRadius: '4px', overflow: 'hidden' }}>
        {isDashed ? (
          <div
            style={{
              aspectRatio: '16/9',
              border: '1.5px dashed var(--border)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-caveat)',
                fontSize: '64px',
                color: 'var(--muted)',
                lineHeight: 1,
              }}
            >
              ?
            </span>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={card.screenshot!}
              alt={card.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="340px"
            />
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 24px 24px' }}>
        {/* Tag */}
        <div
          style={{
            display: 'inline-block',
            fontFamily:
              card.tagFont === 'caveat' ? 'var(--font-caveat)' : 'var(--font-mono)',
            fontSize: card.tagFont === 'caveat' ? '15px' : '11px',
            color: card.tagTextColor,
            backgroundColor: card.tagBg,
            border: card.tagBorder,
            borderRadius: card.tagFont === 'mono' ? '20px' : '0',
            padding: card.tagFont === 'mono' ? '3px 10px' : '0',
            letterSpacing: card.tagFont === 'mono' ? '0.06em' : '0',
            marginBottom: '10px',
            textTransform: card.tagFont === 'mono' ? 'uppercase' : 'none',
          }}
        >
          {card.tag}
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily:
              card.nameFont === 'caveat' ? 'var(--font-caveat)' : 'var(--font-syne)',
            fontWeight: 700,
            fontSize: card.nameFont === 'caveat' ? '26px' : '20px',
            color: card.textColor,
            marginBottom: '10px',
            lineHeight: 1.2,
          }}
        >
          {card.name}
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: card.descFont ? 'var(--font-caveat)' : 'var(--font-mono)',
            fontSize: card.descFont ? '16px' : '12px',
            color: card.descColor,
            lineHeight: 1.65,
            margin: '0 0 16px',
          }}
        >
          {card.description}
        </p>

        {/* Stack pills */}
        {card.stack.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {card.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: card.pillText,
                  border: `1px solid ${card.pillBorder}`,
                  borderRadius: '3px',
                  padding: '3px 8px',
                  letterSpacing: '0.04em',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {isDashed ? (
          <motion.a
            href="https://cal.com/therewire/30min"
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
              display: 'inline-block',
            }}
            whileHover={{ boxShadow: '5px 5px 0px var(--fg)', x: -2, y: -2 }}
            transition={{ duration: 0.15 }}
          >
            Start Here →
          </motion.a>
        ) : (
          card.link && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: card.linkColor,
                letterSpacing: '0.04em',
                opacity: 0.8,
              }}
            >
              ↗ {card.link}
            </div>
          )
        )}
      </div>
    </div>
  );
}

// ─── WorkCarousel ─────────────────────────────────────────────────────────────

export default function WorkCarousel() {
  const [active, setActive] = useState(0);

  const goNext = () => setActive((i) => Math.min(i + 1, CARDS.length - 1));
  const goPrev = () => setActive((i) => Math.max(i - 1, 0));

  const isLight = CARDS[active].bg === '#f7f6f2';
  const arrowColor = isLight ? 'rgba(26,26,26,0.5)' : 'rgba(255,255,255,0.8)';
  const arrowColorDisabled = isLight ? 'rgba(26,26,26,0.15)' : 'rgba(255,255,255,0.2)';
  const arrowBorder = isLight ? 'rgba(26,26,26,0.15)' : 'rgba(255,255,255,0.2)';
  const arrowBg = isLight ? 'rgba(26,26,26,0.05)' : 'rgba(255,255,255,0.08)';

  return (
    <section
      style={{
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden',
        // Hard cut — no transition
        backgroundColor: CARDS[active].bg,
      }}
    >
      {/* Per-card glow overlay (HouseHub only) */}
      {CARDS[active].glow && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: CARDS[active].glow,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-caveat)',
              fontWeight: 600,
              fontSize: '36px',
              color: 'var(--muted)',
              margin: '0 0 10px',
              letterSpacing: '0.01em',
            }}
          >
            Our Work
          </h2>
          <svg
            width="100"
            height="14"
            viewBox="0 0 100 14"
            style={{ display: 'block', margin: '0 auto' }}
          >
            <path
              d="M 0 7 C 10 0, 20 14, 30 7 S 50 0, 60 7 S 75 14, 90 7 S 95 4, 100 7"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1.5"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Cards stage */}
        <div style={{ position: 'relative' }}>
          <motion.div
            onPanEnd={(_, info) => {
              if (info.offset.x < -50) goNext();
              else if (info.offset.x > 50) goPrev();
            }}
            style={{
              position: 'relative',
              height: 460,
              overflow: 'hidden',
              touchAction: 'pan-y',
            }}
          >
            {CARDS.map((card, i) => {
              const offset = i - active;
              const visible = Math.abs(offset) <= 1;
              return (
                <motion.div
                  key={card.name}
                  animate={{
                    x: offset * CARD_SPACING,
                    scale: offset === 0 ? 1 : 0.85,
                    opacity: visible ? (offset === 0 ? 1 : 0.5) : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.32, 0.0, 0.67, 0] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    width: CARD_WIDTH,
                    marginLeft: -CARD_WIDTH / 2,
                    cursor: offset !== 0 ? 'pointer' : 'default',
                  }}
                  onClick={() => offset !== 0 && setActive(i)}
                >
                  <CarouselCard card={card} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Arrow buttons */}
          <button
            onClick={goPrev}
            disabled={active === 0}
            aria-label="Previous"
            style={{
              position: 'absolute',
              left: `calc(50% - ${CARD_WIDTH / 2 + 60}px)`,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: `1.5px solid ${arrowBorder}`,
              backgroundColor: arrowBg,
              color: active === 0 ? arrowColorDisabled : arrowColor,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              zIndex: 2,
              transition: 'color 0s, border-color 0s, background-color 0s',
            }}
          >
            ←
          </button>
          <button
            onClick={goNext}
            disabled={active === CARDS.length - 1}
            aria-label="Next"
            style={{
              position: 'absolute',
              right: `calc(50% - ${CARD_WIDTH / 2 + 60}px)`,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: `1.5px solid ${arrowBorder}`,
              backgroundColor: arrowBg,
              color: active === CARDS.length - 1 ? arrowColorDisabled : arrowColor,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              zIndex: 2,
              transition: 'color 0s, border-color 0s, background-color 0s',
            }}
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '36px',
          }}
        >
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to card ${i + 1}`}
              style={{
                width: i === active ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor:
                  i === active
                    ? 'var(--spark)'
                    : isLight
                    ? 'rgba(26,26,26,0.2)'
                    : 'rgba(255,255,255,0.25)',
                border: 'none',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
