
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTables() {
    console.log('Testing tables...');

    // Test saved_jobs
    const { data: savedJobs, error: savedError } = await supabase
        .from('saved_jobs')
        .select('count', { count: 'exact', head: true });

    if (savedError) {
        console.error('Error accessing saved_jobs:', savedError.message);
    } else {
        console.log('saved_jobs table exists. Count:', savedJobs); // count is null for head:true but no error means table exists
    }

    // Test applications
    const { data: apps, error: appsError } = await supabase
        .from('applications')
        .select('count', { count: 'exact', head: true });

    if (appsError) {
        console.error('Error accessing applications:', appsError.message);
    } else {
        console.log('applications table exists. Count:', apps);
    }
}

testTables();
