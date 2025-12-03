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
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9;

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
                    postedAt: new Date(job.posted_at).toLocaleDateString('en-GB'),
                    tags: Array.isArray(job.tags) ? job.tags : (job.tags ? job.tags.split(',') : [])
                }));
                setJobs(formattedJobs);
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
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                    <input
                        type="text"
                        placeholder="Location (e.g. KL, Penang)"
                        className="search-input"
                        value={locationTerm}
                        onChange={(e) => { setLocationTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>

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
            </section>
        </Layout>
    );
}
