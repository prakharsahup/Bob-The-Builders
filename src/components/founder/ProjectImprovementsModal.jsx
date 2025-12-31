import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Wand2 } from 'lucide-react';

const ProjectImprovementsModal = ({ project, onClose, onApply }) => {
  const [selectedImprovements, setSelectedImprovements] = useState([]);
  const [applying, setApplying] = useState(false);

  const improvements = [
    {
      id: 'description',
      title: 'Enhance Description Clarity',
      description: 'Make your value proposition more compelling and concise',
      impact: '+8% match score',
      preview: 'AI will refine your description to emphasize unique value and market opportunity'
    },
    {
      id: 'metrics',
      title: 'Add Specific Metrics',
      description: 'Include quantifiable traction and growth numbers',
      impact: '+12% match score',
      preview: 'AI will add concrete metrics like user growth, revenue milestones, and engagement rates'
    },
    {
      id: 'competitive',
      title: 'Strengthen Competitive Edge',
      description: 'Highlight what makes you uniquely positioned to win',
      impact: '+7% match score',
      preview: 'AI will emphasize your competitive moat and defensible advantages'
    },
    {
      id: 'team',
      title: 'Showcase Team Expertise',
      description: 'Emphasize founder backgrounds and key hires',
      impact: '+5% match score',
      preview: 'AI will highlight relevant experience and domain expertise of your team'
    },
    {
      id: 'vision',
      title: 'Clarify Long-term Vision',
      description: 'Paint a clearer picture of your 5-year trajectory',
      impact: '+6% match score',
      preview: 'AI will articulate your expansion strategy and market domination plan'
    }
  ];

  const handleToggle = (improvementId) => {
    setSelectedImprovements(prev =>
      prev.includes(improvementId)
        ? prev.filter(id => id !== improvementId)
        : [...prev, improvementId]
    );
  };

  const handleApply = async () => {
    if (selectedImprovements.length === 0) return;

    setApplying(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Generate improved project data
    const improvements = generateImprovements(project, selectedImprovements);

    onApply(improvements);
  };

  const generateImprovements = (project, selectedIds) => {
    let updatedDescription = project.description;
    let updatedData = { ...project.parsedData };

    if (selectedIds.includes('description')) {
      updatedDescription = enhanceDescription(project.description, project.parsedData);
    }

    if (selectedIds.includes('metrics')) {
      updatedData = {
        ...updatedData,
        revenue: updatedData.revenue || '$500K ARR',
        growth: updatedData.growth || '40% MoM',
        customers: updatedData.customers || 150,
        retention: '94%',
        nps: 72
      };
    }

    if (selectedIds.includes('competitive')) {
      updatedData = {
        ...updatedData,
        highlights: [
          ...(updatedData.highlights || []),
          'Proprietary AI technology with 3 patents pending',
          'Exclusive partnerships with industry leaders'
        ].slice(0, 5)
      };
    }

    if (selectedIds.includes('team')) {
      updatedData = {
        ...updatedData,
        teamSize: (updatedData.teamSize || 10) + 2,
        highlights: [
          ...(updatedData.highlights || []),
          'Founding team from Google, Stripe, and Stanford'
        ].slice(0, 5)
      };
    }

    if (selectedIds.includes('vision')) {
      if (!updatedDescription.includes('vision')) {
        updatedDescription += `\n\nOur vision: Become the leading platform in ${updatedData.industry}, expanding from ${updatedData.location} to global markets within 3 years.`;
      }
    }

    return {
      description: updatedDescription,
      parsedData: updatedData
    };
  };

  const enhanceDescription = (desc, data) => {
    const enhancements = [
      `${desc.split('.')[0]}. With ${data?.customers || 100}+ customers and ${data?.growth || '30% MoM'} growth, we're proving strong product-market fit.`,
      `Unlike competitors, we leverage cutting-edge AI to deliver 10x better results at half the cost.`,
      `Our experienced team combines deep ${data?.industry} expertise with proven technical execution.`
    ];
    return enhancements.join(' ');
  };

  const totalImpact = selectedImprovements.reduce((sum, id) => {
    const improvement = improvements.find(i => i.id === id);
    return sum + parseInt(improvement?.impact || '0');
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg">
                <Wand2 className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">AI Project Improvements</h2>
                <p className="text-sm text-slate-600">Select improvements to apply</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* Impact Summary */}
          {selectedImprovements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-primary-600" />
                  <span className="text-sm font-medium text-slate-900">
                    {selectedImprovements.length} improvement{selectedImprovements.length > 1 ? 's' : ''} selected
                  </span>
                </div>
                <span className="text-sm font-bold text-primary-600">
                  Expected impact: +{totalImpact}% match score
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Improvements List */}
        <div className="p-6 space-y-4">
          {improvements.map((improvement, index) => {
            const isSelected = selectedImprovements.includes(improvement.id);

            return (
              <motion.div
                key={improvement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <label
                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50/50'
                      : 'border-slate-200 hover:border-primary-300 bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle(improvement.id)}
                      className="mt-1 h-5 w-5 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-slate-900">
                          {improvement.title}
                        </h3>
                        <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
                          {improvement.impact}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        {improvement.description}
                      </p>
                      <div className="p-2 bg-slate-50 rounded text-xs text-slate-500 italic">
                        {improvement.preview}
                      </div>
                    </div>
                  </div>
                </label>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApply}
              disabled={selectedImprovements.length === 0 || applying}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {applying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                  <span>Applying Changes...</span>
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  <span>Apply Improvements</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectImprovementsModal;
