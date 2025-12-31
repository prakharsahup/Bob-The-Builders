import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, Check, Sparkles, Loader2 } from 'lucide-react';

const DocumentUpload = ({ onParseComplete }) => {
  const [files, setFiles] = useState([]);
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const handleFileAdd = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles.map(f => ({
      name: f.name,
      size: f.size,
      status: 'ready'
    }))]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mockParseDocuments = async () => {
    setParsing(true);

    // Simulate file parsing
    for (let i = 0; i < files.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setFiles(prev => prev.map((f, idx) =>
        idx === i ? { ...f, status: 'parsing' } : f
      ));

      await new Promise(resolve => setTimeout(resolve, 1200));
      setFiles(prev => prev.map((f, idx) =>
        idx === i ? { ...f, status: 'complete' } : f
      ));
    }

    // Simulate AI extraction
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockData = {
      industry: 'FinTech',
      stage: 'Series A',
      fundingNeeded: '$5M',
      teamSize: 12,
      founded: '2023',
      location: 'San Francisco, CA',
      revenue: '$500K ARR',
      growth: '25% MoM',
      customers: 150,
      highlights: [
        'Partnered with 3 major accounting firms',
        'AI accuracy of 94% in cash flow predictions',
        'Featured in TechCrunch and Forbes'
      ]
    };

    setParsedData(mockData);
    setParsing(false);

    if (onParseComplete) {
      onParseComplete(mockData);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={handleFileAdd}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-700 font-medium mb-1">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-slate-500">
            PDF, DOC, DOCX, TXT up to 10MB
          </p>
        </label>
      </div>

      {/* File list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <File className="h-5 w-5 text-primary-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center space-x-2">
                  {file.status === 'ready' && (
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="p-1 hover:bg-slate-100 rounded"
                    >
                      <X className="h-4 w-4 text-slate-400" />
                    </button>
                  )}
                  {file.status === 'parsing' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 className="h-4 w-4 text-primary-500" />
                    </motion.div>
                  )}
                  {file.status === 'complete' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      <Check className="h-4 w-4 text-accent-500" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parse button */}
      {files.length > 0 && !parsedData && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={mockParseDocuments}
          disabled={parsing}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {parsing ? (
            <>
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span>AI Analyzing Documents...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span>Parse with AI</span>
            </>
          )}
        </motion.button>
      )}

      {/* Parsed data display */}
      <AnimatePresence>
        {parsedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900">AI-Extracted Insights</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Industry</p>
                <p className="font-semibold text-slate-900">{parsedData.industry}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Stage</p>
                <p className="font-semibold text-slate-900">{parsedData.stage}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Funding Needed</p>
                <p className="font-semibold text-slate-900">{parsedData.fundingNeeded}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Revenue</p>
                <p className="font-semibold text-slate-900">{parsedData.revenue}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Team Size</p>
                <p className="font-semibold text-slate-900">{parsedData.teamSize} people</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Growth Rate</p>
                <p className="font-semibold text-slate-900">{parsedData.growth}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-2">Key Highlights</p>
              <ul className="space-y-1.5">
                {parsedData.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2 text-sm text-slate-700"
                  >
                    <span className="text-primary-500 mt-0.5">•</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentUpload;
