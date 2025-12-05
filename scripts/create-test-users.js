/**
 * Script to create test users for development/demo purposes
 * 
 * Run this script once to create the test accounts in Supabase:
 * node scripts/create-test-users.js
 * 
 * Test Accounts:
 * - Intern:   test.intern@demo.com   / Demo@123
 * - Employer: test.employer@demo.com / Demo@123
 * - Admin:    test.admin@demo.com    / Demo@123
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You need service role key to create users

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables!');
    console.log('Please ensure you have the following in your .env.local file:');
    console.log('  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.log('  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
    console.log('\nYou can find the service role key in your Supabase project settings > API');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const testUsers = [
    {
        email: 'test.intern@demo.com',
        password: 'Demo@123',
        role: 'intern',
        name: 'Test Intern User'
    },
    {
        email: 'test.employer@demo.com',
        password: 'Demo@123',
        role: 'employer',
        name: 'Test Employer User'
    },
    {
        email: 'test.admin@demo.com',
        password: 'Demo@123',
        role: 'admin',
        name: 'Test Admin User'
    }
];

async function createTestUsers() {
    console.log('🚀 Creating test users for development...\n');

    for (const user of testUsers) {
        console.log(`Creating ${user.role}: ${user.email}...`);

        try {
            // Create user with admin API
            const { data, error } = await supabase.auth.admin.createUser({
                email: user.email,
                password: user.password,
                email_confirm: true, // Auto-confirm email
                user_metadata: {
                    name: user.name,
                    role: user.role
                }
            });

            if (error) {
                if (error.message.includes('already been registered')) {
                    console.log(`  ⚠️ User already exists, updating role...`);

                    // Try to get the user and update their metadata
                    const { data: users } = await supabase.auth.admin.listUsers();
                    const existingUser = users?.users?.find(u => u.email === user.email);

                    if (existingUser) {
                        await supabase.auth.admin.updateUserById(existingUser.id, {
                            user_metadata: {
                                name: user.name,
                                role: user.role
                            }
                        });
                        console.log(`  ✅ Updated ${user.email} with role: ${user.role}`);
                    }
                } else {
                    console.log(`  ❌ Error: ${error.message}`);
                }
            } else {
                console.log(`  ✅ Created ${user.email} with role: ${user.role}`);
            }
        } catch (err) {
            console.log(`  ❌ Exception: ${err.message}`);
        }
    }

    console.log('\n✨ Done! Test users are ready to use.');
    console.log('\n📋 Quick Login Credentials:');
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│ Role     │ Email                    │ Password         │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log('│ Intern   │ test.intern@demo.com     │ Demo@123         │');
    console.log('│ Employer │ test.employer@demo.com   │ Demo@123         │');
    console.log('│ Admin    │ test.admin@demo.com      │ Demo@123         │');
    console.log('└─────────────────────────────────────────────────────────┘');
}

createTestUsers();
