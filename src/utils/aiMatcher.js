import { mockVCs } from '../data/mockVCs';

// Mock AI matching algorithm that scores VCs based on project criteria
export const matchVCs = (projectData, searchDescription) => {
  const { industry, stage, fundingNeeded } = projectData.parsedData || {};

  // Simulate AI processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const matches = mockVCs.map((vc) => {
        let score = 0;
        let reasons = [];

        // Match industry
        if (industry && vc.industries.some(ind =>
          ind.toLowerCase().includes(industry.toLowerCase()) ||
          industry.toLowerCase().includes(ind.toLowerCase())
        )) {
          score += 35;
          reasons.push(`Strong industry alignment in ${industry}`);
        }

        // Match stage
        if (stage && vc.stage.includes(stage)) {
          score += 30;
          reasons.push(`Actively investing in ${stage} companies`);
        }

        // Match focus areas based on search description
        if (searchDescription) {
          const descLower = searchDescription.toLowerCase();
          vc.focusAreas.forEach(area => {
            if (descLower.includes(area.toLowerCase())) {
              score += 15;
              if (!reasons.some(r => r.includes('focus area'))) {
                reasons.push(`Focus area match: ${area}`);
              }
            }
          });
        }

        // Additional scoring based on check size compatibility
        if (fundingNeeded) {
          const amount = parseInt(fundingNeeded.replace(/[^0-9]/g, ''));
          const [min, max] = vc.checkSize.replace(/[^0-9-]/g, '').split('-').map(Number);
          if (amount >= min && amount <= max) {
            score += 20;
            reasons.push('Check size aligns with funding needs');
          }
        }

        // Random bonus for variety (simulating other AI factors)
        const randomBonus = Math.floor(Math.random() * 15);
        score += randomBonus;

        // Ensure some variation in scores
        score = Math.min(score, 98);

        return {
          ...vc,
          matchScore: score,
          matchReasons: reasons.length > 0 ? reasons : ['Potential fit based on investment thesis'],
          aiInsight: generateInsight(vc, score, reasons)
        };
      });

      // Sort by match score
      const sortedMatches = matches
        .sort((a, b) => b.matchScore - a.matchScore)
        .filter(m => m.matchScore > 20); // Only show reasonable matches

      resolve(sortedMatches);
    }, 2500); // Simulate AI processing time
  });
};

const generateInsight = (vc, score, reasons) => {
  if (score >= 80) {
    return `Excellent match! ${vc.name} at ${vc.firm} has a strong track record in this space and actively seeks companies at this stage.`;
  } else if (score >= 60) {
    return `Good fit. ${vc.name}'s investment focus and portfolio suggest strong alignment with your company profile.`;
  } else if (score >= 40) {
    return `Moderate fit. While not a perfect match, ${vc.name} has shown interest in adjacent areas and could be worth exploring.`;
  } else {
    return `${vc.name} invests in related sectors and may be interested depending on specific differentiators.`;
  }
};

// Extract keywords for AI analysis visualization
export const extractKeywords = (text) => {
  const keywords = [
    'AI', 'ML', 'SaaS', 'marketplace', 'platform', 'fintech', 'healthtech',
    'climate', 'enterprise', 'consumer', 'B2B', 'B2C', 'data', 'analytics',
    'mobile', 'web3', 'crypto', 'blockchain', 'automation', 'robotics'
  ];

  return keywords.filter(keyword =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );
};
