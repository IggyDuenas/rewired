'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CardData {
  bg: string;
  cardBg: string;
  textColor: string;
  tag: string;
  tagFont: 'mono' | 'caveat';
  name: string;
  nameFont: 'syne' | 'caveat';
  description: string;
  descFont?: 'caveat';
  stack: string[];
  link?: string;
  placeholderBg?: string;
  placeholderBorder?: string;
  dashed?: boolean;
  rotation?: number;
  border?: string;
  boxShadow?: string;
}

const CARDS: CardData[] = [
  {
    bg: '#0d0d1a',
    cardBg: '#0d0d1a',
    textColor: '#f0f0f0',
    tag: 'Audio Platform',
    tagFont: 'mono',
    name: 'TheHouseHub',
    nameFont: 'syne',
    description: 'Browser-based music production. Drag, drop, create.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    link: 'thehousehub.xyz',
    placeholderBg: '#1a1a2e',
    placeholderBorder: '1px solid #2a2a4e',
  },
  {
    bg: '#071a0f',
    cardBg: '#071a0f',
    textColor: '#f0f0f0',
    tag: 'Ecommerce',
    tagFont: 'mono',
    name: 'Footy Dept.',
    nameFont: 'syne',
    description: 'Full ecommerce storefront. Football culture, built properly.',
    stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel'],
    link: 'footy-dept.com',
    placeholderBg: '#0d2a1a',
    placeholderBorder: '1px solid #1a4a2a',
  },
  {
    bg: '#f7f6f2',
    cardBg: '#ffffff',
    textColor: '#1a1a1a',
    tag: 'next project...',
    tagFont: 'caveat',
    name: 'Your New Website',
    nameFont: 'caveat',
    description: "This slot is yours. Let's build something worth showing off.",
    descFont: 'caveat',
    stack: [],
    dashed: true,
    rotation: -0.8,
    border: '2px dashed #1a1a1a',
    boxShadow: '4px 4px 0px #1a1a1a',
  },
];

// Card width chosen so it fits phones (≥ 360px) without horizontal overflow
const CARD_WIDTH = 340;
const CARD_GAP = 40;
const CARD_SPACING = CARD_WIDTH + CARD_GAP;

function CarouselCard({ card }: { card: CardData }) {
  const isDashed = card.dashed;

  return (
    <div
      style={{
        backgroundColor: card.cardBg,
        border: card.border ?? 'none',
        boxShadow: card.boxShadow,
        borderRadius: '6px',
        overflow: 'hidden',
        color: card.textColor,
        transform: card.rotation ? `rotate(${card.rotation}deg)` : undefined,
      }}
    >
      {/* Screenshot / placeholder */}
      {isDashed ? (
        <div
          style={{
            aspectRatio: '16/9',
            border: '1.5px dashed var(--border)',
            margin: '20px 20px 0',
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
            aspectRatio: '16/9',
            backgroundColor: card.placeholderBg,
            border: card.placeholderBorder,
            margin: '20px 20px 0',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.04em',
            }}
          >
            {card.link}
          </span>
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: '20px 24px 24px' }}>
        <div
          style={{
            fontFamily:
              card.tagFont === 'caveat'
                ? 'var(--font-caveat)'
                : 'var(--font-mono)',
            fontSize: card.tagFont === 'caveat' ? '15px' : '11px',
            color:
              card.tagFont === 'caveat'
                ? 'var(--muted)'
                : 'rgba(255,255,255,0.4)',
            letterSpacing: card.tagFont === 'mono' ? '0.06em' : '0',
            marginBottom: '8px',
            textTransform: card.tagFont === 'mono' ? 'uppercase' : 'none',
          }}
        >
          {card.tag}
        </div>

        <div
          style={{
            fontFamily:
              card.nameFont === 'caveat'
                ? 'var(--font-caveat)'
                : 'var(--font-syne)',
            fontWeight: 700,
            fontSize: card.nameFont === 'caveat' ? '26px' : '20px',
            color: card.textColor,
            marginBottom: '10px',
            lineHeight: 1.2,
          }}
        >
          {card.name}
        </div>

        <p
          style={{
            fontFamily: card.descFont ? 'var(--font-caveat)' : 'var(--font-mono)',
            fontSize: card.descFont ? '16px' : '12px',
            color:
              card.textColor === '#f0f0f0'
                ? 'rgba(255,255,255,0.55)'
                : 'var(--muted)',
            lineHeight: 1.65,
            margin: '0 0 16px',
          }}
        >
          {card.description}
        </p>

        {card.stack.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {card.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color:
                    card.textColor === '#f0f0f0'
                      ? 'rgba(255,255,255,0.5)'
                      : 'var(--muted)',
                  border:
                    card.textColor === '#f0f0f0'
                      ? '1px solid rgba(255,255,255,0.15)'
                      : '1px solid var(--border)',
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

        {isDashed ? (
          <motion.a
            href="https://cal.com"
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
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.04em',
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

export default function WorkCarousel() {
  const [active, setActive] = useState(0);

  const goNext = () => setActive((i) => Math.min(i + 1, CARDS.length - 1));
  const goPrev = () => setActive((i) => Math.max(i - 1, 0));

  const bgColors = CARDS.map((c) => c.bg);

  return (
    <section
      style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Animated section background */}
      <motion.div
        animate={{ backgroundColor: bgColors[active] }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

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

        {/* Cards stage:
            Each card is absolutely centred (left:50%, marginLeft:-CARD_WIDTH/2)
            and shifted by x = offset * CARD_SPACING.
            No drag prop → no conflict with animate.
            onPanEnd fires for touch/pointer swipes without taking over position. */}
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
              border: '1.5px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: active === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
              fontSize: '18px',
              
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              zIndex: 2,
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
              border: '1.5px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color:
                active === CARDS.length - 1
                  ? 'rgba(255,255,255,0.2)'
                  : 'rgba(255,255,255,0.8)',
              fontSize: '18px',
              
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              zIndex: 2,
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
                  i === active ? 'var(--spark)' : 'rgba(255,255,255,0.25)',
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
