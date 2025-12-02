import Head from 'next/head';

export default function SEOHead({
    title = 'InternMy Malaysia - Find Top Internships in Malaysia',
    description = 'The #1 Internship Portal for Malaysian Students. Connect with top employers like Grab, Petronas, and Maybank. Find your dream internship today.',
    keywords = 'internship malaysia, intern jobs malaysia, student internship, kuala lumpur internship, penang internship, johor internship',
    ogImage = '/favicon.png',
    url = 'https://internmy.com',
    type = 'website'
}) {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content="InternMy Malaysia" />

            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="InternMy Malaysia" />
            <meta property="og:locale" content="en_MY" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Favicon */}
            <link rel="icon" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/favicon.png" />

            {/* Additional SEO */}
            <meta name="geo.region" content="MY" />
            <meta name="geo.placename" content="Malaysia" />
            <meta name="format-detection" content="telephone=no" />
        </Head>
    );
}
