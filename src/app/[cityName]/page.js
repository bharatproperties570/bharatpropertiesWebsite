import { notFound } from 'next/navigation';
import { CITY_DATA } from '../../data/cityData';
import { SEO_DATA } from '../../data/seoData';
import { citySlug, cleanText, absoluteUrl, breadcrumbSchema, jsonLd } from '../../lib/seo';
import { fetchRealEstateNews } from '../../services/NewsService';
import CityPageClient from './CityPageClient';

export const revalidate = 3600;

export function generateStaticParams() {
    return CITY_DATA.map((c) => ({ cityName: citySlug(c.name) }));
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
    if (!city) return { title: 'Page not found', robots: { index: false, follow: false } };

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
    };
}

export default async function CityPage({ params }) {
    const { cityName } = await params;
    const city = findCity(cityName);
    if (!city) notFound();

    const [crumbs, initialNews] = await Promise.all([
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: city.name, path: `/${citySlug(city.name)}` },
        ]),
        fetchRealEstateNews(city.name).catch(() => [])
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
            <CityPageClient cityData={city} initialNews={initialNews} />
        </>
    );
}
