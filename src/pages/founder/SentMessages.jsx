import { motion } from 'framer-motion';
import { Mail, Inbox } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import { useApp } from '../../context/AppContext';
import { mockVCs } from '../../data/mockVCs';

const SentMessages = () => {
  const { messages, projects } = useApp();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar type="founder" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Sent Messages
          </h1>
          <p className="text-slate-600">
            Track all your outreach across projects
          </p>
        </motion.div>

        {/* Messages list */}
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-md border border-slate-200 p-12 text-center"
          >
            <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
              <Inbox className="h-16 w-16 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No Messages Sent Yet
            </h2>
            <p className="text-slate-600">
              Your sent messages will appear here once you start reaching out to VCs
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => {
              const vc = mockVCs.find(v => v.id === message.vcId);
              const project = projects.find(p => p.id === message.projectId);
              const sentDate = new Date(message.sentAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              });

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    {/* VC Avatar */}
                    <img
                      src={vc?.avatar}
                      alt={vc?.name}
                      className="w-14 h-14 rounded-full flex-shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {vc?.name}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {vc?.role} at {vc?.firm}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full flex-shrink-0">
                          Sent
                        </span>
                      </div>

                      {/* Project info */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm text-slate-500">For project:</span>
                        <span className="px-2 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded">
                          {project?.name}
                        </span>
                      </div>

                      {/* Message preview */}
                      <div className="bg-slate-50 rounded-lg p-4 mb-3">
                        <p className="text-sm text-slate-700 line-clamp-3">
                          {message.message}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <Mail className="h-3.5 w-3.5" />
                          <span>{sentDate}</span>
                        </div>

                        {message.report?.aiMatching && (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-slate-500">Match Score:</span>
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded">
                              {message.report.aiMatching.score}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SentMessages;
