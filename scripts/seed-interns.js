const { Client } = require('pg');

const connectionString = "postgres://postgres.wanxlxbaaqfukbxicpjk:KuxIbMkCRqQEp7ZA@aws-1-us-east-1.pooler.supabase.com:6543/postgres?supa=base-pooler.x";

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const internData = [
    {
        user_email: 'sarah.lim@student.um.edu.my',
        full_name: 'Sarah Lim',
        university: 'University of Malaya',
        major: 'Computer Science',
        graduation_year: '2024',
        cgpa: '3.75',
        skills: ['React', 'Node.js', 'Python', 'MongoDB', 'Git'],
        experience: 'Built a full-stack e-commerce platform as a final year project. Participated in hackathons and won 2nd place in TechFest 2023.',
        portfolio_url: 'https://github.com/sarahlim'
    },
    {
        user_email: 'ahmad.razak@student.usm.edu.my',
        full_name: 'Ahmad Razak',
        university: 'Universiti Sains Malaysia',
        major: 'Marketing',
        graduation_year: '2024',
        cgpa: '3.60',
        skills: ['Social Media Marketing', 'SEO', 'Content Writing', 'Google Analytics', 'Canva'],
        experience: 'Managed social media accounts for university clubs with 10k+ followers. Completed digital marketing certification from Google.',
        portfolio_url: 'https://linkedin.com/in/ahmadrazak'
    },
    {
        user_email: 'weijie.tan@student.taylors.edu.my',
        full_name: 'Wei Jie Tan',
        university: "Taylor's University",
        major: 'Graphic Design',
        graduation_year: '2024',
        cgpa: '3.85',
        skills: ['Photoshop', 'Illustrator', 'Figma', 'UI/UX Design', 'Adobe XD'],
        experience: 'Freelance designer with 20+ completed projects. Designed branding materials for local startups.',
        portfolio_url: 'https://behance.net/weijie'
    },
    {
        user_email: 'priya.menon@student.monash.edu.my',
        full_name: 'Priya Menon',
        university: 'Monash University Malaysia',
        major: 'Business Administration',
        graduation_year: '2025',
        cgpa: '3.70',
        skills: ['Excel', 'Project Management', 'Communication', 'PowerPoint', 'Data Analysis'],
        experience: 'Led a team of 5 in organizing university business competition. Completed internship at a consulting firm.',
        portfolio_url: 'https://linkedin.com/in/priyamenon'
    },
    {
        user_email: 'jason.khoo@student.sunway.edu.my',
        full_name: 'Jason Khoo',
        university: 'Sunway University',
        major: 'Data Science',
        graduation_year: '2024',
        cgpa: '3.90',
        skills: ['Python', 'SQL', 'Tableau', 'Machine Learning', 'R', 'Power BI'],
        experience: 'Completed data analytics internship at a fintech company. Published research paper on predictive analytics.',
        portfolio_url: 'https://github.com/jasonkhoo'
    },
    {
        user_email: 'nurul.aisyah@student.uitm.edu.my',
        full_name: 'Nurul Aisyah',
        university: 'UiTM',
        major: 'Accounting',
        graduation_year: '2024',
        cgpa: '3.65',
        skills: ['Xero', 'Quickbooks', 'Financial Reporting', 'Excel', 'SAP'],
        experience: 'Interned at Big 4 accounting firm for 6 months. Proficient in financial statement preparation.',
        portfolio_url: 'https://linkedin.com/in/nurulaisyah'
    },
    {
        user_email: 'daniel.wong@student.um.edu.my',
        full_name: 'Daniel Wong',
        university: 'University of Malaya',
        major: 'Software Engineering',
        graduation_year: '2025',
        cgpa: '3.80',
        skills: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS', 'MySQL'],
        experience: 'Developed microservices architecture for university project. Active contributor to open-source projects.',
        portfolio_url: 'https://github.com/danielwong'
    },
    {
        user_email: 'siti.nurhaliza@student.upm.edu.my',
        full_name: 'Siti Nurhaliza',
        university: 'Universiti Putra Malaysia',
        major: 'Human Resource Management',
        graduation_year: '2024',
        cgpa: '3.55',
        skills: ['Recruitment', 'Employee Relations', 'Training & Development', 'MS Office', 'Communication'],
        experience: 'Assisted HR department during industrial training. Organized career fairs and recruitment drives.',
        portfolio_url: 'https://linkedin.com/in/sitinurhaliza'
    },
    {
        user_email: 'kevin.liew@student.nottingham.edu.my',
        full_name: 'Kevin Liew',
        university: 'University of Nottingham Malaysia',
        major: 'Mechanical Engineering',
        graduation_year: '2025',
        cgpa: '3.72',
        skills: ['AutoCAD', 'SolidWorks', 'MATLAB', 'Project Management', '3D Printing'],
        experience: 'Designed and built a solar-powered vehicle for engineering competition. Interned at manufacturing company.',
        portfolio_url: 'https://linkedin.com/in/kevinliew'
    },
    {
        user_email: 'melissa.chan@student.mmu.edu.my',
        full_name: 'Melissa Chan',
        university: 'Multimedia University',
        major: 'Cybersecurity',
        graduation_year: '2024',
        cgpa: '3.88',
        skills: ['Network Security', 'Penetration Testing', 'Linux', 'Python', 'Ethical Hacking'],
        experience: 'Completed CEH certification. Participated in CTF competitions and ranked top 10 nationally.',
        portfolio_url: 'https://github.com/melissachan'
    },
    {
        user_email: 'hafiz.rahman@student.usm.edu.my',
        full_name: 'Hafiz Rahman',
        university: 'Universiti Sains Malaysia',
        major: 'Civil Engineering',
        graduation_year: '2025',
        cgpa: '3.68',
        skills: ['AutoCAD', 'Civil 3D', 'Project Planning', 'Structural Analysis', 'BIM'],
        experience: 'Assisted in designing bridge infrastructure project. Completed site supervision training.',
        portfolio_url: 'https://linkedin.com/in/hafizrahman'
    },
    {
        user_email: 'emily.tan@student.taylors.edu.my',
        full_name: 'Emily Tan',
        university: "Taylor's University",
        major: 'Mass Communication',
        graduation_year: '2024',
        cgpa: '3.78',
        skills: ['Content Creation', 'Video Editing', 'Public Relations', 'Adobe Premiere', 'Photography'],
        experience: 'Produced short films that won university awards. Managed PR campaigns for student organizations.',
        portfolio_url: 'https://youtube.com/@emilytan'
    },
    {
        user_email: 'arjun.patel@student.monash.edu.my',
        full_name: 'Arjun Patel',
        university: 'Monash University Malaysia',
        major: 'Finance',
        graduation_year: '2024',
        cgpa: '3.82',
        skills: ['Financial Modeling', 'Bloomberg Terminal', 'Excel VBA', 'Investment Analysis', 'Risk Management'],
        experience: 'Completed investment banking internship. Won case competition in financial analysis.',
        portfolio_url: 'https://linkedin.com/in/arjunpatel'
    },
    {
        user_email: 'lisa.ng@student.utar.edu.my',
        full_name: 'Lisa Ng',
        university: 'Universiti Tunku Abdul Rahman',
        major: 'Psychology',
        graduation_year: '2025',
        cgpa: '3.71',
        skills: ['Counseling', 'Research', 'SPSS', 'Report Writing', 'Active Listening'],
        experience: 'Volunteered at mental health NGO. Conducted research on workplace stress management.',
        portfolio_url: 'https://linkedin.com/in/lisang'
    },
    {
        user_email: 'farid.aziz@student.uitm.edu.my',
        full_name: 'Farid Aziz',
        university: 'UiTM',
        major: 'Architecture',
        graduation_year: '2024',
        cgpa: '3.66',
        skills: ['SketchUp', 'Revit', 'Rhino', '3D Rendering', 'Architectural Design'],
        experience: 'Designed sustainable housing project for final year. Interned at award-winning architecture firm.',
        portfolio_url: 'https://behance.net/faridaziz'
    },
    {
        user_email: 'chloe.lee@student.sunway.edu.my',
        full_name: 'Chloe Lee',
        university: 'Sunway University',
        major: 'Hospitality Management',
        graduation_year: '2024',
        cgpa: '3.58',
        skills: ['Customer Service', 'Event Planning', 'Food & Beverage', 'Hotel Operations', 'Communication'],
        experience: 'Completed internship at 5-star hotel. Organized events for 200+ guests.',
        portfolio_url: 'https://linkedin.com/in/chloelee'
    },
    {
        user_email: 'ryan.ong@student.um.edu.my',
        full_name: 'Ryan Ong',
        university: 'University of Malaya',
        major: 'Biotechnology',
        graduation_year: '2025',
        cgpa: '3.76',
        skills: ['Lab Techniques', 'PCR', 'Cell Culture', 'Data Analysis', 'Research'],
        experience: 'Research assistant in molecular biology lab. Published co-authored paper in scientific journal.',
        portfolio_url: 'https://researchgate.net/ryanong'
    },
    {
        user_email: 'aina.ibrahim@student.ukm.edu.my',
        full_name: 'Aina Ibrahim',
        university: 'Universiti Kebangsaan Malaysia',
        major: 'Pharmacy',
        graduation_year: '2024',
        cgpa: '3.84',
        skills: ['Pharmaceutical Care', 'Drug Information', 'Patient Counseling', 'Clinical Knowledge'],
        experience: 'Completed clinical rotations at major hospitals. Volunteered in community health programs.',
        portfolio_url: 'https://linkedin.com/in/ainaibrahim'
    },
    {
        user_email: 'marcus.lim@student.mmu.edu.my',
        full_name: 'Marcus Lim',
        university: 'Multimedia University',
        major: 'Game Development',
        graduation_year: '2024',
        cgpa: '3.69',
        skills: ['Unity', 'C#', 'Unreal Engine', '3D Modeling', 'Game Design'],
        experience: 'Developed and published indie game on Steam. Won best game design award at university showcase.',
        portfolio_url: 'https://itch.io/marcuslim'
    },
    {
        user_email: 'zara.hassan@student.usm.edu.my',
        full_name: 'Zara Hassan',
        university: 'Universiti Sains Malaysia',
        major: 'Environmental Science',
        graduation_year: '2025',
        cgpa: '3.73',
        skills: ['Environmental Assessment', 'GIS', 'Sustainability', 'Research', 'Report Writing'],
        experience: 'Conducted environmental impact studies. Active in sustainability initiatives and conservation projects.',
        portfolio_url: 'https://linkedin.com/in/zarahassan'
    },
    {
        user_email: 'ethan.tan@student.nottingham.edu.my',
        full_name: 'Ethan Tan',
        university: 'University of Nottingham Malaysia',
        major: 'Electrical Engineering',
        graduation_year: '2024',
        cgpa: '3.81',
        skills: ['Circuit Design', 'MATLAB', 'PLC Programming', 'Power Systems', 'Arduino'],
        experience: 'Built IoT-based smart home system. Interned at electronics manufacturing company.',
        portfolio_url: 'https://github.com/ethantan'
    },
    {
        user_email: 'nadia.azman@student.upm.edu.my',
        full_name: 'Nadia Azman',
        university: 'Universiti Putra Malaysia',
        major: 'Food Science',
        graduation_year: '2024',
        cgpa: '3.64',
        skills: ['Food Safety', 'Quality Control', 'Product Development', 'Lab Analysis', 'HACCP'],
        experience: 'Developed new food product formulations. Completed internship at food manufacturing facility.',
        portfolio_url: 'https://linkedin.com/in/nadiaazman'
    },
    {
        user_email: 'brandon.koh@student.taylors.edu.my',
        full_name: 'Brandon Koh',
        university: "Taylor's University",
        major: 'International Business',
        graduation_year: '2025',
        cgpa: '3.77',
        skills: ['Market Research', 'Business Strategy', 'Cross-cultural Communication', 'Negotiation', 'Excel'],
        experience: 'Participated in international business case competitions. Studied abroad in Singapore.',
        portfolio_url: 'https://linkedin.com/in/brandonkoh'
    },
    {
        user_email: 'aisha.karim@student.uitm.edu.my',
        full_name: 'Aisha Karim',
        university: 'UiTM',
        major: 'Fashion Design',
        graduation_year: '2024',
        cgpa: '3.62',
        skills: ['Fashion Illustration', 'Pattern Making', 'Sewing', 'Adobe Illustrator', 'Textile Design'],
        experience: 'Showcased collection at university fashion show. Freelance designer for local boutiques.',
        portfolio_url: 'https://instagram.com/aishakarim.designs'
    },
    {
        user_email: 'joshua.lim@student.monash.edu.my',
        full_name: 'Joshua Lim',
        university: 'Monash University Malaysia',
        major: 'Actuarial Science',
        graduation_year: '2024',
        cgpa: '3.89',
        skills: ['Statistical Analysis', 'R', 'Excel', 'Risk Modeling', 'Financial Mathematics'],
        experience: 'Passed 3 actuarial exams. Completed internship at insurance company.',
        portfolio_url: 'https://linkedin.com/in/joshualim'
    },
    {
        user_email: 'sara.yusof@student.um.edu.my',
        full_name: 'Sara Yusof',
        university: 'University of Malaya',
        major: 'Law',
        graduation_year: '2025',
        cgpa: '3.74',
        skills: ['Legal Research', 'Contract Drafting', 'Negotiation', 'Legal Writing', 'Moot Court'],
        experience: 'Won university moot court competition. Interned at law firm specializing in corporate law.',
        portfolio_url: 'https://linkedin.com/in/sarayusof'
    },
    {
        user_email: 'alex.chan@student.sunway.edu.my',
        full_name: 'Alex Chan',
        university: 'Sunway University',
        major: 'Mobile App Development',
        graduation_year: '2024',
        cgpa: '3.79',
        skills: ['Flutter', 'React Native', 'iOS', 'Android', 'Firebase', 'API Integration'],
        experience: 'Published 3 apps on App Store and Play Store with 50k+ downloads. Won hackathon for best mobile app.',
        portfolio_url: 'https://github.com/alexchan'
    },
    {
        user_email: 'hannah.wong@student.utar.edu.my',
        full_name: 'Hannah Wong',
        university: 'Universiti Tunku Abdul Rahman',
        major: 'Journalism',
        graduation_year: '2024',
        cgpa: '3.67',
        skills: ['News Writing', 'Interviewing', 'Video Production', 'Social Media', 'Investigative Reporting'],
        experience: 'Contributed articles to online news portals. Produced documentary on social issues.',
        portfolio_url: 'https://medium.com/@hannahwong'
    },
    {
        user_email: 'danish.razali@student.ukm.edu.my',
        full_name: 'Danish Razali',
        university: 'Universiti Kebangsaan Malaysia',
        major: 'Chemical Engineering',
        graduation_year: '2025',
        cgpa: '3.70',
        skills: ['Process Design', 'HYSYS', 'Chemical Safety', 'Lab Skills', 'Process Simulation'],
        experience: 'Designed chemical plant process for capstone project. Interned at petrochemical company.',
        portfolio_url: 'https://linkedin.com/in/danishrazali'
    },
    {
        user_email: 'sophia.tan@student.mmu.edu.my',
        full_name: 'Sophia Tan',
        university: 'Multimedia University',
        major: 'Animation',
        graduation_year: '2024',
        cgpa: '3.83',
        skills: ['2D Animation', '3D Animation', 'Maya', 'After Effects', 'Storyboarding'],
        experience: 'Created animated short film that won festival award. Freelance animator for commercial projects.',
        portfolio_url: 'https://vimeo.com/sophiatan'
    }
];

