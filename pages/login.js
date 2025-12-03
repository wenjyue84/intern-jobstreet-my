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
                </div>
            </div>
        </Layout>
    );
}
