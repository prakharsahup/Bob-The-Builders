import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, User, Target } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useApp } from '../../context/AppContext';
import { matchVCs } from '../../utils/aiMatcher';

const SearchVCs = () => {
  const navigate = useNavigate();
  const { projects, setCurrentSearch } = useApp();

  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '');
  const [searchDescription, setSearchDescription] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!selectedProject || !searchDescription.trim()) {
      return;
    }

    setSearching(true);

    const project = projects.find(p => p.id === selectedProject);

    // Call AI matcher
    const matches = await matchVCs(project, searchDescription);

    setCurrentSearch({
      projectId: selectedProject,
      description: searchDescription,
      results: matches
    });

    navigate('/founder/search/results');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar type="founder" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block p-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full mb-4"
          >
            <Search className="h-12 w-12 text-primary-600" />
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Find Your Perfect VCs
          </h1>
          <p className="text-lg text-slate-600">
            Our AI analyzes thousands of VCs to find the best matches for your project
          </p>
        </motion.div>

        {/* Search Form */}
        <AnimatePresence mode="wait">
          {searching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner
                type="ai"
                message="AI analyzing your project and matching with VCs..."
              />
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSearch}
              className="space-y-6"
            >
              {/* Project Selection */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-5 w-5 text-primary-600" />
                  <label className="text-lg font-bold text-slate-900">
                    Select Project
                  </label>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600 mb-4">
                      You need to create a project first before searching for VCs.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/founder/project/new')}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold"
                    >
                      <span>Create Project</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                    required
                  >
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name} - {project.parsedData?.industry || 'No industry'} | {project.parsedData?.stage || 'No stage'}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Search Description */}
              {projects.length > 0 && (
                <>
                  <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary-600" />
                      <label className="text-lg font-bold text-slate-900">
                        What are you looking for in a VC?
                      </label>
                    </div>

                    <textarea
                      value={searchDescription}
                      onChange={(e) => setSearchDescription(e.target.value)}
                      placeholder="Describe the ideal VC for your project. Include specifics like industry focus, stage expertise, geographic preference, value-add beyond capital, etc..."
                      rows={8}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                      required
                    />

                    <div className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg">
                      <p className="text-sm font-semibold text-slate-700 mb-2">
                        AI Search Tips:
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        <li>• Be specific about industry focus (e.g., "FinTech", "B2B SaaS")</li>
                        <li>• Mention preferred investment stage (e.g., "Seed", "Series A")</li>
                        <li>• Include geographic preferences if important</li>
                        <li>• Describe value-add you're seeking (e.g., "network in healthcare")</li>
                      </ul>
                    </div>
                  </div>

                  {/* Profile Card Preview */}
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-200 p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="h-5 w-5 text-primary-600" />
                      <h3 className="text-lg font-bold text-slate-900">Your AI Agent Profile</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Our AI creates a virtual profile representing you and your project, understanding every detail to find the perfect VC matches.
                    </p>
                    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                        AI
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Smart Matching Agent</p>
                        <p className="text-sm text-slate-600">Analyzing {projects.find(p => p.id === selectedProject)?.name || 'your project'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="h-6 w-6" />
                    <span>Find Matching VCs with AI</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchVCs;
