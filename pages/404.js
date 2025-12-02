import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
    return (
        <Layout>
            <Head>
                <title>404 - Page Not Found | InternMy Malaysia</title>
            </Head>
            <div style={{
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '20px'
            }}>
                <h1 style={{
                    fontSize: '6rem',
                    fontWeight: '800',
                    color: 'var(--primary-blue)',
                    marginBottom: '10px',
                    lineHeight: 1
                }}>404</h1>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '20px',
                    color: 'var(--text-dark)'
                }}>Page Not Found</h2>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-gray)',
                    marginBottom: '40px',
                    maxWidth: '500px'
                }}>
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link href="/" className="btn btn-primary">
                    Back to Homepage
                </Link>
            </div>
        </Layout>
    );
}
