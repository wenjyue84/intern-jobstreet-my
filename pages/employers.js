import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const sampleInterns = [
    {
        id: 1,
        name: "Sarah L.",
        university: "University of Malaya",
        major: "Computer Science",
        skills: ["React", "Node.js", "Python"],
        availability: "Available Jan 2024",
        image: "https://ui-avatars.com/api/?name=Sarah+L&background=random"
    },
    {
        id: 2,
        name: "Ahmad R.",
        university: "Universiti Sains Malaysia",
        major: "Marketing",
        skills: ["Social Media", "SEO", "Content Writing"],
        availability: "Available Feb 2024",
        image: "https://ui-avatars.com/api/?name=Ahmad+R&background=random"
    },
    {
        id: 3,
        name: "Wei Jie T.",
        university: "Taylor's University",
        major: "Graphic Design",
        skills: ["Photoshop", "Illustrator", "Figma"],
        availability: "Immediate",
        image: "https://ui-avatars.com/api/?name=Wei+Jie&background=random"
    },
    {
        id: 4,
        name: "Priya M.",
        university: "Monash University",
        major: "Business Admin",
        skills: ["Excel", "Project Management", "Communication"],
        availability: "Available Mar 2024",
        image: "https://ui-avatars.com/api/?name=Priya+M&background=random"
    },
    {
        id: 5,
        name: "Jason K.",
        university: "Sunway University",
        major: "Data Science",
        skills: ["Python", "SQL", "Tableau"],
        availability: "Available Jan 2024",
        image: "https://ui-avatars.com/api/?name=Jason+K&background=random"
    },
    {
        id: 6,
        name: "Nurul A.",
        university: "UiTM",
        major: "Accounting",
        skills: ["Xero", "Quickbooks", "Financial Reporting"],
        availability: "Immediate",
        image: "https://ui-avatars.com/api/?name=Nurul+A&background=random"
    }
];

export default function Employers() {
    const { user } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationTerm, setLocationTerm] = useState('');

    useEffect(() => {
        if (user && user.role === 'student') {
            router.push('/');
        }
    }, [user, router]);

    const filteredInterns = sampleInterns.filter(intern => {
        const matchesSearch =
            intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intern.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intern.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesLocation =
            intern.university.toLowerCase().includes(locationTerm.toLowerCase());

        return matchesSearch && matchesLocation;
    });

    return (
        <Layout>
            <Head>
                <title>For Employers - Hire Top Interns | InternMy</title>
                <meta name="description" content="Post internships and hire the best students in Malaysia." />
            </Head>

            {/* Hero Section */}
            <section className="hero" style={{ background: 'linear-gradient(135deg, #0032A0 0%, #0056b3 100%)', color: 'white' }}>
                <div className="container">
                    <h1>Hire Top Interns</h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 30px' }}>
                        Post jobs for free and connect with top talent.
                    </p>
                    <div className="search-container" style={{ marginBottom: '30px' }}>
                        <input
                            type="text"
                            placeholder="Search by name or skill"
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            className="search-input"
                            value={locationTerm}
                            onChange={(e) => setLocationTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" style={{ padding: '15px 30px' }}>Search</button>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <p style={{ marginBottom: '15px', fontSize: '1rem', opacity: 0.9 }}>Ready to post your internship?</p>
                        <button className="btn"
                            onClick={() => {
                                if (user) {
                                    router.push('/post-job');
                                } else {
                                    router.push('/signup?role=employer&redirect=/post-job');
                                }
                            }}
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                padding: '12px 30px',
                                fontWeight: 'bold',
                                border: '1px solid rgba(255,255,255,0.5)',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                backdropFilter: 'blur(5px)'
                            }}>
                            Post a Job for Free
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Interns Section */}
            <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ color: '#0032A0', marginBottom: '15px' }}>Browse Top Intern Talent</h2>
                        <p style={{ color: '#666', fontSize: '1.1rem' }}>Discover motivated students ready to contribute to your company.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {filteredInterns.length > 0 ? (
                            filteredInterns.map(intern => (
                                <div key={intern.id} className="intern-card" style={{
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    padding: '25px',
                                    background: 'white',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.2s ease',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                        <img
                                            src={intern.image}
                                            alt={intern.name}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                marginRight: '15px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div>
                                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{intern.name}</h3>
                                            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{intern.university}</p>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#444' }}>{intern.major}</p>
                                        <p style={{ margin: 0, color: '#28a745', fontSize: '0.9rem' }}>• {intern.availability}</p>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                                        {intern.skills.map((skill, index) => (
                                            <span key={index} style={{
                                                background: '#f0f4ff',
                                                color: '#0032A0',
                                                padding: '5px 10px',
                                                borderRadius: '15px',
                                                fontSize: '0.85rem',
                                                fontWeight: '500'
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => router.push('/signup?role=employer')}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            background: 'transparent',
                                            border: '1px solid #0032A0',
                                            color: '#0032A0',
                                            borderRadius: '6px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = '#0032A0';
                                            e.currentTarget.style.color = 'white';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#0032A0';
                                        }}
                                    >
                                        View Full Profile
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
                                <p style={{ fontSize: '1.2rem' }}>No interns found matching your criteria.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setLocationTerm(''); }}
                                    style={{
                                        marginTop: '15px',
                                        background: 'transparent',
                                        border: '1px solid #0032A0',
                                        color: '#0032A0',
                                        padding: '8px 20px',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <button
                            onClick={() => router.push('/signup?role=employer')}
                            className="btn"
                            style={{
                                background: '#0032A0',
                                color: 'white',
                                padding: '15px 40px',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(0,50,160,0.3)'
                            }}
                        >
                            View All Interns
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container" style={{ padding: '80px 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '50px', color: '#0032A0' }}>Why Hire with InternMy?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', textAlign: 'center' }}>
                    <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🚀</div>
                        <h3 style={{ marginBottom: '10px' }}>Top Talent</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Access motivated students from leading universities.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💰</div>
                        <h3 style={{ marginBottom: '10px' }}>Free Posting</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Post your first 3 internships for free.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🤝</div>
                        <h3 style={{ marginBottom: '10px' }}>Direct Chat</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Connect directly with applicants.</p>
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

            {/* CTA Section - Only show if not logged in */}
            {!user && (
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
            )}
        </Layout>
    );
}
