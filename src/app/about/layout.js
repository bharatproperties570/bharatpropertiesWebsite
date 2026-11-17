import { SEO_DATA } from '../../data/seoData';

export const metadata = {
    title: { absolute: SEO_DATA.ABOUT.title },
    description: SEO_DATA.ABOUT.description,
};

export default function Layout({ children }) {
    return children;
}
