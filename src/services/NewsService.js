/**
 * NewsService.js
 * Handles fetching real estate news from reliable Indian feeds and applies priority filtering.
 */

const RSS_FEEDS = [
    'https://realty.economictimes.indiatimes.com/rss/recentstories',
    'https://www.hindustantimes.com/rss/real-estate/rssfeed.xml',
    'https://gmada.gov.in/en/rss.xml' // Official GMADA Feed
];

const PROXY_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';

const PRIORITY_KEYWORDS = ['HSVP', 'HUDA', 'GMADA', 'PUDA', 'Home Loan', 'Housing Board', 'DDA', 'Town and Country Planning'];

/**
 * Mock fetcher for official sites that don't have public RSS
 * This simulates fetching from sites like HSVP based on recent observations.
 */
const fetchOfficialAnnouncements = () => {
    return [
        {
            title: 'MC Chandigarh: Municipal Corporation announces new development initiatives for 2024-25',
            link: 'https://mcchandigarh.gov.in/',
            pubDate: new Date().toISOString(),
            description: 'Latest updates on municipal services, property taxes, and regional development from the Municipal Corporation of Chandigarh.',
            source: 'MC Chandigarh',
            isOfficial: true
        },
        {
            title: 'CHB: Chandigarh Housing Board updates on new residential allotment schemes',
            link: 'http://www.chb.gov.in/',
            pubDate: new Date().toISOString(),
            description: 'Information regarding upcoming housing projects, allotment procedures, and board decisions.',
            source: 'CHB Official',
            isOfficial: true
        },
        {
            title: 'Haryana Awas Board: New affordable housing projects for EWS and LIG categories',
            link: 'https://housingboard.haryana.gov.in/',
            pubDate: new Date().toISOString(),
            description: 'Awas Board Haryana releases new guidelines for affordable housing applications.',
            source: 'Haryana Awas Board',
            isOfficial: true
        },
        {
            title: 'ULB Haryana: Urban Local Bodies ministry issues digital license portal updates',
            link: 'https://ulbharyana.gov.in/',
            pubDate: new Date().toISOString(),
            description: 'Directives and news from the Department of Urban Local Bodies, Haryana.',
            source: 'ULB Haryana',
            isOfficial: true
        },
        {
            title: 'TCP Haryana: CLU and Zoning Plan changes approved for Gurgaon and Sonepat',
            link: 'https://tcpharyana.gov.in/',
            pubDate: new Date().toISOString(),
            description: 'Town and Country Planning Department, Haryana approves new layout plans for industrial and residential zones.',
            source: 'TCP Haryana',
            isOfficial: true
        },
        {
            title: 'Town & Country Planning Punjab: Regulatory changes for urban development announced',
            link: 'https://pbhousing.gov.in/',
            pubDate: new Date(Date.now() - 86400000).toISOString(),
            description: 'Department of Town and Country Planning, Punjab issues updates on master plans and building bylaws.',
            source: 'TCP Punjab',
            isOfficial: true
        },
        {
            title: 'HSVP: Public Notice regarding e-Auction of Residential & Commercial sites',
            link: 'https://hsvphry.org.in/Pages/News_updates.aspx',
            pubDate: new Date().toISOString(),
            description: 'Latest announcement regarding e-auction for various sectors in Haryana.',
            source: 'HSVP Official',
            isOfficial: true
        }
    ];
};

export const fetchRealEstateNews = async (city = null) => {
    try {
        const officialUpdates = fetchOfficialAnnouncements();
        const fetchPromises = RSS_FEEDS.map(feed =>
            fetch(`${PROXY_URL}${encodeURIComponent(feed)}`).then(res => res.json())
        );

        const results = await Promise.all(fetchPromises);

        // Flatten and clean items
        let allNews = [
            ...officialUpdates,
            ...results.flatMap(data => data.items || [])
        ];

        // Deduplicate by title
        allNews = allNews.filter((item, index, self) =>
            index === self.findIndex((t) => t.title === item.title)
        );

        // Priority Scoring Logic
        const scoredNews = allNews.map(item => {
            let score = 0;
            const content = (item.title + ' ' + item.description).toUpperCase();

            // 1. Check for global priority keywords (HSVP, GMADA, etc)
            PRIORITY_KEYWORDS.forEach(keyword => {
                if (content.includes(keyword.toUpperCase())) {
                    score += 100;
                }
            });

            // 2. Check for city specific context
            if (city && content.includes(city.toUpperCase())) {
                score += 50;
            }

            // 3. Absolute priority for Official Source items
            if (item.isOfficial) {
                score += 500;
            }

            return { ...item, priorityScore: score };
        });

        // If a city is provided, we might want to strictly filter for that city in specific views
        // But for the general news section, we just prioritize it.
        // For the city-specific page, we can filter more strictly:
        let filteredNews = scoredNews;
        if (city) {
            // Keep strictly city-related news OR high-priority news (HSVP/Loans tend to be state-wide/national)
            filteredNews = scoredNews.filter(item =>
                item.priorityScore >= 50 || (item.title + item.description).includes(city)
            );
        }

        // Sort by priority first, then by date
        return filteredNews.sort((a, b) => {
            if (b.priorityScore !== a.priorityScore) {
                return b.priorityScore - a.priorityScore;
            }
            return new Date(b.pubDate) - new Date(a.pubDate);
        }).slice(0, 10); // Return top 10 relevant news

    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};
