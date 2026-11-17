import { SEO_DATA } from '../../data/seoData';

export const metadata = {
    title: { absolute: SEO_DATA.CALCULATOR.title },
    description: SEO_DATA.CALCULATOR.description,
};

export default function Layout({ children }) {
    return children;
}
