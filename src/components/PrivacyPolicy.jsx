import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const styles = {
        container: {
            padding: '8rem 0 4rem',
            backgroundColor: '#f8fafc',
            color: 'var(--color-text-main)',
            minHeight: '100vh',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6'
        },
        section: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2rem'
        },
        heading: {
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'var(--color-primary)'
        },
        subheading: {
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            marginTop: '1.5rem',
            color: 'var(--color-secondary)'
        },
        text: {
            marginBottom: '1rem',
            color: 'var(--color-text-muted)'
        },
        list: {
            paddingLeft: '1.5rem',
            marginBottom: '1rem',
            color: 'var(--color-text-muted)'
        },
        listItem: {
            marginBottom: '0.5rem'
        }
    };

    return (
        <div style={styles.container}>
            <div className="container reveal">

                <div style={styles.section}>
                    <h1 style={styles.heading}>Privacy Policy</h1>
                    <p style={styles.text}>Last Updated: {new Date().toLocaleDateString()}</p>
                    <p style={styles.text}>
                        Welcome to Bharat Properties. We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services.
                        This policy outlines our data handling practices and your rights.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>1. Information We Collect</h2>
                    <p style={styles.text}>We collect information to provide better services to all our users. This includes:</p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}><strong>Personal Information:</strong> Name, email address, phone number, and location when you voluntarily provide it through our forms (e.g., "Contact Us", "Book Consultation").</li>
                        <li style={styles.listItem}><strong>Usage Data:</strong> Information about how you use our website, such as pages visited, time spent, and links clicked.</li>
                        <li style={styles.listItem}><strong>Device Information:</strong> IP address, browser type, device type (mobile/desktop), and operating system.</li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>2. How We Use Your Information</h2>
                    <p style={styles.text}>Your data helps us to:</p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Process your inquiries and connect you with relevant property dealers or agents.</li>
                        <li style={styles.listItem}>Send you updates, newsletters, and promotional materials (you can opt-out at any time).</li>
                        <li style={styles.listItem}>Improve our website functionality and user experience.</li>
                        <li style={styles.listItem}>Comply with legal obligations and enforce our terms of service.</li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>3. Cookies and Tracking Technologies</h2>
                    <p style={styles.text}>
                        We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                        Cookies are files with a small amount of data which may include an anonymous unique identifier.
                    </p>
                    <p style={styles.text}><strong>Types of Cookies We Use:</strong></p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
                        <li style={styles.listItem}><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the website (e.g., Google Analytics).</li>
                        <li style={styles.listItem}><strong>Advertising Cookies:</strong> Used to deliver advertisements relevant to you and your interests.</li>
                    </ul>
                    <p style={styles.text}>
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>4. Third-Party Services & Advertising</h2>
                    <p style={styles.text}>
                        We partner with third-party networks to display advertising on our website or to manage our advertising on other sites.
                        These parties use cookies and web beacons to collect non-personally identifiable information about your activities on this and other websites to provide you with targeted advertising.
                    </p>

                    <h3 style={{ ...styles.subheading, fontSize: '1.2rem' }}>Google (Google Ads & Analytics)</h3>
                    <p style={styles.text}>
                        We use Google Analytics and Google Ads. Google uses cookies to serve ads based on your past visits to our website.
                        You can opt-out of Google's use of cookies or device identifiers by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)' }}>Ad Settings</a>.
                    </p>

                    <h3 style={{ ...styles.subheading, fontSize: '1.2rem' }}>Meta (Facebook & Instagram)</h3>
                    <p style={styles.text}>
                        We use the Meta Pixel to measure, optimize, and build audiences for our ad campaigns. This allows us to see how users move between devices when accessing our website and Facebook/Instagram, ensuring that our Facebook advertising is seen by users most likely to be interested.
                        You can manage your Facebook ad preferences in your <a href="https://www.facebook.com/adpreferences/ad_settings" target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)' }}>Facebook Ad Settings</a>.
                    </p>

                    <h3 style={{ ...styles.subheading, fontSize: '1.2rem' }}>LinkedIn</h3>
                    <p style={styles.text}>
                        We use the LinkedIn Insight Tag to track conversions, retarget website visitors, and unlock additional insights about members interacting with our LinkedIn ads.
                        You can control your LinkedIn advertising preferences in your <a href="https://www.linkedin.com/psettings/guest-controls" target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)' }}>Settings</a>.
                    </p>

                    <h3 style={{ ...styles.subheading, fontSize: '1.2rem' }}>X (formerly Twitter)</h3>
                    <p style={styles.text}>
                        We may use X's conversion tracking and tailored audiences to serve relevant ads.
                        You can adjust your personalization settings on X via your <a href="https://twitter.com/settings/privacy_and_safety" target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)' }}>Privacy Controls</a>.
                    </p>

                    <h3 style={{ ...styles.subheading, fontSize: '1.2rem' }}>WhatsApp</h3>
                    <p style={styles.text}>
                        When you contact us via WhatsApp, your phone number and message content are processed by WhatsApp (Meta) in accordance with their privacy policy.
                        We use this purely for customer service communication.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>5. Data Security</h2>
                    <p style={styles.text}>
                        We strive to use commercially acceptable means to protect your Personal Data, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                        While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>6. Contact Us</h2>
                    <p style={styles.text}>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>By email: privacy&#64;bharatproperties.com</li>
                        <li style={styles.listItem}>By visiting this page on our website: <a href="#contact" style={{ color: 'var(--color-primary)' }}>Contact Page</a></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
