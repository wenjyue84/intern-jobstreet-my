import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function Resume() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        full_name: '',
        university: '',
        major: '',
        graduation_year: '',
        cgpa: '',
        skills: '',
        experience: '',
        portfolio_url: ''
    });

    useEffect(() => {
        if (!user) {
            router.push('/login?redirect=/intern/resume');
        } else if (user.role !== 'student') {
            router.push('/');
        } else {
            fetchResume();
        }
    }, [user, router]);

    const fetchResume = async () => {
        try {
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .eq('user_email', user.email)
                .single();

            if (data) {
                setFormData({
                    full_name: data.full_name || '',
                    university: data.university || '',
                    major: data.major || '',
                    graduation_year: data.graduation_year || '',
                    cgpa: data.cgpa || '',
                    skills: Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || ''),
                    experience: data.experience || '',
                    portfolio_url: data.portfolio_url || ''
                });
            }
        } catch (error) {
            // It's okay if no resume found
            console.log('No existing resume found or error fetching:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Convert comma-separated skills to array
            const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);

            const { data, error } = await supabase
                .from('resumes')
                .upsert([
                    {
                        user_email: user.email,
                        full_name: formData.full_name,
                        university: formData.university,
                        major: formData.major,
                        graduation_year: formData.graduation_year,
                        cgpa: formData.cgpa,
                        skills: skillsArray,
                        experience: formData.experience,
                        portfolio_url: formData.portfolio_url,
                        updated_at: new Date().toISOString()
                    }
                ], { onConflict: 'user_email' });

            if (error) throw error;

            alert('Resume saved successfully!');
        } catch (error) {
            console.error('Error saving resume:', error);
            alert('Error saving resume: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user || fetching) {
        return (
            <Layout>
                <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
                <div className="glass-card" style={{ padding: '40px', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#0032A0' }}>My Resume</h1>
                    <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
                        Keep your profile updated to get noticed by top employers.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                required
                                className="search-input"
                                style={{ width: '100%' }}
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Ali bin Abu"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>University / College</label>
                                <input
                                    type="text"
                                    name="university"
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.university}
                                    onChange={handleChange}
                                    placeholder="University of Malaya"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Major / Course</label>
                                <input
                                    type="text"
                                    name="major"
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.major}
                                    onChange={handleChange}
                                    placeholder="Computer Science"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Graduation Year</label>
                                <input
                                    type="text"
                                    name="graduation_year"
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.graduation_year}
                                    onChange={handleChange}
                                    placeholder="2025"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Current CGPA</label>
                                <input
                                    type="text"
                                    name="cgpa"
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.cgpa}
                                    onChange={handleChange}
                                    placeholder="3.50"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Skills (comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                className="search-input"
                                style={{ width: '100%' }}
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Python, Communication, Leadership"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Portfolio / LinkedIn URL</label>
                            <input
                                type="url"
                                name="portfolio_url"
                                className="search-input"
                                style={{ width: '100%' }}
                                value={formData.portfolio_url}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Experience / Bio</label>
                            <textarea
                                name="experience"
                                className="search-input"
                                style={{ width: '100%', minHeight: '150px', fontFamily: 'inherit' }}
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="Tell us about your past internships, projects, or what you are looking for..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Resume'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
