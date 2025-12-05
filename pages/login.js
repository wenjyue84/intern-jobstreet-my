import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loginWithGoogle } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login page: handleSubmit called');
        const { success, error } = await login(email.trim(), password);
        console.log('Login page: login result', { success, error });
        if (success) {
            console.log('Login page: redirecting');
            const redirectPath = router.query.redirect ? decodeURIComponent(router.query.redirect) : '/';
            router.push(redirectPath);
        } else {
            console.log('Login page: showing alert');
            let errorMessage = 'Login failed: ' + error;
            if (error.includes('Invalid login credentials')) {
                errorMessage = 'Login failed. Please check your email and password. If you just signed up, make sure you have verified your email address.';
            }
            alert(errorMessage);
        }
    };

    return (
        <Layout>
            <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '400px', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#0032A0' }}>Welcome Back! 👋</h1>

                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                    </form>

                    <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
                        <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
                        <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 10px', color: '#666', fontSize: '0.9rem' }}>OR</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => loginWithGoogle()}
                        style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '1rem',
                            background: 'white',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            color: '#333',
                            marginBottom: '20px'
                        }}
                    >
                        <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                        Sign in with Google
                    </button>

                    <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                        Don't have an account? <Link href="/signup" style={{ color: '#0032A0', fontWeight: '600' }}>Sign Up</Link>
                    </div>

                    {/* Quick Login for Development/Demo - Remove in Production */}
                    <div style={{
                        marginTop: '30px',
                        padding: '20px',
                        background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                        borderRadius: '12px',
                        border: '2px dashed #ff9800'
                    }}>
                        <p style={{
                            textAlign: 'center',
                            fontSize: '0.85rem',
                            color: '#e65100',
                            marginBottom: '15px',
                            fontWeight: '600'
                        }}>
                            ⚡ Quick Login (Dev Only)
                        </p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                type="button"
                                onClick={async () => {
                                    const { success, error } = await login('test.intern@demo.com', 'Demo@123');
                                    if (success) {
                                        router.push('/');
                                    } else {
                                        alert('Quick login failed. Test account may need to be created in Supabase.\n\nEmail: test.intern@demo.com\nPassword: Demo@123\nRole: intern');
                                    }
                                }}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '0.9rem',
                                    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
                                onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; }}
                            >
                                🎓 Intern
                            </button>
                            <button
                                type="button"
                                onClick={async () => {
                                    const { success, error } = await login('test.employer@demo.com', 'Demo@123');
                                    if (success) {
                                        router.push('/employer/dashboard');
                                    } else {
                                        alert('Quick login failed. Test account may need to be created in Supabase.\n\nEmail: test.employer@demo.com\nPassword: Demo@123\nRole: employer');
                                    }
                                }}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '0.9rem',
                                    background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
                                onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; }}
                            >
                                🏢 Employer
                            </button>
                            <button
                                type="button"
                                onClick={async () => {
                                    const { success, error } = await login('test.admin@demo.com', 'Demo@123');
                                    if (success) {
                                        router.push('/admin/dashboard');
                                    } else {
                                        alert('Quick login failed. Test account may need to be created in Supabase.\n\nEmail: test.admin@demo.com\nPassword: Demo@123\nRole: admin');
                                    }
                                }}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '0.9rem',
                                    background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}
                                onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; }}
                            >
                                👑 Admin
                            </button>
                        </div>
                        <p style={{
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            color: '#bf360c',
                            marginTop: '10px',
                            fontStyle: 'italic'
                        }}>
                            Remove this section before production!
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
