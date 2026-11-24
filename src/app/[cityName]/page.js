import { notFound } from 'next/navigation';
import { CITY_DATA, isAllowedCity } from '../../data/cityData';
import { SEO_DATA } from '../../data/seoData';
import { citySlug, cleanText, absoluteUrl, breadcrumbSchema, faqPageSchema, jsonLd } from '../../lib/seo';
import { FAQS } from '../../content/faqs';
import { fetchRealEstateNews } from '../../services/NewsService';
import { fetchFeaturedProjects, fetchFeaturedDeals } from '../../services/crmService';
import CityPageClient from './CityPageClient';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
    return CITY_DATA
        .filter((c) => isAllowedCity(c.name))
        .map((c) => ({ cityName: citySlug(c.name) }));
}

// Accepts "Kurukshetra", "kurukshetra", "new-chandigarh" and "New%20Chandigarh".
const findCity = (param) => {
    let value = param;
    try { value = decodeURIComponent(param); } catch { /* keep raw */ }
    const key = value.toLowerCase().trim().replace(/-/g, ' ');
    return CITY_DATA.find((c) => c.name.toLowerCase() === key);
};

export async function generateMetadata({ params }) {
    const { cityName } = await params;
    const city = findCity(cityName);
    if (!city || !isAllowedCity(city.name)) notFound();

    const seo = SEO_DATA.CITIES?.[city.name];
    const path = `/${citySlug(city.name)}`;
    const title = seo?.title
        ? { absolute: seo.title }
        : `Property in ${city.name} - Plots, Flats & New Projects`;
    const description =
        cleanText(seo?.description, 160) ||
        `Browse residential and commercial properties, plots and new projects in ${city.name} with Bharat Properties. ${cleanText(city.description)}.`;
    const ogTitle = seo?.title || `Property in ${city.name}`;
    const image = absoluteUrl(city.image);

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: { title: ogTitle, description, url: path, type: 'website', images: image ? [{ url: image, alt: `${city.name} real estate` }] : undefined },
        twitter: { card: 'summary_large_image', title: ogTitle, description, images: image ? [image] : undefined },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function CityPage({ params }) {
    const { cityName } = await params;
    const city = findCity(cityName);
    if (!city || !isAllowedCity(city.name)) notFound();

    const breadcrumbs = [
        { name: 'Home', path: '/' },
        { name: city.name, path: `/${citySlug(city.name)}` },
    ];

    const [crumbs, initialNews, cityProjects, cityListings] = await Promise.all([
        breadcrumbSchema(breadcrumbs),
        fetchRealEstateNews(city.name).catch(() => []),
        fetchFeaturedProjects('All', city.name),
        fetchFeaturedDeals('latest', city.name)
    ]);

    const slug = citySlug(city.name);
    const cityFaqs = FAQS[slug];
    const faqSchema = cityFaqs ? faqPageSchema(cityFaqs) : null;

    const propertyTypes = [...new Set(cityListings.map(l => l.propertyType || l.category || l.subCategory).filter(Boolean))];
    const localities = [...new Set(cityListings.map(l => l.location?.locality).filter(Boolean))];
    const prices = cityListings.map(l => l.rawPrice).filter(p => typeof p === 'number' && p > 0);
    const priceRange = prices.length > 0 ? { min: Math.min(...prices), max: Math.max(...prices) } : null;

    const citySummary = {
        projectCount: cityProjects.length,
        listingCount: cityListings.length,
        propertyTypes,
        localities,
        priceRange
    };

    const nearbyCities = CITY_DATA
        .filter((c) => isAllowedCity(c.name) && c.name.toLowerCase() !== city.name.toLowerCase())
        .map((c) => ({ name: c.name, slug: citySlug(c.name) }));

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
            )}
            <CityPageClient
                cityData={city}
                initialNews={initialNews}
                breadcrumbs={breadcrumbs}
                citySummary={citySummary}
                nearbyCities={nearbyCities}
                initialProjects={cityProjects}
                initialListings={cityListings}
            />
        </>
    );
}
