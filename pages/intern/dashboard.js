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
        } else if (user.role !== 'student') {
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
                <h1 style={{ marginBottom: '30px', color: '#0032A0' }}>Intern Dashboard</h1>

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
                                {user.role === 'student' ? 'Intern' : user.role}
                            </span>
                        </div>

                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }}>
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

                        {/* Activity Section (Placeholder) */}
                        <div className="glass-card" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px', color: '#0032A0' }}>My Activity</h3>
                            <div style={{ textAlign: 'center', padding: '30px', color: '#666', background: '#f9fafb', borderRadius: '8px' }}>
                                <p>No recent activity found.</p>
                                <p style={{ fontSize: '0.9rem' }}>Applied jobs and saved internships will appear here.</p>
                                <Link href="/jobs">
                                    <button className="btn btn-primary" style={{ marginTop: '15px' }}>Browse Internships</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
