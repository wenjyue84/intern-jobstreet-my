import Link from 'next/link';
import Image from 'next/image';

export default function JobCard({ job }) {
    return (
        <Link href={`/jobs/${job.id}`}>
            <div className="job-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h3 className="job-role">{job.title}</h3>
                        <p className="job-company">{job.company}</p>
                    </div>
                    <Image
                        src={`https://ui-avatars.com/api/?name=${job.company}&background=random`}
                        alt={job.company}
                        width={40}
                        height={40}
                        style={{ borderRadius: '8px' }}
                    />
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
