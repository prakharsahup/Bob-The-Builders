import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', type = 'default' }) => {
  if (type === 'ai') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="relative"
        >
          <Sparkles className="h-12 w-12 text-primary-500" />
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Sparkles className="h-12 w-12 text-accent-400" />
          </motion.div>
        </motion.div>
        <motion.p
          className="mt-4 text-slate-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className="h-8 w-8 text-primary-500" />
      </motion.div>
      <p className="mt-3 text-slate-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
