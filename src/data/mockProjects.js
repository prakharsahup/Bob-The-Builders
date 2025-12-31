export const mockProjects = [
  {
    id: 'proj1',
    name: 'FinFlow AI',
    description: 'AI-powered financial planning platform for SMBs. Automates cash flow forecasting, expense categorization, and financial reporting using machine learning.',
    createdAt: '2025-12-15T10:30:00Z',
    parsedData: {
      industry: 'FinTech',
      stage: 'Series A',
      fundingNeeded: '$5M',
      teamSize: 12,
      founded: '2023',
      location: 'San Francisco, CA',
      revenue: '$500K ARR',
      growth: '25% MoM',
      customers: 150,
      highlights: [
        'Partnered with 3 major accounting firms',
        'AI accuracy of 94% in cash flow predictions',
        'Featured in TechCrunch and Forbes'
      ]
    },
    shortlistedVCs: ['vc1', 'vc6', 'vc7'],
    sentMessages: []
  },
  {
    id: 'proj2',
    name: 'EcoTrack',
    description: 'Carbon tracking and offset marketplace for e-commerce businesses. Helps online retailers measure, reduce, and offset their carbon footprint.',
    createdAt: '2025-12-10T14:20:00Z',
    parsedData: {
      industry: 'Climate Tech',
      stage: 'Seed',
      fundingNeeded: '$2M',
      teamSize: 8,
      founded: '2024',
      location: 'Austin, TX',
      revenue: '$150K ARR',
      growth: '40% MoM',
      customers: 85,
      highlights: [
        'Integrated with Shopify and WooCommerce',
        'Offset 50K tons of CO2 to date',
        'B Corp certified'
      ]
    },
    shortlistedVCs: ['vc4'],
    sentMessages: []
  }
];
