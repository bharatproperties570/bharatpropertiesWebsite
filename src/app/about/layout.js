import { SEO_DATA } from '../../data/seoData';

export const metadata = {
    title: { absolute: SEO_DATA.ABOUT.title },
    description: SEO_DATA.ABOUT.description,
    alternates: { canonical: '/about' },
};

export default function Layout({ children }) {
    return children;
}
