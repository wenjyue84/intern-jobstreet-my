import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const JOBS_TO_SEED = [
    {
        companyName: 'Coway Malaysia',
        email: 'coway.my@example.com',
        jobTitle: 'Telemarketing (Full Time)',
        location: 'Batu Pahat | Muar | Johor Bahru',
        allowance: 'RM3,000 – RM5,000',
        tags: ['Sales', 'Marketing', 'Full Time'],
        description: `Nak bina kerjaya dengan pendapatan lumayan dan suasana kerja profesional?
Jom sertai pasukan Coway Malaysia!

✅ Umur 18 tahun ke atas
✅ Tiada pengalaman? Latihan disediakan!
✅ Boleh belajar & bekerja dalam kumpulan
✅ Kemasukan segera!

🕘 Isnin – Jumaat (9.00 pagi – 5.00 petang)
💰 Gaji RM3,000 – RM5,000 (Basic + Komisyen)
🎯 Bonus bulanan & insentif menarik`
    },
    {
        companyName: "Permodalan Darul Ta'zim (PDT)",
        email: 'vacancy@pdt.com.my',
        jobTitle: 'Latihan Industri (Commercial Dept)',
        location: 'Johor',
        allowance: 'Competitive Allowance',
        tags: ['Finance', 'Investment', 'Corporate'],
        description: `Kepada pelajar yang berminat dalam kewangan & pelaburan, ini peluang terbaik untuk sertai Jabatan Komersil PDT dan rasai pengalaman sebenar dunia korporat! 🚀

Tanggungjawab Utama:
📊 Membantu dalam analisis & ulasan penyata kewangan syarikat (AFS).
📋 Menyediakan pandangan korporat berkaitan mesyuarat lembaga syarikat & anak syarikat.
🪴 Terlibat dalam due-diligence pelaburan seperti forex, saham & indeks — serta analisis trend pasaran semasa.
🤝 Melaksanakan tugasan dari Eksekutif Kanan Komersil, Pejabat CFO & Pengurusan Tertinggi.

Faedah Latihan:
✅ Pengalaman praktikal dalam persekitaran profesional.
✅ Belajar terus dari profesional berpengalaman.
✅ Asah kemahiran analisis & komunikasi dalam suasana mencabar.
✅ Peluang pembangunan & pertumbuhan kerjaya.
✅ Elaun kompetitif & pasukan kerja yang dinamik.`
    },
    {
        companyName: 'Seetronic',
        email: 'seetronic@example.com',
        jobTitle: 'Industrial Cord Sets / RJ45 Connectors',
        location: 'Johor',
        allowance: 'Unspecified',
        tags: ['Engineering', 'Manufacturing', 'Industrial'],
        description: `High-Quality Industrial Cord Sets

Our IP68-rated connectors deliver flawless performance in any environment. Because connections should be the most reliable part of your system. RJ45 CONNECTORS

In the field of LED display, the launch of 05 Series IP65 waterproof RJ45 connectors provides connection more stable; plugging and unplugging is more convenient. This competitive product which is independently design by Seetronic is highly recognized by industry customers. It is a high-quality RJ45 carrier cable and chassis connectors

Meet the post-90s squad rewriting connection rules!

Since 2016, we've been the "Plug & Play Heroes" – crafting industrial connectors that survive LED raves, robot wars, and even Mars simulations (okay, maybe not Mars... yet). 40+ patents | 500K+ harnesses monthly | Your weirdest custom request? Challenge accepted.`
    },
    {
        companyName: 'Webteq',
        email: 'admin@webteq.com.my',
        jobTitle: 'Accounting Intern',
        location: 'Taman Austin Perdana, Johor Bahru',
        allowance: 'Unspecified',
        tags: ['Accounting', 'Internship'],
        description: `Accounting Intern Intake! - 2 pax

Location: Taman Austin Perdana, Johor Bahru.
New intake internship placement is available now.
Available from Dec 2025 onwards.

Contact: +60 12-773 5535 (Ms Amanda)
Email: admin@webteq.com.my`
    },
    {
        companyName: 'Angsanapuri Development',
        email: 'hmnrs.md3@gmail.com',
        jobTitle: 'Business & Admin / Construction Internships',
        location: 'Temerloh',
        allowance: 'Unspecified',
        tags: ['Construction', 'Admin', 'Business', 'Architecture', 'Engineering'],
        description: `🌟 Peluang Latihan Industri di TEMERLOH! 🌟

ANGSANAPURI DEVELOPMENT SDN BHD (REAL ESTATE DEVELOPER)

WE ARE HIRING - Business & Admin
Intake: Dec 2025 - Dec 2026

Positions:
- Graphic Design
- Marketing
- Business Management
- Architecture
- Interior Design
- Landscape
- Human Resources
- Admin Secretary
- Multimedia
- Information Technology
- Customer Service

WAL FIRST CONSTRUCTION SDN BHD

WE ARE HIRING - Construction
Intake: Dec 2025 - Dec 2026

Positions:
- Quantity Surveying
- Building Surveying
- Planning & Development
- Construction Management
- Civil Engineering

IF INTERESTED, PLEASE SUBMIT YOUR RESUME AND UNIVERSITY DOCUMENTS INCLUDING THE INTERNSHIP PERIOD TO THE CONTACT DETAILS PROVIDED ABOVE (ONLY COMPLETE APPLICATIONS WILL BE PROCESSED)`
    }
];

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
