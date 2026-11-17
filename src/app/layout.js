
// v2.2-BHARAT-PROPERTIES-SYNC
import { Outfit } from 'next/font/google'
import { GlobalProvider } from '../context/GlobalContext'
import ClientUI from '../components/ClientUI' // Helper for floating buttons/modals
import ConnectedHeader from '../components/ConnectedHeader'
import ConnectedFooter from '../components/ConnectedFooter'
import ScrollReveal from '../components/ScrollReveal'
import '../styles/global.css'
import '../styles/variables.css'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../lib/seo'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Bharat Properties | Real Estate in Kurukshetra, Mohali & Chandigarh',
        template: '%s | Bharat Properties',
    },
    description: 'Bharat Properties is a real estate consultancy with offices in Kurukshetra and Mohali. Explore plots, flats, villas, commercial properties and new projects across Kurukshetra, Mohali, Chandigarh and Panchkula.',
    alternates: { canonical: './' },
    openGraph: {
        title: 'Bharat Properties | Real Estate in Kurukshetra, Mohali & Chandigarh',
        description: 'Plots, flats, villas and new projects in Kurukshetra, Mohali, Chandigarh and Panchkula from a local real estate consultancy.',
        type: 'website',
        locale: 'en_IN',
        siteName: SITE_NAME,
        url: '/',
        images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bharat Properties | Real Estate in Kurukshetra, Mohali & Chandigarh',
        description: 'Plots, flats, villas and new projects in Kurukshetra, Mohali, Chandigarh and Panchkula.',
        images: [DEFAULT_OG_IMAGE],
    },
    icons: {
        icon: [
            { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
            { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' }
        ],
        apple: [
            { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
            { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' }
        ]
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en-IN" suppressHydrationWarning>
            <body className={outfit.className} suppressHydrationWarning>
                <GlobalProvider>
                    <ScrollReveal />
                    <ConnectedHeader />
                    <main>
                        {children}
                    </main>
                    <ConnectedFooter />
                    <ClientUI />
                </GlobalProvider>
            </body>
        </html>
    )
}
