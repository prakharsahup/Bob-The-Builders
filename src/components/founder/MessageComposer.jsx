import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Send, Check } from 'lucide-react';
import { generateMessage, refineMessage } from '../../utils/aiMessageGenerator';

const MessageComposer = ({ vc, project, onSend }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [sent, setSent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Generate initial message
  useState(() => {
    const initialMessage = generateMessage(vc, project);
    setMessage(initialMessage);
  }, []);

  const handleGenerate = async () => {
    setRefining(true);
    const newMessage = await refineMessage(message, vc, project);
    setMessage(newMessage);
    setRefining(false);
    setIsEditing(false);
  };

  const handleSend = () => {
    setLoading(true);

    setTimeout(() => {
      setSent(true);
      setLoading(false);

      if (onSend) {
        onSend(message);
      }
    }, 1500);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-block p-4 bg-accent-500 rounded-full mb-4"
        >
          <Check className="h-8 w-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-600">
          Your message has been sent to {vc.name} at {vc.firm}.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* AI indicator */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-medium text-slate-900">
            AI-Generated Personalized Message
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          disabled={refining}
          className="flex items-center space-x-1 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refining ? 'animate-spin' : ''}`} />
          <span>{refining ? 'Regenerating...' : 'Regenerate'}</span>
        </motion.button>
      </div>

      {/* VC info */}
      <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-slate-200">
        <img
          src={vc.avatar}
          alt={vc.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-slate-900">{vc.name}</p>
          <p className="text-sm text-slate-600">{vc.role} at {vc.firm}</p>
        </div>
      </div>

      {/* Message editor */}
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setIsEditing(true);
          }}
          className="w-full h-64 p-4 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none font-mono text-sm"
          placeholder="Your message will appear here..."
        />
        {isEditing && (
          <span className="absolute top-2 right-2 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
            Edited
          </span>
        )}
      </div>

      {/* Character count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          {message.length} characters
        </span>
        <div className="flex items-center space-x-1">
          {message.length > 0 && message.length < 200 && (
            <span className="text-amber-600">Message might be too short</span>
          )}
          {message.length >= 200 && message.length <= 500 && (
            <span className="text-accent-600">✓ Optimal length</span>
          )}
          {message.length > 500 && (
            <span className="text-amber-600">Consider shortening</span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Send className="h-5 w-5" />
              </motion.div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </div>

      {/* AI tips */}
      <div className="p-4 bg-slate-50 rounded-lg">
        <p className="text-xs font-semibold text-slate-700 mb-2">AI Tips:</p>
        <ul className="space-y-1 text-xs text-slate-600">
          <li>✓ Personalizes based on VC's focus areas and portfolio</li>
          <li>✓ Highlights your key metrics and traction</li>
          <li>✓ Optimized for response rate (85%+ open rate)</li>
          <li>✓ Feel free to edit and add your personal touch</li>
        </ul>
      </div>
    </div>
  );
};

export default MessageComposer;
