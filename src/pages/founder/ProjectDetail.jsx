import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Mail, Users, Calendar, Sparkles, MessageCircle } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import MessageComposer from '../../components/founder/MessageComposer';
import ActivityFeed from '../../components/founder/ActivityFeed';
import ProjectImprovementsModal from '../../components/founder/ProjectImprovementsModal';
import VCResponseCard from '../../components/founder/VCResponseCard';
import { useApp } from '../../context/AppContext';
import { mockVCs } from '../../data/mockVCs';
import { generateFounderReport } from '../../utils/aiReportGenerator';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, messages, sendMessage, updateProject, vcReplies, meetings } = useApp();
  const [activeTab, setActiveTab] = useState('vcs');
  const [selectedVC, setSelectedVC] = useState(null);
  const [showImprovements, setShowImprovements] = useState(false);

  const project = projects.find(p => p.id === id);

  if (!project) {
    navigate('/founder/dashboard');
    return null;
  }

  const shortlistedVCs = mockVCs.filter(vc => project.shortlistedVCs.includes(vc.id));
  const projectMessages = messages.filter(m => m.projectId === project.id);

  // Get VC replies and meetings for this project's messages
  const projectMessageIds = projectMessages.map(m => m.id);
  const projectReplies = vcReplies.filter(r => projectMessageIds.includes(r.messageId));
  const projectMeetings = meetings.filter(m => projectMessageIds.includes(m.messageId));
  const totalResponses = projectReplies.length + projectMeetings.length;

  const handleSendMessage = async (vcId) => {
    setSelectedVC(vcId);
  };

  const handleMessageSent = (message) => {
    const vc = mockVCs.find(v => v.id === selectedVC);
    const report = generateFounderReport(project, vc);

    sendMessage(project.id, selectedVC, message, report);
    setSelectedVC(null);
  };

  const handleApplyImprovements = (improvements) => {
    updateProject(project.id, improvements);
    setShowImprovements(false);
  };

  const createdDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

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
            onClick={() => navigate('/founder/dashboard')}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {project.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.parsedData && (
                      <>
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full">
                          {project.parsedData.industry}
                        </span>
                        <span className="px-3 py-1 bg-accent-50 text-accent-700 text-sm font-medium rounded-full">
                          {project.parsedData.stage}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                          {project.parsedData.fundingNeeded}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-600">{project.description}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Users className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{shortlistedVCs.length}</p>
                    <p className="text-xs text-slate-500">Shortlisted VCs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent-100 rounded-lg">
                    <Mail className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{projectMessages.length}</p>
                    <p className="text-xs text-slate-500">Messages Sent</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{createdDate}</p>
                    <p className="text-xs text-slate-500">Created</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-slate-200">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('vcs')}
                    className={`pb-3 px-1 border-b-2 transition-colors ${
                      activeTab === 'vcs'
                        ? 'border-primary-500 text-primary-600 font-semibold'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Shortlisted VCs ({shortlistedVCs.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`pb-3 px-1 border-b-2 transition-colors ${
                      activeTab === 'messages'
                        ? 'border-primary-500 text-primary-600 font-semibold'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Messages Sent ({projectMessages.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('responses')}
                    className={`pb-3 px-1 border-b-2 transition-colors relative ${
                      activeTab === 'responses'
                        ? 'border-primary-500 text-primary-600 font-semibold'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>VC Responses ({totalResponses})</span>
                      {totalResponses > 0 && (
                        <span className="px-2 py-0.5 bg-accent-500 text-white text-xs font-bold rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'vcs' && (
                <motion.div
                  key="vcs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {shortlistedVCs.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-12 text-center">
                      <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        No VCs Shortlisted Yet
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Use our AI-powered search to find VCs that match your project
                      </p>
                      <button
                        onClick={() => navigate('/founder/search')}
                        className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold"
                      >
                        Find VCs
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {shortlistedVCs.map((vc, index) => {
                        const hasSentMessage = projectMessages.some(m => m.vcId === vc.id);

                        return (
                          <motion.div
                            key={vc.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
                          >
                            <div className="flex items-start space-x-4 mb-4">
                              <img
                                src={vc.avatar}
                                alt={vc.name}
                                className="w-16 h-16 rounded-full"
                              />
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900">{vc.name}</h3>
                                <p className="text-sm text-slate-600">{vc.role} at {vc.firm}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {vc.focusAreas.slice(0, 3).map((area, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSendMessage(vc.id)}
                              disabled={hasSentMessage}
                              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                                hasSentMessage
                                  ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg'
                              }`}
                            >
                              {hasSentMessage ? (
                                <>
                                  <Mail className="h-4 w-4" />
                                  <span>Message Sent</span>
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4" />
                                  <span>Send Message</span>
                                </>
                              )}
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {projectMessages.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-12 text-center">
                      <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        No Messages Sent Yet
                      </h3>
                      <p className="text-slate-600">
                        Send your first message to a shortlisted VC
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projectMessages.map((msg, index) => {
                        const vc = mockVCs.find(v => v.id === msg.vcId);
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={vc.avatar}
                                  alt={vc.name}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div>
                                  <p className="font-semibold text-slate-900">{vc.name}</p>
                                  <p className="text-sm text-slate-600">{vc.firm}</p>
                                </div>
                              </div>
                              <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
                                Sent
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{msg.message.substring(0, 200)}...</p>
                            <p className="text-xs text-slate-500">
                              {new Date(msg.sentAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'responses' && (
                <motion.div
                  key="responses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {totalResponses === 0 ? (
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-12 text-center">
                      <MessageCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        No VC Responses Yet
                      </h3>
                      <p className="text-slate-600">
                        When VCs reply to your messages or schedule meetings, they'll appear here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Display Replies */}
                      {projectReplies.map((reply, index) => {
                        const message = projectMessages.find(m => m.id === reply.messageId);
                        const vc = mockVCs.find(v => v.id === reply.vcId);
                        return (
                          <VCResponseCard
                            key={reply.id}
                            response={reply}
                            type="reply"
                            vc={vc}
                          />
                        );
                      })}

                      {/* Display Meetings */}
                      {projectMeetings.map((meeting, index) => {
                        const message = projectMessages.find(m => m.id === meeting.messageId);
                        const vc = mockVCs.find(v => v.id === meeting.vcId);
                        return (
                          <VCResponseCard
                            key={meeting.id}
                            response={meeting}
                            type="meeting"
                            vc={vc}
                          />
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Activity Feed - Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary-600" />
                <h2 className="text-lg font-bold text-slate-900">AI Activity</h2>
              </div>
              <ActivityFeed
                project={project}
                onImprovementClick={() => setShowImprovements(true)}
                vcReplies={vcReplies}
                meetings={meetings}
                messages={messages}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Improvements Modal */}
      <AnimatePresence>
        {showImprovements && (
          <ProjectImprovementsModal
            project={project}
            onClose={() => setShowImprovements(false)}
            onApply={handleApplyImprovements}
          />
        )}
      </AnimatePresence>

      {/* Message Composer Modal */}
      <AnimatePresence>
        {selectedVC && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVC(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Compose Message</h2>
                <button
                  onClick={() => setSelectedVC(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-slate-600" />
                </button>
              </div>
              <MessageComposer
                vc={mockVCs.find(v => v.id === selectedVC)}
                project={project}
                onSend={handleMessageSent}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
