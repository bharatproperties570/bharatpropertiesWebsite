import React from 'react';
import { ExternalLink, Clock, Newspaper } from 'lucide-react';

const NewsCard = ({ news }) => {
    // Determine if it's a high priority news for badging
    const isPriority = news.priorityScore >= 100;

    // Extract a cleaner tag if possible
    let tag = 'Real Estate';
    if (news.isOfficial) tag = 'Official Notification';
    else if (news.title.toUpperCase().includes('HSVP')) tag = 'HSVP Update';
    else if (news.title.toUpperCase().includes('HUDA')) tag = 'HUDA News';
    else if (news.title.toUpperCase().includes('GMADA')) tag = 'GMADA Update';
    else if (news.title.toUpperCase().includes('PUDA')) tag = 'PUDA Update';
    else if (news.title.toUpperCase().includes('HOME LOAN')) tag = 'Home Loans';

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transition: 'all 0.3s ease',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
            }}
        >
            {/* Glow effect for priority news */}
            {isPriority && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'var(--color-gold)',
                    opacity: 0.1,
                    filter: 'blur(20px)',
                    zIndex: 0
                }}></div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: news.isOfficial ? '#78350f' : (isPriority ? '#92400e' : 'var(--color-primary)'),
                    backgroundColor: news.isOfficial ? '#fef3c7' : (isPriority ? '#fef3c7' : 'var(--color-bg-light)'),
                    border: news.isOfficial ? '1px solid #f59e0b' : 'none',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    letterSpacing: '0.5px'
                }}>
                    {tag}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {new Date(news.pubDate).toLocaleDateString()}
                </span>
            </div>

            <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                lineHeight: 1.4,
                color: 'var(--color-primary)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1
            }}>
                {news.title}
            </h3>

            <div style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}
                dangerouslySetInnerHTML={{ __html: news.description }}
            />

            <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #f1f5f9'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <Newspaper size={14} />
                    <span>{news.source || news.author || 'Property News'}</span>
                </div>
                <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: 'var(--color-accent)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    Read More <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

export default NewsCard;
