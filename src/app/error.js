'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log sanitized error message without exposing credentials or internal traces to UI
    console.error('[AppError]', error?.message || 'Unexpected application error');
  }, [error]);

  return (
    <section
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        backgroundColor: 'var(--color-bg-light, #f8fafc)',
        color: 'var(--color-text-main, #1e293b)'
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'var(--color-bg-white, #ffffff)',
          padding: '3rem 2rem',
          borderRadius: 'var(--radius-lg, 1.25rem)',
          boxShadow: 'var(--shadow-premium, 0 10px 30px -5px rgba(15, 23, 42, 0.1))'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            backgroundColor: '#fef3c7',
            color: '#b45309',
            fontWeight: 700,
            fontSize: '0.875rem',
            borderRadius: '9999px',
            marginBottom: '1rem',
            letterSpacing: '0.05em'
          }}
        >
          TEMPORARY SERVICE ISSUE
        </span>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem',
            color: 'var(--color-primary, #0f172a)'
          }}
        >
          Something Went Wrong
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted, #64748b)',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}
        >
          We encountered an unexpected error while loading this page. Our team has been notified. Please try refreshing or return to the homepage.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button
            type="button"
            onClick={() => reset()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-accent, #c2410c)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md, 0.75rem)',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-primary, #0f172a)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md, 0.75rem)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1rem'
            }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
