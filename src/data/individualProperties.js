export const INDIVIDUAL_PROPERTIES = [
    {
        id: "prop-101",
        title: "Corner House at Bharat Heights",
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
        title: "Studio Apartment at Bharat Heights",
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
            address: "Sector 12 Avenue",
            street: "Street 5",
            urbanEstate: "Urban Estate",
            locality: "Central Noida",
            zip: "136118",
            state: "Haryana",
            country: "India"
        },
        direction: "East",
        facing: "Park",
        road: "12 Mtr Wide",
        ownership: "Freehold",
        stage: "Under Construction",
        construction: {
            occupationDate: "TBD",
            age: "New",
            furnishing: "Unfurnished",
            furnishingDetails: []
        },
        builtupDetails: {
            type: "Single Floor",
            floors: [
                {
                    name: "Typical Floor",
                    clusters: [
                        { name: "Studio Room", length: 15, breadth: 12, area: 180 }
                    ]
                }
            ]
        },
        media: {
            images: [
                { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", description: "Exterior" }
            ],
            videos: []
        },
        price: "₹ 45 Lac",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        brochure: "#"
    },
    {
        id: "prop-103",
        title: "Luxury Plot in Green Valley",
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
            address: "Main Avenue",
            street: "Lane 2",
            urbanEstate: "IT Park",
            locality: "Phase 1",
            zip: "160101",
            state: "Chandigarh",
            country: "India"
        },
        direction: "North",
        facing: "Main Road",
        road: "24 Mtr Wide",
        ownership: "Leasehold",
        stage: "Ready to Move",
        construction: {
            occupationDate: "N/A",
            age: "Resale",
            furnishing: "N/A",
            furnishingDetails: []
        },
        builtupDetails: {
            type: "Plot",
            floors: []
        },
        media: {
            images: [
                { url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", description: "Aerial View" }
            ]
        },
        price: "₹ 2.1 Cr",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        brochure: "#"
    },
    {
        id: "prop-104",
        title: "Family Villa in Mohali Greens",
        unitNum: "223",
        projectName: "Mohali Greens",
        unitName: "Family Villa",
        category: "Residential",
        subCategory: "Villa",
        type: "Villa",
        size: { value: 250, unit: "Sq Yard", sqYard: "250" },
        block: "Block C",
        location: {
            sector: "Sector 70",
            city: "Mohali",
            address: "Sector 70",
            street: "Main Road",
            urbanEstate: "Urban Estate",
            locality: "Sector 70",
            zip: "160070",
            state: "Punjab",
            country: "India"
        },
        direction: "West",
        facing: "Park",
        road: "18 Mtr Wide",
        ownership: "Freehold",
        stage: "Active",
        construction: {
            occupationDate: "2020",
            age: "4 yrs",
            furnishing: "Semi-Furnished",
            furnishingDetails: ["Lights", "Fans"]
        },
        builtupDetails: {
            type: "Villa",
            floors: [
                {
                    name: "Ground Floor",
                    clusters: [{ name: "Lounge", length: 20, breadth: 15, area: 300 }]
                }
            ]
        },
        price: "₹ 1.2 Cr",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
        media: {
            images: [{ url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800", description: "Front" }],
            videos: []
        }
    },
    {
        id: "prop-105",
        title: "Modern Flat in Panchkula Heights",
        unitNum: "7B",
        projectName: "Panchkula Heights",
        unitName: "Modern Flat",
        category: "Residential",
        subCategory: "Flat",
        type: "Flat",
        size: { value: 1500, unit: "Sq Ft", sqYard: "166" },
        block: "Block D",
        location: {
            sector: "Sector 20",
            city: "Panchkula",
            address: "Sector 20",
            street: "Internal Road",
            urbanEstate: "Urban Estate",
            locality: "Sector 20",
            zip: "134109",
            state: "Haryana",
            country: "India"
        },
        direction: "East",
        facing: "Club",
        road: "12 Mtr Wide",
        ownership: "Freehold",
        stage: "Under Construction",
        construction: {
            occupationDate: "2025",
            age: "Under Construction",
            furnishing: "Unfurnished",
            furnishingDetails: []
        },
        builtupDetails: {
            type: "Flat",
            floors: [
                {
                    name: "Typical Floor",
                    clusters: [{ name: "Hall", length: 18, breadth: 12, area: 216 }]
                }
            ]
        },
        price: "₹ 85 Lac",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        media: {
            images: [{ url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", description: "View" }],
            videos: []
        }
    },
    {
        id: "prop-106",
        title: "Premium Villa in Karnal Elite",
        unitNum: "Site 12",
        projectName: "Karnal Elite",
        unitName: "Premium Villa",
        category: "Residential",
        subCategory: "Villa",
        type: "Villa",
        size: { value: 400, unit: "Sq Yard", sqYard: "400" },
        block: "Phase II",
        location: {
            sector: "Sector 32",
            city: "Karnal",
            address: "Sector 32",
            street: "Avenue 1",
            urbanEstate: "Urban Estate",
            locality: "Sector 32",
            zip: "132001",
            state: "Haryana",
            country: "India"
        },
        direction: "North",
        facing: "Main Road",
        road: "24 Mtr Wide",
        ownership: "Freehold",
        stage: "Active",
        construction: {
            occupationDate: "2022",
            age: "2 yrs",
            furnishing: "Semi-Furnished",
            furnishingDetails: ["AC", "Heater"]
        },
        builtupDetails: {
            type: "Villa",
            floors: [
                {
                    name: "Ground Floor",
                    clusters: [{ name: "Living", length: 25, breadth: 20, area: 500 }]
                }
            ]
        },
        price: "₹ 2.1 Cr",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
        media: {
            images: [{ url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800", description: "Pool Side" }],
            videos: []
        }
    }
];

export const getPropertyById = (id) => {
    return INDIVIDUAL_PROPERTIES.find(p => p.id === id);
};
