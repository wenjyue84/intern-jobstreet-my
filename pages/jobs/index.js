import Head from 'next/head';
import Layout from '../../components/Layout';
import JobCard from '../../components/JobCard';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { MOCK_JOBS } from '../../lib/data';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function Jobs() {
    const { user } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationTerm, setLocationTerm] = useState('');
    const [jobs, setJobs] = useState(MOCK_JOBS);

    useEffect(() => {
        if (user && user.role === 'employer') {
            router.push('/post-job');
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
                    postedAt: new Date(job.posted_at).toLocaleDateString(),
                    tags: Array.isArray(job.tags) ? job.tags : (job.tags ? job.tags.split(',') : [])
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
                <title>Find Internships - InternMy</title>
                <meta name="description" content="Browse the latest internship opportunities in Malaysia" />
            </Head>

            <section className="container" style={{ padding: '40px 0' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#0032A0' }}>Find Your Dream Internship 🚀</h1>

                <div className="search-container" style={{ marginBottom: '40px' }}>
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
                </div>

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
            </section>
        </Layout>
    );
}
