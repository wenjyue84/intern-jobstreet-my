import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function MyApplications() {
    const { user } = useAuth();
    const router = useRouter();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (user.role === 'employer') {
            router.push('/post-job');
            return;
        }

        const fetchApplications = async () => {
            try {
                const { data, error } = await supabase
                    .from('applications')
                    .select(`
                        *,
                        jobs (
                            id,
                            title,
                            company,
                            location,
                            allowance
                        )
                    `)
                    .eq('user_email', user.email)
                    .order('applied_at', { ascending: false });

                if (error) throw error;

                setApplications(data || []);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user, router]);

    if (loading) {
        return (
            <Layout>
                <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <h2>Loading applications...</h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container" style={{ padding: '60px 0' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#0032A0' }}>My Applications</h1>

                {applications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', background: '#f9f9f9', borderRadius: '16px' }}>
                        <h2 style={{ marginBottom: '20px', color: '#666' }}>No applications yet</h2>
                        <p style={{ marginBottom: '30px', color: '#888' }}>Start exploring jobs and apply to your dream internship!</p>
                        <Link href="/" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {applications.map((app) => (
                            <div key={app.id} className="glass-card" style={{ padding: '25px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#333' }}>
                                        {app.jobs?.title || 'Job Title Unavailable'}
                                    </h3>
                                    <p style={{ color: '#666', marginBottom: '5px' }}>
                                        {app.jobs?.company || 'Company Unavailable'} • {app.jobs?.location || 'Location Unavailable'}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>
                                        Applied on: {new Date(app.applied_at).toLocaleDateString('en-GB')}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '6px 15px',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        backgroundColor: '#e3f2fd',
                                        color: '#1976d2'
                                    }}>
                                        {app.status}
                                    </span>
                                    <div style={{ marginTop: '10px' }}>
                                        <Link href={`/jobs/${app.job_id}`} style={{ color: '#0032A0', fontSize: '0.9rem', textDecoration: 'none' }}>
                                            View Job &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
