const { Client } = require('pg');

const connectionString = "postgres://postgres.wanxlxbaaqfukbxicpjk:KuxIbMkCRqQEp7ZA@aws-1-us-east-1.pooler.supabase.com:6543/postgres?supa=base-pooler.x";

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const createCompaniesTableQuery = `
  CREATE TABLE IF NOT EXISTS companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    location TEXT,
    registration_number TEXT,
    website TEXT,
    description TEXT,
    industry TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
  );
`;

async function createTable() {
    try {
        await client.connect();
        console.log('Connected to database...');

        console.log('Creating "companies" table...');
        await client.query(createCompaniesTableQuery);
        console.log('Table "companies" created successfully.');

    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        await client.end();
    }
}

createTable();
