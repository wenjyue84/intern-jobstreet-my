import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null); // 'intern' or 'employer'
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { signup, loginWithGoogle } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (router.query.role === 'employer' || router.query.role === 'intern') {
            setRole(router.query.role);
        }
    }, [router.query]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!role) {
            setError('Please select whether you are an Intern or an Employer.');
            return;
        }

        // Basic validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            const { success, error, requiresVerification } = await signup(name, email.trim(), password, role);

            if (success) {
                if (requiresVerification) {
                    setSuccessMessage('Account created successfully! Please check your email to verify your account.');
                    // Optional: Add a note for the developer
                    console.log('Developer Note: To skip email verification, disable "Confirm email" in your Supabase project settings.');
                } else {
                    let redirectPath = router.query.redirect || '/';
                    if (role === 'employer' && !router.query.redirect) {
                        redirectPath = '/employer/profile';
                    }
                    router.push(redirectPath);
                }
            } else {
                setError(error || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
                <div className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '500px', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#0032A0' }}>Join InternMy 🇲🇾</h1>
                    <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Start your journey today.</p>

                    {error && (
                        <div style={{
                            background: '#ffebee',
                            color: '#c62828',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '0.9rem',
                            border: '1px solid #ef9a9a'
                        }}>
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    {successMessage && (
                        <div style={{
                            background: '#e8f5e9',
                            color: '#2e7d32',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '0.9rem',
                            border: '1px solid #a5d6a7'
                        }}>
                            {successMessage}
                            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#555', fontStyle: 'italic' }}>
                                Note: If you are the developer, you can disable email verification in your Supabase dashboard to skip this step.
                            </div>
                        </div>
                    )}

                    {!successMessage && (
                        <>
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
                                        disabled={loading}
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
                                        disabled={loading}
                                    />
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="search-input"
                                            style={{ width: '100%' }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            disabled={loading}
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#666',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                                        Must be at least 6 characters
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        fontSize: '1.1rem',
                                        opacity: loading ? 0.7 : 1,
                                        cursor: loading ? 'not-allowed' : 'pointer'
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </form>

                            <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
                                <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
                                <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 10px', color: '#666', fontSize: '0.9rem' }}>OR</span>
                            </div>

                            <button
                                type="button"
                                onClick={() => loginWithGoogle(role)}
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
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
                                {role ? `Sign up with Google as ${role === 'intern' ? 'Intern' : 'Employer'}` : 'Sign up with Google'}
                            </button>
                        </>
                    )}

                    <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                        Already have an account? <Link href="/login" style={{ color: '#0032A0', fontWeight: '600' }}>Login</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
