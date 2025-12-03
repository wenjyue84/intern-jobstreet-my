/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://internmy.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/intern/dashboard',
                    '/employer/dashboard',
                    '/employer/profile',
                    '/my-applications',
                    '/saved-jobs',
                    '/post-job',
                ],
            },
        ],
    },
}
