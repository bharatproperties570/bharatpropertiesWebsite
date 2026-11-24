export default function PropertyLoading() {
  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: 'var(--color-bg-light, #f8fafc)',
        padding: '2rem 1.5rem 5rem'
      }}
      aria-busy="true"
      aria-label="Loading property details"
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
            width: '260px',
            height: '18px',
            backgroundColor: '#e2e8f0',
            borderRadius: '0.25rem',
            marginBottom: '1.5rem'
          }}
        />

        {/* Gallery / Main Image Skeleton */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '1rem',
            height: '380px',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#cbd5e1',
              borderRadius: '1rem',
              height: '100%'
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              height: '100%'
            }}
          >
            <div
              style={{
                backgroundColor: '#e2e8f0',
                borderRadius: '0.75rem',
                flex: 1
              }}
            />
            <div
              style={{
                backgroundColor: '#e2e8f0',
                borderRadius: '0.75rem',
                flex: 1
              }}
            />
          </div>
        </div>

        {/* Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}
        >
          <div style={{ flex: 2 }}>
            <div
              style={{
                width: '70%',
                height: '36px',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}
            />
            <div
              style={{
                width: '35%',
                height: '28px',
                backgroundColor: '#e2e8f0',
                borderRadius: '0.375rem',
                marginBottom: '1.5rem'
              }}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    height: '80px',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0'
                  }}
                />
              ))}
            </div>
            <div
              style={{
                height: '180px',
                backgroundColor: '#ffffff',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
              }}
            />
          </div>

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
                  width: '60%',
                  height: '22px',
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
                  marginBottom: '1rem'
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
