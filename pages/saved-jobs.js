import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';
import JobCard from '../components/JobCard';
import { useAuth } from '../context/AuthContext';

export default function SavedJobs() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        const fetchSavedJobs = async () => {
            if (!user) return;

            try {
                // Fetch saved jobs and join with jobs table
                const { data, error } = await supabase
                    .from('saved_jobs')
                    .select(`
                        job_id,
                        jobs:job_id (*)
                    `)
                    .eq('user_id', user.id);

                if (error) throw error;

                // Format data for JobCard
                const formattedJobs = data.map(item => {
                    const job = item.jobs;
                    return {
                        ...job,
                        postedAt: new Date(job.created_at).toLocaleDateString(),
                        tags: Array.isArray(job.tags) ? job.tags : (job.tags ? job.tags.split(',') : [])
                    };
                });

                setSavedJobs(formattedJobs);
            } catch (error) {
                console.error('Error fetching saved jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedJobs();
    }, [user, authLoading, router]);

    if (authLoading || loading) {
        return (
            <Layout>
                <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <h2>Loading...</h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 0' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: '#0032A0' }}>Saved Jobs</h1>

                {savedJobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>No saved jobs yet</h2>
                        <p style={{ color: '#666', marginBottom: '20px' }}>
                            Jobs you save will appear here for easy access.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => router.push('/jobs')}
                        >
                            Browse Jobs
                        </button>
                    </div>
                ) : (
                    <div className="jobs-grid">
                        {savedJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
