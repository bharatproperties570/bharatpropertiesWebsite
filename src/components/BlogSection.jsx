'use client';
import React from 'react';
import { BLOG_DATA } from '../data/blogData';
import { ArrowRight, Calendar, User } from 'lucide-react';

const BlogSection = () => {
    return (
        <section id="blogs" style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        display: 'block'
                    }}>Insights & Articles</span>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#0F172A', letterSpacing: '-0.02em' }}>
                        Latest from Our <span style={{ color: 'var(--color-primary)' }}>Blog</span>
                    </h2>
                    <p style={{ color: '#64748B', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Stay updated with the latest trends, investment guides, and lifestyle tips in the world of real estate.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {BLOG_DATA.map((blog) => (
                        <article
                            key={blog.id}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), boxShadow 0.3s ease',
                                border: '1px solid #F1F5F9',
                                cursor: 'pointer'
                            }}
                            className="blog-card"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)';
                            }}
                        >
                            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '50px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {blog.category}
                                </div>
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', color: '#94A3B8', fontSize: '0.875rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={14} />
                                        {blog.date}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={14} />
                                        {blog.author}
                                    </div>
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    marginBottom: '1rem',
                                    color: '#1E293B',
                                    lineHeight: 1.4
                                }}>
                                    {blog.title}
                                </h3>
                                <p style={{
                                    color: '#64748B',
                                    lineHeight: 1.6,
                                    marginBottom: '2rem',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {blog.excerpt}
                                </p>
                                <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: 700,
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    transition: 'gap 0.2s ease'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.gap = '1rem'}
                                    onMouseLeave={(e) => e.currentTarget.style.gap = '0.75rem'}
                                >
                                    Read Article <ArrowRight size={18} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <button style={{
                        padding: '1rem 2.5rem',
                        backgroundColor: 'white',
                        color: '#0F172A',
                        border: '2px solid #E2E8F0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#E2E8F0';
                            e.currentTarget.style.color = '#0F172A';
                        }}
                    >
                        View All News & Blogs
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
