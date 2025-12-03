const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Connection string from scripts/setup-db.js
const connectionString = "postgres://postgres.wanxlxbaaqfukbxicpjk:KuxIbMkCRqQEp7ZA@aws-1-us-east-1.pooler.supabase.com:6543/postgres?supa=base-pooler.x";

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const fixQuery = `
  ALTER TABLE jobs 
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS employer_email text,
  ADD COLUMN IF NOT EXISTS posted_at timestamp with time zone DEFAULT now();
`;

async function applyFix() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected.');

        console.log('Applying schema fix...');
        await client.query(fixQuery);
        console.log('Schema fix applied successfully.');

    } catch (err) {
        console.error('Error applying fix:', err);
    } finally {
        await client.end();
    }
}

applyFix();
