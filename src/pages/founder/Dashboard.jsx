import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Rocket } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import ProjectCard from '../../components/founder/ProjectCard';
import { useApp } from '../../context/AppContext';

const Dashboard = () => {
  const { projects } = useApp();

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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Your Projects
          </h1>
          <p className="text-slate-600">
            Manage your fundraising campaigns and connect with VCs
          </p>
        </motion.div>

        {/* Empty state or projects grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full mb-6"
            >
              <Rocket className="h-16 w-16 text-primary-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Start Your Fundraising Journey
            </h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Create your first project to connect with VCs who align with your vision.
              Our AI will help you find the perfect match.
            </p>
            <Link to="/founder/project/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="h-5 w-5" />
                <span>Create Your First Project</span>
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Create project button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Link to="/founder/project/new">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <Plus className="h-5 w-5" />
                  <span>New Project</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Projects grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
