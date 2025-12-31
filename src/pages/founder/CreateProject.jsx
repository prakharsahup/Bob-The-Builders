import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import DocumentUpload from '../../components/founder/DocumentUpload';
import { useApp } from '../../context/AppContext';

const CreateProject = () => {
  const navigate = useNavigate();
  const { addProject } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: 'B2B SaaS',
    stage: 'Series A',
    fundingNeeded: '$5M',
    parsedData: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create parsedData from manual inputs if not already set by document upload
    const projectData = {
      ...formData,
      parsedData: formData.parsedData || {
        industry: formData.industry,
        stage: formData.stage,
        fundingNeeded: formData.fundingNeeded,
        teamSize: 10,
        founded: '2024',
        location: 'San Francisco, CA',
        revenue: '$100K ARR',
        growth: '30% MoM',
        customers: 50
      }
    };

    const newProject = addProject(projectData);
    navigate('/founder/dashboard');
  };

  const handleParseComplete = (parsedData) => {
    setFormData({ ...formData, parsedData });
  };

  const canSubmit = formData.name && formData.description && formData.industry && formData.stage && formData.fundingNeeded;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar type="founder" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/founder/dashboard')}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Create New Project
          </h1>
          <p className="text-slate-600">
            Tell us about your project and let our AI help you find the right VCs
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Project Name */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-slate-700">Project Name</span>
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., FinFlow AI"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Project Description */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <label className="block mb-2">
              <span className="text-sm font-semibold text-slate-700">Project Description</span>
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what your company does, the problem you're solving, and your unique value proposition..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
              required
            />
            <p className="text-xs text-slate-500 mt-2">
              {formData.description.length} characters
            </p>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-slate-700">Industry</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="B2B SaaS">B2B SaaS</option>
                  <option value="FinTech">FinTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="Climate Tech">Climate Tech</option>
                  <option value="EdTech">EdTech</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="DevTools">DevTools</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Consumer Tech">Consumer Tech</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-slate-700">Stage</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="Pre-Seed">Pre-Seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="Series C">Series C</option>
                  <option value="Growth">Growth</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-slate-700">Funding Needed</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.fundingNeeded}
                  onChange={(e) => setFormData({ ...formData, fundingNeeded: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="$500K">$500K</option>
                  <option value="$1M">$1M</option>
                  <option value="$2M">$2M</option>
                  <option value="$3M">$3M</option>
                  <option value="$5M">$5M</option>
                  <option value="$8M">$8M</option>
                  <option value="$10M">$10M</option>
                  <option value="$15M">$15M</option>
                  <option value="$20M">$20M</option>
                  <option value="$30M+">$30M+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Upload Documents (Optional)
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Upload pitch decks, financial projections, or other documents. Our AI will extract key insights.
            </p>
            <DocumentUpload onParseComplete={handleParseComplete} />
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!canSubmit}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Create Project</span>
            </motion.button>
            <button
              type="button"
              onClick={() => navigate('/founder/dashboard')}
              className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateProject;
