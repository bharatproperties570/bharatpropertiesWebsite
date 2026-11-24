import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | Bharat Properties',
  description: 'The requested property, project, or page could not be found.',
  robots: {
    index: false,
    follow: false
  }
};

const POPULAR_LOCATIONS = [
  { name: 'Kurukshetra', href: '/kurukshetra' },
  { name: 'Mohali', href: '/mohali' },
  { name: 'Chandigarh', href: '/chandigarh' },
  { name: 'Panchkula', href: '/panchkula' },
  { name: 'Zirakpur', href: '/zirakpur' },
  { name: 'Kharar', href: '/kharar' },
  { name: 'New Chandigarh', href: '/new-chandigarh' }
];

export default function NotFound() {
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
          maxWidth: '680px',
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
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            fontWeight: 700,
            fontSize: '0.875rem',
            borderRadius: '9999px',
            marginBottom: '1rem',
            letterSpacing: '0.05em'
          }}
        >
          404 ERROR
        </span>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem',
            color: 'var(--color-primary, #0f172a)'
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-muted, #64748b)',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}
        >
          The property, project, or page you are looking for may have been moved, sold, or is temporarily unavailable.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-accent, #c2410c)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md, 0.75rem)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'var(--transition-smooth, all 0.3s ease)'
            }}
          >
            Return to Home
          </Link>
          <Link
            href="/locations"
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
              transition: 'var(--transition-smooth, all 0.3s ease)'
            }}
          >
            Explore Locations
          </Link>
        </div>

        <div
          style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '2rem',
            textAlign: 'left'
          }}
        >
          <h2
            style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-muted, #64748b)',
              marginBottom: '1rem',
              textAlign: 'center'
            }}
          >
            Explore Properties by City
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center'
            }}
          >
            {POPULAR_LOCATIONS.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                style={{
                  padding: '0.4rem 0.85rem',
                  backgroundColor: '#f1f5f9',
                  color: 'var(--color-primary, #0f172a)',
                  borderRadius: 'var(--radius-sm, 0.375rem)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
