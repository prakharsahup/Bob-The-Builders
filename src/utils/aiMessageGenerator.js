// Mock AI message generation with pre-written templates
export const generateMessage = (vc, project, founderName = 'Alex Morgan') => {
  const templates = [
    {
      id: 1,
      generate: (vc, project, founder) => `Hi ${vc.name},

I'm reaching out because ${project.name}'s mission aligns perfectly with ${vc.firm}'s focus on ${vc.focusAreas[0]}.

${generateTractionLine(project)}

I'd love to share how we're tackling this opportunity and why now is the perfect time. Would you be open to a brief conversation?

Best regards,
${founder}
CEO, ${project.name}`
    },
    {
      id: 2,
      generate: (vc, project, founder) => `Dear ${vc.name},

I noticed your recent investments in ${vc.portfolio[0]} and ${vc.portfolio[1]}, which makes me think ${project.name} would be a great fit for ${vc.firm}'s portfolio.

${project.description}

${generateTractionLine(project)}

I believe our approach to ${project.parsedData?.industry || 'this market'} could be transformative, and I'd appreciate the opportunity to discuss this with you.

Looking forward to connecting,
${founder}`
    },
    {
      id: 3,
      generate: (vc, project, founder) => `Hi ${vc.name},

Given your expertise in ${vc.focusAreas.join(', ')}, I wanted to introduce ${project.name}.

We're solving a major problem in ${project.parsedData?.industry || 'our industry'}: ${getShortDescription(project)}

${generateTractionLine(project)}

Your portfolio companies like ${vc.portfolio[0]} demonstrate the kind of category-defining businesses you support. I'd love to explore if ${project.name} could be a fit.

Best,
${founder}
Founder & CEO`
    },
    {
      id: 4,
      generate: (vc, project, founder) => `${vc.name},

Quick intro: I'm ${founder}, founder of ${project.name}.

${project.description}

What caught my attention about ${vc.firm}: Your thesis on ${vc.focusAreas[0]} and track record with ${vc.portfolio[0]}.

${generateTractionLine(project)}

Would you be interested in a 20-minute call to explore potential synergies?

Cheers,
${founder}`
    }
  ];

  // Randomly select a template
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.generate(vc, project, founderName);
};

const generateTractionLine = (project) => {
  const { revenue, growth, customers } = project.parsedData || {};

  if (revenue && growth && customers) {
    return `We're at ${revenue} with ${growth} growth and ${customers} customers, showing strong product-market fit.`;
  } else if (revenue && growth) {
    return `We're at ${revenue} growing at ${growth}, demonstrating strong market traction.`;
  } else if (customers) {
    return `We've onboarded ${customers} customers and are seeing excellent engagement metrics.`;
  } else {
    return `We're seeing strong early traction and validation from our target market.`;
  }
};

const getShortDescription = (project) => {
  // Extract first sentence or first 100 chars
  const desc = project.description;
  const firstSentence = desc.split('.')[0];
  return firstSentence.length > 100 ? desc.substring(0, 100) + '...' : firstSentence;
};

// Simulate AI refinement process
export const refineMessage = async (originalMessage, vc, project) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would call an AI API
      // For demo, just return a different template
      const founderName = originalMessage.split('\n').pop().split(',')[0] || 'Alex Morgan';
      const newMessage = generateMessage(vc, project, founderName);
      resolve(newMessage);
    }, 1500);
  });
};

// Simulate AI analyzing message effectiveness
export const analyzeMessage = (message) => {
  const analysis = {
    score: 85 + Math.floor(Math.random() * 10),
    strengths: [],
    suggestions: []
  };

  if (message.length > 200 && message.length < 500) {
    analysis.strengths.push('Optimal length for cold outreach');
  } else if (message.length >= 500) {
    analysis.suggestions.push('Consider shortening for better engagement');
  }

  if (message.includes('traction') || message.includes('growth') || /\d+%/.test(message)) {
    analysis.strengths.push('Includes compelling traction metrics');
  }

  if (/\$[\d.]+[KMB]/.test(message)) {
    analysis.strengths.push('Clear about funding needs');
  }

  const questions = (message.match(/\?/g) || []).length;
  if (questions === 1) {
    analysis.strengths.push('Clear call-to-action');
  } else if (questions > 1) {
    analysis.suggestions.push('Single clear ask performs better');
  }

  return analysis;
};
