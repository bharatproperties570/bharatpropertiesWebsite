
import { Outfit } from 'next/font/google'
import { GlobalProvider } from '../context/GlobalContext'
import ClientUI from '../components/ClientUI' // Helper for floating buttons/modals
import ConnectedHeader from '../components/ConnectedHeader'
import ConnectedFooter from '../components/ConnectedFooter'
import ScrollReveal from '../components/ScrollReveal'
import '../styles/global.css'
import '../styles/variables.css'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
    title: 'Bharat Properties | Premium Real Estate in North India',
    description: 'Premier real estate consultancy in North India. Discover luxury homes, projects, and plots in Chandigarh, Mohali, Panchkula, and Kurukshetra.',
    keywords: ['Real Estate', 'Chandigarh', 'Mohali', 'Panchkula', 'Luxury Homes', 'Property in North India', 'Bharat Properties'],
    openGraph: {
        title: 'Bharat Properties | Premium Real Estate',
        description: 'Discover luxury properties in North India with Bharat Properties.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'Bharat Properties',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bharat Properties | Premium Real Estate',
        description: 'Discover luxury properties in North India.',
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={outfit.className}>
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
