export default function ProjectLoading() {
  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: 'var(--color-bg-light, #f8fafc)',
        padding: '2rem 1.5rem 5rem'
      }}
      aria-busy="true"
      aria-label="Loading project details"
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {/* Breadcrumb Skeleton */}
        <div
          style={{
            width: '240px',
            height: '18px',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
            marginBottom: '1.5rem'
          }}
        />

        {/* Hero Gallery Skeleton */}
        <div
          style={{
            height: '400px',
            backgroundColor: '#cbd5e1',
            borderRadius: '1rem',
            marginBottom: '2rem'
          }}
        />

        {/* Content Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {/* Main Info */}
          <div style={{ flex: 2 }}>
            <div
              style={{
                width: '75%',
                height: '36px',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}
            />
            <div
              style={{
                width: '45%',
                height: '24px',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.375rem',
                marginBottom: '1.5rem'
              }}
            />
            <div
              style={{
                height: '120px',
                backgroundColor: '#ffffff',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem'
              }}
            />
            <div
              style={{
                height: '200px',
                backgroundColor: '#ffffff',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: '1px solid #e2e8f0'
              }}
            />
          </div>

          {/* Sidebar */}
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div
                style={{
                  width: '50%',
                  height: '20px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '0.25rem',
                  marginBottom: '1.5rem'
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '44px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '44px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem'
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '0.5rem'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