const upsertResumeQuery = `
  INSERT INTO resumes (user_email, full_name, university, major, graduation_year, cgpa, skills, experience, portfolio_url, updated_at)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  ON CONFLICT (user_email) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    university = EXCLUDED.university,
    major = EXCLUDED.major,
    graduation_year = EXCLUDED.graduation_year,
    cgpa = EXCLUDED.cgpa,
    skills = EXCLUDED.skills,
    experience = EXCLUDED.experience,
    portfolio_url = EXCLUDED.portfolio_url,
    updated_at = EXCLUDED.updated_at;
`;

async function seedInterns() {
    try {
        await client.connect();
        console.log('Connected to database...');

        console.log(`Seeding ${internData.length} intern profiles...`);

        for (let i = 0; i < internData.length; i++) {
            const intern = internData[i];
            await client.query(upsertResumeQuery, [
                intern.user_email,
                intern.full_name,
                intern.university,
                intern.major,
                intern.graduation_year,
                intern.cgpa,
                intern.skills,
                intern.experience,
                intern.portfolio_url,
                new Date().toISOString()
            ]);
            console.log(`✓ Seeded ${intern.full_name} (${i + 1}/${internData.length})`);
        }

        console.log('\n✅ All intern profiles seeded successfully!');

    } catch (err) {
        console.error('Error seeding intern data:', err);
    } finally {
        await client.end();
    }
}

seedInterns();
