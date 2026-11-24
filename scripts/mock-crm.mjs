/**
 * Mock CRM Server for Local Verification & Automated Quality Gates
 *
 * Implements endpoints consumed by crmService.js:
 *  - GET /api/public/projects
 *  - GET /api/public/listings
 *  - GET /api/public/projects/:slug
 *  - GET /api/public/listings/:slug
 *  - GET /api/public/public-settings
 *  - GET /api/public/available-units
 *  - GET /api/public/google-reviews
 *  - POST /api/public/submit-property
 *  - POST /api/public/submit-lead
 */

import http from 'node:http';
import { URL } from 'node:url';

export const mockProjects = [
  {
    _id: '6501a1b2c3d4e5f678901234',
    websiteMetadata: {
      slug: 'mock-project-1',
      title: 'Bharat Heights Mohali',
      metaTitle: 'Bharat Heights Mohali | Premium Apartments',
      metaDescription: 'Explore Bharat Heights in Mohali by Bharat Properties with world-class amenities.',
      description: 'Bharat Heights is an ultra-modern residential project in Mohali offering luxury 3 BHK homes.',
      featuredImage: 'https://images.bharatproperties.co/sample-project.jpg',
    },
    name: 'Bharat Heights Mohali',
    developerName: 'Bharat Properties',
    address: {
      city: { lookup_value: 'Mohali' },
      locality: { lookup_value: 'Sector 82' },
      state: { lookup_value: 'Punjab' },
      country: { lookup_value: 'India' },
    },
    status: { lookup_value: 'Ready to Move' },
    projectImages: [
      { url: 'https://images.bharatproperties.co/sample-project.jpg', category: 'Main', title: 'Facade' },
    ],
    pricing: {
      unitPrices: [
        { subCategory: '3 BHK Apartment', size: 1850, price: 9500000 },
      ],
    },
    amenities: {
      'Club House': true,
      '24x7 Security': true,
      'Swimming Pool': true,
    },
    associatedDeals: [],
    updatedAt: '2025-01-15T10:00:00.000Z',
    createdAt: '2025-01-01T10:00:00.000Z',
  },
];

