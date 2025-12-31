import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

const ReplyModal = ({ message, onClose, onSend }) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!replyMessage.trim()) return;

    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSend(replyMessage);
  };

  const generateAIReply = () => {
    const templates = [
      `Hi ${message.report?.founder?.name || 'there'},

Thank you for reaching out about ${message.report?.company?.name || 'your company'}. I'm impressed by your traction and the problem you're solving.

I'd love to learn more about your vision and discuss how we might be able to support your journey.

Would you be available for a 30-minute call next week?

Best regards,
Sarah Chen
Partner, Sequoia Capital`,

      `Hello ${message.report?.founder?.name || 'there'},

Thanks for sharing your story. ${message.report?.company?.name || 'Your company'} aligns well with our investment thesis in ${message.report?.company?.industry || 'this space'}.

The metrics you've shared are compelling. I'd like to dive deeper into your go-to-market strategy and competitive positioning.

Are you available for a preliminary discussion?

Best,
Sarah Chen`,

      `Hi ${message.report?.founder?.name || 'there'},

I appreciate you thinking of Sequoia for ${message.report?.company?.name || 'your company'}.

Your approach to ${message.report?.product?.problem || 'the problem'} is interesting. I'd like to understand more about your unit economics and expansion plans.

Let's schedule some time to discuss further.

Regards,
Sarah Chen
Sequoia Capital`
    ];

    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    setReplyMessage(randomTemplate);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Reply to Founder</h2>
              <p className="text-sm text-slate-600 mt-1">
                Replying to {message.report?.founder?.name || 'Founder'} from {message.report?.company?.name || 'Company'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* AI Assistant */}
          <div className="mb-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 mb-1">AI Assistant</p>
                <p className="text-sm text-slate-600 mb-3">
                  Let AI draft a professional reply based on the founder's message
                </p>
                <button
                  onClick={generateAIReply}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Generate AI Reply
                </button>
              </div>
            </div>
          </div>

          {/* Message Composer */}
          <div>
            <label className="block mb-2">
              <span className="text-sm font-semibold text-slate-700">Your Message</span>
            </label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Write your reply to the founder..."
              rows={12}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              {replyMessage.length} characters
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              disabled={!replyMessage.trim() || sending}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {sending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Reply</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReplyModal;
