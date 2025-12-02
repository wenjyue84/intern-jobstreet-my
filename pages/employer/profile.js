import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function EmployerProfile() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        registration_number: '',
        website: '',
        description: '',
        industry: ''
    });

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.role !== 'employer') {
            router.push('/');
            return;
        }
        fetchCompanyDetails();
    }, [user, router]);

    const fetchCompanyDetails = async () => {
        try {
            const { data, error } = await supabase
                .from('companies')
                .select('*')
                .eq('email', user.email)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "The result contains 0 rows"
                throw error;
            }

            if (data) {
                setFormData({
                    name: data.name || '',
                    location: data.location || '',
                    registration_number: data.registration_number || '',
                    website: data.website || '',
                    description: data.description || '',
                    industry: data.industry || ''
                });
            } else {
                // Pre-fill from user object if available
                setFormData(prev => ({
                    ...prev,
                    name: user.company || user.name || ''
                }));
            }
        } catch (error) {
            console.error('Error fetching company details:', error);
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
        setSaving(true);

        try {
            const { error } = await supabase
                .from('companies')
                .upsert({
                    email: user.email,
                    name: formData.name,
                    location: formData.location,
                    registration_number: formData.registration_number,
                    website: formData.website,
                    description: formData.description,
                    industry: formData.industry,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'email' });

            if (error) throw error;

            alert('Company profile updated successfully!');
            router.push('/employer/dashboard');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Layout><div className="container" style={{ padding: '40px 0' }}>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
                <div className="glass-card" style={{ padding: '40px', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#0032A0' }}>Company Profile</h1>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Company Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Tech Corp"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Registration Number</label>
                                <input
                                    type="text"
                                    name="registration_number"
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.registration_number}
                                    onChange={handleChange}
                                    placeholder="e.g. 123456-A"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
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
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    value={formData.industry}
                                    onChange={handleChange}
                                    placeholder="e.g. Technology"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Website</label>
                            <input
                                type="url"
                                name="website"
                                className="search-input"
                                style={{ width: '100%' }}
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Company Description</label>
                            <textarea
                                name="description"
                                className="search-input"
                                style={{ width: '100%', minHeight: '150px', fontFamily: 'inherit' }}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell us about your company..."
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="btn btn-secondary"
                                style={{ flex: 1, padding: '15px', fontSize: '1.1rem' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ flex: 1, padding: '15px', fontSize: '1.1rem' }}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
