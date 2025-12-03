import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { BLOG_ARTICLES } from '../../lib/blogData';

export default function ArticlePage() {
    const router = useRouter();
    const { slug } = router.query;

    const article = BLOG_ARTICLES.find(a => a.slug === slug);

    if (!article) {
        return (
            <Layout>
                <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                    <h2>Article not found</h2>
                    <Link href="/resources" style={{ color: '#0032A0', marginTop: '20px', display: 'inline-block' }}>
                        ← Back to Resources
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>{article.title} - InternMy Malaysia</title>
                <meta name="description" content={article.excerpt} />
                <meta name="keywords" content={article.keywords} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt} />
                <meta property="og:url" content={`https://internmy.com/resources/${article.slug}`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.excerpt} />

                {/* Canonical */}
                <link rel="canonical" href={`https://internmy.com/resources/${article.slug}`} />

                {/* Article Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": article.title,
                        "description": article.excerpt,
                        "datePublished": article.date,
                        "author": {
                            "@type": "Organization",
                            "name": "InternMy Malaysia"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "InternMy Malaysia"
                        }
                    })}
                </script>
            </Head>

            <div className="container" style={{ maxWidth: '800px', padding: '40px 20px' }}>
                {/* Breadcrumb */}
                <div style={{ marginBottom: '30px', color: '#666', fontSize: '0.9rem' }}>
                    <Link href="/" style={{ color: '#666' }}>Home</Link>
                    {' > '}
                    <Link href="/resources" style={{ color: '#666' }}>Resources</Link>
                    {' > '}
                    <span style={{ color: '#333' }}>{article.title}</span>
                </div>

                {/* Article Header */}
                <article>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                            {article.emoji}
                        </div>

                        <span className="tag" style={{
                            background: article.category === 'CV Tips' ? '#E3F2FD' :
                                article.category === 'Interview' ? '#FFF3E0' :
                                    article.category === 'Job Search' ? '#F3E5F5' :
                                        article.category === 'Career Advice' ? '#E8F5E9' : '#FFF',
                            color: article.category === 'CV Tips' ? '#1565C0' :
                                article.category === 'Interview' ? '#E65100' :
                                    article.category === 'Job Search' ? '#6A1B9A' :
                                        article.category === 'Career Advice' ? '#2E7D32' : '#333',
                            padding: '6px 14px',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '20px',
                            display: 'inline-block'
                        }}>
                            {article.category}
                        </span>

                        <h1 style={{
                            fontSize: '2.5rem',
                            lineHeight: '1.2',
                            marginBottom: '20px',
                            color: '#0032A0'
                        }}>
                            {article.title}
                        </h1>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            color: '#666',
                            fontSize: '0.95rem',
                            marginBottom: '30px'
                        }}>
                            <span>📅 {article.date}</span>
                            <span>⏱️ {article.readTime} min read</span>
                        </div>

                        <p style={{
                            fontSize: '1.2rem',
                            lineHeight: '1.6',
                            color: '#555',
                            fontStyle: 'italic'
                        }}>
                            {article.excerpt}
                        </p>
                    </div>

                    {/* Article Content */}
                    <div
                        className="article-content"
                        style={{
                            fontSize: '1.05rem',
                            lineHeight: '1.8',
                            color: '#333'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: article.content
                                .replace(/\n/g, '<br />')
                                .replace(/## (.*?)(<br \/>|$)/g, '<h2 style="color: #0032A0; margin-top: 40px; margin-bottom: 20px; font-size: 1.8rem;">$1</h2>')
                                .replace(/### (.*?)(<br \/>|$)/g, '<h3 style="color: #333; margin-top: 30px; margin-bottom: 15px; font-size: 1.4rem;">$1</h3>')
                                .replace(/#### (.*?)(<br \/>|$)/g, '<h4 style="color: #555; margin-top: 25px; margin-bottom: 12px; font-size: 1.2rem;">$1</h4>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/- (.*?)(<br \/>|$)/g, '<li style="margin-bottom: 8px;">$1</li>')
                                .replace(/✅/g, '<span style="color: #4CAF50;">✅</span>')
                                .replace(/❌/g, '<span style="color: #f44336;">❌</span>')
                                .replace(/<pre>/g, '<pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0; line-height: 1.6;">')
                                .replace(/<\/pre>/g, '</pre>')
                        }}
                    />

                    {/* Related Articles */}
                    <div style={{
                        marginTop: '60px',
                        padding: '30px',
                        background: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{ marginBottom: '20px', color: '#0032A0' }}>
                            Related Articles
                        </h3>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {BLOG_ARTICLES
                                .filter(a => a.id !== article.id && a.category === article.category)
                                .slice(0, 3)
                                .map(related => (
                                    <Link
                                        key={related.id}
                                        href={`/resources/${related.slug}`}
                                        style={{
                                            padding: '15px',
                                            background: 'white',
                                            borderRadius: '6px',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            display: 'block',
                                            transition: 'transform 0.2s'
                                        }}
                                    >
                                        <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                                            {related.emoji} {related.title}
                                        </div>
                                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                            {related.readTime} min read
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{
                        marginTop: '40px',
                        padding: '40px',
                        background: 'linear-gradient(135deg, #0032A0 0%, #0052D4 100%)',
                        borderRadius: '12px',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginBottom: '15px', color: 'white' }}>
                            {article.targetRole === 'employer'
                                ? 'Ready to Build Your Dream Team?'
                                : 'Ready to Find Your Internship?'}
                        </h3>
                        <p style={{ marginBottom: '25px', opacity: 0.9 }}>
                            {article.targetRole === 'employer'
                                ? 'Post your internship opportunities and connect with top talent from Malaysian universities'
                                : 'Browse hundreds of internship opportunities from top Malaysian companies'}
                        </p>
                        <Link
                            href={article.targetRole === 'employer' ? '/employers' : '/jobs'}
                            className="btn btn-primary"
                            style={{
                                background: 'white',
                                color: '#0032A0',
                                padding: '15px 40px',
                                textDecoration: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                display: 'inline-block'
                            }}
                        >
                            {article.targetRole === 'employer' ? 'Start Hiring →' : 'Browse Internships →'}
                        </Link>
                    </div>
                </article>

                {/* Back Link */}
                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <Link href="/resources" style={{ color: '#0032A0', fontSize: '1.1rem' }}>
                        ← Back to All Resources
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
