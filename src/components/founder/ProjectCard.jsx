import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, Mail, Calendar } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const vcCount = project.shortlistedVCs?.length || 0;
  const messagesCount = project.sentMessages?.length || 0;
  const createdDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link to={`/founder/project/${project.id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="relative group"
      >
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-300" />

        <div className="relative bg-white rounded-xl p-6 shadow-md border border-slate-200">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                {project.name}
              </h3>
              {project.parsedData && (
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                    {project.parsedData.industry}
                  </span>
                  <span className="px-2 py-1 bg-accent-50 text-accent-700 text-xs font-medium rounded-full">
                    {project.parsedData.stage}
                  </span>
                </div>
              )}
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-primary-600 mb-1">
                <Users className="h-4 w-4" />
                <span className="font-bold text-lg">{vcCount}</span>
              </div>
              <p className="text-xs text-slate-500">Shortlisted VCs</p>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-accent-600 mb-1">
                <Mail className="h-4 w-4" />
                <span className="font-bold text-lg">{messagesCount}</span>
              </div>
              <p className="text-xs text-slate-500">Messages Sent</p>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-slate-600 mb-1">
                <Calendar className="h-4 w-4" />
              </div>
              <p className="text-xs text-slate-500">{createdDate}</p>
            </div>
          </div>

          {/* Footer */}
          {project.parsedData && (
            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
              <span className="text-slate-500">
                {project.parsedData.fundingNeeded} • {project.parsedData.location}
              </span>
              {project.parsedData.revenue && (
                <span className="text-primary-600 font-medium">
                  {project.parsedData.revenue}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
