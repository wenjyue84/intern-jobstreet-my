import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';
import JobCard from '../components/JobCard';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

import { MOCK_JOBS } from '../lib/data';

export default function Home() {
    const { user } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationTerm, setLocationTerm] = useState('');
    const [jobs, setJobs] = useState(MOCK_JOBS);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9;

    useEffect(() => {
        if (user && user.role === 'employer') {
            router.push('/employers');
        }
    }, [user, router]);

    useEffect(() => {
        const fetchJobs = async () => {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .order('posted_at', { ascending: false });

            if (!error && data) {
                const formattedJobs = data.map(job => ({
                    ...job,
                    postedAt: new Date(job.posted_at).toLocaleDateString('en-GB'), // Map posted_at to postedAt
                    tags: Array.isArray(job.tags) ? job.tags : (job.tags ? job.tags.split(',') : []) // Ensure tags is array
                }));
                setJobs([...formattedJobs, ...MOCK_JOBS]);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

        const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());

        return matchesSearch && matchesLocation;
    });

    // Pagination Logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Layout>
            <SEOHead
                title="InternMy - Find Top Internships in Malaysia"
                description="The #1 Internship Portal for Malaysian Students"
                url="https://internmy.com"
            />

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1>Launch Your Career in Malaysia 🇲🇾</h1>
                    <p>Connect with top employers like Grab, Petronas, and Maybank.</p>

                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                        <input
                            type="text"
                            placeholder="Location (e.g. KL, Penang)"
                            className="search-input"
                            value={locationTerm}
                            onChange={(e) => { setLocationTerm(e.target.value); setCurrentPage(1); }}
                        />
                        <button className="btn btn-primary" style={{ padding: '15px 30px' }}>Search</button>
                    </div>
                </div>
            </section>

            {/* Featured Jobs */}
            <section className="container">
                <div style={{ padding: '40px 0' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#0032A0' }}>
                        Latest Internships 🚀
                    </h2>
                    <div className="job-grid">
                        {currentJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                            <p>No internships found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '8px 16px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    background: currentPage === 1 ? '#f5f5f5' : 'white',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Previous
                            </button>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                // Logic to show a window of pages around current page
                                let startPage = Math.max(1, currentPage - 2);
                                if (startPage + 4 > totalPages) {
                                    startPage = Math.max(1, totalPages - 4);
                                }
                                const pageNum = startPage + i;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => paginate(pageNum)}
                                        style={{
                                            padding: '8px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            background: currentPage === pageNum ? '#0032A0' : 'white',
                                            color: currentPage === pageNum ? 'white' : 'black',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '8px 16px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    background: currentPage === totalPages ? '#f5f5f5' : 'white',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Why InternMy?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎓</div>
                            <h3>Student Focused</h3>
                            <p>Curated opportunities specifically for university requirements.</p>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏢</div>
                            <h3>Top Employers</h3>
                            <p>Direct access to Malaysia's most sought-after companies.</p>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚡</div>
                            <h3>Fast Applications</h3>
                            <p>Apply to multiple companies with a single profile.</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
