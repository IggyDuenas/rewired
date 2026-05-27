'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Block {
  index: number;
  name: string;
  category: string;
  offset: number;
  rotation: number;
  desktopWidth: number;
  logoLetter: string;
  logoColor: string;
  description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const BLOCKS: Block[] = [
  {
    index: 0,
    name: 'Next.js',
    category: 'Frontend Framework',
    offset: 0,
    rotation: 0,
    desktopWidth: 300,
    logoLetter: 'N',
    logoColor: '#000000',
    description:
      'Next.js is the foundation every site we build is built on. It is a React framework that makes websites fast, SEO-friendly, and scalable from day one. Unlike WordPress or Wix, it gives us complete control over how your site loads and performs. It is the same framework used by Nike, TikTok, and Notion.',
  },
  {
    index: 1,
    name: 'Vercel',
    category: 'Deployment & Hosting',
    offset: -6,
    rotation: -0.8,
    desktopWidth: 280,
    logoLetter: '▲',
    logoColor: '#000000',
    description:
      'Vercel is where we deploy and host every site we build. It puts your website on servers around the world so it loads fast no matter where your visitors are. Every time we push an update to your site it goes live in under 30 seconds. It also gives us instant preview links so you can review changes before they go public.',
  },
  {
    index: 2,
    name: 'Supabase',
    category: 'Database & Auth',
    offset: 8,
    rotation: 1.2,
    desktopWidth: 280,
    logoLetter: 'S',
    logoColor: '#3ECF8E',
    description:
      'Supabase is your database, user authentication, and backend — all in one. It stores everything your site needs to remember: orders, users, content, form submissions. It replaces five different tools you would otherwise pay for separately. Think of it as the brain behind your website.',
  },
  {
    index: 3,
    name: 'Stripe',
    category: 'Payments',
    offset: -4,
    rotation: -0.5,
    desktopWidth: 280,
    logoLetter: '$',
    logoColor: '#635BFF',
    description:
      'Stripe handles all payment processing on every site we build. It is the most trusted payment infrastructure in the world, used by Amazon, Google, and Shopify themselves. We integrate it directly into your site so there are no middlemen taking extra cuts. Setup to first transaction typically takes less than a day.',
  },
  {
    index: 4,
    name: 'Tailwind CSS',
    category: 'Styling',
    offset: 6,
    rotation: 1,
    desktopWidth: 280,
    logoLetter: 'T',
    logoColor: '#06B6D4',
    description:
      'Tailwind is how we style every component and page we build. It is a utility-first CSS framework that lets us design precisely and consistently without writing bloated stylesheets. Every spacing, color, and font decision is intentional and tied to your brand system. It is why our sites look sharp and load fast — no unnecessary CSS baggage.',
  },
  {
    index: 5,
    name: 'Framer Motion',
    category: 'Animation',
    offset: -8,
    rotation: -1.2,
    desktopWidth: 280,
    logoLetter: 'F',
    logoColor: '#0055FF',
    description:
      'Framer Motion is the animation library behind every transition, hover effect, and scroll interaction on your site. It is what makes your site feel alive rather than static. The carousel on our homepage, the block animations on this page — all Framer Motion. Good animation is the difference between a site people scroll and a site people remember.',
  },
  {
    index: 6,
    name: 'GitHub',
    category: 'Version Control',
    offset: 4,
    rotation: 0.8,
    desktopWidth: 280,
    logoLetter: 'G',
    logoColor: '#24292F',
    description:
      'GitHub is where all code we write lives and is version controlled. Every change is tracked so nothing is ever permanently broken or lost. It means you always have a full history of your site and we can roll back anything instantly. It also means handing your site to another developer in the future is completely seamless.',
  },
  {
    index: 7,
    name: 'Claude Code',
    category: 'AI Development',
    offset: -6,
    rotation: -1,
    desktopWidth: 260,
    logoLetter: 'C',
    logoColor: '#CC785C',
    description:
      'Claude Code is an AI development tool we use to ship faster than any studio our size. It handles boilerplate, suggests implementations, and catches errors — letting us focus on the architecture and design decisions that actually matter. It is why our delivery time is days not months. We are not replacing developer thinking with AI — we are removing the parts that slow good developers down.',
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const BLOCK_GAP = 6;       // px gap between tower blocks
const CONNECTOR_W = 24;    // px width of dashed connector line
const PANEL_W = 280;       // px width of side panel

// ─── Sub-components ──────────────────────────────────────────────────────────

function LogoSquare({ letter, color, size }: { letter: string; color: string; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-syne)',
        fontWeight: 800,
        fontSize: size * 0.38,
        color: '#ffffff',
        flexShrink: 0,
        letterSpacing: '-0.01em',
        userSelect: 'none',
      }}
    >
      {letter}
    </div>
  );
}

