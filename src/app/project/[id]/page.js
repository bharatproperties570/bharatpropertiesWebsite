import { notFound } from 'next/navigation';
import { getProject } from '../../../lib/data';
import { fetchFeaturedProjects } from '../../../services/crmService';
import {
    SITE_URL, cleanText, absoluteUrl, firstImage, projectSchema, breadcrumbSchema, jsonLd,
} from '../../../lib/seo';
import ProjectPageClient from './ProjectPageClient';

// Server-rendered + cached for 5 minutes. Unknown slugs render on demand.
export const revalidate = 300;

const decode = (value) => {
    try { return decodeURIComponent(value); } catch { return value; }
};

const withCity = (name, city) => (city && !name.toLowerCase().includes(city.toLowerCase()) ? `${name} in ${city}` : name);
const cityOf = (project) => project.address?.city || (project.location !== 'Unknown' ? project.location : '');

export async function generateMetadata({ params }) {
    const { id } = await params;
    const project = await getProject(decode(id));
    if (!project) return { title: 'Project not found', robots: { index: false, follow: false } };

    const city = cityOf(project);
    const title = project.seo?.title
        ? { absolute: cleanText(project.seo.title) }
        : `${withCity(project.name, city)} - Price, Units & Site Visit`;
    const description =
        cleanText(project.seo?.description || project.overview || project.description, 158) ||
        `Explore ${withCity(project.name, city)}: unit sizes, pricing, amenities and site visits with Bharat Properties.`;
    const path = `/project/${project.slug || id}`;
    const image = absoluteUrl(project.featuredImage || firstImage(project.images));
    const ogTitle = project.seo?.title ? cleanText(project.seo.title) : withCity(project.name, city);

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: { title: ogTitle, description, url: path, type: 'website', images: image ? [{ url: image, alt: project.name }] : undefined },
        twitter: { card: 'summary_large_image', title: ogTitle, description, images: image ? [image] : undefined },
    };
}

export default async function ProjectPage({ params }) {
    const { id } = await params;
    const project = await getProject(decode(id));
    if (!project) notFound();

    const path = `/project/${project.slug || id}`;
    const url = `${SITE_URL}${path}`;
    const city = cityOf(project);

    const breadcrumbs = [
        { name: 'Home', path: '/' },
        ...(city ? [{ name: city, path: `/${city.toLowerCase().replace(/\s+/g, '-')}` }] : []),
        { name: project.name, path },
    ];

    const [graph, moreProjects] = await Promise.all([
        Promise.resolve([
            projectSchema(project, url),
            breadcrumbSchema(breadcrumbs),
        ]),
        city
            ? fetchFeaturedProjects('All', city)
                .then((list) => list.filter((p) => p.slug !== project.slug && p.id !== project.id).slice(0, 4))
                .catch(() => [])
            : Promise.resolve([])
    ]);

    return (
        <>
            {graph.map((item, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(item) }} />
            ))}
            <ProjectPageClient
                initialProject={project}
                breadcrumbs={breadcrumbs}
                moreProjects={moreProjects}
                city={city}
            />
        </>
    );
}
