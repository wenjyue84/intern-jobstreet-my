import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

import { MOCK_JOBS } from '../../lib/data';

export default function JobDetail() {
    const router = useRouter();
    const { id } = router.query;

    // In a real app, we would fetch data based on ID. 
    // Here we just find it in the mock array.
    const job = MOCK_JOBS.find(j => j.id.toString() === id);

    if (!job) {
        return (
            <Layout>
                <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <h2>Loading...</h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '40px 0' }}>
                <div className="container">
                    <Link href="/" style={{ color: '#666', marginBottom: '20px', display: 'inline-block' }}>&larr; Back to Jobs</Link>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#0032A0' }}>{job.title}</h1>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '500', color: '#333' }}>{job.company}</h2>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', color: '#666' }}>
                                <span>📍 {job.location}</span>
                                <span>💰 RM {job.allowance} / month</span>
                                <span>🕒 {job.postedAt}</span>
                            </div>
                        </div>
                        <img
                            src={`https://ui-avatars.com/api/?name=${job.company}&background=random&size=128`}
                            alt={job.company}
                            style={{ borderRadius: '16px' }}
                        />
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 0', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div className="glass-card" style={{ padding: '30px', background: '#fff' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Job Description</h3>
                    <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '30px' }}>
                        {job.description}
                    </p>

                    <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Requirements</h3>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#444', marginBottom: '30px' }}>
                        <li>Currently pursuing a Bachelor's Degree in related field.</li>
                        <li>Available for internship for at least 3 months.</li>
                        <li>Strong communication skills in English and Malay.</li>
                        <li>Willing to learn and adapt in a fast-paced environment.</li>
                    </ul>

                    <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Benefits</h3>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#444' }}>
                        <li>Monthly allowance of RM {job.allowance}.</li>
                        <li>Hands-on experience with industry leaders.</li>
                        <li>Flexible working hours (hybrid options available).</li>
                    </ul>
                </div>

                <div>
                    <div className="glass-card" style={{ padding: '30px', background: '#fff', position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Ready to apply?</h3>
                        <p style={{ marginBottom: '20px', color: '#666' }}>
                            Please prepare your CV and University Letter before applying.
                        </p>
                        <button className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
                            Apply Now 🚀
                        </button>
                        <button className="btn btn-secondary" style={{ width: '100%', padding: '15px', marginTop: '10px' }}>
                            Save for Later
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
