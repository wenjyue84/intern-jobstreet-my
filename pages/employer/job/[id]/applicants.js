import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { useAuth } from '../../../../context/AuthContext';
import { supabase } from '../../../../lib/supabaseClient';

export default function JobApplicants() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { id } = router.query;
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

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
            fetchJobAndApplicants();
        }
    }, [user, authLoading, router, id]);

    const fetchJobAndApplicants = async () => {
        try {
            // 1. Fetch Job Details
            const { data: jobData, error: jobError } = await supabase
                .from('jobs')
                .select('*')
                .eq('id', id)
                .single();

            if (jobError) throw jobError;

            // Verify ownership
            if (jobData.employer_email !== user.email) {
                alert('You are not authorized to view applicants for this job.');
                router.push('/employer/dashboard');
                return;
            }

            setJob(jobData);

            // 2. Fetch Applications
            const { data: applicationsData, error: applicationsError } = await supabase
                .from('applications')
                .select('*')
                .eq('job_id', id);

            if (applicationsError) throw applicationsError;

            // 3. Fetch Resume/User details for each applicant
            const applicantsWithDetails = await Promise.all(applicationsData.map(async (app) => {
                const { data: resumeData } = await supabase
                    .from('resumes')
                    .select('*')
                    .eq('user_email', app.user_email)
                    .single();

                return {
                    ...app,
                    resume: resumeData || null
                };
            }));

            setApplicants(applicantsWithDetails);

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (applicationId, newStatus) => {
        try {
            const { error } = await supabase
                .from('applications')
                .update({ status: newStatus })
                .eq('id', applicationId);

            if (error) throw error;

            setApplicants(applicants.map(app =>
                app.id === applicationId ? { ...app, status: newStatus } : app
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status');
        }
    };

    if (loading) return <Layout><div className="container" style={{ padding: '50px', textAlign: 'center' }}>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="container" style={{ padding: '40px 0' }}>
                <div style={{ marginBottom: '30px' }}>
                    <Link href="/employer/dashboard">
                        <span style={{ color: '#666', cursor: 'pointer', fontSize: '0.9rem' }}>← Back to Dashboard</span>
                    </Link>
                    <h1 style={{ marginTop: '10px', color: '#0032A0' }}>Applicants for {job?.title}</h1>
                </div>

                <div className="glass-card" style={{ padding: '30px', background: 'white' }}>
                    {applicants.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {applicants.map(applicant => (
                                <div key={applicant.id} style={{
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    background: '#f9fafb'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 5px 0' }}>
                                                {applicant.resume ? applicant.resume.full_name : applicant.user_email}
                                            </h3>
                                            <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                                                Applied on {new Date(applicant.applied_at).toLocaleDateString('en-GB')}
                                            </p>

                                            {applicant.resume && (
                                                <div style={{ fontSize: '0.9rem', color: '#444' }}>
                                                    <p style={{ margin: '5px 0' }}><strong>University:</strong> {applicant.resume.university}</p>
                                                    <p style={{ margin: '5px 0' }}><strong>Major:</strong> {applicant.resume.major}</p>
                                                    <p style={{ margin: '5px 0' }}><strong>CGPA:</strong> {applicant.resume.cgpa}</p>
                                                    <div style={{ marginTop: '10px' }}>
                                                        {applicant.resume.skills && applicant.resume.skills.map((skill, idx) => (
                                                            <span key={idx} style={{
                                                                background: '#e5e7eb',
                                                                padding: '2px 8px',
                                                                borderRadius: '12px',
                                                                fontSize: '0.8rem',
                                                                marginRight: '5px'
                                                            }}>
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ marginBottom: '15px' }}>
                                                <span style={{
                                                    padding: '5px 10px',
                                                    borderRadius: '15px',
                                                    fontSize: '0.85rem',
                                                    background: applicant.status === 'Accepted' ? '#dcfce7' :
                                                        applicant.status === 'Rejected' ? '#fee2e2' : '#dbeafe',
                                                    color: applicant.status === 'Accepted' ? '#166534' :
                                                        applicant.status === 'Rejected' ? '#991b1b' : '#1e40af'
                                                }}>
                                                    {applicant.status}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => updateStatus(applicant.id, 'Accepted')}
                                                    className="btn"
                                                    style={{
                                                        padding: '5px 15px',
                                                        fontSize: '0.85rem',
                                                        background: '#16a34a',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(applicant.id, 'Rejected')}
                                                    className="btn"
                                                    style={{
                                                        padding: '5px 15px',
                                                        fontSize: '0.85rem',
                                                        background: '#dc2626',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            </div>

                                            {applicant.resume && applicant.resume.resume_url && (
                                                <div style={{ marginTop: '15px' }}>
                                                    <a href={applicant.resume.resume_url} target="_blank" rel="noopener noreferrer" style={{ color: '#0032A0', textDecoration: 'underline', fontSize: '0.9rem' }}>
                                                        View Resume PDF
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                            <p>No applicants yet for this job.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
