import Head from 'next/head';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { EMPLOYER_BLOG_ARTICLES } from '../../../lib/employerBlogData';
import Link from 'next/link';

export default function EmployerArticle() {
    const router = useRouter();
    const { slug } = router.query;
    const article = EMPLOYER_BLOG_ARTICLES.find((a) => a.slug === slug);

    if (!article) {
        return (
            <Layout>
                <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                    <h1>Article not found</h1>
                    <Link href="/employer/resources" className="btn btn-primary">Back to Resources</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>{article.title} - Employer Resources</title>
                <meta name="description" content={article.excerpt} />
            </Head>

            <article className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
                <Link href="/employer/resources" style={{ textDecoration: 'none', color: '#666', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px' }}>
                    ← Back to Resources
                </Link>

                <div className="glass-card" style={{ padding: '40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '20px' }}>{article.emoji}</span>
                        <h1 style={{ color: '#0032A0', marginBottom: '20px' }}>{article.title}</h1>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                            <span>{article.date}</span> • <span>{article.readTime} min read</span> • <span style={{ color: '#0032A0' }}>{article.category}</span>
                        </div>
                    </div>

                    <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} style={{ lineHeight: '1.8', color: '#333' }} />
                </div>
            </article>
        </Layout>
    );
}
