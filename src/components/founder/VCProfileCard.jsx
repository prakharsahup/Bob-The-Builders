import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Building2, MapPin, DollarSign, TrendingUp, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const VCProfileCard = ({ vc, onShortlist, isShortlisted = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const matchScore = vc.matchScore || 0;
  const matchColor = matchScore >= 80 ? 'text-accent-600' : matchScore >= 60 ? 'text-primary-600' : 'text-slate-600';
  const ringColor = matchScore >= 80 ? 'stroke-accent-500' : matchScore >= 60 ? 'stroke-primary-500' : 'stroke-slate-400';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-white rounded-xl shadow-md border-2 transition-all ${
        isShortlisted ? 'border-primary-500 bg-primary-50/30' : 'border-slate-200 hover:border-primary-300'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar with match score ring */}
          <div className="relative flex-shrink-0">
            <img
              src={vc.avatar}
              alt={vc.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {/* Match score ring */}
            <svg className="absolute -inset-1 w-20 h-20" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                className={ringColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 36}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - matchScore / 100) }}
                transition={{ duration: 1, delay: 0.2 }}
                transform="rotate(-90 40 40)"
              />
            </svg>
            {/* Match score badge */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-2 py-0.5 shadow-md border border-slate-200">
              <span className={`text-xs font-bold ${matchColor}`}>{matchScore}%</span>
            </div>
          </div>

          {/* VC Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{vc.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">{vc.firm}</span>
                  <span className="text-slate-400">•</span>
                  <span>{vc.role}</span>
                </div>
              </div>
            </div>

            {/* Focus areas tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {vc.focusAreas.slice(0, 3).map((area, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="flex items-center space-x-1 text-xs text-slate-600">
                <TrendingUp className="h-3.5 w-3.5 text-accent-500" />
                <span>{vc.stage.join(', ')}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-600">
                <DollarSign className="h-3.5 w-3.5 text-primary-500" />
                <span>{vc.checkSize}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-600">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{vc.location.split(',')[0]}</span>
              </div>
            </div>

            {/* AI Insight */}
            {vc.aiInsight && (
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-3 mb-3">
                <div className="flex items-start space-x-2">
                  <Sparkles className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">{vc.aiInsight}</p>
                </div>
              </div>
            )}

            {/* Match reasons toggle */}
            {vc.matchReasons && vc.matchReasons.length > 0 && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <span>Why this match?</span>
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Expanded match details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Match Reasoning:</h4>
                <ul className="space-y-1.5">
                  {vc.matchReasons.map((reason, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-2 text-xs text-slate-600"
                    >
                      <span className="text-primary-500 mt-0.5">✓</span>
                      <span>{reason}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Portfolio */}
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-slate-900 mb-1.5">Portfolio:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {vc.portfolio.slice(0, 3).map((company, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shortlist button */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onShortlist(vc)}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all ${
              isShortlisted
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50'
            }`}
          >
            {isShortlisted ? '✓ Shortlisted' : 'Add to Shortlist'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VCProfileCard;
