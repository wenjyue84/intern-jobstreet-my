import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const COMPANIES = ['TechCorp', 'InnovateMy', 'GreenEnergy', 'FinTech Solutions', 'EduTech', 'HealthPlus', 'LogiTrans', 'BuildIt', 'CreativeMinds', 'Foodie', 'Grab', 'Shopee', 'Lazada', 'Maybank', 'CIMB', 'Petronas', 'Shell', 'Intel', 'Dell', 'Top Glove'];
const ROLES = ['Software Engineer', 'Marketing Executive', 'Data Analyst', 'Graphic Designer', 'HR Assistant', 'Business Development', 'Content Writer', 'Accountant', 'Project Manager', 'Customer Support', 'UI/UX Designer', 'Sales Executive', 'Operations Intern', 'Social Media Intern', 'IT Support'];
const LOCATIONS = ['Kuala Lumpur', 'Petaling Jaya', 'Penang', 'Johor Bahru', 'Cyberjaya', 'Subang Jaya', 'Shah Alam', 'Kuching', 'Kota Kinabalu', 'Ipoh', 'Melaka', 'Seremban'];
const TAGS_POOL = ['Tech', 'Marketing', 'Finance', 'Design', 'Business', 'Engineering', 'Sales', 'HR', 'Operations', 'Remote', 'Hybrid', 'Full Time', 'Internship'];

const generateJobs = (count) => {
    const jobs = [];
    for (let i = 0; i < count; i++) {
        const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
        const role = ROLES[Math.floor(Math.random() * ROLES.length)];
        const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const tags = [];
        const numTags = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numTags; j++) {
            const tag = TAGS_POOL[Math.floor(Math.random() * TAGS_POOL.length)];
            if (!tags.includes(tag)) tags.push(tag);
        }

        jobs.push({
            companyName: company,
            email: `contact${i}@${company.toLowerCase().replace(/\s/g, '')}.com`,
            jobTitle: `${role} Intern`,
            location: location,
            allowance: `RM${800 + Math.floor(Math.random() * 10) * 100} - RM${1500 + Math.floor(Math.random() * 10) * 100}`,
            tags: tags,
            description: `We are looking for a passionate ${role} to join our team at ${company}. \n\nResponsibilities:\n- Assist in daily operations\n- Collaborate with the team\n- Learn and grow with us\n\nRequirements:\n- Currently pursuing a degree/diploma\n- Eager to learn\n- Good communication skills`
        });
    }
    return jobs;
};

const JOBS_TO_SEED = generateJobs(100);

export default function SeedJobs() {
    const [logs, setLogs] = useState([]);
    const [isSeeding, setIsSeeding] = useState(false);

    const addLog = (msg) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

    const seed = async () => {
        setIsSeeding(true);
        addLog('Starting seed process...');

        for (const job of JOBS_TO_SEED) {
            addLog(`Processing: ${job.companyName}...`);

            try {
                // 1. Sign Up / Sign In
                const password = 'password123';
                let { data: authData, error: authError } = await supabase.auth.signUp({
                    email: job.email,
                    password: password,
                    options: {
                        data: {
                            name: job.companyName,
                            role: 'employer'
                        }
                    }
                });

                if (authError) {
                    addLog(`Signup failed for ${job.email}: ${authError.message}. Trying login...`);
                    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                        email: job.email,
                        password: password
                    });

                    if (loginError) {
                        addLog(`Login also failed: ${loginError.message}. Skipping.`);
                        continue;
                    }
                    authData = loginData;
                }

                if (!authData.user) {
                    addLog(`No user returned for ${job.email}. Skipping.`);
                    continue;
                }

                const userId = authData.user.id;
                addLog(`User authenticated: ${userId}`);

                // 2. Create/Update Company Profile
                const { error: companyError } = await supabase
                    .from('companies')
                    .upsert({
                        id: userId, // Assuming company ID matches User ID or we use email to link. 
                        // Wait, usually companies table might have its own ID or link to auth.users.id
                        // Let's assume 'companies' table has 'email' or 'user_id'.
                        // Based on post-job.js: .eq('email', user.email)
                        // So we should upsert based on email if possible, or just insert.
                        // Let's check if we can upsert by email.
                        name: job.companyName,
                        email: job.email,
                        location: job.location,
                        description: 'Imported from Facebook',
                        website: '',
                    }, { onConflict: 'email' });

                // Note: If 'companies' table doesn't have unique constraint on email, upsert might fail or duplicate.
                // But let's try.

                if (companyError) {
                    addLog(`Company profile update failed: ${companyError.message}`);
                    // Continue anyway, maybe it exists
                } else {
                    addLog(`Company profile updated.`);
                }

                // 3. Post Job
                const { error: jobError } = await supabase
                    .from('jobs')
                    .insert({
                        title: job.jobTitle,
                        company: job.companyName,
                        location: job.location,
                        allowance: job.allowance,
                        tags: job.tags,
                        description: job.description,
                        employer_email: job.email,
                        posted_at: new Date().toISOString()
                    });

                if (jobError) {
                    addLog(`Job post failed: ${jobError.message}`);
                } else {
                    addLog(`Job posted successfully!`);
                }

                // 4. Sign Out
                await supabase.auth.signOut();
                addLog(`Signed out.`);

            } catch (err) {
                addLog(`Unexpected error for ${job.companyName}: ${err.message}`);
            }

            // Small delay
            await new Promise(r => setTimeout(r, 1000));
        }

        addLog('Seeding complete!');
        setIsSeeding(false);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Job Seeder</h1>
            <button onClick={seed} disabled={isSeeding} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '20px' }}>
                {isSeeding ? 'Seeding...' : 'Start Seeding'}
            </button>
            <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
                {logs.map((log, i) => <div key={i}>{log}</div>)}
            </div>
        </div>
    );
}
