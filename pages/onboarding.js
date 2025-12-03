import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Head from 'next/head';

export default function Onboarding() {
    const auth = useAuth();
    const { user, changeUserRole } = auth;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('Onboarding: useAuth result:', auth);
        if (!changeUserRole) {
            console.error('Onboarding: changeUserRole is missing from useAuth!');
        }
    }, [auth, changeUserRole]);

    useEffect(() => {
        // If user already has a role, redirect them away
        if (user?.role) {
            if (user.role === 'employer') {
                router.push('/employer/profile');
            } else {
                router.push('/');
            }
        }
    }, [user, router]);

    const handleRoleSelect = async (role) => {
        setLoading(true);
        const { success, error } = await changeUserRole(role);

        if (success) {
            if (role === 'employer') {
                router.push('/employer/profile');
            } else {
                router.push('/');
            }
        } else {
            alert('Failed to update role: ' + error);
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', padding: '20px' }}>
            <Head>
                <title>Welcome to InternMy - Choose your Role</title>
            </Head>

            <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', color: '#0032A0', marginBottom: '10px' }}>Welcome to InternMy! 👋</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '50px' }}>To get started, please tell us how you want to use the platform.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>

                    {/* Intern Card */}
                    <button
                        onClick={() => handleRoleSelect('intern')}
                        disabled={loading}
                        className="role-card"
                        style={{
                            background: 'white',
                            border: '2px solid transparent',
                            borderRadius: '16px',
                            padding: '40px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = '#0032A0';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,50,160,0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                        }}
                    >
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎓</div>
                        <h2 style={{ color: '#333', marginBottom: '10px' }}>I am a Student / Intern</h2>
                        <p style={{ color: '#666', lineHeight: '1.5' }}>
                            I am looking for internships and want to apply to companies.
                        </p>
                    </button>

                    {/* Employer Card */}
                    <button
                        onClick={() => handleRoleSelect('employer')}
                        disabled={loading}
                        className="role-card"
                        style={{
                            background: 'white',
                            border: '2px solid transparent',
                            borderRadius: '16px',
                            padding: '40px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = '#0032A0';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,50,160,0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                        }}
                    >
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💼</div>
                        <h2 style={{ color: '#333', marginBottom: '10px' }}>I am an Employer</h2>
                        <p style={{ color: '#666', lineHeight: '1.5' }}>
                            I want to post jobs and hire talented interns.
                        </p>
                    </button>

                </div>
            </div>
        </div>
    );
}
