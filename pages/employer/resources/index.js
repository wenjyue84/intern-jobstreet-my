import Head from 'next/head';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import { BLOG_ARTICLES } from '../../../lib/blogData';

const EMPLOYER_BLOG_ARTICLES = BLOG_ARTICLES.filter(article => article.targetRole === 'employer');

export default function EmployerResources() {
    return (
        <Layout>
            <Head>
                <title>Employer Resources - InternMy Malaysia</title>
                <meta name="description" content="Guides and tips for employers on hiring, managing, and mentoring interns." />
            </Head>

            <div className="hero">
                <div className="container">
                    <h1>Employer Resources 💼</h1>
                    <p>Expert guides to help you build a successful internship program</p>
                </div>
            </div>

            <section className="container" style={{ padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                    {EMPLOYER_BLOG_ARTICLES.map((article) => (
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
                                        background: article.category === 'Hiring' ? '#E3F2FD' :
                                            article.category === 'Management' ? '#FFF3E0' : '#E8F5E9',
                                        color: article.category === 'Hiring' ? '#1565C0' :
                                            article.category === 'Management' ? '#E65100' : '#2E7D32',
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
            </section>
        </Layout>
    );
}
