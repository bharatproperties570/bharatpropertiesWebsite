import { SEO_DATA } from '../../data/seoData';

export const metadata = {
    title: { absolute: SEO_DATA.PRIVACY.title },
    description: SEO_DATA.PRIVACY.description,
};

export default function Layout({ children }) {
    return children;
}
