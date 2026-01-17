export const INDIVIDUAL_PROPERTIES = [
    {
        id: "prop-101",
        unitNum: "982 P",
        projectName: "Bharat Heights",
        unitName: "1 SP (Corner)",
        category: "Residential",
        subCategory: "House",
        type: "House(Residential)",
        size: {
            value: 10,
            unit: "Marla",
            sqYard: "263.12"
        },
        block: "Tower A",
        location: {
            sector: "Sector 4",
            city: "Kurukshetra",
            address: "ADDRESS",
            street: "STREET",
            urbanEstate: "Urban Estate",
            locality: "Sector 3",
            zip: "136118",
            state: "Haryana",
            country: "India"
        },
        direction: "South(Direction)",
        facing: "Green Belt(Facing)",
        road: "9 Mtr Wide(Road)",
        ownership: "Freehold",
        stage: "Active",
        construction: {
            occupationDate: "01-03-2011",
            age: "12 yrs old",
            furnishing: "Furnished",
            furnishingDetails: ["fan", "light", "sofa", "curtain"]
        },
        builtupDetails: {
            type: "Duplex",
            floors: [
                {
                    name: "Ground Floor",
                    clusters: [
                        { name: "Living Room", length: 19, breadth: 12, area: 228 },
                        { name: "Lobby", length: 18, breadth: 10, area: 180 },
                        { name: "Bedroom", length: 13, breadth: 13, area: 169 },
                        { name: "Master Bedroom", length: 17, breadth: 12, area: 204 },
                        { name: "Kitchen", length: 15, breadth: 11, area: 165 }
                    ]
                },
                {
                    name: "First Floor",
                    clusters: [
                        { name: "Study Room", length: 10, breadth: 9, area: 90 }
                    ]
                }
            ]
        },
        media: {
            images: [
                { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", description: "front elevation" },
                { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", description: "backyard" }
            ],
            videos: [
                { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Walkthrough Video" }
            ]
        },
        price: "₹ 1.85 Cr",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        brochure: "#"
    },
    {
        id: "prop-102",
        unitNum: "45",
        projectName: "Bharat Heights",
        unitName: "Studio Apartment",
        category: "Residential",
        subCategory: "Apartment",
        type: "Apartment",
        size: {
            value: 180,
            unit: "Sq Yard",
            sqYard: "180"
        },
        block: "Tower B",
        location: {
            sector: "Sector 12",
            city: "Kurukshetra",
            state: "Haryana",
            country: "India"
        },
        direction: "East",
        facing: "Park",
        road: "12 Mtr Wide",
        ownership: "Freehold",
        stage: "Under Construction",
        construction: {
            age: "New",
            furnishing: "Unfurnished"
        },
        price: "₹ 45 Lac",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        brochure: "#"
    },
    {
        id: "prop-103",
        unitNum: "112 B",
        projectName: "Green Valley",
        unitName: "Luxury Plot",
        category: "Residential",
        subCategory: "Plot",
        type: "Plot",
        size: {
            value: 320,
            unit: "Sq Yard",
            sqYard: "320"
        },
        block: "Block A",
        location: {
            sector: "Phase 1",
            city: "Chandigarh",
            state: "Chandigarh",
            country: "India"
        },
        direction: "North",
        facing: "Main Road",
        road: "24 Mtr Wide",
        ownership: "Leasehold",
        stage: "Ready to Move",
        construction: {
            age: "Resale",
            furnishing: "N/A"
        },
        price: "₹ 2.1 Cr",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        brochure: "#"
    },
    {
        id: "prop-104",
        unitNum: "223",
        projectName: "Mohali Greens",
        unitName: "Family Villa",
        category: "Residential",
        subCategory: "Villa",
        type: "Villa",
        size: { value: 250, unit: "Sq Yard", sqYard: "250" },
        location: { city: "Mohali", state: "Punjab", country: "India" },
        price: "₹ 1.2 Cr",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
        media: {
            images: [{ url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800" }],
            videos: []
        }
    },
    {
        id: "prop-105",
        unitNum: "7B",
        projectName: "Panchkula Heights",
        unitName: "Modern Flat",
        category: "Residential",
        subCategory: "Flat",
        type: "Flat",
        size: { value: 1500, unit: "Sq Ft", sqYard: "166" },
        location: { city: "Panchkula", state: "Haryana", country: "India" },
        price: "₹ 85 Lac",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        media: {
            images: [{ url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" }],
            videos: []
        }
    },
    {
        id: "prop-106",
        unitNum: "Site 12",
        projectName: "Karnal Elite",
        unitName: "Premium Villa",
        category: "Residential",
        subCategory: "Villa",
        type: "Villa",
        size: { value: 400, unit: "Sq Yard", sqYard: "400" },
        location: { city: "Karnal", state: "Haryana", country: "India" },
        price: "₹ 2.1 Cr",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
        media: {
            images: [{ url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800" }],
            videos: []
        }
    }
];

export const getPropertyById = (id) => {
    return INDIVIDUAL_PROPERTIES.find(p => p.id === id);
};