export const mockListings = [
  {
    _id: '6501b1b2c3d4e5f678905678',
    websiteMetadata: {
      slug: 'mock-prop-1',
      title: 'Luxury 3 BHK Apartment in Mohali',
      metaTitle: 'Luxury 3 BHK Apartment in Mohali | Bharat Properties',
      metaDescription: 'Ready-to-move 3 BHK luxury apartment in Sector 82, Mohali with modern amenities.',
      description: 'Stunning 3 BHK apartment with premium fittings, spacious layout, and serene green views.',
      featuredImage: 'https://images.bharatproperties.co/sample-listing.jpg',
    },
    propertyDetails: {
      bhk: 3,
      bathrooms: 3,
      furnishing: 'Semi-Furnished',
      ownership: 'Freehold',
    },
    propertyType: 'Residential',
    category: { lookup_value: 'Residential' },
    price: 9500000,
    quotePrice: 9500000,
    locationDetails: {
      city: { lookup_value: 'Mohali' },
      locality: { lookup_value: 'Sector 82' },
      state: { lookup_value: 'Punjab' },
    },
    address: {
      address: 'Sector 82, Mohali, Punjab',
      city: 'Mohali',
      locality: 'Sector 82',
      state: 'Punjab',
      country: 'India',
      zip: '140306',
    },
    intent: 'Sell',
    status: 'Available',
    size: 1850,
    sizeUnit: 'Sq.Ft',
    media: [],
    propertyImages: [
      'https://images.bharatproperties.co/sample-listing.jpg',
    ],
    updatedAt: '2025-01-20T12:00:00.000Z',
    createdAt: '2025-01-05T12:00:00.000Z',
  },
  {
    _id: '6501b1b2c3d4e5f678909999',
    websiteMetadata: {
      slug: 'mock-prop-sparse',
      title: 'Residential Plot in Mohali Sector 70',
      metaTitle: 'Residential Plot in Mohali Sector 70 | Bharat Properties',
      metaDescription: 'Prime residential plot available in Sector 70, Mohali.',
      description: 'Prime residential plot in Sector 70 Mohali with clear title and prime location.',
    },
    propertyDetails: {
      bhk: 0,
      bathrooms: 0,
      ownership: 'Freehold',
    },
    propertyType: 'Residential Plot',
    category: { lookup_value: 'Residential' },
    price: 4500000,
    quotePrice: 4500000,
    locationDetails: {
      city: { lookup_value: 'Mohali' },
      locality: { lookup_value: 'Sector 70' },
      state: { lookup_value: 'Punjab' },
    },
    address: {
      address: 'Sector 70, Mohali, Punjab',
      city: 'Mohali',
      locality: 'Sector 70',
      state: 'Punjab',
      country: 'India',
      zip: '140306',
    },
    intent: 'Sell',
    status: 'Available',
    size: 150,
    sizeUnit: 'Sq.Yd',
    // Deliberately omitted optional fields:
    // documents, propertyImages, propertyVideos, collectorRate, collectorRateUnit,
    // collectorValue, flexiblePercentage, inventoryInfo, siteVisitCount, remarks
    updatedAt: '2025-01-22T10:00:00.000Z',
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  // Generated mock listings to reach 25 items for sitemap & pagination assertions
  ...Array.from({ length: 23 }, (_, i) => {
    const index = i + 3; // 3 through 25
    const cities = ['Mohali', 'Chandigarh', 'Panchkula', 'Zirakpur', 'Kharar', 'Kurukshetra', 'New Chandigarh'];
    const city = cities[i % cities.length];
    const bhk = (i % 4) + 1;
    const isPlot = bhk === 1 && i % 2 === 0;
    const title = isPlot
      ? `Residential Plot in ${city} Sector ${index + 10}`
      : `Modern ${bhk} BHK Apartment in ${city} Sector ${index + 10}`;

    return {
      _id: `6501b1b2c3d4e5f67890${String(index).padStart(4, '0')}`,
      websiteMetadata: {
        slug: `mock-prop-${index}`,
        title,
        metaTitle: `${title} | Bharat Properties`,
        metaDescription: `Explore ${title} with verified title in ${city}.`,
        description: `Premium real estate opportunity: ${title}.`,
        featuredImage: 'https://images.bharatproperties.co/sample-listing.jpg',
      },
      propertyDetails: {
        bhk: isPlot ? 0 : bhk,
        bathrooms: isPlot ? 0 : bhk,
        furnishing: isPlot ? 'Unfurnished' : 'Semi-Furnished',
        ownership: 'Freehold',
      },
      propertyType: isPlot ? 'Residential Plot' : 'Residential',
      category: { lookup_value: 'Residential' },
      price: 3500000 + index * 200000,
      quotePrice: 3500000 + index * 200000,
      locationDetails: {
        city: { lookup_value: city },
        locality: { lookup_value: `Sector ${index + 10}` },
        state: { lookup_value: city === 'Kurukshetra' || city === 'Panchkula' ? 'Haryana' : 'Punjab' },
      },
      address: {
        address: `Sector ${index + 10}, ${city}`,
        city,
        locality: `Sector ${index + 10}`,
        state: city === 'Kurukshetra' || city === 'Panchkula' ? 'Haryana' : 'Punjab',
        country: 'India',
        zip: '140306',
      },
      intent: 'Sell',
      status: 'Available',
      size: isPlot ? 150 + index * 5 : 900 + index * 50,
      sizeUnit: isPlot ? 'Sq.Yd' : 'Sq.Ft',
      propertyImages: ['https://images.bharatproperties.co/sample-listing.jpg'],
      updatedAt: `2025-01-${String(Math.min(28, 10 + (index % 15))).padStart(2, '0')}T12:00:00.000Z`,
      createdAt: '2025-01-02T10:00:00.000Z',
    };
  }),
];

export function createMockCrmServer() {
  return http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = parsedUrl.pathname;

    // Normalize: strip leading /api/public if present
    if (pathname.startsWith('/api/public')) {
      pathname = pathname.slice('/api/public'.length);
    }
    if (!pathname.startsWith('/')) {
      pathname = '/' + pathname;
    }

    const sendJson = (status, payload) => {
      res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      });
      res.end(JSON.stringify(payload));
    };

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
      });
      res.end();
      return;
    }

    // GET /projects
    if (req.method === 'GET' && pathname === '/projects') {
      sendJson(200, { success: true, data: mockProjects });
      return;
    }

    // GET /listings
    if (req.method === 'GET' && pathname === '/listings') {
      const isAll = parsedUrl.searchParams.get('all') === '1';
      if (isAll) {
        sendJson(200, { success: true, data: mockListings, total: mockListings.length });
        return;
      }

      const limitParam = parsedUrl.searchParams.get('limit');
      const defaultLimit = 10;
      const limit = limitParam ? Math.max(1, parseInt(limitParam, 10) || defaultLimit) : defaultLimit;

      sendJson(200, {
        success: true,
        data: mockListings.slice(0, limit),
        total: mockListings.length,
        limit,
      });
      return;
    }

    // GET /projects/:slug
    if (req.method === 'GET' && pathname.startsWith('/projects/')) {
      const slug = decodeURIComponent(pathname.slice('/projects/'.length));
      const project = mockProjects.find(
        (p) => p.websiteMetadata?.slug === slug || p._id === slug
      );
      if (project) {
        sendJson(200, { success: true, data: project });
      } else {
        sendJson(404, { success: false, message: 'Project not found' });
      }
      return;
    }

    // GET /listings/:slug
    if (req.method === 'GET' && pathname.startsWith('/listings/')) {
      const slug = decodeURIComponent(pathname.slice('/listings/'.length));
      const listing = mockListings.find(
        (l) => l.websiteMetadata?.slug === slug || l._id === slug
      );
      if (listing) {
        sendJson(200, { success: true, data: listing });
      } else {
        sendJson(404, { success: false, message: 'Listing not found' });
      }
      return;
    }

    // GET /public-settings
    if (req.method === 'GET' && pathname === '/public-settings') {
      sendJson(200, { success: true, data: { companyName: 'Bharat Properties' } });
      return;
    }

    // GET /available-units
    if (req.method === 'GET' && pathname === '/available-units') {
      sendJson(200, { success: true, data: [] });
      return;
    }

    // GET /google-reviews
    if (req.method === 'GET' && pathname === '/google-reviews') {
      sendJson(200, {
        success: true,
        data: {
          rating: 4.9,
          totalReviews: 120,
          reviews: [
            {
              name: 'Rajesh Sharma',
              author: 'Rajesh Sharma',
              rating: 5,
              text: 'Very professional real estate consultancy in Tricity and Kurukshetra.',
              time: '1 month ago',
              date: '2025-01-10T10:00:00.000Z',
            },
          ],
        },
      });
      return;
    }

    // POST /submit-lead
    if (req.method === 'POST' && pathname === '/submit-lead') {
      sendJson(200, { success: true, message: 'Lead submitted successfully', id: 'mock-lead-123' });
      return;
    }

    // POST /submit-property
    if (req.method === 'POST' && pathname === '/submit-property') {
      sendJson(200, { success: true, message: 'Property submitted successfully', id: 'mock-prop-123' });
      return;
    }

    // Catch-all 404
    sendJson(404, { success: false, message: `Route ${pathname} not found in mock CRM` });
  });
}

export function startMockCrm(port = 4000) {
  return new Promise((resolve, reject) => {
    const server = createMockCrmServer();
    server.listen(port, '127.0.0.1', () => {
      const address = server.address();
      const actualPort = typeof address === 'object' && address ? address.port : port;
      console.log(`[mock-crm] Mock CRM running on http://127.0.0.1:${actualPort}/api/public`);
      resolve({
        server,
        port: actualPort,
        url: `http://127.0.0.1:${actualPort}/api/public`,
        close: () => new Promise((res) => server.close(res)),
      });
    });
    server.on('error', reject);
  });
}

// Standalone execution: node scripts/mock-crm.mjs [port]
if (process.argv[1] && process.argv[1].endsWith('mock-crm.mjs')) {
  const port = parseInt(process.env.MOCK_CRM_PORT || process.argv[2] || '4000', 10);
  startMockCrm(port).catch((err) => {
    console.error('[mock-crm] Failed to start:', err);
    process.exit(1);
  });
}
