import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { BLOG_ARTICLES } from '../../lib/blogData';

export default function Resources() {
    return (
        <Layout>
            <Head>
                <title>Internship Resources & Career Tips - InternMy Malaysia</title>
                <meta name="description" content="Expert tips, guides, and resources for finding internships in Malaysia. Learn how to write CV, ace interviews, and land your dream internship." />
                <meta name="keywords" content="internship tips malaysia, how to find internship, cv writing guide, interview tips, career advice malaysia" />
                <meta property="og:title" content="Internship Resources & Career Tips - InternMy Malaysia" />
                <meta property="og:description" content="Expert tips and guides for finding internships in Malaysia" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://internmy.com/resources" />
            </Head>

            <div className="hero">
                <div className="container">
                    <h1>Internship Resources & Career Tips 📚</h1>
                    <p>Expert guides to help you land your dream internship in Malaysia</p>
                </div>
            </div>

            <section className="container" style={{ padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                    {BLOG_ARTICLES.map((article) => (
                        <Link
                            href={`/resources/${article.slug}`}
                            key={article.id}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <article className="glass-card" style={{
                                padding: '30px',
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                ':hover': {
                                    transform: 'translateY(-5px)'
                                }
                            }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '20px',
                                    textAlign: 'center'
                                }}>
                                    {article.emoji}
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <span className="tag" style={{
                                        background: article.category === 'CV Tips' ? '#E3F2FD' :
                                                   article.category === 'Interview' ? '#FFF3E0' :
                                                   article.category === 'Job Search' ? '#F3E5F5' :
                                                   article.category === 'Career Advice' ? '#E8F5E9' : '#FFF',
                                        color: article.category === 'CV Tips' ? '#1565C0' :
                                               article.category === 'Interview' ? '#E65100' :
                                               article.category === 'Job Search' ? '#6A1B9A' :
                                               article.category === 'Career Advice' ? '#2E7D32' : '#333',
                                        padding: '5px 12px',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        fontWeight: '500'
                                    }}>
                                        {article.category}
                                    </span>
                                </div>

                                <h2 style={{
                                    fontSize: '1.4rem',
                                    marginBottom: '15px',
                                    color: '#0032A0',
                                    lineHeight: '1.4'
                                }}>
                                    {article.title}
                                </h2>

                                <p style={{
                                    color: '#666',
                                    lineHeight: '1.6',
                                    marginBottom: '20px'
                                }}>
                                    {article.excerpt}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    color: '#888',
                                    fontSize: '0.9rem',
                                    borderTop: '1px solid #eee',
                                    paddingTop: '15px'
                                }}>
                                    <span>📅 {article.date}</span>
                                    <span>⏱️ {article.readTime} min read</span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* SEO-rich content section */}
                <div className="glass-card" style={{ padding: '40px', marginTop: '60px', background: '#f8f9fa' }}>
                    <h2 style={{ color: '#0032A0', marginBottom: '20px' }}>Why Read Our Internship Resources?</h2>
                    <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
                        Finding an internship in Malaysia can be challenging, especially for students who are navigating the job market for the first time.
                        Our comprehensive guides cover everything from crafting the perfect CV to acing your internship interview.
                    </p>
                    <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
                        Whether you're looking for internships in Kuala Lumpur, Penang, Johor Bahru, or anywhere in Malaysia, our expert tips
                        will help you stand out from other candidates and secure your dream position at companies like Grab, Petronas, Maybank, and more.
                    </p>
                    <p style={{ lineHeight: '1.8' }}>
                        <strong>Popular topics include:</strong> CV writing for Malaysian internships, interview preparation tips,
                        how to find internship opportunities, networking strategies, and career development advice tailored for Malaysian students.
                    </p>
                </div>
            </section>
        </Layout>
    );
}
