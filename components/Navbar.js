import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link href="/" className="logo">
                    Intern<span>My</span>
                </Link>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Link href="/jobs" className="btn btn-secondary" style={{ border: 'none' }}>Find Internships</Link>
                    <Link href="/employers" className="btn btn-secondary" style={{ border: 'none' }}>For Employers</Link>

                    {user ? (
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: '#0032A0' }}>Hi, {user.name}</span>
                            <button onClick={logout} className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '8px 15px' }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="btn btn-primary">Login / Sign Up</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
