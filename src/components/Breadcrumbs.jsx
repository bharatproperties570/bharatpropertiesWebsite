import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: '0.75rem 0',
        marginBottom: '1rem',
        fontSize: '0.875rem'
      }}
    >
      <ol
        style={{
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: 0,
          margin: 0
        }}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li
              key={item.path || idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: isLast ? 'var(--color-text-muted, #64748b)' : 'var(--color-primary, #0f172a)'
              }}
            >
              {isLast ? (
                <span
                  aria-current="page"
                  style={{
                    fontWeight: 600,
                    maxWidth: '300px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontWeight: 500,
                      transition: 'color 0.2s'
                    }}
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true" style={{ opacity: 0.4 }}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
