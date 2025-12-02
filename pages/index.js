import Head from 'next/head';
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
                    postedAt: new Date(job.posted_at).toLocaleDateString(), // Map posted_at to postedAt
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

    return (
        <Layout>
            <Head>
                <title>InternMy - Find Top Internships in Malaysia</title>
                <meta name="description" content="The #1 Internship Portal for Malaysian Students" />
            </Head>

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
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Location (e.g. KL, Penang)"
                            className="search-input"
                            value={locationTerm}
                            onChange={(e) => setLocationTerm(e.target.value)}
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
                        {filteredJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                            <p>No internships found matching your criteria.</p>
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