function PanelContent({
  block,
  fontSize,
}: {
  block: Block;
  fontSize: string;
}) {
  return (
    <>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: '#FFD60A',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        {block.category}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize,
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {block.description}
      </p>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StackPage() {
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  // Side-panel layout requires enough horizontal room; below 1024 px fall back
  // to the original below-block panel so nothing overflows.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const blockH = isMobile ? 60 : 72;
  const logoSize = isMobile ? 30 : 36;
  const blockW = (b: Block) => (isMobile ? 240 : b.desktopWidth);

  const handleClick = (index: number) =>
    setActiveBlock((prev) => (prev === index ? null : index));

  // Tower renders top → bottom: index 7 (Claude Code) first, 0 (Next.js) last.
  const ordered = [...BLOCKS].reverse();

  /**
   * Distance from the top of the tower to the top of block `index`.
   * Render position: block at data index i → renderPos = 7 - i
   */
  const getPanelTop = (index: number) =>
    (BLOCKS.length - 1 - index) * (blockH + BLOCK_GAP);

  const activeData =
    activeBlock !== null ? BLOCKS.find((b) => b.index === activeBlock) ?? null : null;

  // ── Shared block tile ────────────────────────────────────────────────────

  const renderBlock = (block: Block, renderIdx: number) => {
    const isActive = activeBlock === block.index;
    const isAbove = activeBlock !== null && block.index > activeBlock;
    const staggerDelay = isAbove
      ? (block.index - (activeBlock ?? 0) - 1) * 0.05
      : 0;
    const width = blockW(block);

    return (
      <motion.div
        key={block.name}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: renderIdx * 0.06 }}
      >
        <motion.div
          initial={false}
          animate={{
            x: block.offset,
            rotate: block.rotation,
            scale: isActive ? 1.06 : 1,
            y: isAbove ? -12 : 0,
            backgroundColor: isActive ? '#FFD60A' : '#ffffff',
            boxShadow: isActive ? '6px 6px 0px #1a1a1a' : '3px 3px 0px #1a1a1a',
          }}
          transition={{
            scale: { duration: 0.2, ease: 'easeOut' },
            backgroundColor: { duration: 0.2 },
            boxShadow: { duration: 0.2 },
            y: { duration: 0.3, ease: 'easeOut', delay: staggerDelay },
            x: { duration: 0 },
            rotate: { duration: 0 },
          }}
          onClick={() => handleClick(block.index)}
          style={{
            width,
            height: blockH,
            border: '1.5px solid #1a1a1a',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '0 20px',
            userSelect: 'none',
            flexShrink: 0,
            willChange: 'transform',
          }}
        >
          <LogoSquare letter={block.logoLetter} color={block.logoColor} size={logoSize} />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: isMobile ? '13px' : '15px',
                color: '#1a1a1a',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {block.name}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: isMobile ? '10px' : '11px',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {block.category}
            </div>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: isActive ? 'rgba(26,26,26,0.5)' : 'var(--muted)',
              flexShrink: 0,
            }}
          >
            {isActive ? '−' : '+'}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 120px' }}>
      {/* INTRO */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
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
          The Stack
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: isMobile ? '13px' : '15px',
            color: 'var(--muted)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          A stack is the combination of tools and technologies used to build a website or
          product. Think of it like the materials a builder chooses — the quality of each one
          directly affects the speed, reliability, and flexibility of the final result. These
          are the tools we use on every project, and why we chose them.
        </p>
      </motion.div>

      {/* TOWER LABEL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ textAlign: 'center', marginBottom: '44px' }}
      >
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
          Our Go-To Stack
        </span>
      </motion.div>

      {/* ── MOBILE: panel opens below the clicked block ────────────────────── */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: BLOCK_GAP,
          }}
        >
          {ordered.map((block, renderIdx) => {
            const isActive = activeBlock === block.index;
            const width = blockW(block);
            return (
              <div
                key={block.name}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {renderBlock(block, renderIdx)}

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={`mpanel-${block.index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{
                        overflow: 'hidden',
                        width,
                        transform: `translateX(${block.offset}px)`,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#1a1a1a',
                          padding: '16px 20px',
                          borderRadius: '0 0 4px 4px',
                          border: '1.5px solid #1a1a1a',
                          borderTop: 'none',
                        }}
                      >
                        <PanelContent block={block} fontSize="12px" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* ── DESKTOP: CSS grid — tower in centre, panel in right column ──────── */}
      {!isMobile && (
        <div
          style={{
            display: 'grid',
            // left gutter | tower (sized to widest block) | right panel column
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'start',
          }}
        >
          {/* Left column: intentionally empty */}
          <div />

          {/* Centre column: the tower — never shifts */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: BLOCK_GAP,
            }}
          >
            {ordered.map((block, renderIdx) => renderBlock(block, renderIdx))}
          </div>

          {/* Right column: side panel lives here, absolutely positioned */}
          <div style={{ position: 'relative' }}>
            <AnimatePresence>
              {activeData !== null && (
                <motion.div
                  key={`panel-${activeData.index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    // Align top of panel with top of the clicked block
                    top: getPanelTop(activeData.index),
                    // left: 0 = right edge of the tower column
                    left: 0,
                    // connector (CONNECTOR_W) + panel (PANEL_W) side by side
                    width: CONNECTOR_W + PANEL_W,
                    pointerEvents: 'none',
                  }}
                >
                  {/* Dashed connector: spans the gap between tower and panel */}
                  <div
                    style={{
                      position: 'absolute',
                      top: blockH / 2 - 1,
                      left: 0,
                      width: CONNECTOR_W,
                      height: 2,
                      backgroundImage:
                        'repeating-linear-gradient(90deg, #FFD60A 0px, #FFD60A 6px, transparent 6px, transparent 10px)',
                    }}
                  />

                  {/* Panel box */}
                  <div
                    style={{
                      marginLeft: CONNECTOR_W,
                      width: PANEL_W,
                      backgroundColor: '#1a1a1a',
                      borderLeft: '3px solid #FFD60A',
                      borderRadius: '4px',
                      padding: '16px 20px',
                      pointerEvents: 'auto',
                    }}
                  >
                    <PanelContent block={activeData} fontSize="13px" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--muted)',
          textAlign: 'center',
          marginTop: '36px',
          letterSpacing: '0.06em',
        }}
      >
        ↑ click any block to learn more
      </motion.p>
    </main>
  );
}
