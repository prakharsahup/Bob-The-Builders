import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import VCProfileCard from '../../components/founder/VCProfileCard';
import { useApp } from '../../context/AppContext';

const SearchResults = () => {
  const navigate = useNavigate();
  const { currentSearch, addShortlistedVCs, projects } = useApp();
  const [shortlisted, setShortlisted] = useState([]);
  const [saved, setSaved] = useState(false);

  if (!currentSearch || !currentSearch.results) {
    navigate('/founder/search');
    return null;
  }

  const project = projects.find(p => p.id === currentSearch.projectId);
  const results = currentSearch.results;

  const handleShortlist = (vc) => {
    setShortlisted(prev => {
      const isAlreadyShortlisted = prev.some(v => v.id === vc.id);
      if (isAlreadyShortlisted) {
        return prev.filter(v => v.id !== vc.id);
      } else {
        return [...prev, vc];
      }
    });
  };

  const handleSaveToProject = () => {
    if (shortlisted.length > 0) {
      addShortlistedVCs(
        currentSearch.projectId,
        shortlisted.map(vc => vc.id)
      );
      setSaved(true);
      setTimeout(() => {
        navigate(`/founder/project/${currentSearch.projectId}`);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar type="founder" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/founder/search')}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>New Search</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Matching Results
              </h1>
              <p className="text-slate-600">
                Found {results.length} VCs for <span className="font-semibold text-primary-600">{project?.name}</span>
              </p>
            </div>

            {/* Shortlist counter */}
            {shortlisted.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-3"
              >
                <div className="text-right">
                  <p className="text-sm text-slate-600">Selected</p>
                  <p className="text-2xl font-bold text-primary-600">{shortlisted.length}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveToProject}
                  disabled={saved}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  {saved ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Add to Project</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* AI Insight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200"
        >
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 mb-1">AI Matching Complete</p>
              <p className="text-sm text-slate-600">
                These VCs have been ranked based on alignment with your project's industry ({project?.parsedData?.industry}),
                stage ({project?.parsedData?.stage}), and your specific requirements.
                Select the ones you'd like to reach out to.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {results.map((vc, index) => (
            <motion.div
              key={vc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <VCProfileCard
                vc={vc}
                onShortlist={handleShortlist}
                isShortlisted={shortlisted.some(v => v.id === vc.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom action bar (sticky) */}
        {shortlisted.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 shadow-2xl p-4 z-50"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Shortlisted VCs</p>
                <p className="text-lg font-bold text-slate-900">
                  {shortlisted.length} {shortlisted.length === 1 ? 'VC' : 'VCs'} selected
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveToProject}
                disabled={saved}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center space-x-2"
              >
                {saved ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Saved to Project!</span>
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Add to Project</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
