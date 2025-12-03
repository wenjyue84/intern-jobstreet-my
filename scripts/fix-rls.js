const { Client } = require('pg');

// Connection string from scripts/setup-db.js
const connectionString = "postgres://postgres.wanxlxbaaqfukbxicpjk:KuxIbMkCRqQEp7ZA@aws-1-us-east-1.pooler.supabase.com:6543/postgres?supa=base-pooler.x";

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const fixQuery = `
  -- Enable RLS
  ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
  
  -- Drop policy if exists to avoid error
  DROP POLICY IF EXISTS "Public jobs are viewable by everyone" ON jobs;
  
  -- Create policy
  CREATE POLICY "Public jobs are viewable by everyone" 
  ON jobs FOR SELECT 
  USING (true);
  
  -- Grant permissions
  GRANT SELECT ON jobs TO anon;
  GRANT SELECT ON jobs TO authenticated;
  GRANT SELECT ON jobs TO service_role;
`;

async function applyFix() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected.');

        console.log('Applying RLS and permissions fix...');
        await client.query(fixQuery);
        console.log('RLS and permissions fixed successfully.');

    } catch (err) {
        console.error('Error applying fix:', err);
    } finally {
        await client.end();
    }
}

applyFix();
