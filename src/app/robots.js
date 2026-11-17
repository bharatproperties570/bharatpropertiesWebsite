import { SITE_URL } from '../lib/seo';

export default function robots() {
    const disallow = ['/api/', '/admin/', '/config/', '/search', '/v4-test', '/wa-action/'];
    const aiBots = [
        'GPTBot',
        'OAI-SearchBot',
        'ChatGPT-User',
        'ClaudeBot',
        'PerplexityBot',
        'Google-Extended',
        'Applebot-Extended',
    ];

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow,
            },
            ...aiBots.map((bot) => ({
                userAgent: bot,
                allow: '/',
                disallow,
            })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
