import React from 'react';
import { Heart, X, ArrowRight, Trash2 } from 'lucide-react';

const WishlistPanel = ({ isOpen, onClose, items, onRemove }) => {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 2500,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Panel */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: isOpen ? 0 : '-400px',
                width: 'min(400px, 100%)',
                height: '100vh',
                backgroundColor: 'white',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                zIndex: 3000,
                transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Heart size={24} fill="var(--color-accent)" color="var(--color-accent)" /> My Wishlist
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)' }}>
                            <Heart size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>Your wishlist is empty.</p>
                            <p style={{ fontSize: '0.9rem' }}>Save properties you love to view them later.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {items.map((item) => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #f1f5f9',
                                    position: 'relative'
                                }}>
                                    <img src={item.image} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} alt={item.title} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{item.location}</p>
                                        <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{item.price}</div>
                                    </div>
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        style={{ background: 'none', color: '#ef4444', height: 'fit-content', padding: '0.5rem', transition: 'transform 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div style={{ padding: '2rem', borderTop: '1px solid #f1f5f9' }}>
                        <button className="btn-premium" style={{
                            width: '100%',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem'
                        }}>
                            Inquire for All <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default WishlistPanel;
