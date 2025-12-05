import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { supabase } from '../../lib/supabaseClient';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Fetch users from resumes table (interns who have created resumes)
            const { data: resumes, error: resumeError } = await supabase
                .from('resumes')
                .select('user_email, full_name, university, updated_at');

            if (resumeError) throw resumeError;

            // Fetch jobs to get employer emails
            const { data: jobs, error: jobsError } = await supabase
                .from('jobs')
                .select('employer_email, company')
                .order('posted_at', { ascending: false });

            if (jobsError) throw jobsError;

            // Build user list from available data
            const userMap = new Map();

            // Add interns from resumes
            resumes?.forEach(r => {
                userMap.set(r.user_email, {
                    email: r.user_email,
                    name: r.full_name || 'N/A',
                    role: 'intern',
                    details: r.university || 'N/A',
                    lastActive: r.updated_at
                });
            });

            // Add employers from jobs (unique emails)
            jobs?.forEach(j => {
                if (!userMap.has(j.employer_email)) {
                    userMap.set(j.employer_email, {
                        email: j.employer_email,
                        name: j.company || 'N/A',
                        role: 'employer',
                        details: j.company || 'N/A',
                        lastActive: null
                    });
                }
            });

            setUsers(Array.from(userMap.values()));
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResume = async (email) => {
        if (!confirm(`Delete resume for ${email}? This will remove their resume data.`)) return;

        try {
            const { error } = await supabase
                .from('resumes')
                .delete()
                .eq('user_email', email);

            if (error) throw error;
            alert('Resume deleted successfully');
            fetchUsers();
        } catch (error) {
            alert('Error deleting: ' + error.message);
        }
    };

    return (
        <AdminLayout>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <div>
                        <h1 style={{ color: 'white', margin: '0 0 5px', fontSize: '2rem' }}>
                            User Management
                        </h1>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                            Manage all registered employers and interns
                        </p>
                    </div>
                    <button
                        onClick={fetchUsers}
                        style={{
                            padding: '10px 20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        🔄 Refresh
                    </button>
                </div>

                {/* Info Card */}
                <div style={{
                    background: 'rgba(124, 58, 237, 0.2)',
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    borderRadius: '12px',
                    padding: '15px 20px',
                    marginBottom: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span>ℹ️</span>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.9rem' }}>
                        Users shown are derived from resumes (interns) and job postings (employers).
                        For full user management including authentication, access Supabase Dashboard directly.
                    </p>
                </div>

                {/* Users Table */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden'
                }}>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center' }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading users...</p>
                        </div>
                    ) : users.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>Email</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>Name / Company</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>Role</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>Details</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'right', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.email} style={{
                                        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                        <td style={{ padding: '15px 20px', color: 'white' }}>{user.email}</td>
                                        <td style={{ padding: '15px 20px', color: 'white' }}>{user.name}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <span style={{
                                                background: user.role === 'employer' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                                                color: user.role === 'employer' ? '#60a5fa' : '#34d399',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                textTransform: 'capitalize'
                                            }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 20px', color: 'rgba(255, 255, 255, 0.6)' }}>{user.details}</td>
                                        <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                            {user.role === 'intern' && (
                                                <button
                                                    onClick={() => handleDeleteResume(user.email)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: 'rgba(239, 68, 68, 0.2)',
                                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                                        borderRadius: '6px',
                                                        color: '#f87171',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    Delete Resume
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center' }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No users found</p>
                        </div>
                    )}
                </div>

                <p style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.85rem',
                    marginTop: '20px',
                    textAlign: 'center'
                }}>
                    Total: {users.length} users ({users.filter(u => u.role === 'intern').length} interns, {users.filter(u => u.role === 'employer').length} employers)
                </p>
            </div>
        </AdminLayout>
    );
}
