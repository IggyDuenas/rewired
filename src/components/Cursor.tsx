'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove, { passive: true });

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) setHovered(true);
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) setHovered(false);
    };

    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 9999,
    willChange: 'transform',
  };

  return (
    <>
      {/* Dot — 4px filled circle, no offset needed since we center with margin */}
      <div
        ref={dotRef}
        style={{
          ...baseStyle,
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: 'var(--fg)',
          marginLeft: '-2px',
          marginTop: '-2px',
        }}
      />

      {/* Ring — 28px circle with lerp lag */}
      <div
        ref={ringRef}
        style={{
          ...baseStyle,
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1.5px solid var(--fg)',
          backgroundColor: hovered ? 'var(--spark)' : 'transparent',
          marginLeft: '-14px',
          marginTop: '-14px',
          transition: 'background-color 0.15s ease',
        }}
      />
    </>
  );
}
