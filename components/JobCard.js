import Link from 'next/link';
import CompanyLogo from './CompanyLogo';

export default function JobCard({ job }) {
    return (
        <Link href={`/jobs/${job.id}`}>
            <div className="job-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h3 className="job-role">{job.title}</h3>
                        <p className="job-company">{job.company}</p>
                    </div>
                    <CompanyLogo company={job.company} size={40} />
                </div>

                <div className="job-meta" style={{ marginTop: '10px' }}>
                    <span>📍 {job.location}</span>
                    <span>💰 RM {job.allowance}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {job.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                <div style={{ marginTop: '15px', fontSize: '0.85rem', color: '#888' }}>
                    Posted {job.postedAt}
                </div>
            </div>
        </Link>
    );
}
