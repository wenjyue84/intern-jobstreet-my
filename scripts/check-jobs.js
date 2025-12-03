const { Client } = require('pg');

// Connection string from scripts/setup-db.js
const connectionString = "postgres://postgres.wanxlxbaaqfukbxicpjk:KuxIbMkCRqQEp7ZA@aws-1-us-east-1.pooler.supabase.com:6543/postgres?supa=base-pooler.x";

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function checkJobs() {
    try {
        console.log('Connecting to database...');
        await client.connect();

        console.log('Checking jobs count...');
        const res = await client.query('SELECT count(*) FROM jobs');
        console.log('Total jobs:', res.rows[0].count);

        console.log('Listing recent jobs:');
        const jobs = await client.query('SELECT id, title, company, created_at FROM jobs ORDER BY created_at DESC LIMIT 10');
        jobs.rows.forEach(job => {
            console.log(`- [${job.id}] ${job.title} (${job.company})`);
        });

    } catch (err) {
        console.error('Error checking jobs:', err);
    } finally {
        await client.end();
    }
}

checkJobs();
