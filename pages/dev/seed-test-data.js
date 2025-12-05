/**
 * Development page to create sample data for test users
 * Navigate to /dev/seed-test-data to use this page
 * 
 * Creates:
 * - 3 job postings for test.employer@demo.com
 * - 3 job applications for test.intern@demo.com
 */

import { useState } from 'react';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabaseClient';

const SAMPLE_JOBS = [
    {
        title: 'Software Engineering Intern',
        company: 'TechDemo Solutions',
        location: 'Kuala Lumpur, Malaysia',
        allowance: 'RM 1,500 - RM 2,000',
        tags: ['JavaScript', 'React', 'Node.js', 'Full-stack'],
        description: `We are looking for a passionate Software Engineering Intern to join our dynamic team!

**Responsibilities:**
- Develop and maintain web applications using React and Node.js
- Collaborate with senior developers on exciting projects
- Participate in code reviews and team meetings
- Write clean, maintainable code

**Requirements:**
- Currently pursuing a degree in Computer Science or related field
- Basic understanding of JavaScript, HTML, CSS
- Eager to learn and grow
- Good communication skills

**What we offer:**
- Mentorship from experienced developers
- Flexible working hours
- Modern tech stack
- Career growth opportunities`
    },
    {
        title: 'UI/UX Design Intern',
        company: 'TechDemo Solutions',
        location: 'Remote / Kuala Lumpur',
        allowance: 'RM 1,200 - RM 1,800',
        tags: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
        description: `Join our design team and help create beautiful user experiences!

**Responsibilities:**
- Create wireframes and prototypes using Figma
- Conduct user research and usability testing
- Collaborate with developers to implement designs
- Contribute to our design system

**Requirements:**
- Portfolio showcasing UI/UX work
- Proficiency in Figma or similar design tools
- Understanding of design principles
- Creative mindset

**Benefits:**
- Work on real products used by thousands
- Learn from senior designers
- Flexible remote work options`
    },
    {
        title: 'Data Analytics Intern',
        company: 'TechDemo Solutions',
        location: 'Petaling Jaya, Selangor',
        allowance: 'RM 1,300 - RM 1,700',
        tags: ['Python', 'SQL', 'Data Analysis', 'Excel'],
        description: `Help us make data-driven decisions!

**Responsibilities:**
- Analyze business data and generate insights
- Create dashboards and reports
- Work with SQL databases
- Support the analytics team

**Requirements:**
- Knowledge of Python or R
- Understanding of SQL
- Strong analytical skills
- Currently studying Statistics, Data Science, or related field

**Perks:**
- Hands-on experience with real data
- Learn industry-standard tools
- Mentorship program`
    }
];

