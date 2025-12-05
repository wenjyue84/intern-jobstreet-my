import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalJobs: 0,
        totalResumes: 0,
        totalEmployers: 0,
        totalInterns: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentJobs, setRecentJobs] = useState([]);
    const [recentResumes, setRecentResumes] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch jobs count and recent jobs
            const { data: jobs, error: jobsError } = await supabase
                .from('jobs')
                .select('*')
                .order('posted_at', { ascending: false })
                .limit(5);

            if (jobsError) throw jobsError;

            // Fetch resumes count and recent resumes
            const { data: resumes, error: resumesError } = await supabase
                .from('resumes')
                .select('*')
                .order('updated_at', { ascending: false })
                .limit(5);

            if (resumesError) throw resumesError;

            // Get total counts
            const { count: jobsCount } = await supabase
                .from('jobs')
                .select('*', { count: 'exact', head: true });

            const { count: resumesCount } = await supabase
                .from('resumes')
                .select('*', { count: 'exact', head: true });

            setStats({
                totalJobs: jobsCount || jobs?.length || 0,
                totalResumes: resumesCount || resumes?.length || 0,
                totalEmployers: '-', // Would need auth admin API
                totalInterns: '-'    // Would need auth admin API
            });

            setRecentJobs(jobs || []);
            setRecentResumes(resumes || []);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Jobs', value: stats.totalJobs, icon: '💼', color: '#3b82f6' },
        { label: 'Total Resumes', value: stats.totalResumes, icon: '📄', color: '#10b981' },
        { label: 'Employers', value: stats.totalEmployers, icon: '🏢', color: '#f59e0b' },
        { label: 'Interns', value: stats.totalInterns, icon: '🎓', color: '#ec4899' },
    ];

    return (
        <AdminLayout>
            <div>
                <h1 style={{ color: 'white', marginBottom: '10px', fontSize: '2rem' }}>
                    Dashboard Overview
                </h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '30px' }}>
                    Welcome to the InternMy admin panel. Manage users, jobs, and resumes.
                </p>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    {statCards.map((stat, index) => (
                        <div key={index} style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            padding: '25px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '15px'
                            }}>
                                <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: stat.color,
                                    opacity: 0.2
                                }} />
                            </div>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '0.9rem',
                                margin: '0 0 5px'
                            }}>{stat.label}</p>
                            <p style={{
                                color: 'white',
                                fontSize: '2rem',
                                fontWeight: '700',
                                margin: 0
                            }}>
                                {loading ? '...' : stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '30px'
                }}>
                    {/* Recent Jobs */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '25px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.2rem' }}>
                            📋 Recent Job Postings
                        </h3>
                        {loading ? (
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading...</p>
                        ) : recentJobs.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {recentJobs.map((job) => (
                                    <div key={job.id} style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '15px',
                                        borderRadius: '10px'
                                    }}>
                                        <p style={{ color: 'white', margin: '0 0 5px', fontWeight: '500' }}>
                                            {job.title}
                                        </p>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: 0, fontSize: '0.85rem' }}>
                                            {job.company} • {job.location}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No jobs found</p>
                        )}
                    </div>

                    {/* Recent Resumes */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '25px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.2rem' }}>
                            📄 Recent Resumes
                        </h3>
                        {loading ? (
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading...</p>
                        ) : recentResumes.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {recentResumes.map((resume) => (
                                    <div key={resume.id} style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '15px',
                                        borderRadius: '10px'
                                    }}>
                                        <p style={{ color: 'white', margin: '0 0 5px', fontWeight: '500' }}>
                                            {resume.full_name}
                                        </p>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: 0, fontSize: '0.85rem' }}>
                                            {resume.university} • {resume.major}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No resumes found</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
