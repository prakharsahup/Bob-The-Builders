import { motion } from 'framer-motion';
import { Mail, Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';

const VCResponseCard = ({ response, type, vc }) => {
  if (type === 'reply') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md border-2 border-accent-200 p-6"
      >
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={vc.avatar}
            alt={vc.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-900">{vc.name}</h3>
              <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>Replied</span>
              </span>
            </div>
            <p className="text-sm text-slate-600">{vc.role} at {vc.firm}</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-3">
          <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            {response.replyText}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            {new Date(response.sentAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit'
            })}
          </span>
          <CheckCircle className="h-4 w-4 text-accent-600" />
        </div>
      </motion.div>
    );
  }

  if (type === 'meeting') {
    const meetingDate = new Date(`${response.date}T${response.time}`);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md border-2 border-primary-200 p-6"
      >
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={vc.avatar}
            alt={vc.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-900">{vc.name}</h3>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Meeting Scheduled</span>
              </span>
            </div>
            <p className="text-sm text-slate-600">{vc.role} at {vc.firm}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Calendar className="h-4 w-4 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">
                {meetingDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="text-xs text-slate-500">
                {meetingDate.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })} • {response.duration} minutes
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <div className="p-2 bg-slate-100 rounded-lg">
              <MapPin className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900 capitalize">{response.meetingType}</p>
              <p className="text-xs text-slate-500">{response.location}</p>
            </div>
          </div>

          {response.notes && (
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-1">Agenda:</p>
              <p className="text-sm text-slate-600">{response.notes}</p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Scheduled {new Date(response.scheduledAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{response.status}</span>
          </span>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default VCResponseCard;
