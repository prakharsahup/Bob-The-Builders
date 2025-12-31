import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Send, CheckCircle } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import FounderReport from '../../components/vc/FounderReport';
import ReplyModal from '../../components/vc/ReplyModal';
import ScheduleMeetingModal from '../../components/vc/ScheduleMeetingModal';
import { mockMessages } from '../../data/mockMessages';
import { mockVCs } from '../../data/mockVCs';
import { useApp } from '../../context/AppContext';

const MessageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { messages: contextMessages, sendVCReply, scheduleMeeting } = useApp();
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Currently logged in as Sarah Chen (vc1) - first VC in the list
  const currentVC = mockVCs[0]; // Sarah Chen from Sequoia Capital

  // Filter messages for this specific VC only
  const vcMessages = contextMessages.filter(m => m.vcId === currentVC.id);
  const mockVCMessages = mockMessages.filter(m => m.vcId === currentVC.id);
  const allMessages = [...mockVCMessages, ...vcMessages];

  const message = allMessages.find(m => m.id === id);

  if (!message) {
    navigate('/vc/dashboard');
    return null;
  }

  const sentDate = new Date(message.sentAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  const handleSendReply = (replyText) => {
    sendVCReply(message.id, currentVC.id, replyText);
    setShowReplyModal(false);
    setActionSuccess('reply');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleScheduleMeeting = (meetingData) => {
    scheduleMeeting(message.id, currentVC.id, meetingData);
    setShowMeetingModal(false);
    setActionSuccess('meeting');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar type="vc" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/vc/dashboard')}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Inbox</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                {message.report?.company?.name || 'Investment Opportunity'}
              </h1>
              <p className="text-slate-600">
                From {message.report?.founder?.name || 'Founder'} • {sentDate}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReplyModal(true)}
              disabled={message.replied}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all ${
                message.replied
                  ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
              }`}
            >
              {message.replied ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Replied</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Reply</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Report */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FounderReport report={message.report} />
            </motion.div>
          </div>

          {/* Sidebar - Message */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Founder Message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">Message from Founder</h3>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {message.message}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Received</p>
                  <p className="text-sm font-medium text-slate-900">{sentDate}</p>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowMeetingModal(true)}
                    disabled={message.hasMeeting}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                      message.hasMeeting
                        ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                    }`}
                  >
                    {message.hasMeeting ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Meeting Scheduled</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Schedule Meeting</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 px-4 border-2 border-primary-500 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-all"
                  >
                    Pass for Now
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 px-4 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  >
                    Archive
                  </motion.button>
                </div>
              </motion.div>

              {/* Notes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">Private Notes</h3>
                <textarea
                  placeholder="Add your thoughts about this opportunity..."
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none resize-none text-sm"
                />
                <button className="mt-2 text-sm text-primary-600 font-medium hover:text-primary-700">
                  Save Note
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Success Notification */}
        <AnimatePresence>
          {actionSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-white rounded-xl shadow-2xl border-2 border-accent-500 p-6 max-w-md z-50"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {actionSuccess === 'reply' ? 'Reply Sent!' : 'Meeting Scheduled!'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {actionSuccess === 'reply'
                      ? 'Your reply has been sent to the founder. They will be notified.'
                      : 'Meeting has been scheduled. Calendar invite will be sent to the founder.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        <AnimatePresence>
          {showReplyModal && (
            <ReplyModal
              message={message}
              onClose={() => setShowReplyModal(false)}
              onSend={handleSendReply}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMeetingModal && (
            <ScheduleMeetingModal
              message={message}
              onClose={() => setShowMeetingModal(false)}
              onSchedule={handleScheduleMeeting}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageDetail;
