import { motion } from 'framer-motion';
import {
  User, Building2, Target, TrendingUp, DollarSign,
  Users, MapPin, Calendar, Award, Sparkles, ExternalLink
} from 'lucide-react';

const FounderReport = ({ report }) => {
  const { founder, company, product, market, funding, aiMatching, highlights } = report;

  const ScoreRing = ({ score }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900">{score}</span>
          <span className="text-xs text-slate-500">Match</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* AI Match Score Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-medium opacity-90">AI-Powered Match Analysis</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">Investment Opportunity Report</h2>
            <p className="text-white/90 text-sm leading-relaxed">
              {aiMatching.reasoning}
            </p>
          </div>
          <ScoreRing score={aiMatching.score} />
        </div>
      </motion.div>

      {/* Founder Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-bold text-slate-900">Founder Profile</h3>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{founder.name}</p>
            <p className="text-slate-600">{founder.background}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <div>
              <p className="text-xs text-slate-500 mb-1">Experience</p>
              <p className="text-sm font-medium text-slate-900">{founder.experience}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Expertise</p>
              <p className="text-sm font-medium text-slate-900">{founder.expertise}</p>
            </div>
          </div>

          {founder.previousVentures && (
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Previous Ventures</p>
              <p className="text-sm font-medium text-primary-600">{founder.previousVentures}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Company Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Building2 className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-bold text-slate-900">Company Overview</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-1">{company.name}</h4>
            <p className="text-slate-600 italic">{company.tagline}</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <Calendar className="h-5 w-5 text-slate-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-slate-900">{company.founded}</p>
              <p className="text-xs text-slate-500">Founded</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <Users className="h-5 w-5 text-slate-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-slate-900">{company.teamSize}</p>
              <p className="text-xs text-slate-500">Team Size</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <MapPin className="h-5 w-5 text-slate-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-900">{company.location.split(',')[0]}</p>
              <p className="text-xs text-slate-500">Location</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <ExternalLink className="h-5 w-5 text-slate-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-primary-600 truncate">{company.website.replace('www.', '')}</p>
              <p className="text-xs text-slate-500">Website</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-slate-500 mb-1">Key Hires</p>
            <p className="text-sm font-medium text-slate-900">{company.keyHires}</p>
          </div>
        </div>
      </motion.div>

      {/* Product & Solution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Target className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-bold text-slate-900">Product & Solution</h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Problem</p>
            <p className="text-slate-600 text-sm leading-relaxed">{product.problem}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Solution</p>
            <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Key Features</p>
            <div className="grid grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                  <span className="text-primary-500 mt-0.5">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Traction Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl border border-accent-200 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-accent-600" />
          <h3 className="text-lg font-bold text-slate-900">Traction & Metrics</h3>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <DollarSign className="h-6 w-6 text-accent-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-slate-900">{product.traction.revenue}</p>
            <p className="text-xs text-slate-500">Revenue</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <TrendingUp className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-slate-900">{product.traction.growth}</p>
            <p className="text-xs text-slate-500">Growth</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Users className="h-6 w-6 text-accent-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-slate-900">{product.traction.customers}</p>
            <p className="text-xs text-slate-500">Customers</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Award className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-slate-900">{product.traction.retention}</p>
            <p className="text-xs text-slate-500">Retention</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <Award className="h-6 w-6 text-accent-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-slate-900">{product.traction.nps}</p>
            <p className="text-xs text-slate-500">NPS Score</p>
          </div>
        </div>
      </motion.div>

      {/* Market Opportunity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-bold text-slate-900">Market Opportunity</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-1">Market Size</p>
            <p className="text-2xl font-bold text-primary-600">{market.size}</p>
            <p className="text-sm text-slate-600 mt-1">Growing at {market.growth}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-1">Competitive Landscape</p>
            <p className="text-sm text-slate-600">{market.competitors}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm font-semibold text-slate-700 mb-1">Differentiation</p>
          <p className="text-sm text-slate-600">{market.differentiation}</p>
        </div>
      </motion.div>

      {/* Funding Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <DollarSign className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-bold text-slate-900">Funding Details</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Current Round</span>
            <span className="font-bold text-xl text-primary-600">{funding.stage}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Raising</span>
            <span className="font-bold text-xl text-accent-600">{funding.amount}</span>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <p className="text-sm text-slate-600 mb-2">Use of Funds</p>
            <p className="text-sm font-medium text-slate-900">{funding.use}</p>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <p className="text-sm text-slate-600 mb-1">Previous Round</p>
            <p className="text-sm font-medium text-slate-900">{funding.previousRound}</p>
          </div>
        </div>
      </motion.div>

      {/* Key Highlights */}
      {highlights && highlights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-200 p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Award className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-bold text-slate-900">Key Highlights</h3>
          </div>

          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-sm text-slate-700">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default FounderReport;
