import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('intern'); // 'intern' or 'employer'
    const { signup } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (router.query.role === 'employer' || router.query.role === 'intern') {
            setRole(router.query.role);
        }
    }, [router.query]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, error } = await signup(name, email, password, role);
        if (success) {
            let redirectPath = router.query.redirect || '/';
            if (role === 'employer' && !router.query.redirect) {
                redirectPath = '/employer/profile';
            }
            router.push(redirectPath);
        } else {
            alert('Signup failed: ' + error);
        }
    };

    return (
        <Layout>
            <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
                <div className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '500px', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#0032A0' }}>Join InternMy 🇲🇾</h1>
                    <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Start your journey today.</p>

                    <div style={{ display: 'flex', background: '#f0f0f0', padding: '5px', borderRadius: '8px', marginBottom: '30px' }}>
                        <button
                            type="button"
                            onClick={() => setRole('intern')}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: 'none',
                                borderRadius: '6px',
                                background: role === 'intern' ? 'white' : 'transparent',
                                color: role === 'intern' ? '#0032A0' : '#666',
                                fontWeight: role === 'intern' ? '600' : '400',
                                boxShadow: role === 'intern' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Intern
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('employer')}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: 'none',
                                borderRadius: '6px',
                                background: role === 'employer' ? 'white' : 'transparent',
                                color: role === 'employer' ? '#0032A0' : '#666',
                                fontWeight: role === 'employer' ? '600' : '400',
                                boxShadow: role === 'employer' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Employer
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                            <input
                                type="text"
                                required
                                className="search-input"
                                style={{ width: '100%' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ali bin Abu"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                            <input
                                type="email"
                                required
                                className="search-input"
                                style={{ width: '100%' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="intern@university.edu.my"
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                            <input
                                type="password"
                                required
                                className="search-input"
                                style={{ width: '100%' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
                            Create Account
                        </button>
                    </form>

                    <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                        Already have an account? <Link href="/login" style={{ color: '#0032A0', fontWeight: '600' }}>Login</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
