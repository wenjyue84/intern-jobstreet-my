import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useEffect } from 'react';

export default function Employers() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && user.role === 'student') {
            router.push('/');
        }
    }, [user, router]);

    return (
        <Layout>
            <Head>
                <title>For Employers - Hire Top Interns | InternMy</title>
                <meta name="description" content="Post internships and hire the best students in Malaysia." />
            </Head>

            {/* Hero Section */}
            <section className="hero" style={{ background: 'linear-gradient(135deg, #0032A0 0%, #0056b3 100%)', color: 'white' }}>
                <div className="container">
                    <h1>Hire the Best Interns in Malaysia 🇲🇾</h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 30px' }}>
                        Connect with top talent from leading universities. Post jobs for free and start hiring today.
                    </p>
                    <button className="btn"
                        onClick={() => {
                            if (user) {
                                router.push('/post-job');
                            } else {
                                router.push('/signup?role=employer&redirect=/post-job');
                            }
                        }}
                        style={{
                            background: 'white',
                            color: '#0032A0',
                            padding: '15px 30px',
                            fontWeight: 'bold',
                            border: 'none',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            borderRadius: '8px'
                        }}>
                        Post a Job for Free
                    </button>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container" style={{ padding: '80px 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '50px', color: '#0032A0' }}>Why Hire with InternMy?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', textAlign: 'center' }}>
                    <div className="glass-card" style={{ padding: '40px 30px', background: 'white' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚀</div>
                        <h3 style={{ marginBottom: '15px' }}>Access Top Talent</h3>
                        <p style={{ color: '#666' }}>Reach thousands of motivated students from top Malaysian universities like UM, USM, and UTM.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '40px 30px', background: 'white' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💰</div>
                        <h3 style={{ marginBottom: '15px' }}>Cost Effective</h3>
                        <p style={{ color: '#666' }}>Post your first 3 internship listings completely for free. No hidden charges.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '40px 30px', background: 'white' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤝</div>
                        <h3 style={{ marginBottom: '15px' }}>Direct Connection</h3>
                        <p style={{ color: '#666' }}>Chat directly with applicants, schedule interviews, and manage offers seamlessly.</p>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section style={{ background: '#f8f9fa', padding: '80px 0' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '60px', color: '#0032A0' }}>How it Works</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
                        <div style={{ textAlign: 'center', maxWidth: '300px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: '#0032A0',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                margin: '0 auto 20px',
                                boxShadow: '0 4px 10px rgba(0,50,160,0.3)'
                            }}>1</div>
                            <h3 style={{ marginBottom: '10px' }}>Create Account</h3>
                            <p style={{ color: '#666' }}>Sign up as an employer in less than 2 minutes.</p>
                        </div>
                        <div style={{ textAlign: 'center', maxWidth: '300px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: '#0032A0',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                margin: '0 auto 20px',
                                boxShadow: '0 4px 10px rgba(0,50,160,0.3)'
                            }}>2</div>
                            <h3 style={{ marginBottom: '10px' }}>Post a Job</h3>
                            <p style={{ color: '#666' }}>Describe the role, requirements, and allowance.</p>
                        </div>
                        <div style={{ textAlign: 'center', maxWidth: '300px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: '#0032A0',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                margin: '0 auto 20px',
                                boxShadow: '0 4px 10px rgba(0,50,160,0.3)'
                            }}>3</div>
                            <h3 style={{ marginBottom: '10px' }}>Start Hiring</h3>
                            <p style={{ color: '#666' }}>Review applications and hire the best candidates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '20px', color: '#0032A0' }}>Ready to find your next intern?</h2>
                    <p style={{ marginBottom: '30px', color: '#666', fontSize: '1.1rem' }}>Join hundreds of other companies hiring on InternMy.</p>
                    <Link href="/signup?role=employer">
                        <button className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                            Get Started Now
                        </button>
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
