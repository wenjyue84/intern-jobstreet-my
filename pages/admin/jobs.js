import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { supabase } from '../../lib/supabaseClient';

export default function AdminJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .order('posted_at', { ascending: false });

            if (error) throw error;
            setJobs(data || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (job) => {
        setEditingJob(job.id);
        setFormData({
            title: job.title,
            company: job.company,
            location: job.location,
            allowance: job.allowance,
            description: job.description || ''
        });
    };

    const handleSave = async (jobId) => {
        try {
            const { error } = await supabase
                .from('jobs')
                .update({
                    title: formData.title,
                    company: formData.company,
                    location: formData.location,
                    allowance: formData.allowance,
                    description: formData.description
                })
                .eq('id', jobId);

            if (error) throw error;
            alert('Job updated successfully');
            setEditingJob(null);
            fetchJobs();
        } catch (error) {
            alert('Error updating job: ' + error.message);
        }
    };

    const handleDelete = async (jobId, jobTitle) => {
        if (!confirm(`Delete job "${jobTitle}"? This action cannot be undone.`)) return;

        try {
            const { error } = await supabase
                .from('jobs')
                .delete()
                .eq('id', jobId);

            if (error) throw error;
            alert('Job deleted successfully');
            fetchJobs();
        } catch (error) {
            alert('Error deleting job: ' + error.message);
        }
    };

    return (
        <AdminLayout>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <div>
                        <h1 style={{ color: 'white', margin: '0 0 5px', fontSize: '2rem' }}>
                            Job Listings Management
                        </h1>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                            View, edit, and delete all job postings
                        </p>
                    </div>
                    <button
                        onClick={fetchJobs}
                        style={{
                            padding: '10px 20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        🔄 Refresh
                    </button>
                </div>

                {/* Jobs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {loading ? (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '40px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading jobs...</p>
                        </div>
                    ) : jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div key={job.id} style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '25px',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                {editingJob === job.id ? (
                                    // Edit Mode
                                    <div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', fontSize: '0.85rem' }}>Job Title</label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 15px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', fontSize: '0.85rem' }}>Company</label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 15px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', fontSize: '0.85rem' }}>Location</label>
                                                <input
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 15px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', fontSize: '0.85rem' }}>Allowance</label>
                                                <input
                                                    type="text"
                                                    value={formData.allowance}
                                                    onChange={(e) => setFormData({ ...formData, allowance: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 15px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', fontSize: '0.85rem' }}>Description</label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                rows={3}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 15px',
                                                    background: 'rgba(0, 0, 0, 0.3)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    fontSize: '1rem',
                                                    resize: 'vertical'
                                                }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                onClick={() => handleSave(job.id)}
                                                style={{
                                                    padding: '10px 20px',
                                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ✓ Save
                                            </button>
                                            <button
                                                onClick={() => setEditingJob(null)}
                                                style={{
                                                    padding: '10px 20px',
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ✕ Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '1.25rem' }}>
                                                    {job.title}
                                                </h3>
                                                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 5px' }}>
                                                    🏢 {job.company} • 📍 {job.location}
                                                </p>
                                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 10px', fontSize: '0.9rem' }}>
                                                    💰 RM {job.allowance} • 📧 {job.employer_email}
                                                </p>
                                                {job.tags && job.tags.length > 0 && (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                                                        {job.tags.map((tag, i) => (
                                                            <span key={i} style={{
                                                                background: 'rgba(124, 58, 237, 0.3)',
                                                                color: '#c4b5fd',
                                                                padding: '4px 10px',
                                                                borderRadius: '15px',
                                                                fontSize: '0.8rem'
                                                            }}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => handleEdit(job)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        background: 'rgba(59, 130, 246, 0.2)',
                                                        border: '1px solid rgba(59, 130, 246, 0.3)',
                                                        borderRadius: '8px',
                                                        color: '#60a5fa',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job.id, job.title)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        background: 'rgba(239, 68, 68, 0.2)',
                                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                                        borderRadius: '8px',
                                                        color: '#f87171',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                        <p style={{
                                            color: 'rgba(255, 255, 255, 0.4)',
                                            fontSize: '0.8rem',
                                            margin: '15px 0 0',
                                            paddingTop: '10px',
                                            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}>
                                            Posted: {new Date(job.posted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '40px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No job listings found</p>
                        </div>
                    )}
                </div>

                <p style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.85rem',
                    marginTop: '20px',
                    textAlign: 'center'
                }}>
                    Total: {jobs.length} job listings
                </p>
            </div>
        </AdminLayout>
    );
}
