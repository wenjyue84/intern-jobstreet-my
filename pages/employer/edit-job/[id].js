import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabaseClient';

export default function EditJob() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        allowance: '',
        tags: '',
        description: ''
    });

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login');
            return;
        }

        if (user.role !== 'employer') {
            router.push('/');
            return;
        }

        if (id) {
            fetchJobDetails();
        }
    }, [user, authLoading, router, id]);

    const fetchJobDetails = async () => {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            // Verify ownership
            if (data.employer_email !== user.email) {
                alert('You are not authorized to edit this job.');
                router.push('/employer/dashboard');
                return;
            }

            setFormData({
                title: data.title,
                company: data.company,
                location: data.location,
                allowance: data.allowance,
                tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags,
                description: data.description
            });
        } catch (error) {
            console.error('Error fetching job details:', error);
            alert('Error fetching job details');
        } finally {
            setLoading(false);
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
        setSubmitting(true);

        try {
            // Convert comma-separated tags to array
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            const { error } = await supabase
                .from('jobs')
                .update({
                    title: formData.title,
                    company: formData.company,
                    location: formData.location,
                    allowance: formData.allowance,
                    tags: tagsArray,
                    description: formData.description,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            alert('Job updated successfully!');
            router.push('/employer/dashboard');
        } catch (error) {
            console.error('Error updating job:', error);
            alert('Error updating job: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Layout><div className="container" style={{ padding: '50px', textAlign: 'center' }}>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
                <div className="glass-card" style={{ padding: '40px', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#0032A0' }}>Edit Job Posting</h1>

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
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                type="button"
                                onClick={() => router.push('/employer/dashboard')}
                                className="btn btn-secondary"
                                style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                                disabled={submitting}
                            >
                                {submitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
