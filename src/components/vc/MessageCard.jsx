import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Clock, Sparkles } from 'lucide-react';

const MessageCard = ({ message, project, founder }) => {
  const sentDate = new Date(message.sentAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  const preview = message.message.split('\n').slice(0, 2).join(' ').substring(0, 150) + '...';
  const matchScore = message.report?.aiMatching?.score || 0;

  return (
    <Link to={`/vc/message/${message.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2, scale: 1.005 }}
        className={`group relative bg-white rounded-xl p-6 shadow-md border-2 transition-all ${
          message.read ? 'border-slate-200' : 'border-primary-300 bg-primary-50/30'
        }`}
      >
        {/* Unread indicator */}
        {!message.read && (
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-primary-500 rounded-full"
            />
          </div>
        )}

        <div className="flex items-start space-x-4">
          {/* Founder avatar with match score */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {founder?.name?.charAt(0) || 'F'}
            </div>
            {matchScore > 0 && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-2 py-0.5 shadow-md border border-slate-200">
                <span className="text-xs font-bold text-primary-600">{matchScore}%</span>
              </div>
            )}
          </div>

          {/* Message content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {founder?.name || 'New Founder'}
                  </h3>
                  {matchScore >= 80 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center space-x-1 px-2 py-0.5 bg-gradient-to-r from-accent-100 to-primary-100 text-accent-700 rounded-full"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span className="text-xs font-semibold">High Match</span>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <span className="font-medium">{project?.name || 'New Project'}</span>
                  {project?.parsedData && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">
                        {project.parsedData.industry}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">
                        {project.parsedData.stage}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>

            {/* Message preview */}
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
              {preview}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{sentDate}</span>
                </div>
                {message.report?.funding && (
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-primary-600">
                      {message.report.funding.amount}
                    </span>
                    <span>•</span>
                    <span>{message.report.funding.stage}</span>
                  </div>
                )}
              </div>

              {!message.read && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                  <Mail className="h-3 w-3" />
                  <span>New</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MessageCard;
