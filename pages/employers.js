import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const INTERNS_PER_PAGE = 12;

export default function Employers() {
    const { user } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationTerm, setLocationTerm] = useState('');
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalInterns, setTotalInterns] = useState(0);

    useEffect(() => {
        if (user && user.role === 'student') {
            router.push('/');
        }
    }, [user, router]);

    useEffect(() => {
        fetchInterns();
    }, [currentPage, searchTerm, locationTerm]);

    async function fetchInterns() {
        setLoading(true);
        try {
            let query = supabase
                .from('resumes')
                .select('*', { count: 'exact' });

            // Apply search filters
            if (searchTerm) {
                query = query.or(`full_name.ilike.%${searchTerm}%,major.ilike.%${searchTerm}%,skills.cs.{${searchTerm}}`);
            }

            if (locationTerm) {
                query = query.ilike('university', `%${locationTerm}%`);
            }

            // Get total count
            const { count } = await query;
            setTotalInterns(count || 0);

            // Apply pagination
            const from = (currentPage - 1) * INTERNS_PER_PAGE;
            const to = from + INTERNS_PER_PAGE - 1;

            const { data, error } = await query
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;

            setInterns(data || []);
        } catch (error) {
            console.error('Error fetching interns:', error);
            setInterns([]);
        } finally {
            setLoading(false);
        }
    }

    const totalPages = Math.ceil(totalInterns / INTERNS_PER_PAGE);

    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page on new search
        fetchInterns();
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            <SEOHead
                title="For Employers - Hire Top Interns | InternMy"
                description="Post internships and hire the best students in Malaysia."
                url="https://internmy.com/employers"
                keywords="hire interns, post internship, employer registration, malaysia internship portal, find students"
            />

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
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            className="search-input"
                            value={locationTerm}
                            onChange={(e) => setLocationTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            className="btn btn-primary"
                            style={{ padding: '15px 30px' }}
                            onClick={handleSearch}
                        >
                            Search
                        </button>
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
                        {loading ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#666' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>⏳</div>
                                <p style={{ fontSize: '1.2rem' }}>Loading interns...</p>
                            </div>
                        ) : interns.length > 0 ? (
                            interns.map(intern => {
                                const availability = intern.graduation_year === '2024' ? 'Available Now' : `Available ${intern.graduation_year}`;
                                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(intern.full_name)}&background=random&size=120`;

                                return (
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
                                            <Image
                                                src={avatarUrl}
                                                alt={intern.full_name}
                                                width={60}
                                                height={60}
                                                style={{
                                                    borderRadius: '50%',
                                                    marginRight: '15px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div>
                                                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{intern.full_name}</h3>
                                                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{intern.university}</p>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '15px' }}>
                                            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#444' }}>{intern.major}</p>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <p style={{ margin: 0, color: '#28a745', fontSize: '0.9rem' }}>• {availability}</p>
                                                {intern.cgpa && (
                                                    <span style={{
                                                        background: '#fff3cd',
                                                        color: '#856404',
                                                        padding: '3px 8px',
                                                        borderRadius: '10px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        CGPA: {intern.cgpa}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                                            {intern.skills && intern.skills.slice(0, 5).map((skill, index) => (
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
                                            {intern.skills && intern.skills.length > 5 && (
                                                <span style={{
                                                    background: '#f0f4ff',
                                                    color: '#0032A0',
                                                    padding: '5px 10px',
                                                    borderRadius: '15px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '500'
                                                }}>
                                                    +{intern.skills.length - 5} more
                                                </span>
                                            )}
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
                                );
                            })
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
                                <p style={{ fontSize: '1.2rem' }}>No interns found matching your criteria.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setLocationTerm(''); setCurrentPage(1); }}
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

                    {/* Pagination Controls */}
                    {!loading && totalPages > 1 && (
                        <div style={{ marginTop: '50px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                flexWrap: 'wrap'
                            }}>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '10px 20px',
                                        background: currentPage === 1 ? '#e0e0e0' : '#0032A0',
                                        color: currentPage === 1 ? '#999' : 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    ← Previous
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                                    // Show first page, last page, current page, and pages around current
                                    const showPage = pageNum === 1 ||
                                        pageNum === totalPages ||
                                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                                    const showEllipsis = (pageNum === 2 && currentPage > 3) ||
                                        (pageNum === totalPages - 1 && currentPage < totalPages - 2);

                                    if (showEllipsis) {
                                        return <span key={pageNum} style={{ padding: '10px 5px', color: '#666' }}>...</span>;
                                    }

                                    if (!showPage) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            style={{
                                                padding: '10px 15px',
                                                background: currentPage === pageNum ? '#0032A0' : 'white',
                                                color: currentPage === pageNum ? 'white' : '#0032A0',
                                                border: `2px solid ${currentPage === pageNum ? '#0032A0' : '#ddd'}`,
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontWeight: currentPage === pageNum ? 'bold' : 'normal',
                                                fontSize: '0.95rem',
                                                minWidth: '45px'
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '10px 20px',
                                        background: currentPage === totalPages ? '#e0e0e0' : '#0032A0',
                                        color: currentPage === totalPages ? '#999' : 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    Next →
                                </button>
                            </div>

                            {/* Results Counter */}
                            <div style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                color: '#666',
                                fontSize: '0.95rem'
                            }}>
                                Showing {((currentPage - 1) * INTERNS_PER_PAGE) + 1} - {Math.min(currentPage * INTERNS_PER_PAGE, totalInterns)} of {totalInterns} interns
                            </div>
                        </div>
                    )}
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
