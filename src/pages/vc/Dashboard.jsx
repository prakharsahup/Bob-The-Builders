import { motion } from 'framer-motion';
import { Inbox, Sparkles, User } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import MessageCard from '../../components/vc/MessageCard';
import { useApp } from '../../context/AppContext';
import { mockMessages } from '../../data/mockMessages';
import { mockProjects } from '../../data/mockProjects';
import { mockVCs } from '../../data/mockVCs';

const Dashboard = () => {
  const { messages: contextMessages } = useApp();

  // Currently logged in as Sarah Chen (vc1) - first VC in the list
  const currentVC = mockVCs[0]; // Sarah Chen from Sequoia Capital

  // Filter messages for this specific VC only
  const vcMessages = contextMessages.filter(m => m.vcId === currentVC.id);

  // Combine with mock messages for this VC (if any)
  const mockVCMessages = mockMessages.filter(m => m.vcId === currentVC.id);
  const allMessages = [...mockVCMessages, ...vcMessages];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar type="vc" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VC Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-white rounded-xl shadow-md border border-slate-200"
        >
          <div className="flex items-center space-x-4">
            <img
              src={currentVC.avatar}
              alt={currentVC.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold text-slate-900">{currentVC.name}</h2>
              <p className="text-sm text-slate-600">{currentVC.role} at {currentVC.firm}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {currentVC.focusAreas.slice(0, 3).map((area, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Your Inbox
          </h1>
          <p className="text-slate-600">
            AI-matched founders reaching out to you
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Inbox className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{allMessages.length}</p>
                <p className="text-sm text-slate-600">Total Messages</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-accent-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {allMessages.filter(m => m.report?.aiMatching?.score >= 80).length}
                </p>
                <p className="text-sm text-slate-600">High Match (80%+)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-slate-100 rounded-lg">
                <Inbox className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {allMessages.filter(m => !m.read).length}
                </p>
                <p className="text-sm text-slate-600">Unread</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Insight */}
        {allMessages.some(m => m.report?.aiMatching?.score >= 85) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl border border-accent-200"
          >
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-accent-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">AI Recommendation</p>
                <p className="text-sm text-slate-600">
                  You have {allMessages.filter(m => m.report?.aiMatching?.score >= 85).length} high-quality matches
                  that align exceptionally well with your investment thesis. These founders may be worth prioritizing.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Messages list */}
        {allMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-md border border-slate-200 p-12 text-center"
          >
            <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
              <Inbox className="h-16 w-16 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No Messages Yet
            </h2>
            <p className="text-slate-600">
              Matched founders will appear here when they reach out
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {allMessages
              .sort((a, b) => {
                // Sort by unread first, then by match score
                if (!a.read && b.read) return -1;
                if (a.read && !b.read) return 1;
                const scoreA = a.report?.aiMatching?.score || 0;
                const scoreB = b.report?.aiMatching?.score || 0;
                return scoreB - scoreA;
              })
              .map((message, index) => {
                // Find the project for this message
                const project = mockProjects.find(p => p.id === message.projectId);

                // Create founder object from report
                const founder = message.report?.founder
                  ? { name: message.report.founder.name }
                  : { name: 'Anonymous Founder' };

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MessageCard
                      message={message}
                      project={project}
                      founder={founder}
                    />
                  </motion.div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
