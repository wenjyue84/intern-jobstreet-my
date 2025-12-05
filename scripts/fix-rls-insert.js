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
  -- Enable RLS on jobs table
  ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
  
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Public jobs are viewable by everyone" ON jobs;
  DROP POLICY IF EXISTS "Employers can insert jobs" ON jobs;
  DROP POLICY IF EXISTS "Employers can update their own jobs" ON jobs;
  DROP POLICY IF EXISTS "Employers can delete their own jobs" ON jobs;
  
  -- SELECT: Anyone can view jobs
  CREATE POLICY "Public jobs are viewable by everyone" 
  ON jobs FOR SELECT 
  USING (true);
  
  -- INSERT: Authenticated users can insert jobs
  CREATE POLICY "Employers can insert jobs" 
  ON jobs FOR INSERT 
  TO authenticated
  WITH CHECK (true);
  
  -- UPDATE: Users can only update their own jobs
  CREATE POLICY "Employers can update their own jobs" 
  ON jobs FOR UPDATE 
  TO authenticated
  USING (employer_email = auth.jwt() ->> 'email')
  WITH CHECK (employer_email = auth.jwt() ->> 'email');
  
  -- DELETE: Users can only delete their own jobs
  CREATE POLICY "Employers can delete their own jobs" 
  ON jobs FOR DELETE 
  TO authenticated
  USING (employer_email = auth.jwt() ->> 'email');
  
  -- Grant permissions
  GRANT SELECT ON jobs TO anon;
  GRANT SELECT, INSERT, UPDATE, DELETE ON jobs TO authenticated;
  GRANT ALL ON jobs TO service_role;
  
  -- Enable RLS on applications table
  ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
  
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can view their own applications" ON applications;
  DROP POLICY IF EXISTS "Users can insert their own applications" ON applications;
  DROP POLICY IF EXISTS "Employers can view applications for their jobs" ON applications;
  
  -- SELECT: Users can view their own applications
  CREATE POLICY "Users can view their own applications" 
  ON applications FOR SELECT 
  TO authenticated
  USING (user_email = auth.jwt() ->> 'email');
  
  -- INSERT: Users can insert their own applications
  CREATE POLICY "Users can insert their own applications" 
  ON applications FOR INSERT 
  TO authenticated
  WITH CHECK (user_email = auth.jwt() ->> 'email');
  
  -- Grant permissions for applications
  GRANT SELECT, INSERT ON applications TO authenticated;
  GRANT ALL ON applications TO service_role;
`;

async function applyFix() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected.');

        console.log('Applying RLS policies for jobs and applications...');
        await client.query(fixQuery);
        console.log('RLS policies applied successfully!');
        console.log('');
        console.log('Policies created:');
        console.log('  jobs: SELECT (public), INSERT/UPDATE/DELETE (authenticated)');
        console.log('  applications: SELECT/INSERT (authenticated)');

    } catch (err) {
        console.error('Error applying fix:', err);
    } finally {
        await client.end();
    }
}

applyFix();
