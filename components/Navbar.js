import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout, loading } = useAuth();

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link href="/" className="logo">
                    Intern<span>My</span>
                </Link>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {!loading && (!user || user.role !== 'employer') && (
                        <Link href="/jobs" className="btn btn-secondary" style={{ border: 'none' }}>Find Internships</Link>
                    )}
                    <Link href="/employers" className="btn btn-secondary" style={{ border: 'none' }}>For Employers</Link>

                    {user ? (
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            {user.role === 'student' && (
                                <>
                                    <Link href="/my-applications" className="btn btn-secondary" style={{ border: 'none' }}>
                                        My Applications
                                    </Link>
                                    <Link href="/saved-jobs" className="btn btn-secondary" style={{ border: 'none' }}>
                                        Saved Jobs
                                    </Link>
                                    <Link href="/intern/resume" className="btn btn-secondary" style={{ border: 'none' }}>
                                        My Resume
                                    </Link>
                                </>
                            )}
                            <Link href={user.role === 'student' ? '/intern/dashboard' : '/employer/dashboard'} style={{ textDecoration: 'none' }}>
                                <span style={{ fontWeight: '600', color: '#0032A0', cursor: 'pointer' }}>Hi, {user.name}</span>
                            </Link>
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
