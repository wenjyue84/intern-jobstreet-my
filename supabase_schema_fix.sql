-- Run this in your Supabase SQL Editor to fix the missing columns error

ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS employer_email text,
ADD COLUMN IF NOT EXISTS posted_at timestamp with time zone DEFAULT now();
