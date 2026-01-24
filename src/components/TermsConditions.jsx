import React, { useEffect } from 'react';

const TermsConditions = () => {
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
                    <h1 style={styles.heading}>Terms and Conditions</h1>
                    <p style={styles.text}>Last Updated: {new Date().toLocaleDateString()}</p>
                    <p style={styles.text}>
                        Welcome to Bharat Properties. By accessing or using our website and services, you agree to comply with and be bound by these Terms and Conditions.
                        Please read them carefully ensuring you understand your rights and obligations under Indian Law.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>1. Nature of Services</h2>
                    <p style={styles.text}>
                        Bharat Properties acts as a facilitator and marketing platform between real estate developers, sellers, and prospective buyers/tenants.
                        We provide information regarding real estate projects and properties based on data provided by third parties.
                    </p>
                    <p style={styles.text}>
                        <strong>Disclaimer:</strong> While we strive for accuracy, Bharat Properties does not guarantee the completeness or absolute correctness of the property details.
                        Users are advised to independently verify all details, including RERA registration, approvals, and legal titles before making any financial decisions.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>2. RERA Compliance</h2>
                    <p style={styles.text}>
                        In accordance with the Real Estate (Regulation and Development) Act, 2016 (RERA), all project details displayed on our portal are for information purposes only.
                        We strongly recommend that you check the verified RERA numbers of specific projects on the respective State RERA websites before booking.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>3. User Obligations</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>You agree to provide accurate and current information when filling out forms on our website.</li>
                        <li style={styles.listItem}>You shall not use this website for any unlawful purpose or to post any misleading or defamatory content.</li>
                        <li style={styles.listItem}>You acknowledge that any investment in real estate involves risks, and you are solely responsible for your investment decisions.</li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>4. Limitation of Liability</h2>
                    <p style={styles.text}>
                        To the fullest extent permitted by law, Bharat Properties shall not be liable for any direct, indirect, incidental, or consequential damages arising out of:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>The use or inability to use our services.</li>
                        <li style={styles.listItem}>Errors, mistakes, or inaccuracies of content.</li>
                        <li style={styles.listItem}>Any unauthorized access to our servers or personal information.</li>
                        <li style={styles.listItem}>Any transaction disputes between buyers and sellers/developers introduced through our platform.</li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>5. Intellectual Property</h2>
                    <p style={styles.text}>
                        All content, trademarks, logos, and digital assets on this website are the property of Bharat Properties or its licensors.
                        Unauthorized reproduction, distribution, or modification of this content is strictly prohibited.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>6. Governing Law & Jurisdiction</h2>
                    <p style={styles.text}>
                        These Terms shall be governed by and construed in accordance with the laws of India.
                        Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Mohali/Chandigarh, India.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.subheading}>7. Contact</h2>
                    <p style={styles.text}>
                        For legal inquiries or clarifications regarding these terms, please contact us at: legal&#64;bharatproperties.com
                    </p>
                </div>

            </div>
        </div>
    );
};

export default TermsConditions;
