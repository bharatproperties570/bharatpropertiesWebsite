export default function CityLoading() {
  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: 'var(--color-bg-light, #f8fafc)',
        paddingBottom: '4rem'
      }}
      aria-busy="true"
      aria-label="Loading city details"
    >
      {/* Hero Skeleton */}
      <div
        style={{
          width: '100%',
          height: '420px',
          backgroundColor: '#1e293b',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <div
          style={{
            width: '280px',
            height: '42px',
            backgroundColor: '#334155',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}
        />
        <div
          style={{
            width: '420px',
            maxWidth: '90%',
            height: '20px',
            backgroundColor: '#334155',
            borderRadius: '0.375rem',
            marginBottom: '2rem'
          }}
        />
        <div
          style={{
            width: '560px',
            maxWidth: '95%',
            height: '56px',
            backgroundColor: '#334155',
            borderRadius: '0.75rem'
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 1.5rem'
        }}
      >
        <div
          style={{
            width: '220px',
            height: '28px',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.375rem',
            marginBottom: '1.5rem'
          }}
        />

        {/* Card Grid Skeleton */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                border: '1px solid #f1f5f9'
              }}
            >
              <div
                style={{
                  height: '200px',
                  backgroundColor: '#e2e8f0'
                }}
              />
              <div style={{ padding: '1.25rem' }}>
                <div
                  style={{
                    width: '60%',
                    height: '22px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '0.375rem',
                    marginBottom: '0.75rem'
                  }}
                />
                <div
                  style={{
                    width: '40%',
                    height: '16px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '0.25rem',
                    marginBottom: '1rem'
                  }}
                />
                <div
                  style={{
                    width: '100%',
                    height: '36px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '0.5rem'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
