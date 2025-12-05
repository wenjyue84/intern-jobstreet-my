import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout, loading, changeUserRole } = useAuth();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link href="/" className="logo">
                    Intern<span>My</span>
                </Link>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {user && user.role === 'intern' && (
                        <Link href="/intern/dashboard" className="btn btn-secondary" style={{ border: 'none' }}>Dashboard</Link>
                    )}
                    {user && user.role === 'employer' && (
                        <Link href="/employer/dashboard" className="btn btn-secondary" style={{ border: 'none' }}>Dashboard</Link>
                    )}
                    {user && user.role === 'admin' && (
                        <Link href="/admin/dashboard" className="btn btn-secondary" style={{ border: 'none', background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', color: 'white' }}>👑 Admin Panel</Link>
                    )}
                    {!loading && (!user || user.role !== 'employer') && (
                        <Link href="/jobs" className="btn btn-secondary" style={{ border: 'none' }}>Jobs</Link>
                    )}
                    {(!user || user.role !== 'employer') && (
                        <Link href="/resources" className="btn btn-secondary" style={{ border: 'none' }}>Resources</Link>
                    )}
                    {user && user.role === 'employer' && (
                        <Link href="/employer/resources" className="btn btn-secondary" style={{ border: 'none' }}>Resources</Link>
                    )}
                    {(!user || user.role !== 'intern') && (
                        <Link href="/employers" className="btn btn-secondary" style={{ border: 'none' }}>Hire</Link>
                    )}

                    {user ? (
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>


                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        padding: '5px'
                                    }}
                                >
                                    <span style={{ fontWeight: '600', color: '#0032A0' }}>Hi, {user.name}</span>
                                    <span style={{ fontSize: '0.8rem', color: '#0032A0' }}>▼</span>
                                </button>

                                {showProfile && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: '0',
                                        marginTop: '10px',
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        width: '280px',
                                        zIndex: 1000,
                                        border: '1px solid #f0f0f0'
                                    }}>
                                        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                                            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>{user.name}</p>
                                            <p style={{ margin: '5px 0 0', color: '#666', fontSize: '0.9rem' }}>{user.email}</p>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <p style={{ margin: '0 0 5px', fontSize: '0.85rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role</p>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}>
                                                <div style={{
                                                    display: 'inline-block',
                                                    backgroundColor: user.role === 'employer' ? '#E8F0FE' : '#E6F4EA',
                                                    color: user.role === 'employer' ? '#1967D2' : '#137333',
                                                    padding: '6px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {user.role}
                                                </div>

                                                {/* Developer Mode Role Switcher */}
                                                {user.email === 'wenjyue@gmail.com' && (
                                                    <button
                                                        onClick={async () => {
                                                            const newRole = user.role === 'intern' ? 'employer' : 'intern';
                                                            await changeUserRole(newRole);
                                                            setShowProfile(false); // Close dropdown to refresh view context
                                                        }}
                                                        style={{
                                                            fontSize: '0.7rem',
                                                            padding: '4px 8px',
                                                            border: '1px dashed #999',
                                                            borderRadius: '4px',
                                                            background: 'none',
                                                            cursor: 'pointer',
                                                            color: '#666'
                                                        }}
                                                        title="Developer Mode: Switch Role"
                                                    >
                                                        ⇄ Switch
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>


                                            <button onClick={logout}
                                                className="btn btn-outline-danger"
                                                style={{
                                                    width: '100%',
                                                    padding: '8px',
                                                    border: '1px solid #dc3545',
                                                    color: '#dc3545',
                                                    background: 'white',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
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