export default function SeedTestData() {
    const [logs, setLogs] = useState([]);
    const [isSeeding, setIsSeeding] = useState(false);

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { message, type, timestamp }]);
    };

    const seedData = async () => {
        setIsSeeding(true);
        setLogs([]);

        addLog('🚀 Starting to seed test data...', 'info');

        try {
            // Step 1: Login as test employer and create jobs
            addLog('', 'info');
            addLog('🔐 Logging in as Test Employer...', 'info');

            const { data: employerAuth, error: employerLoginError } = await supabase.auth.signInWithPassword({
                email: 'test.employer@demo.com',
                password: 'Demo@123'
            });

            if (employerLoginError) {
                addLog(`❌ Failed to login as employer: ${employerLoginError.message}`, 'error');
                addLog('Please create test users first at /dev/create-test-users', 'warning');
                setIsSeeding(false);
                return;
            }

            addLog('✅ Logged in as Test Employer', 'success');
            addLog('', 'info');
            addLog('📝 Creating job postings...', 'info');

            const createdJobIds = [];

            for (const job of SAMPLE_JOBS) {
                const { data, error } = await supabase
                    .from('jobs')
                    .insert([{
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        allowance: job.allowance,
                        tags: job.tags,
                        description: job.description,
                        employer_email: 'test.employer@demo.com',
                        posted_at: new Date().toISOString()
                    }])
                    .select();

                if (error) {
                    addLog(`❌ Failed to create "${job.title}": ${error.message}`, 'error');
                } else if (data && data[0]) {
                    addLog(`✅ Created: ${job.title} (ID: ${data[0].id})`, 'success');
                    createdJobIds.push(data[0].id);
                } else {
                    addLog(`⚠️ Created "${job.title}" but no ID returned`, 'warning');
                }

                await new Promise(r => setTimeout(r, 300));
            }

            // Sign out employer
            await supabase.auth.signOut();
            addLog('', 'info');

            // Step 2: Login as test intern and create applications
            addLog('🔐 Logging in as Test Intern...', 'info');

            const { error: internLoginError } = await supabase.auth.signInWithPassword({
                email: 'test.intern@demo.com',
                password: 'Demo@123'
            });

            if (internLoginError) {
                addLog(`❌ Failed to login as intern: ${internLoginError.message}`, 'error');
                setIsSeeding(false);
                return;
            }

            addLog('✅ Logged in as Test Intern', 'success');
            addLog('', 'info');
            addLog('📋 Creating job applications...', 'info');

            for (let i = 0; i < createdJobIds.length; i++) {
                const jobId = createdJobIds[i];
                const job = SAMPLE_JOBS[i];
                const status = i === 0 ? 'Interview Scheduled' : i === 1 ? 'Under Review' : 'Applied';

                const { error } = await supabase
                    .from('applications')
                    .insert([{
                        job_id: jobId,
                        user_email: 'test.intern@demo.com',
                        status: status
                    }]);

                if (error) {
                    addLog(`❌ Failed to apply for "${job.title}": ${error.message}`, 'error');
                } else {
                    addLog(`✅ Applied for: ${job.title} (${status})`, 'success');
                }

                await new Promise(r => setTimeout(r, 300));
            }

            // Sign out intern
            await supabase.auth.signOut();

            addLog('', 'info');
            addLog('✨ All done! Test data has been created.', 'success');
            addLog('', 'info');
            addLog('📌 You have been signed out. Please use quick login buttons.', 'info');
            addLog('👉 Login as Employer to see posted jobs in dashboard', 'info');
            addLog('👉 Login as Intern to see applications in "My Applications"', 'info');

        } catch (err) {
            addLog(`❌ Unexpected error: ${err.message}`, 'error');
        }

        setIsSeeding(false);
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: '#0032A0', marginBottom: '10px' }}>🌱 Seed Test Data</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    Create sample job postings and applications for test accounts.
                </p>

                {/* What will be created */}
                <div style={{
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '30px'
                }}>
                    <h3 style={{ marginBottom: '15px' }}>Data to Create:</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#2196F3', marginBottom: '10px' }}>🏢 For Test Employer (test.employer@demo.com)</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {SAMPLE_JOBS.map((job, i) => (
                                <li key={i} style={{ marginBottom: '5px' }}>
                                    <strong>{job.title}</strong> - {job.location}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>🎓 For Test Intern (test.intern@demo.com)</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            <li>Application for Software Engineering Intern (Interview Scheduled)</li>
                            <li>Application for UI/UX Design Intern (Under Review)</li>
                            <li>Application for Data Analytics Intern (Applied)</li>
                        </ul>
                    </div>
                </div>

                {/* Seed Button */}
                <button
                    onClick={seedData}
                    disabled={isSeeding}
                    style={{
                        width: '100%',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        background: isSeeding
                            ? '#ccc'
                            : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: isSeeding ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        marginBottom: '30px'
                    }}
                >
                    {isSeeding ? '⏳ Seeding Data...' : '🌱 Seed Test Data'}
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

                {/* Note */}
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    borderRadius: '12px',
                    border: '1px solid #2196F3'
                }}>
                    <h4 style={{ color: '#1565C0', marginBottom: '10px' }}>💡 Tip</h4>
                    <p style={{ fontSize: '0.9rem', color: '#1976D2', margin: 0 }}>
                        After seeding, use the quick login buttons on the login page to test:<br />
                        • <strong>Employer</strong> → Go to Dashboard to see posted jobs<br />
                        • <strong>Intern</strong> → Go to "My Applications" to see applications
                    </p>
                </div>
            </div>
        </Layout>
    );
}
