import { notFound } from 'next/navigation';
import { getProject } from '../../../lib/data';
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
    const graph = [
        projectSchema(project, url),
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            ...(cityOf(project) ? [{ name: cityOf(project), path: `/${cityOf(project).toLowerCase().replace(/\s+/g, '-')}` }] : []),
            { name: project.name, path },
        ]),
    ];

    return (
        <>
            {graph.map((item, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(item) }} />
            ))}
            <ProjectPageClient initialProject={project} />
        </>
    );
}
