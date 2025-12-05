import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (user.role !== 'intern') {
            // If employer, maybe redirect to employer dashboard? For now, home.
            router.push('/');
        } else {
            fetchResume();
        }
    }, [user, router]);

    const fetchResume = async () => {
        try {
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .eq('user_email', user.email)
                .single();

            if (data) {
                setResume(data);
            }
        } catch (error) {
            console.log('Error fetching resume:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 0' }}>
                {/* Top Header Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <h1 style={{ margin: 0, color: '#0032A0' }}>Intern Dashboard</h1>
                    <button
                        onClick={logout}
                        className="btn"
                        style={{
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                    {/* Sidebar / Profile Card */}
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
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{user.name}</h2>
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
                                {user.role === 'intern' ? 'Intern' : user.role}
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Resume Section */}
                        <div className="glass-card" style={{ padding: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0, color: '#0032A0' }}>My Resume</h3>
                                <Link href="/intern/resume">
                                    <button className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
                                        {resume ? 'Update Resume' : 'Create Resume'}
                                    </button>
                                </Link>
                            </div>

                            {loading ? (
                                <p>Loading resume status...</p>
                            ) : resume ? (
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>University</span>
                                            <strong>{resume.university}</strong>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>Major</span>
                                            <strong>{resume.major}</strong>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>CGPA</span>
                                            <strong>{resume.cgpa}</strong>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>Graduation</span>
                                            <strong>{resume.graduation_year}</strong>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <span style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>Skills</span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {resume.skills && resume.skills.map((skill, index) => (
                                                <span key={index} style={{
                                                    background: '#f3f4f6',
                                                    padding: '4px 10px',
                                                    borderRadius: '15px',
                                                    fontSize: '0.85rem'
                                                }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
                                    <p style={{ marginBottom: '15px', color: '#666' }}>You haven't uploaded a resume yet.</p>
                                    <Link href="/intern/resume">
                                        <button className="btn btn-secondary">Create Now</button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions Section */}
                        <div className="glass-card" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px', color: '#0032A0' }}>Quick Actions</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <Link href="/my-applications" style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        padding: '20px',
                                        background: '#f0f9ff',
                                        borderRadius: '12px',
                                        border: '1px solid #bae6fd',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        textAlign: 'center'
                                    }}>
                                        <h4 style={{ margin: '0 0 5px', color: '#0284c7' }}>My Applications</h4>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>View status of applied jobs</p>
                                    </div>
                                </Link>

                                <Link href="/saved-jobs" style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        padding: '20px',
                                        background: '#fdf4ff',
                                        borderRadius: '12px',
                                        border: '1px solid #f0abfc',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        textAlign: 'center'
                                    }}>
                                        <h4 style={{ margin: '0 0 5px', color: '#c026d3' }}>Saved Jobs</h4>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>View your bookmarked jobs</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
