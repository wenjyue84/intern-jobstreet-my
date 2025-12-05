import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { supabase } from '../../lib/supabaseClient';

export default function AdminResumes() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingResume, setEditingResume] = useState(null);
    const [viewingResume, setViewingResume] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setResumes(data || []);
        } catch (error) {
            console.error('Error fetching resumes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (resume) => {
        setEditingResume(resume.id);
        setFormData({
            full_name: resume.full_name || '',
            university: resume.university || '',
            major: resume.major || '',
            graduation_year: resume.graduation_year || '',
            cgpa: resume.cgpa || '',
            skills: Array.isArray(resume.skills) ? resume.skills.join(', ') : (resume.skills || ''),
            experience: resume.experience || '',
            portfolio_url: resume.portfolio_url || ''
        });
    };

    const handleSave = async (resumeId) => {
        try {
            const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);

            const { error } = await supabase
                .from('resumes')
                .update({
                    full_name: formData.full_name,
                    university: formData.university,
                    major: formData.major,
                    graduation_year: formData.graduation_year,
                    cgpa: formData.cgpa,
                    skills: skillsArray,
                    experience: formData.experience,
                    portfolio_url: formData.portfolio_url,
                    updated_at: new Date().toISOString()
                })
                .eq('id', resumeId);

            if (error) throw error;
            alert('Resume updated successfully');
            setEditingResume(null);
            fetchResumes();
        } catch (error) {
            alert('Error updating resume: ' + error.message);
        }
    };

    const handleDelete = async (resumeId, name) => {
        if (!confirm(`Delete resume for "${name}"? This action cannot be undone.`)) return;

        try {
            const { error } = await supabase
                .from('resumes')
                .delete()
                .eq('id', resumeId);

            if (error) throw error;
            alert('Resume deleted successfully');
            fetchResumes();
        } catch (error) {
            alert('Error deleting resume: ' + error.message);
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
                            Resume Management
                        </h1>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                            View, edit, and manage all intern resumes
                        </p>
                    </div>
                    <button
                        onClick={fetchResumes}
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

                {/* View Modal */}
                {viewingResume && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }} onClick={() => setViewingResume(null)}>
                        <div style={{
                            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                            borderRadius: '20px',
                            padding: '30px',
                            maxWidth: '600px',
                            width: '90%',
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                                <h2 style={{ color: 'white', margin: 0 }}>{viewingResume.full_name}</h2>
                                <button
                                    onClick={() => setViewingResume(null)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem'
                                    }}
                                >×</button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 5px', fontSize: '0.85rem' }}>Email</p>
                                    <p style={{ color: 'white', margin: 0 }}>{viewingResume.user_email}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 5px', fontSize: '0.85rem' }}>University</p>
                                    <p style={{ color: 'white', margin: 0 }}>{viewingResume.university}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 5px', fontSize: '0.85rem' }}>Major</p>
                                    <p style={{ color: 'white', margin: 0 }}>{viewingResume.major}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 5px', fontSize: '0.85rem' }}>Graduation</p>
                                    <p style={{ color: 'white', margin: 0 }}>{viewingResume.graduation_year}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 5px', fontSize: '0.85rem' }}>CGPA</p>
                                    <p style={{ color: 'white', margin: 0 }}>{viewingResume.cgpa || 'N/A'}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 5px', fontSize: '0.85rem' }}>Portfolio</p>
                                    <p style={{ color: '#a78bfa', margin: 0 }}>
                                        {viewingResume.portfolio_url ? (
                                            <a href={viewingResume.portfolio_url} target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa' }}>
                                                View Link ↗
                                            </a>
                                        ) : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 10px', fontSize: '0.85rem' }}>Skills</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {viewingResume.skills?.map((skill, i) => (
                                        <span key={i} style={{
                                            background: 'rgba(124, 58, 237, 0.3)',
                                            color: '#c4b5fd',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem'
                                        }}>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 10px', fontSize: '0.85rem' }}>Experience / Bio</p>
                                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, whiteSpace: 'pre-wrap' }}>
                                    {viewingResume.experience || 'No experience listed'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Resumes Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '20px'
                }}>
                    {loading ? (
                        <div style={{
                            gridColumn: '1 / -1',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '40px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading resumes...</p>
                        </div>
                    ) : resumes.length > 0 ? (
                        resumes.map((resume) => (
                            <div key={resume.id} style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '25px',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                {editingResume === resume.id ? (
                                    // Edit Mode
                                    <div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px', fontSize: '0.8rem' }}>Full Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.full_name}
                                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 12px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '6px',
                                                        color: 'white',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px', fontSize: '0.8rem' }}>University</label>
                                                <input
                                                    type="text"
                                                    value={formData.university}
                                                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 12px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '6px',
                                                        color: 'white',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px', fontSize: '0.8rem' }}>Major</label>
                                                <input
                                                    type="text"
                                                    value={formData.major}
                                                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 12px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '6px',
                                                        color: 'white',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px', fontSize: '0.8rem' }}>Graduation Year</label>
                                                <input
                                                    type="text"
                                                    value={formData.graduation_year}
                                                    onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 12px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '6px',
                                                        color: 'white',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px', fontSize: '0.8rem' }}>CGPA</label>
                                                <input
                                                    type="text"
                                                    value={formData.cgpa}
                                                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 12px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '6px',
                                                        color: 'white',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px', fontSize: '0.8rem' }}>Portfolio URL</label>
                                                <input
                                                    type="text"
                                                    value={formData.portfolio_url}
                                                    onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 12px',
                                                        background: 'rgba(0, 0, 0, 0.3)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '6px',
                                                        color: 'white',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px', fontSize: '0.8rem' }}>Skills (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={formData.skills}
                                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: '8px 12px',
                                                    background: 'rgba(0, 0, 0, 0.3)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '6px',
                                                    color: 'white',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                onClick={() => handleSave(resume.id)}
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    cursor: 'pointer'
                                                }}
                                            >✓ Save</button>
                                            <button
                                                onClick={() => setEditingResume(null)}
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    cursor: 'pointer'
                                                }}
                                            >✕ Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <h3 style={{ color: 'white', margin: '0 0 5px', fontSize: '1.1rem' }}>
                                                {resume.full_name}
                                            </h3>
                                            <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0, fontSize: '0.85rem' }}>
                                                {resume.user_email}
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                                            <div>
                                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 2px', fontSize: '0.75rem' }}>University</p>
                                                <p style={{ color: 'white', margin: 0, fontSize: '0.9rem' }}>{resume.university}</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 2px', fontSize: '0.75rem' }}>Major</p>
                                                <p style={{ color: 'white', margin: 0, fontSize: '0.9rem' }}>{resume.major}</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 2px', fontSize: '0.75rem' }}>Graduation</p>
                                                <p style={{ color: 'white', margin: 0, fontSize: '0.9rem' }}>{resume.graduation_year}</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 2px', fontSize: '0.75rem' }}>CGPA</p>
                                                <p style={{ color: 'white', margin: 0, fontSize: '0.9rem' }}>{resume.cgpa || 'N/A'}</p>
                                            </div>
                                        </div>

                                        {resume.skills && resume.skills.length > 0 && (
                                            <div style={{ marginBottom: '15px' }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {resume.skills.slice(0, 4).map((skill, i) => (
                                                        <span key={i} style={{
                                                            background: 'rgba(124, 58, 237, 0.3)',
                                                            color: '#c4b5fd',
                                                            padding: '3px 10px',
                                                            borderRadius: '12px',
                                                            fontSize: '0.75rem'
                                                        }}>{skill}</span>
                                                    ))}
                                                    {resume.skills.length > 4 && (
                                                        <span style={{
                                                            color: 'rgba(255, 255, 255, 0.5)',
                                                            fontSize: '0.75rem',
                                                            padding: '3px 0'
                                                        }}>+{resume.skills.length - 4} more</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div style={{
                                            display: 'flex',
                                            gap: '8px',
                                            paddingTop: '15px',
                                            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}>
                                            <button
                                                onClick={() => setViewingResume(resume)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    background: 'rgba(124, 58, 237, 0.2)',
                                                    border: '1px solid rgba(124, 58, 237, 0.3)',
                                                    borderRadius: '8px',
                                                    color: '#a78bfa',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem'
                                                }}
                                            >👁️ View</button>
                                            <button
                                                onClick={() => handleEdit(resume)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    background: 'rgba(59, 130, 246, 0.2)',
                                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                                    borderRadius: '8px',
                                                    color: '#60a5fa',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem'
                                                }}
                                            >✏️ Edit</button>
                                            <button
                                                onClick={() => handleDelete(resume.id, resume.full_name)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    background: 'rgba(239, 68, 68, 0.2)',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                    borderRadius: '8px',
                                                    color: '#f87171',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem'
                                                }}
                                            >🗑️</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{
                            gridColumn: '1 / -1',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '40px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No resumes found</p>
                        </div>
                    )}
                </div>

                <p style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.85rem',
                    marginTop: '20px',
                    textAlign: 'center'
                }}>
                    Total: {resumes.length} resumes
                </p>
            </div>
        </AdminLayout>
    );
}
