'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ─── Shared input styles ─────────────────────────────────────────────────────

const fieldBase: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid var(--border)',
  borderRadius: '4px',
  backgroundColor: 'var(--bg)',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  color: 'var(--fg)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  appearance: 'none',
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--fg)',
        marginBottom: '6px',
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </div>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track which field is focused for the focus ring
  const [focused, setFocused] = useState<string | null>(null);

  const focusStyle = (id: string): React.CSSProperties =>
    focused === id
      ? { borderColor: 'var(--fg)', boxShadow: '2px 2px 0px var(--fg)' }
      : {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await getSupabase().from('leads').insert([
      {
        name,
        email,
        website_url: websiteUrl,
        project_type: projectType,
        budget,
        message,
      },
    ]);

    if (error) {
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    router.push('/thank-you');
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 120px' }}>
      {/* ── HEADLINE ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
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
            marginBottom: '28px',
            letterSpacing: '0.04em',
          }}
        >
          Get In Touch
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: '0 0 24px',
          }}
        >
          Let&apos;s look at your site together.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--muted)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          Fill out the form below and we will get back to you as soon as
          possible. The first call is free, no commitment required.
        </p>
      </motion.div>

      {/* ── FORM ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ maxWidth: '560px', margin: '0 auto' }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1.5px solid var(--fg)',
            boxShadow: '4px 4px 0px var(--fg)',
            borderRadius: '4px',
            padding: '40px',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            noValidate
          >
            {/* Name */}
            <Field>
              <Label>Name *</Label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                style={{ ...fieldBase, ...focusStyle('name') }}
              />
            </Field>

            {/* Email */}
            <Field>
              <Label>Email *</Label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={{ ...fieldBase, ...focusStyle('email') }}
              />
            </Field>

            {/* Website URL */}
            <Field>
              <Label>Website URL *</Label>
              <input
                type="url"
                required
                placeholder="https://yoursite.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                onFocus={() => setFocused('url')}
                onBlur={() => setFocused(null)}
                style={{ ...fieldBase, ...focusStyle('url') }}
              />
            </Field>

            {/* What do you need */}
            <Field>
              <Label>What do you need? *</Label>
              <select
                required
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                onFocus={() => setFocused('projectType')}
                onBlur={() => setFocused(null)}
                style={{
                  ...fieldBase,
                  ...focusStyle('projectType'),
                  cursor: 'pointer',
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888880' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  paddingRight: '40px',
                }}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="New Build">New Build</option>
                <option value="Migration from Template">Migration from Template</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
            </Field>

            {/* Monthly Budget */}
            <Field>
              <Label>Monthly Budget *</Label>
              <select
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                onFocus={() => setFocused('budget')}
                onBlur={() => setFocused(null)}
                style={{
                  ...fieldBase,
                  ...focusStyle('budget'),
                  cursor: 'pointer',
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888880' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  paddingRight: '40px',
                }}
              >
                <option value="" disabled>
                  Select a range
                </option>
                <option value="Under $3,000">Under $3,000</option>
                <option value="$3,000–$8,000">$3,000–$8,000</option>
                <option value="$8,000+">$8,000+</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
            </Field>

            {/* Anything else */}
            <Field>
              <Label>Anything else?</Label>
              <textarea
                placeholder="Tell us anything else you think is relevant (optional)"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                style={{
                  ...fieldBase,
                  ...focusStyle('message'),
                  resize: 'none',
                  lineHeight: 1.6,
                }}
              />
            </Field>

            {/* Submit */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={
                  isSubmitting
                    ? {}
                    : { boxShadow: '5px 5px 0px var(--fg)', x: -2, y: -2 }
                }
                transition={{ duration: 0.15 }}
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: 'var(--fg)',
                  backgroundColor: 'var(--spark)',
                  border: '1.5px solid var(--fg)',
                  boxShadow: '3px 3px 0px var(--fg)',
                  padding: '14px',
                  borderRadius: '4px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  letterSpacing: '0.02em',
                  transition: 'opacity 0.15s',
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send It →'}
              </motion.button>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--muted)',
                  letterSpacing: '0.04em',
                }}
              >
                ↳ We typically respond within 24 hours
              </span>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
