import Layout from '../components/Layout';
import Head from 'next/head';

export default function Privacy() {
    return (
        <Layout>
            <Head>
                <title>Privacy Policy - InternMy Malaysia</title>
                <meta name="description" content="Privacy Policy for InternMy Malaysia." />
            </Head>

            <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
                <div className="glass-card" style={{ padding: '40px' }}>
                    <h1 style={{ color: 'var(--primary-blue)', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>Privacy Policy</h1>

                    <div style={{ lineHeight: '1.8', color: 'var(--text-dark)' }}>
                        <p style={{ marginBottom: '20px' }}>Last updated: December 2024</p>

                        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--primary-blue)' }}>1. Introduction</h3>
                        <p style={{ marginBottom: '20px' }}>
                            Welcome to InternMy Malaysia. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            and tell you about your privacy rights and how the law protects you.
                        </p>

                        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--primary-blue)' }}>2. Data We Collect</h3>
                        <p style={{ marginBottom: '20px' }}>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Profile Data:</strong> includes your interests, preferences, feedback and survey responses.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                        </ul>

                        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--primary-blue)' }}>3. How We Use Your Data</h3>
                        <p style={{ marginBottom: '20px' }}>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                            <li>To register you as a new customer.</li>
                            <li>To manage our relationship with you.</li>
                            <li>To improve our website, products/services, marketing or customer relationships.</li>
                            <li>To recommend jobs or candidates that might be of interest to you.</li>
                        </ul>

                        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--primary-blue)' }}>4. Data Security</h3>
                        <p style={{ marginBottom: '20px' }}>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                        </p>

                        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--primary-blue)' }}>5. Contact Us</h3>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at support@internmy.com.my.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
