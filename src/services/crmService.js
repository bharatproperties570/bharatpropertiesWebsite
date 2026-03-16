import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:4001/api/public';
// For client-side, we might need a different way to handle the key if it's not exposed via NEXT_PUBLIC_
// But since the user is the owner, we'll assume it's safe for now or we'll wrap it in a server action later.
const API_KEY = process.env.CRM_API_KEY || 'BP-WEB-INTEGRATION-2026-X7Y9';

const crmApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
    }
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
    const images = deal.documents?.filter(doc => doc.type === 'Image' || doc.url?.match(/\.(jpg|jpeg|png|webp|gif)$/i))
        .map(doc => doc.url) || [];

    return {
        id: deal._id,
        slug: deal.websiteMetadata?.slug || deal._id,
        title: deal.websiteMetadata?.title || `${deal.propertyDetails?.bhk || ''} BHK ${deal.propertyType || ''} at ${deal.projectName}`,
        price: formatPrice(deal.price || deal.quotePrice),
        location: { 
            city: deal.location || deal.address?.city || 'Unknown',
            display: `${deal.projectName}${deal.block ? `, Block ${deal.block}` : ''}`
        },
        beds: flattenMeasurement(deal.propertyDetails?.bhk, ''),
        baths: flattenMeasurement(deal.propertyDetails?.bathrooms, ''),
        sqft: flattenMeasurement(deal.size, deal.sizeUnit || 'Sq.Ft'),
        image: deal.websiteMetadata?.featuredImage || images[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        status: deal.status || 'Available',
        type: deal.propertyType || 'Residential',
        subType: deal.subCategory || 'Flat',
        description: deal.websiteMetadata?.description || deal.remarks || deal.description,
        media: images,
        builtupDetails: {
            area: flattenMeasurement(deal.size),
            unit: deal.sizeUnit || 'Sq.Ft'
        },
        construction: deal.propertyDetails?.furnishing || 'Unfurnished',
        coords: { lat: parseFloat(deal.latitude) || 28.4595, lng: parseFloat(deal.longitude) || 77.0266 },
        seo: {
            title: deal.websiteMetadata?.metaTitle,
            description: deal.websiteMetadata?.metaDescription,
            tags: deal.websiteMetadata?.tags || []
        }
    };
};

// Mapper for CRM Project to Website Project
const mapProjectToWebProject = (project) => {
    const images = project.projectImages?.map(img => img.path) || [];
    
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
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'],
        featuredImage: project.websiteMetadata?.featuredImage || images[0],
        status: project.status?.lookup_value || project.status || 'Under Construction',
        location: project.address?.city || project.locationSearch || 'Unknown',
        landArea: flattenMeasurement(project.landArea, project.landAreaUnit || 'Acres'),
        totalBlocks: project.totalBlocks || 0,
        totalFloors: project.totalFloors || 0,
        totalUnits: project.totalUnits || 0,
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
        address: project.address,
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

export default {
    fetchListings,
    fetchProjects,
    fetchListingBySlug,
    fetchProjectBySlug,
    submitListing,
    submitLead
};
