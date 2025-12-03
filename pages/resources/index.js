import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { BLOG_ARTICLES } from '../../lib/blogData';

import { useAuth } from '../../context/AuthContext';

export default function Resources() {
    const { user } = useAuth();

    // Helper to render article card
    const ArticleCard = ({ article }) => (
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
                                    article.category === 'Career Advice' ? '#E8F5E9' :
                                        article.category === 'Hiring' ? '#E3F2FD' :
                                            article.category === 'Management' ? '#FFF3E0' : '#E8F5E9',
                        color: article.category === 'CV Tips' ? '#1565C0' :
                            article.category === 'Interview' ? '#E65100' :
                                article.category === 'Job Search' ? '#6A1B9A' :
                                    article.category === 'Career Advice' ? '#2E7D32' :
                                        article.category === 'Hiring' ? '#1565C0' :
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
    );

    // If user is logged in, show filtered list
    if (user) {
        const filteredArticles = BLOG_ARTICLES.filter(article => {
            if (user.role === 'intern') return article.targetRole === 'intern';
            if (user.role === 'employer') return article.targetRole === 'employer';
            return true;
        });

        return (
            <Layout>
                <Head>
                    <title>Internship Resources - InternMy Malaysia</title>
                </Head>
                <div className="hero">
                    <div className="container">
                        <h1>{user.role === 'employer' ? 'Employer Resources 💼' : 'Internship Resources 📚'}</h1>
                        <p>{user.role === 'employer' ? 'Expert guides to help you build a successful internship program' : 'Expert guides to help you land your dream internship'}</p>
                    </div>
                </div>
                <section className="container" style={{ padding: '60px 20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                        {filteredArticles.map(article => <ArticleCard key={article.id} article={article} />)}
                    </div>
                </section>
            </Layout>
        );
    }

    // Public view: Split into two sections
    const internArticles = BLOG_ARTICLES.filter(a => a.targetRole === 'intern');
    const employerArticles = BLOG_ARTICLES.filter(a => a.targetRole === 'employer');

    return (
        <Layout>
            <Head>
                <title>Internship Resources: Career Tips & Hiring Guides - InternMy Malaysia</title>
                <meta name="description" content="The ultimate resource for Malaysia's internship market. Career tips for students finding internships and expert hiring guides for employers building their teams." />
                <meta name="keywords" content="internship tips malaysia, how to find internship, hiring interns malaysia, employer guide, cv writing, interview tips" />
                <meta property="og:title" content="Internship Resources: Career Tips & Hiring Guides - InternMy Malaysia" />
                <meta property="og:description" content="The ultimate resource for Malaysia's internship market. Career tips for students and hiring guides for employers." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://internmy.com/resources" />
            </Head>

            <div className="hero">
                <div className="container">
                    <h1>Internship Market Insights 💡</h1>
                    <p>Expert guides for students launching careers and employers building teams</p>
                </div>
            </div>

            <section className="container" style={{ padding: '60px 20px' }}>
                {/* Intern Section */}
                <div style={{ marginBottom: '60px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '30px',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '15px'
                    }}>
                        <h2 style={{ color: '#0032A0', margin: 0 }}>For Students & Interns 🎓</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                        {internArticles.map(article => <ArticleCard key={article.id} article={article} />)}
                    </div>
                </div>

                {/* Employer Section */}
                <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '30px',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '15px'
                    }}>
                        <h2 style={{ color: '#0032A0', margin: 0 }}>For Employers 💼</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                        {employerArticles.map(article => <ArticleCard key={article.id} article={article} />)}
                    </div>
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
