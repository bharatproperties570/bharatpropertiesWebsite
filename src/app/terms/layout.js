import { SEO_DATA } from '../../data/seoData';

export const metadata = {
    title: { absolute: SEO_DATA.TERMS.title },
    description: SEO_DATA.TERMS.description,
    alternates: { canonical: '/terms' },
};

export default function Layout({ children }) {
    return children;
}
