import { notFound } from 'next/navigation';
import { getListing } from '../../../lib/data';
import {
    SITE_URL, cleanText, absoluteUrl, firstImage, propertySchema, breadcrumbSchema, jsonLd,
} from '../../../lib/seo';
import PropertyPageClient from './PropertyPageClient';

export const revalidate = 300;

const decode = (value) => {
    try { return decodeURIComponent(value); } catch { return value; }
};

const nameOf = (p) => cleanText(p.title || p.unitName) || 'Property';
const placeOf = (p) => [p.location?.locality, p.location?.city].filter((v) => v && v !== 'Unknown').join(', ');
// "Plot in Sector 4 Kurukshetra" already names the place - don't append it twice.
const withPlace = (name, place) => (place && !name.toLowerCase().includes((place.split(', ').pop() || '').toLowerCase()) ? `${name} in ${place}` : name);

export async function generateMetadata({ params }) {
    const { id } = await params;
    const property = await getListing(decode(id));
    if (!property) return { title: 'Property not found', robots: { index: false, follow: false } };

    const place = placeOf(property);
    const title = property.seo?.title
        ? { absolute: cleanText(property.seo.title) }
        : withPlace(nameOf(property), place);
    const priced = property.price && !/contact/i.test(property.price) ? ` Priced at ${property.price}.` : '';
    const description =
        cleanText(property.seo?.description || property.description, 158) ||
        `${withPlace(nameOf(property), place)}.${priced} Enquire with Bharat Properties for details and site visits.`;
    const path = `/property/${property.slug || id}`;
    const image = absoluteUrl(firstImage(property.images));
    const ogTitle = property.seo?.title ? cleanText(property.seo.title) : withPlace(nameOf(property), place);

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: { title: ogTitle, description, url: path, type: 'website', images: image ? [{ url: image, alt: nameOf(property) }] : undefined },
        twitter: { card: 'summary_large_image', title: ogTitle, description, images: image ? [image] : undefined },
    };
}

export default async function PropertyPage({ params }) {
    const { id } = await params;
    const property = await getListing(decode(id));
    if (!property) notFound();

    const path = `/property/${property.slug || id}`;
    const url = `${SITE_URL}${path}`;
    const city = property.location?.city && property.location.city !== 'Unknown' ? property.location.city : '';
    const graph = [
        propertySchema(property, url),
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            ...(city ? [{ name: city, path: `/${city.toLowerCase().replace(/\s+/g, '-')}` }] : []),
            { name: nameOf(property), path },
        ]),
    ];

    return (
        <>
            {graph.map((item, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(item) }} />
            ))}
            <PropertyPageClient initialProperty={property} />
        </>
    );
}
