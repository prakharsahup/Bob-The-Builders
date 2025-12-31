// Mock AI report generation for VC consumption
export const generateFounderReport = (project, vc) => {
  const founderProfiles = [
    {
      name: 'Alex Morgan',
      background: 'Former Goldman Sachs VP, MBA from Stanford',
      experience: '12 years in financial services and tech',
      previousVentures: 'Founded and exited DataCrunch (acquired by Oracle)',
      expertise: 'Financial modeling, AI/ML, Enterprise SaaS'
    },
    {
      name: 'Jamie Lee',
      background: 'Former Director of Sustainability at Amazon',
      experience: '10 years in e-commerce and sustainability',
      previousVentures: 'Led Amazon Climate Pledge initiatives',
      expertise: 'Carbon accounting, E-commerce operations, Marketplace design'
    },
    {
      name: 'Sarah Johnson',
      background: 'Ex-Google Product Lead, CS PhD from MIT',
      experience: '15 years in tech product development',
      previousVentures: 'Early PM at Stripe, Product Lead at Square',
      expertise: 'Product strategy, Growth, Technical architecture'
    }
  ];

  // Select a founder profile (in real app, would be actual founder data)
  const founder = founderProfiles[Math.floor(Math.random() * founderProfiles.length)];

  // Calculate match score with VC
  const matchScore = calculateMatchScore(project, vc);

  const report = {
    founder: {
      ...founder,
      linkedIn: 'linkedin.com/in/' + founder.name.toLowerCase().replace(' ', ''),
      twitter: '@' + founder.name.split(' ')[0].toLowerCase()
    },
    company: {
      name: project.name,
      tagline: generateTagline(project),
      founded: project.parsedData?.founded || '2024',
      location: project.parsedData?.location || 'San Francisco, CA',
      website: 'www.' + project.name.toLowerCase().replace(/ /g, '') + '.com',
      teamSize: project.parsedData?.teamSize || 8,
      keyHires: generateKeyHires(project)
    },
    product: {
      description: project.description,
      problem: generateProblemStatement(project),
      solution: generateSolutionStatement(project),
      features: generateFeatures(project),
      traction: {
        revenue: project.parsedData?.revenue || '$100K ARR',
        growth: project.parsedData?.growth || '30% MoM',
        customers: project.parsedData?.customers || 50,
        retention: generateMetric(88, 96) + '%',
        nps: generateMetric(60, 75)
      }
    },
    market: {
      size: generateMarketSize(project),
      growth: generateMetric(15, 30) + '% CAGR',
      competitors: generateCompetitors(project),
      differentiation: generateDifferentiation(project)
    },
    funding: {
      stage: project.parsedData?.stage || 'Seed',
      amount: project.parsedData?.fundingNeeded || '$2M',
      use: 'Product development (45%), Sales & Marketing (35%), Team expansion (20%)',
      previousRound: generatePreviousRound(project)
    },
    aiMatching: {
      score: matchScore,
      reasoning: generateMatchReasoning(project, vc, matchScore)
    },
    highlights: project.parsedData?.highlights || [
      'Strong early traction and user engagement',
      'Experienced founding team with relevant exits',
      'Clear path to market leadership'
    ]
  };

  return report;
};

const calculateMatchScore = (project, vc) => {
  let score = 60; // Base score

  // Industry match
  if (project.parsedData?.industry &&
      vc.industries.some(ind => ind.toLowerCase().includes(project.parsedData.industry.toLowerCase()))) {
    score += 20;
  }

  // Stage match
  if (project.parsedData?.stage && vc.stage.includes(project.parsedData.stage)) {
    score += 15;
  }

  // Add some randomness
  score += Math.floor(Math.random() * 10);

  return Math.min(score, 98);
};

const generateTagline = (project) => {
  const desc = project.description.split('.')[0];
  return desc.substring(0, 80) + (desc.length > 80 ? '...' : '');
};

const generateKeyHires = (project) => {
  const keyHires = [
    'CTO from Stripe, Head of AI from Google',
    'VP Engineering from Shopify, Chief Product Officer from Uber',
    'Head of Data from Netflix, VP Sales from Salesforce',
    'Chief Architect from Amazon, Head of Growth from Airbnb'
  ];
  return keyHires[Math.floor(Math.random() * keyHires.length)];
};

const generateProblemStatement = (project) => {
  const industry = project.parsedData?.industry || 'the market';
  return `Businesses in ${industry} face significant challenges that current solutions fail to address effectively, leading to inefficiencies and missed opportunities.`;
};

const generateSolutionStatement = (project) => {
  return `${project.name} provides an innovative platform that solves this through advanced technology and user-centric design.`;
};

const generateFeatures = (project) => {
  return [
    'Advanced analytics and reporting',
    'Seamless integration with existing tools',
    'Real-time data processing',
    'Intuitive user interface',
    'Enterprise-grade security'
  ];
};

const generateMetric = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateMarketSize = (project) => {
  const sizes = ['$5B', '$8B', '$10B', '$15B', '$20B'];
  return sizes[Math.floor(Math.random() * sizes.length)] + ' TAM';
};

const generateCompetitors = (project) => {
  const competitors = [
    'Established incumbents with legacy technology',
    'Several early-stage startups with limited traction',
    'Traditional players slow to innovate'
  ];
  return competitors[Math.floor(Math.random() * competitors.length)];
};

const generateDifferentiation = (project) => {
  return `${project.name} is the only solution combining advanced AI capabilities with seamless user experience, giving us a significant competitive advantage.`;
};

const generatePreviousRound = (project) => {
  const stage = project.parsedData?.stage;
  if (stage === 'Series A') {
    return '$1.2M Seed led by Y Combinator';
  } else if (stage === 'Series B') {
    return '$8M Series A led by Sequoia Capital';
  } else {
    return 'Bootstrapped with $500K from founders and angels';
  }
};

const generateMatchReasoning = (project, vc, score) => {
  const industry = project.parsedData?.industry || 'this space';
  const stage = project.parsedData?.stage || 'this stage';

  if (score >= 85) {
    return `Exceptional alignment with your investment thesis. ${project.name} operates in ${industry} (your key focus area), is at ${stage} (your sweet spot), and demonstrates the kind of category-defining potential you look for. The founding team's background and early traction metrics strongly align with ${vc.firm}'s portfolio criteria.`;
  } else if (score >= 70) {
    return `Strong fit with your ${vc.focusAreas[0]} focus. The company's approach to ${industry} and stage ${stage} aligns well with ${vc.firm}'s investment strategy. Several key metrics and team qualities match your typical investment profile.`;
  } else {
    return `Good potential fit based on your interest in ${vc.focusAreas[0]} and investment in companies like ${vc.portfolio[0]}. While not a perfect match on all criteria, ${project.name} has compelling elements that may be of interest.`;
  }
};

// Simulate AI processing delay for report generation
export const generateReportAsync = async (project, vc) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateFounderReport(project, vc));
    }, 2000);
  });
};
