import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user || user.role !== 'admin') {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
            }}>
                <p style={{ color: 'white' }}>Loading...</p>
            </div>
        );
    }

    const menuItems = [
        { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { href: '/admin/users', icon: '👥', label: 'Users' },
        { href: '/admin/jobs', icon: '💼', label: 'Job Listings' },
        { href: '/admin/resumes', icon: '📄', label: 'Resumes' },
    ];

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
        }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Logo */}
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h1 style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        margin: 0
                    }}>
                        👑 Admin Panel
                    </h1>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.8rem',
                        margin: '5px 0 0'
                    }}>InternMy Management</p>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = router.pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '14px 18px',
                                    marginBottom: '8px',
                                    borderRadius: '12px',
                                    color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
                                    background: isActive ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    fontWeight: isActive ? '600' : '400'
                                }}>
                                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Back to Site */}
                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '20px',
                    marginTop: '20px'
                }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <button style={{
                            width: '100%',
                            padding: '12px',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}>
                            ← Back to Site
                        </button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
            }}>
                {/* Top Header Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: '15px 40px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <div style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.9rem'
                            }}>
                                {user.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                                {user.name || 'Admin'}
                            </span>
                        </div>
                        <button
                            onClick={logout}
                            style={{
                                padding: '8px 20px',
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: '1px solid rgba(239, 68, 68, 0.5)',
                                borderRadius: '8px',
                                color: '#fca5a5',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>

                {/* Page Content */}
                <div style={{ padding: '30px 40px', flex: 1 }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
