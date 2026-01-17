// Sample project data with comprehensive details
export const SAMPLE_PROJECTS = [
    {
        id: 'proj-001',
        name: 'Bharat Heights',
        developer: {
            name: 'Bharat Developers Ltd',
            secondaryDeveloper: null,
            isJointVenture: false
        },
        reraNumber: 'RERA-HR-KKR-2024-001234',
        description: 'Experience luxury living at Bharat Heights, a premium residential project in the heart of Kurukshetra. Featuring modern amenities, spacious apartments, and excellent connectivity to major landmarks.',
        category: 'Residential',
        subCategory: ['Apartment', 'Flat'],
        landArea: {
            value: 5.5,
            unit: 'Acres'
        },
        totalBlocks: 4,
        totalFloors: 15,
        totalUnits: 240,
        status: 'Under Construction',
        launchedOn: '2024-03-15',
        expectedCompletion: '2026-12-31',
        possession: '2027-03-31',
        parkingType: ['Covered Parking', 'Open Parking'],
        approvedBanks: ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'],
        approvals: {
            reraCertificate: true,
            registrationNo: 'RERA-HR-KKR-2024-001234',
            date: '2024-03-01',
            location: 'Kurukshetra, Haryana'
        },
        address: {
            street: 'Sector 12, Main Road',
            locality: 'Urban Estate',
            city: 'Kurukshetra',
            zip: '136118',
            state: 'Haryana',
            country: 'India'
        },
        blocks: [
            {
                name: 'Tower A',
                category: 'Residential',
                subCategory: 'Apartment',
                landArea: 1.5,
                totalBlocks: 1,
                totalFloors: 15,
                totalUnits: 60,
                status: 'Under Construction',
                launchedOn: '2024-03-15',
                expectedCompletion: '2026-12-31',
                possession: '2027-03-31',
                parkingType: 'Covered Parking',
                reraNumber: 'RERA-HR-KKR-2024-001234-A'
            },
            {
                name: 'Tower B',
                category: 'Residential',
                subCategory: 'Apartment',
                landArea: 1.5,
                totalBlocks: 1,
                totalFloors: 15,
                totalUnits: 60,
                status: 'Under Construction',
                launchedOn: '2024-03-15',
                expectedCompletion: '2026-12-31',
                possession: '2027-03-31',
                parkingType: 'Covered Parking',
                reraNumber: 'RERA-HR-KKR-2024-001234-B'
            }
        ],
        unitSizes: [
            {
                name: '2 BHK Premium',
                block: 'Tower A',
                category: 'Residential',
                subCategory: 'Apartment',
                unitType: '2 BHK',
                showApartmentSize: true,
                showSize: true,
                dimensions: {
                    length: { value: 45, unit: 'Feet' },
                    breadth: { value: 35, unit: 'Feet' },
                    area: { value: 175, unit: 'Sq Yard' }
                },
                carpetArea: 1200,
                price: '₹ 45 Lac',
                pricePerSqFt: '₹ 3,750'
            },
            {
                name: '3 BHK Deluxe',
                block: 'Tower A',
                category: 'Residential',
                subCategory: 'Apartment',
                unitType: '3 BHK',
                showApartmentSize: true,
                showSize: true,
                dimensions: {
                    length: { value: 55, unit: 'Feet' },
                    breadth: { value: 40, unit: 'Feet' },
                    area: { value: 244, unit: 'Sq Yard' }
                },
                carpetArea: 1650,
                price: '₹ 62 Lac',
                pricePerSqFt: '₹ 3,750'
            },
            {
                name: '4 BHK Luxury',
                block: 'Tower B',
                category: 'Residential',
                subCategory: 'Apartment',
                unitType: '4 BHK',
                showApartmentSize: true,
                showSize: true,
                dimensions: {
                    length: { value: 65, unit: 'Feet' },
                    breadth: { value: 45, unit: 'Feet' },
                    area: { value: 325, unit: 'Sq Yard' }
                },
                carpetArea: 2200,
                price: '₹ 85 Lac',
                pricePerSqFt: '₹ 3,860'
            }
        ],
        amenities: {
            basic: [
                'Car Parking',
                'Intercom',
                'Multi-Purpose Hall',
                '24x7 Water Supply',
                'Municipal Water Supply',
                'Garbage Management System',
                'Fire Fighting System',
                'Visitor Car Parking',
                'Earthquake Resistance',
                'Lift',
                'Maintenance Staff',
                'Power Supply',
                'Air Conditioning'
            ],
            security: [
                '24x7 Security',
                'CCTV Surveillance',
                'Gated Community',
                'Security Cabin'
            ],
            others: [
                'Swimming Pool',
                'Gymnasium',
                'Children Play Area',
                'Landscaped Gardens',
                'Club House',
                'Jogging Track',
                'Indoor Games Room'
            ]
        },
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
        ],
        floorPlans: [
            '/floor-plans/bharat-heights-2bhk.pdf',
            '/floor-plans/bharat-heights-3bhk.pdf',
            '/floor-plans/bharat-heights-4bhk.pdf'
        ],
        brochure: '/brochures/bharat-heights-brochure.pdf',
        videos: []
    },
    {
        id: 'proj-002',
        name: 'Green Valley Residency',
        developer: {
            name: 'Green Valley Developers',
            secondaryDeveloper: 'Urban Homes Pvt Ltd',
            isJointVenture: true
        },
        reraNumber: 'RERA-HR-CHD-2023-005678',
        description: 'Green Valley Residency offers eco-friendly living with sustainable design and modern amenities in Chandigarh. Perfect for families seeking a green lifestyle.',
        category: 'Residential',
        subCategory: ['Villa', 'Independent House'],
        landArea: {
            value: 8.0,
            unit: 'Acres'
        },
        totalBlocks: 6,
        totalFloors: 3,
        totalUnits: 120,
        status: 'Ready to Move',
        launchedOn: '2023-01-10',
        expectedCompletion: '2025-06-30',
        possession: '2025-07-15',
        parkingType: ['Covered Parking', 'Open Parking'],
        approvedBanks: ['HDFC Bank', 'PNB', 'SBI'],
        approvals: {
            reraCertificate: true,
            registrationNo: 'RERA-HR-CHD-2023-005678',
            date: '2023-01-01',
            location: 'Chandigarh'
        },
        address: {
            street: 'Sector 21, Green Avenue',
            locality: 'IT Park Area',
            city: 'Chandigarh',
            zip: '160022',
            state: 'Chandigarh',
            country: 'India'
        },
        blocks: [
            {
                name: 'Phase 1',
                category: 'Residential',
                subCategory: 'Villa',
                landArea: 4.0,
                totalBlocks: 3,
                totalFloors: 3,
                totalUnits: 60,
                status: 'Ready to Move',
                launchedOn: '2023-01-10',
                expectedCompletion: '2025-06-30',
                possession: '2025-07-15',
                parkingType: 'Covered Parking',
                reraNumber: 'RERA-HR-CHD-2023-005678-P1'
            }
        ],
        unitSizes: [
            {
                name: '3 BHK Villa',
                block: 'Phase 1',
                category: 'Residential',
                subCategory: 'Villa',
                unitType: '3 BHK',
                showApartmentSize: true,
                showSize: true,
                dimensions: {
                    length: { value: 60, unit: 'Feet' },
                    breadth: { value: 50, unit: 'Feet' },
                    area: { value: 333, unit: 'Sq Yard' }
                },
                carpetArea: 2500,
                price: '₹ 1.2 Cr',
                pricePerSqFt: '₹ 4,800'
            }
        ],
        amenities: {
            basic: [
                'Car Parking',
                '24x7 Water Supply',
                'Power Supply',
                'Lift',
                'Fire Fighting System'
            ],
            security: [
                '24x7 Security',
                'CCTV Surveillance',
                'Gated Community'
            ],
            others: [
                'Swimming Pool',
                'Gymnasium',
                'Club House',
                'Landscaped Gardens'
            ]
        },
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
        ],
        floorPlans: ['/floor-plans/green-valley-3bhk-villa.pdf'],
        brochure: '/brochures/green-valley-brochure.pdf',
        videos: []
    }
];

export const getProjectById = (id) => {
    return SAMPLE_PROJECTS.find(project => project.id === id);
};

export const getProjectsByCity = (city) => {
    return SAMPLE_PROJECTS.filter(project => project.address.city === city);
};
