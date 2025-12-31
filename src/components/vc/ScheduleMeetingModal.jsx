import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Video, MapPin, Check } from 'lucide-react';

const ScheduleMeetingModal = ({ message, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '30',
    meetingType: 'video',
    location: 'Google Meet',
    notes: ''
  });
  const [scheduling, setScheduling] = useState(false);

  const handleSchedule = async () => {
    if (!formData.date || !formData.time) return;

    setScheduling(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSchedule(formData);
  };

  const canSchedule = formData.date && formData.time;

  // Generate suggested time slots
  const suggestTimeSlots = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return [
      { label: 'Tomorrow at 10:00 AM', date: tomorrow.toISOString().split('T')[0], time: '10:00' },
      { label: 'Tomorrow at 2:00 PM', date: tomorrow.toISOString().split('T')[0], time: '14:00' },
      { label: 'Next Week at 10:00 AM', date: nextWeek.toISOString().split('T')[0], time: '10:00' },
    ];
  };

  const applySuggestedSlot = (slot) => {
    setFormData({ ...formData, date: slot.date, time: slot.time });
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
              <h2 className="text-2xl font-bold text-slate-900">Schedule Meeting</h2>
              <p className="text-sm text-slate-600 mt-1">
                Meeting with {message.report?.founder?.name || 'Founder'} from {message.report?.company?.name || 'Company'}
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
        <div className="p-6 space-y-6">
          {/* Quick Suggestions */}
          <div>
            <label className="block mb-3">
              <span className="text-sm font-semibold text-slate-700">Quick Select</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {suggestTimeSlots().map((slot, index) => (
                <button
                  key={index}
                  onClick={() => applySuggestedSlot(slot)}
                  className="p-3 border-2 border-slate-200 rounded-lg text-left hover:border-primary-500 hover:bg-primary-50 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-slate-900">{slot.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold text-slate-700 mb-4">Or Choose Custom Time</p>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-slate-700">Date</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">
                  <span className="text-sm font-semibold text-slate-700">Time</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-slate-700">Duration</span>
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            {/* Meeting Type */}
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-slate-700">Meeting Type</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormData({ ...formData, meetingType: 'video', location: 'Google Meet' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.meetingType === 'video'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-300'
                  }`}
                >
                  <Video className={`h-5 w-5 mb-2 ${
                    formData.meetingType === 'video' ? 'text-primary-600' : 'text-slate-400'
                  }`} />
                  <p className="text-sm font-medium text-slate-900">Video Call</p>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, meetingType: 'in-person', location: 'Sequoia Office, SF' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.meetingType === 'in-person'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-300'
                  }`}
                >
                  <MapPin className={`h-5 w-5 mb-2 ${
                    formData.meetingType === 'in-person' ? 'text-primary-600' : 'text-slate-400'
                  }`} />
                  <p className="text-sm font-medium text-slate-900">In Person</p>
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-sm font-semibold text-slate-700">Location</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={formData.meetingType === 'video' ? 'Google Meet / Zoom link' : 'Office address'}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-2">
                <span className="text-sm font-semibold text-slate-700">Agenda / Notes</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add meeting agenda, topics to discuss, or any notes for the founder..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
              />
            </div>
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
              onClick={handleSchedule}
              disabled={!canSchedule || scheduling}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {scheduling ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Calendar className="h-5 w-5" />
                  </motion.div>
                  <span>Scheduling...</span>
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  <span>Schedule Meeting</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScheduleMeetingModal;
