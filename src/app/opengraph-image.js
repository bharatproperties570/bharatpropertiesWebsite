import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bharat Properties - Kurukshetra - Mohali - Chandigarh';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0F172A',
                    color: 'white',
                    padding: '60px',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '10px',
                        background: 'linear-gradient(90deg, #D97706, #F59E0B)',
                    }}
                />
                <div
                    style={{
                        fontSize: 26,
                        fontWeight: 700,
                        color: '#F59E0B',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        marginBottom: 20,
                    }}
                >
                    Real Estate Consultancy
                </div>
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textAlign: 'center',
                        letterSpacing: '-2px',
                        lineHeight: 1.1,
                        marginBottom: 20,
                    }}
                >
                    Bharat Properties
                </div>
                <div
                    style={{
                        fontSize: 32,
                        fontWeight: 500,
                        color: '#CBD5E1',
                        textAlign: 'center',
                        letterSpacing: '1px',
                        marginBottom: 40,
                    }}
                >
                    Kurukshetra • Mohali • Chandigarh
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 36px',
                        borderRadius: '9999px',
                        backgroundColor: '#1E293B',
                        border: '1px solid #334155',
                        color: '#F8FAFC',
                        fontSize: 20,
                        fontWeight: 600,
                    }}
                >
                    <span>www.bharatproperties.co</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
