
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Missing Supabase environment variables.');
    console.log('URL:', supabaseUrl);
    console.log('Key:', supabaseAnonKey ? 'Found' : 'Missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkConnection() {
    console.log('Testing Supabase connection...');
    try {
        // Try to select from a table that should exist, or just check health
        const { data, error } = await supabase.from('jobs').select('count', { count: 'exact', head: true });

        if (error) {
            console.error('Connection failed:', error.message);
            if (error.code === 'PGRST301') {
                console.log('Note: Table "jobs" might not exist or RLS policies prevent access. This still means we reached Supabase.');
            }
        } else {
            console.log('Connection successful! Supabase is reachable.');
        }
    } catch (err) {
        console.error('Unexpected error:', err.message);
    }
}

checkConnection();
