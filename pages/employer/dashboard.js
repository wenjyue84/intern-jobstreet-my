import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function EmployerDashboard() {
    const { user, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login');
        } else if (user.role !== 'employer') {
            router.push('/');
        } else {
            fetchPostedJobs();
        }
    }, [user, authLoading, router]);

    const fetchPostedJobs = async () => {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('employer_email', user.email)
                .order('posted_at', { ascending: false });

            if (error) throw error;
            setJobs(data || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) return;

        try {
            const { error } = await supabase
                .from('jobs')
                .delete()
                .eq('id', jobId);

            if (error) throw error;

            setJobs(jobs.filter(job => job.id !== jobId));
            alert('Job deleted successfully.');
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Error deleting job: ' + error.message);
        }
    };

    if (!user) return null;

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 0' }}>
                <h1 style={{ marginBottom: '30px', color: '#0032A0' }}>Employer Dashboard</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
                    {/* Sidebar */}
                    <div className="glass-card" style={{ padding: '30px', height: 'fit-content' }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                background: '#e0e7ff',
                                borderRadius: '50%',
                                margin: '0 auto 15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                color: '#0032A0',
                                fontWeight: 'bold'
                            }}>
                                {user.company ? user.company.charAt(0).toUpperCase() : user.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{user.company || user.name}</h2>
                            <p style={{ color: '#666' }}>{user.email}</p>
                            <span style={{
                                display: 'inline-block',
                                background: '#dbeafe',
                                color: '#1e40af',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                marginTop: '10px'
                            }}>
                                Employer
                            </span>
                        </div>

                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }}>
                            <Link href="/post-job">
                                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }}>
                                    Post a New Job
                                </button>
                            </Link>
                            <Link href="/employer/profile">
                                <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '10px', border: '1px solid #ddd' }}>
                                    Edit Company Profile
                                </button>
                            </Link>
                            <button
                                onClick={logout}
                                className="btn btn-secondary"
                                style={{ width: '100%', border: '1px solid #ddd' }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px', color: '#0032A0' }}>Your Job Postings</h3>

                            {loading ? (
                                <p>Loading jobs...</p>
                            ) : jobs.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {jobs.map(job => (
                                        <div key={job.id} style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            padding: '20px',
                                            background: '#f9fafb'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                                <div>
                                                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{job.title}</h4>
                                                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                                                        Posted on {new Date(job.posted_at).toLocaleDateString('en-GB')} • {job.location}
                                                    </p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <Link href={`/employer/edit-job/${job.id}`}>
                                                        <button className="btn btn-secondary" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteJob(job.id)}
                                                        className="btn"
                                                        style={{
                                                            padding: '8px 15px',
                                                            fontSize: '0.9rem',
                                                            background: '#fee2e2',
                                                            color: '#dc2626',
                                                            border: 'none'
                                                        }}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                                                <div style={{ display: 'flex', gap: '15px' }}>
                                                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                                                        <strong>Allowance:</strong> RM {job.allowance}
                                                    </span>
                                                </div>
                                                <Link href={`/employer/job/${job.id}/applicants`}>
                                                    <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                                        View Applicants
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <p style={{ marginBottom: '20px', color: '#666' }}>You haven't posted any jobs yet.</p>
                                    <Link href="/post-job">
                                        <button className="btn btn-primary">Post Your First Job</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
