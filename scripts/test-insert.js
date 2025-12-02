
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testInsert() {
    console.log('Testing insert...');

    // We need a valid job_id. Let's get one.
    const { data: jobs } = await supabase.from('jobs').select('id').limit(1);
    if (!jobs || jobs.length === 0) {
        console.log('No jobs found to test with.');
        return;
    }
    const jobId = jobs[0].id;

    // Test insert into applications
    const { data, error } = await supabase
        .from('applications')
        .insert([
            { job_id: jobId, user_email: 'test_script@example.com' }
        ])
        .select();

    if (error) {
        console.error('Error inserting into applications:', error.message);
    } else {
        console.log('Insert successful:', data);

        // Clean up
        await supabase.from('applications').delete().eq('user_email', 'test_script@example.com');
    }
}

testInsert();
