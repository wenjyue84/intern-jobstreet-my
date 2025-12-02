import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

export default function PostJob() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        allowance: '',
        tags: '',
        description: ''
    });

    useEffect(() => {
        if (!user) {
            router.push('/login?redirect=/post-job');
        } else if (user.role === 'student') {
            // Redirect students if they shouldn't post jobs
            router.push('/');
        } else {
            // Fetch company details to pre-fill form
            fetchCompanyDetails();
        }
    }, [user, router]);

    const fetchCompanyDetails = async () => {
        try {
            const { data, error } = await supabase
                .from('companies')
                .select('name, location')
                .eq('email', user.email)
                .single();

            if (data) {
                setFormData(prev => ({
                    ...prev,
                    company: data.name || prev.company,
                    location: data.location || prev.location
                }));
            }
        } catch (error) {
            // Ignore error if profile doesn't exist
            console.log('No company profile found or error fetching:', error);
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
            // Convert comma-separated tags to array
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            const { data, error } = await supabase
                .from('jobs')
                .insert([
                    {
                        title: formData.title,
                        company: formData.company,
                        location: formData.location,
                        allowance: formData.allowance,
                        tags: tagsArray,
                        description: formData.description,
                        employer_email: user.email,
                        posted_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;

            alert('Job posted successfully!');
            router.push('/'); // Redirect to home or job listing page
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null; // Or a loading spinner while redirecting
    }

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
                <div className="glass-card" style={{ padding: '40px', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#0032A0' }}>Post a New Job</h1>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Job Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="search-input"
                                style={{ width: '100%' }}
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Software Engineering Intern"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="e.g. Tech Corp"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Kuala Lumpur"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Allowance (RM)</label>
                                <input
                                    type="text"
                                    name="allowance"
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.allowance}
                                    onChange={handleChange}
                                    placeholder="e.g. 1,000 - 1,500"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Tags (comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="e.g. React, Node.js, Design"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Job Description</label>
                            <textarea
                                name="description"
                                required
                                className="search-input"
                                style={{ width: '100%', minHeight: '150px', fontFamily: 'inherit' }}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the role, responsibilities, and requirements..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Posting...' : 'Post Job'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
