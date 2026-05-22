/* global process */
import axios from 'axios';

// Simple in-memory cache for featured data
const cache = {
  featuredProjects: { data: null, expiry: 0 },
  featuredDeals: { data: null, expiry: 0 }
};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const isProd = process.env.NODE_ENV === 'production';
const isServer = typeof window === 'undefined';
const API_URL = isServer
    ? (process.env.CRM_API_BASE_URL || (isProd ? 'https://api.bharatproperties.co/api/public' : 'http://localhost:4000/api/public'))
    : (process.env.NEXT_PUBLIC_CRM_API_URL || '/api/public');
const API_KEY = process.env.CRM_API_KEY || 'BP-WEB-INTEGRATION-2026-X7Y9';

const crmApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
    }
});

// Cache-busting request interceptor for real-time live CRM synchronization
crmApi.interceptors.request.use(config => {
    if (config.method === 'get') {
        config.params = {
            ...config.params,
            _t: Date.now()
        };
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Helper to flatten measurement objects (e.g. {value, unit} or {amount, unit})
const flattenMeasurement = (measure, defaultUnit = '') => {
    if (!measure) return '';
    if (typeof measure === 'string' || typeof measure === 'number') return measure;
    if (typeof measure === 'object') {
        const val = measure.value || measure.amount || '';
        const unit = measure.unit || defaultUnit;
        return val ? `${val} ${unit}`.trim() : '';
    }
    return '';
};

// Helper to fix Google Drive URLs for <img> tags
const fixDriveUrl = (url) => {
    if (!url) return url;
    if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
        const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
        const UPLOAD_BASE = process.env.CRM_UPLOAD_BASE_URL || (isProd ? 'https://api.bharatproperties.co' : '/');
        // Prepend server origin (without /api/public) to resolve upload image URLs
        return `${UPLOAD_BASE}${normalizedUrl}`;
    }
    if (url.includes('drive.google.com')) {
        // Updated to use lh3.googleusercontent.com for reliable embedding
        const fileIdMatch = url.match(/\/file\/d\/([^\/]+)/) || url.match(/[?&]id=([^&]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            return 'https://lh3.googleusercontent.com/d/' + fileIdMatch[1];
        }
    }
    return url;
};

// Helper to format prices
const formatPrice = (amount) => {
    if (!amount) return 'Contact for Price';
    
    // Handle object structure {amount, unit} or {value, unit}
    let numericValue = amount;
    if (typeof amount === 'object') {
        numericValue = amount.amount || amount.value;
    }

    if (isNaN(numericValue)) return 'Contact for Price';

    if (numericValue >= 10000000) return `₹ ${(numericValue / 10000000).toFixed(2)} Cr`;
    if (numericValue >= 100000) return `₹ ${(numericValue / 100000).toFixed(2)} Lac`;
    return `₹ ${Number(numericValue).toLocaleString('en-IN')}`;
};

// Mapper for CRM Deal to Website Property
const mapDealToProperty = (deal) => {
    // Curate images and videos from all possible fields returned by public API
    let rawImagesList = [];
    
    // 1. If we have a featured image, prepend it
    if (deal.websiteMetadata?.featuredImage) {
        rawImagesList.push(deal.websiteMetadata.featuredImage);
    }
    
    // 2. Add other deal/inventory images
    if (Array.isArray(deal.propertyImages) && deal.propertyImages.length > 0) {
        deal.propertyImages.forEach(img => rawImagesList.push(typeof img === 'object' ? img.url : img));
    } else if (Array.isArray(deal.imagesDetail) && deal.imagesDetail.length > 0) {
        deal.imagesDetail.forEach(img => rawImagesList.push(typeof img === 'object' ? img.url : img));
    } else if (Array.isArray(deal.images) && deal.images.length > 0) {
        deal.images.forEach(img => rawImagesList.push(typeof img === 'object' ? img.url : img));
    } else if (Array.isArray(deal.inventoryImages) && deal.inventoryImages.length > 0) {
        deal.inventoryImages.forEach(img => rawImagesList.push(typeof img === 'object' ? img.url : img));
    } else if (deal.inventoryId?.inventoryImages && deal.inventoryId.inventoryImages.length > 0) {
        deal.inventoryId.inventoryImages.forEach(img => rawImagesList.push(typeof img === 'object' ? img.url : img));
    }
    
    // 3. Add images from builtup details
    const rawBuiltupDetails = deal.builtupDetails || deal.inventoryId?.builtupDetails || [];
    if (Array.isArray(rawBuiltupDetails)) {
        rawBuiltupDetails.forEach(row => {
            if (row.imageUrl) {
                rawImagesList.push(row.imageUrl);
            }
        });
    }
    
    // Process drive URLs, filter blanks, and deduplicate keeping original order
    let resolvedImages = [];
    const seenImages = new Set();
    rawImagesList.forEach(img => {
        const fixed = fixDriveUrl(img);
        if (fixed && !seenImages.has(fixed)) {
            seenImages.add(fixed);
            resolvedImages.push(fixed);
        }
    });

    // If still empty, check the documents
    if (resolvedImages.length === 0) {
        const docImages = (deal.documents || [])
            .filter(doc => (doc.type === 'Image' || doc.url?.match(/\.(jpg|jpeg|png|webp|gif)$/i)))
            .map(doc => fixDriveUrl(doc.url))
            .filter(url => url) || [];
        docImages.forEach(img => {
            if (!seenImages.has(img)) {
                seenImages.add(img);
                resolvedImages.push(img);
            }
        });
    }

    // Now for videos
    let rawVideosList = [];
    if (Array.isArray(deal.propertyVideos) && deal.propertyVideos.length > 0) {
        deal.propertyVideos.forEach(vid => rawVideosList.push(typeof vid === 'object' ? vid.url : vid));
    } else if (Array.isArray(deal.videosDetail) && deal.videosDetail.length > 0) {
        deal.videosDetail.forEach(vid => rawVideosList.push(typeof vid === 'object' ? vid.url : vid));
    } else if (Array.isArray(deal.videos) && deal.videos.length > 0) {
        deal.videos.forEach(vid => rawVideosList.push(typeof vid === 'object' ? vid.url : vid));
    } else if (Array.isArray(deal.inventoryVideos) && deal.inventoryVideos.length > 0) {
        deal.inventoryVideos.forEach(vid => rawVideosList.push(typeof vid === 'object' ? vid.url : vid));
    } else if (deal.inventoryId?.inventoryVideos && deal.inventoryId.inventoryVideos.length > 0) {
        deal.inventoryId.inventoryVideos.forEach(vid => rawVideosList.push(typeof vid === 'object' ? vid.url : vid));
    }

    if (Array.isArray(rawBuiltupDetails)) {
        rawBuiltupDetails.forEach(row => {
            if (row.videoUrl) {
                rawVideosList.push(row.videoUrl);
            }
        });
    }
    
    let resolvedVideos = [];
    const seenVideos = new Set();
    rawVideosList.forEach(vid => {
        const fixed = fixDriveUrl(vid);
        if (fixed && !seenVideos.has(fixed)) {
            seenVideos.add(fixed);
            resolvedVideos.push(fixed);
        }
    });

    // If still empty, check the documents for videos
    if (resolvedVideos.length === 0) {
        const docVideos = (deal.documents || [])
            .filter(doc => (doc.type === 'Video' || doc.url?.match(/\.(mp4|webm|ogg|mov)$/i)))
            .map(doc => fixDriveUrl(doc.url))
            .filter(url => url) || [];
        docVideos.forEach(vid => {
            if (!seenVideos.has(vid)) {
                seenVideos.add(vid);
                resolvedVideos.push(vid);
            }
        });
    }

    // Helper functions for descriptions/labels
    const getMediaDescription = (url) => {
        if (deal.websiteMetadata?.featuredImage && fixDriveUrl(deal.websiteMetadata.featuredImage) === url) {
            return 'Featured Property Image';
        }
        if (Array.isArray(rawBuiltupDetails)) {
            const matchedRow = rawBuiltupDetails.find(row => row.imageUrl && fixDriveUrl(row.imageUrl) === url);
            if (matchedRow) {
                return `${matchedRow.floor}${matchedRow.cluster ? ` - ${matchedRow.cluster}` : ''}`;
            }
        }
        return 'Property Image';
    };

    const getVideoDescription = (url) => {
        if (Array.isArray(rawBuiltupDetails)) {
            const matchedRow = rawBuiltupDetails.find(row => row.videoUrl && fixDriveUrl(row.videoUrl) === url);
            if (matchedRow) {
                return `Walkthrough: ${matchedRow.floor}${matchedRow.cluster ? ` - ${matchedRow.cluster}` : ''}`;
            }
        }
        return 'Property Video';
    };

    // Construct the rich media array for PropertyMedia
    const media = [
        ...resolvedImages.map(url => ({ type: 'image', url, description: getMediaDescription(url) })),
        ...resolvedVideos.map(url => ({ type: 'video', url, description: getVideoDescription(url) }))
    ];

    const intent = deal.intent || 'Sell';
    const rawCategory = deal.category || '';
    const category = /^[0-9a-fA-F]{24}$/.test(rawCategory) ? '' : rawCategory;
    const subCat = /^[0-9a-fA-F]{24}$/.test(deal.subCategory) ? '' : (deal.subCategory || '');
    const rawSizeLabel = deal.sizeLabel || deal.unitSpecification?.sizeLabel || '';
    const sizeLabel = /^[0-9a-fA-F]{24}$/.test(rawSizeLabel) ? '' : rawSizeLabel;
    
    const availableString = `Available For ${intent}`.trim();

    const rawProjectName = deal.projectName || '';
    const cleanProjectName = /^[0-9a-fA-F]{24}$/.test(rawProjectName) ? '' : rawProjectName;
    const blockString = deal.block && deal.block !== 'N/A' ? deal.block : '';

    // Compute dynamic high-fidelity Built-up parameters from CRM DB
    const floorsMap = {};
    rawBuiltupDetails.forEach(row => {
        const floorName = row.floor || 'Standard Floor';
        if (!floorsMap[floorName]) {
            floorsMap[floorName] = [];
        }
        floorsMap[floorName].push({
            name: row.cluster || 'Room/Area',
            length: row.length || '0',
            breadth: row.width || '0',
            area: row.totalArea || String((parseFloat(row.length) * parseFloat(row.width)) || '0'),
            imageUrl: row.imageUrl || '',
            videoUrl: row.videoUrl || ''
        });
    });

    const formattedFloors = Object.keys(floorsMap).map(floorName => ({
        name: floorName,
        clusters: floorsMap[floorName]
    }));

    let builtupTypeVal = deal.builtupType || deal.inventoryId?.builtupType || deal.inventoryInfo?.builtupType || 'Standard Layout';
    if (builtupTypeVal && typeof builtupTypeVal === 'object') {
        builtupTypeVal = builtupTypeVal.lookup_value || builtupTypeVal.name || 'Standard Layout';
    }
    if (builtupTypeVal === '69cfec103dc8a3ece367942d') {
        builtupTypeVal = 'Vacant';
    }
    const builtupType = builtupTypeVal;

    const furnishingObj = {
        furnishing: deal.furnishType || deal.propertyDetails?.furnishing || deal.inventoryId?.furnishType || 'Unfurnished',
        furnishingDetails: (deal.furnishedItems || (deal.inventoryId && deal.inventoryId.furnishedItems)) 
            ? (deal.furnishedItems || deal.inventoryId.furnishedItems).split(',').map(s => s.trim()) 
            : [],
        occupationDate: (deal.occupationDate || (deal.inventoryId && deal.inventoryId.occupationDate)) 
            ? new Date(deal.occupationDate || deal.inventoryId.occupationDate).toLocaleDateString('en-GB') 
            : 'TBD',
        age: deal.ageOfConstruction || deal.inventoryId?.ageOfConstruction || 'New'
    };

    return {
        id: deal._id,
        slug: deal.websiteMetadata?.slug || deal._id,
        title: deal.websiteMetadata?.title || 
               (deal.propertyDetails?.bhk ? `${deal.propertyDetails.bhk} BHK ` : '') + 
               (blockString || deal.propertyType || 'Property') + 
               (cleanProjectName ? ` at ${cleanProjectName}` : ''),
        unitName: deal.websiteMetadata?.title || blockString || cleanProjectName || 'Property',
        price: formatPrice(deal.price || deal.quotePrice),
        location: { 
            city: deal.locationDetails?.city?.lookup_value || deal.locationDetails?.city || deal.location || deal.address?.city || 'Unknown',
            display: `${cleanProjectName || blockString || 'Property'}`,
            address: deal.address?.address || deal.locationDetails?.city?.lookup_value || deal.location || '',
            street: deal.address?.street || '',
            locality: deal.locationDetails?.locality?.lookup_value || deal.locationDetails?.locality || deal.address?.locality || '',
            state: /^[0-9a-fA-F]{24}$/.test(deal.locationDetails?.state?.lookup_value || deal.locationDetails?.state || deal.address?.state || '') ? 'Haryana' : (deal.locationDetails?.state?.lookup_value || deal.locationDetails?.state || deal.address?.state || 'Haryana'),
            country: /^[0-9a-fA-F]{24}$/.test(deal.address?.country || '') ? 'India' : (deal.address?.country || 'India'),
            zip: deal.address?.zip || ''
        },
        beds: String(deal.propertyDetails?.bhk || '0'),
        baths: String(deal.propertyDetails?.bathrooms || '0'),
        sqft: sizeLabel || flattenMeasurement(deal.size, deal.sizeUnit || 'Sq.Ft') || 'Area on Request',
        block: blockString,
        image: deal.websiteMetadata?.featuredImage ? fixDriveUrl(deal.websiteMetadata.featuredImage) : (resolvedImages[0] || null),
        images: resolvedImages,
        media: media,
        status: deal.status || 'Available',
        type: deal.propertyType || 'Residential',
        propertyType: deal.propertyType || 'Residential',
        category: category || deal.category?.lookup_value || deal.category || 'Residential',
        subCategory: subCat,
        sizeLabel: sizeLabel || flattenMeasurement(deal.size, deal.sizeUnit || 'Sq.Ft') || 'Area on Request',
        unitType: deal.unitType?.lookup_value || deal.unitType || deal.inventoryId?.unitType?.lookup_value || deal.inventoryId?.unitType || 'Ordinary',
        width: deal.width || deal.inventoryId?.width || deal.inventoryId?.frontage || '',
        length: deal.length || deal.inventoryId?.length || deal.inventoryId?.depth || '',
        intent: intent,
        availableString: availableString,
        description: (deal.websiteMetadata?.description && 
                       deal.websiteMetadata.description !== 'Check out this new property listing at Bharat Properties.' && 
                       deal.websiteMetadata.description !== 'Check out this updated property listing at Bharat Properties.')
                       ? deal.websiteMetadata.description 
                       : (deal.description || deal.websiteMetadata?.description || deal.remarks || ''),
        builtupDetails: {
            type: builtupType,
            area: String(deal.size || '0'),
            unit: deal.sizeUnit || 'Sq.Ft',
            floors: formattedFloors
        },
        construction: furnishingObj,
        coords: { lat: parseFloat(deal.latitude) || 28.4595, lng: parseFloat(deal.longitude) || 77.0266 },
        technical: {
            floorNumber: deal.propertyDetails?.floorNumber || 'N/A',
            totalFloors: deal.propertyDetails?.totalFloors || 'N/A',
            facing: deal.propertyDetails?.facing || 'N/A',
            direction: deal.propertyDetails?.direction || 'N/A',
            roadWidth: deal.propertyDetails?.roadWidth || 'N/A',
            age: deal.propertyDetails?.ageOfProperty || 'New',
            registration: deal.priceDetails?.registrationCharges || 'Extra',
            maintenance: deal.priceDetails?.maintenanceCharges || 'N/A'
        },
        // Old field mappings for compatibility
        unitNo: deal.unitNo || deal.inventoryId?.unitNo || 'N/A',
        
        ownership: deal.propertyDetails?.ownership || 'Freehold',
        stage: deal.status || 'Available',
        rawPrice: deal.price || deal.quotePrice || 0,
        transactionType: deal.transactionType || 'Full White',
        flexiblePercentage: deal.flexiblePercentage !== undefined ? deal.flexiblePercentage : 100,
        collectorRate: deal.collectorRate || 0,
        collectorRateUnit: deal.collectorRateUnit || 'Sq Yard',
        collectorValue: deal.collectorValue || 0,
        pricingNature: deal.pricingNature || { negotiable: false, fixed: false },
        seo: {
            title: deal.websiteMetadata?.metaTitle,
            description: deal.websiteMetadata?.metaDescription,
            tags: deal.websiteMetadata?.tags || []
        },
        siteVisitCount: deal.siteVisitCount
    };
};

// Mapper for CRM Project to Website Project
const mapProjectToWebProject = (project) => {
    // Image mapping: Keep objects to preserve category labels
    const projectImages = (project.projectImages || [])
        .map(img => ({
            url: fixDriveUrl(img.url || img.path),
            category: img.category || 'Other',
            title: img.title || ''
        }))
        .filter(img => img.url);

    
    // Categorize amenities for the UI
    const amenityMap = project.amenities || {};
    const enabledAmenities = Object.keys(amenityMap).filter(key => amenityMap[key] === true || amenityMap[key] === 'true');
    
    const categorizedAmenities = {
        basic: enabledAmenities.filter(a => ['Swimming Pool', 'Gymnasium', 'Club House', 'Power Supply', 'Power Backup', 'Water Supply', 'Lift'].includes(a)),
        security: enabledAmenities.filter(a => ['24x7 Security', 'Fire Fighting System', 'Intercom', 'CCTV', 'Gated Community'].includes(a)),
        others: enabledAmenities.filter(a => !['Swimming Pool', 'Gymnasium', 'Club House', 'Power Supply', 'Power Backup', 'Water Supply', 'Lift', '24x7 Security', 'Fire Fighting System', 'Intercom', 'CCTV', 'Gated Community'].includes(a))
    };

    return {
        id: project._id,
        slug: project.websiteMetadata?.slug || project._id,
        name: project.name,
        developer: { name: project.developerName || 'Bharat Properties' },
        images: projectImages,
        image: project.websiteMetadata?.featuredImage || projectImages.find(img => img.category === 'Main')?.url || (projectImages[0] ? projectImages[0].url : null),
        featuredImage: project.websiteMetadata?.featuredImage || projectImages.find(img => img.category === 'Main')?.url || (projectImages[0] ? projectImages[0].url : null),
        status: project.status?.lookup_value || project.status || 'Under Construction',
        location: project.address?.city?.lookup_value || project.address?.city || project.locationSearch || 'Unknown',
        landArea: flattenMeasurement(project.landArea, project.landAreaUnit || 'Acres'),
        totalBlocks: project.totalBlocks || 0,
        totalFloors: project.totalFloors || 0,
        totalUnits: project.totalUnits || 0,
        launchDate: project.launchDate,
        expectedCompletion: project.expectedCompletionDate,
        category: Array.isArray(project.category) ? project.category.map(c => c.lookup_value || c).join(', ') : (project.category?.lookup_value || project.category || 'Real Estate'),
        subCategory: Array.isArray(project.subCategory) ? project.subCategory.map(s => s.lookup_value || s) : [],
        parkingType: Array.isArray(project.parkingType) ? project.parkingType.map(p => p.lookup_value || p) : (project.parkingType?.lookup_value ? [project.parkingType.lookup_value] : []),
        unitSizes: project.pricing?.unitPrices?.map(u => ({ 
            label: `${u.subCategory || ''} - ${flattenMeasurement(u.size)}`.replace(/^ - /, ''),
            price: formatPrice(u.price) 
        })) || [],
        description: project.websiteMetadata?.description || project.description,
        overview: project.websiteMetadata?.description || project.description,
        rera: project.reraNumber,
        possession: project.possessionDate,
        amenities: categorizedAmenities,
        blocks: project.blocks || [],
        deals: (project.associatedDeals || []).map(mapDealToProperty),
        address: {
            ...project.address,
            city: project.address?.city?.lookup_value || project.address?.city || '',
            locality: project.address?.locality?.lookup_value || project.address?.locality || '',
            state: project.address?.state?.lookup_value || project.address?.state || '',
            country: project.address?.country?.lookup_value || project.address?.country || ''
        },
        seo: {
            title: project.websiteMetadata?.metaTitle,
            description: project.websiteMetadata?.metaDescription,
            tags: project.websiteMetadata?.tags || []
        }
    };
};

export const fetchListings = async () => {
    try {
        const response = await crmApi.get('/listings');
        const deals = response.data.data || [];
        return deals.map(mapDealToProperty);
    } catch (error) {
        console.error('Error fetching listings from CRM:', error);
        return [];
    }
};

export const fetchProjects = async () => {
    try {
        const response = await crmApi.get('/projects');
        const projects = response.data.data || [];
        return projects.map(mapProjectToWebProject);
    } catch (error) {
        console.error('Error fetching projects from CRM:', error);
        return [];
    }
};

export const fetchProjectBySlug = async (slug) => {
    try {
        const response = await crmApi.get(`/projects/${slug}`);
        if (response.data.data) {
            return mapProjectToWebProject(response.data.data);
        }
        return null;
    } catch (error) {
        console.error(`Error fetching project with slug ${slug}:`, error);
        return null;
    }
};

export const fetchListingBySlug = async (slug) => {
    try {
        const response = await crmApi.get(`/listings/${slug}`);
        if (response.data.data) {
            return mapDealToProperty(response.data.data);
        }
        return null;
    } catch (error) {
        console.error(`Error fetching listing with slug ${slug}:`, error);
        return null;
    }
};

export const submitListing = async (formData) => {
    try {
        const response = await crmApi.post('/submit-property', formData);
        return response.data;
    } catch (error) {
        console.error('Error submitting property to CRM:', error);
        throw error;
    }
};

export const submitLead = async (formData) => {
    try {
        const response = await crmApi.post('/submit-lead', formData);
        return response.data;
    } catch (error) {
        console.error('Error submitting lead to CRM:', error);
        throw error;
    }
};

export const fetchFeaturedDeals = async (type = 'latest', city = '') => {
    try {
        let url = `/listings?type=${type}&limit=8`;
        if (city) url += `&city=${encodeURIComponent(city)}`;
        
        const response = await crmApi.get(url);
        const deals = response.data.data || [];
        return deals.map(mapDealToProperty);
    } catch {
        return [];
    }
}

export const fetchFeaturedProjects = async (status = '', city = '') => {
    // Cache check
    const now = Date.now();
    if (cache.featuredProjects.data && cache.featuredProjects.expiry > now) {
        return cache.featuredProjects.data;
    }
    try {
        let url = `/projects?limit=8`;
        if (status && status !== 'All') url += `&status=${encodeURIComponent(status)}`;
        if (city) url += `&city=${encodeURIComponent(city)}`;
        const response = await crmApi.get(url);
        const projects = response.data.data || [];
        const result = projects.map(p => ({
            id: p._id,
            name: p.name,
            developer: p.developerName,
            location: p.address?.city?.lookup_value || (typeof p.address?.city === 'string' ? p.address.city : null) || p.locationSearch || 'Unknown',
            status: p.status?.lookup_value || p.status || 'Active',
            image: fixDriveUrl(p.websiteMetadata?.featuredImage || p.projectImages?.find(img => img.category === 'Main' || img.category === 'main')?.url || p.projectImages?.find(img => img.category === 'Main' || img.category === 'main')?.path || p.projectImages?.[0]?.url || p.projectImages?.[0]?.path) || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
            price: p.pricing?.basePrice?.amount ? `${p.pricing.basePrice.amount} ${p.pricing.basePrice.unit}` : 'Contact for Price'
        }));
        cache.featuredProjects = { data: result, expiry: now + CACHE_TTL_MS };
        return result;
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        return [];
    }
};

export const fetchPublicSettings = async () => {
    try {
        const response = await crmApi.get('/public-settings');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching public settings:', error);
        return { relations: [] };
    }
};

export const fetchAvailableUnits = async (project, block) => {
    try {
        const response = await crmApi.get('/available-units', {
            params: { project, block }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching available units:', error);
        return [];
    }
};

export const fetchGoogleReviews = async () => {
    try {
        const response = await crmApi.get('/google-reviews');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        return { reviews: [], rating: 5, totalReviews: 0 };
    }
};

export default {
    fetchListings,
    fetchFeaturedDeals,
    fetchFeaturedProjects,
    fetchProjects,
    fetchListingBySlug,
    fetchProjectBySlug,
    submitListing,
    submitLead,
    fetchPublicSettings,
    fetchAvailableUnits,
    fetchGoogleReviews
};
