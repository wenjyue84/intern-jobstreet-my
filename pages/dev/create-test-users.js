/**
 * Development page to create test users
 * Navigate to /dev/create-test-users to use this page
 * 
 * This page allows you to create test accounts for quick login functionality
 */

import { useState } from 'react';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabaseClient';

const TEST_USERS = [
    {
        email: 'test.intern@demo.com',
        password: 'Demo@123',
        role: 'intern',
        name: 'Test Intern User',
        color: '#4CAF50',
        emoji: '🎓'
    },
    {
        email: 'test.employer@demo.com',
        password: 'Demo@123',
        role: 'employer',
        name: 'Test Employer User',
        color: '#2196F3',
        emoji: '🏢'
    },
    {
        email: 'test.admin@demo.com',
        password: 'Demo@123',
        role: 'admin',
        name: 'Test Admin User',
        color: '#9C27B0',
        emoji: '👑'
    }
];

export default function CreateTestUsers() {
    const [logs, setLogs] = useState([]);
    const [isCreating, setIsCreating] = useState(false);

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { message, type, timestamp }]);
    };

    const createUser = async (user) => {
        addLog(`Creating ${user.role}: ${user.email}...`, 'info');

        try {
            // Try to sign up the user
            const { data, error } = await supabase.auth.signUp({
                email: user.email,
                password: user.password,
                options: {
                    data: {
                        name: user.name,
                        role: user.role
                    }
                }
            });

            if (error) {
                addLog(`❌ Error: ${error.message}`, 'error');
                return false;
            }

            if (data.user && !data.session) {
                addLog(`⚠️ User created but requires email verification. Check your Supabase dashboard to confirm the email.`, 'warning');
                return true;
            }

            addLog(`✅ Successfully created ${user.email}`, 'success');

            // Sign out after creating
            await supabase.auth.signOut();

            return true;
        } catch (err) {
            addLog(`❌ Exception: ${err.message}`, 'error');
            return false;
        }
    };

    const createAllUsers = async () => {
        setIsCreating(true);
        setLogs([]);
        addLog('🚀 Starting test user creation...', 'info');

        for (const user of TEST_USERS) {
            await createUser(user);
            // Small delay between users
            await new Promise(r => setTimeout(r, 500));
        }

        addLog('', 'info');
        addLog('✨ Done! Check the logs above for results.', 'success');
        addLog('', 'info');
        addLog('📝 IMPORTANT: If users require email verification:', 'warning');
        addLog('1. Go to your Supabase Dashboard', 'info');
        addLog('2. Navigate to Authentication > Users', 'info');
        addLog('3. Click on each test user and confirm their email', 'info');
        addLog('Or disable email confirmation in Authentication > Providers > Email', 'info');

        setIsCreating(false);
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: '#0032A0', marginBottom: '10px' }}>🔧 Create Test Users</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    This development utility creates test accounts for the quick login feature.
                </p>

                {/* Test Users Info */}
                <div style={{
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '30px'
                }}>
                    <h3 style={{ marginBottom: '15px' }}>Test Accounts to Create:</h3>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {TEST_USERS.map(user => (
                            <div
                                key={user.email}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    padding: '15px',
                                    background: 'white',
                                    borderRadius: '8px',
                                    borderLeft: `4px solid ${user.color}`
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{user.emoji}</span>
                                <div>
                                    <strong style={{ color: user.color }}>{user.role.toUpperCase()}</strong>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                        {user.email} / {user.password}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Create Button */}
                <button
                    onClick={createAllUsers}
                    disabled={isCreating}
                    style={{
                        width: '100%',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        background: isCreating
                            ? '#ccc'
                            : 'linear-gradient(135deg, #0032A0 0%, #001f6d 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: isCreating ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        marginBottom: '30px'
                    }}
                >
                    {isCreating ? '⏳ Creating Users...' : '🚀 Create All Test Users'}
                </button>

                {/* Logs */}
                {logs.length > 0 && (
                    <div style={{
                        background: '#1e1e1e',
                        padding: '20px',
                        borderRadius: '12px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        maxHeight: '400px',
                        overflow: 'auto'
                    }}>
                        {logs.map((log, i) => (
                            <div
                                key={i}
                                style={{
                                    color: log.type === 'error' ? '#ff6b6b'
                                        : log.type === 'success' ? '#69db7c'
                                            : log.type === 'warning' ? '#ffd43b'
                                                : '#ced4da',
                                    marginBottom: '5px'
                                }}
                            >
                                {log.timestamp && `[${log.timestamp}] `}{log.message}
                            </div>
                        ))}
                    </div>
                )}

                {/* Important Note */}
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                    borderRadius: '12px',
                    border: '2px dashed #ff9800'
                }}>
                    <h4 style={{ color: '#e65100', marginBottom: '10px' }}>⚠️ Development Only</h4>
                    <p style={{ fontSize: '0.9rem', color: '#bf360c', margin: 0 }}>
                        This page and the quick login buttons should be removed before deploying to production.
                        Test accounts use weak passwords and are intended only for development/demo purposes.
                    </p>
                </div>
            </div>
        </Layout>
    );
}
