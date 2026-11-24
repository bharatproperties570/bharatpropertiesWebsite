'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('[GlobalError]', error?.message || 'Critical application error');
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem'
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: '#1e293b',
            padding: '3rem 2rem',
            borderRadius: '1rem',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#fbbf24',
              marginBottom: '1rem'
            }}
          >
            Bharat Properties
          </div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '0.75rem'
            }}
          >
            Critical Application Error
          </h1>
          <p
            style={{
              color: '#94a3b8',
              lineHeight: 1.6,
              fontSize: '0.95rem',
              marginBottom: '2rem'
            }}
          >
            A critical error occurred while rendering the application layout. You can reload the page or attempt recovery.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                backgroundColor: '#c2410c',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                backgroundColor: '#334155',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Reload Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
