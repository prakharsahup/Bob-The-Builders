import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target, Users, Clock, Mail, Calendar } from 'lucide-react';

const ActivityFeed = ({ project, onImprovementClick, vcReplies = [], meetings = [], messages = [] }) => {
  const getVCCount = (project) => {
    // Mock calculation based on project data
    const baseCount = 12;
    if (project.parsedData?.stage === 'Series A') return baseCount + 5;
    if (project.parsedData?.stage === 'Seed') return baseCount + 3;
    return baseCount;
  };

  // Get project-specific messages
  const projectMessages = messages.filter(m => m.projectId === project.id);
  const projectMessageIds = projectMessages.map(m => m.id);
  const projectReplies = vcReplies.filter(r => projectMessageIds.includes(r.messageId));
  const projectMeetings = meetings.filter(m => projectMessageIds.includes(m.messageId));

  // Calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const activities = [
    {
      id: 1,
      type: 'welcome',
      icon: Sparkles,
      iconColor: 'text-primary-600',
      bgColor: 'bg-primary-100',
      title: 'Project Created Successfully!',
      message: `Great start! Your project "${project.name}" is now live. Our AI is analyzing it to find the best VC matches.`,
      time: getTimeAgo(project.createdAt),
      clickable: false
    },
    {
      id: 2,
      type: 'analysis',
      icon: Target,
      iconColor: 'text-accent-600',
      bgColor: 'bg-accent-100',
      title: 'AI Analysis Complete',
      message: `We've analyzed your ${project.parsedData?.industry || 'project'} and found ${getVCCount(project)} potential VC matches. Your ${project.parsedData?.stage || 'stage'} positioning looks strong!`,
      time: getTimeAgo(project.createdAt),
      clickable: false
    },
    {
      id: 3,
      type: 'improvements',
      icon: TrendingUp,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-100',
      title: 'Project Improvements Available',
      message: 'Our AI has identified 5 ways to strengthen your pitch and increase VC match scores by up to 15%.',
      action: 'View Improvements',
      time: getTimeAgo(project.createdAt),
      clickable: true
    },
    {
      id: 4,
      type: 'insight',
      icon: Users,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      title: 'Market Insight',
      message: `${project.parsedData?.industry || 'Your industry'} startups are seeing strong investor interest. Average deal size is trending up 23% this quarter.`,
      time: getTimeAgo(project.createdAt),
      clickable: false
    }
  ];

  // Add VC replies to activities
  projectReplies.forEach((reply, index) => {
    activities.push({
      id: `reply-${reply.id}`,
      type: 'reply',
      icon: Mail,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'VC Replied to Your Message!',
      message: `A VC has responded to your outreach. Check the VC Responses tab to read the full message.`,
      time: getTimeAgo(reply.sentAt),
      clickable: false
    });
  });

  // Add scheduled meetings to activities
  projectMeetings.forEach((meeting, index) => {
    const meetingDate = new Date(`${meeting.date}T${meeting.time}`);
    activities.push({
      id: `meeting-${meeting.id}`,
      type: 'meeting',
      icon: Calendar,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      title: 'Meeting Scheduled!',
      message: `A VC has scheduled a ${meeting.duration}-minute ${meeting.meetingType} meeting with you on ${meetingDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.`,
      time: getTimeAgo(meeting.scheduledAt),
      clickable: false
    });
  });

  // Sort activities by most recent
  const sortedActivities = activities.sort((a, b) => {
    // Keep welcome and analysis at top
    if (a.id === 1) return -1;
    if (b.id === 1) return 1;
    if (a.id === 2) return -1;
    if (b.id === 2) return 1;
    return 0;
  });

  return (
    <div className="space-y-3">
      {sortedActivities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          onClick={() => activity.clickable && onImprovementClick()}
          className={`p-4 bg-white rounded-lg border-2 ${
            activity.clickable
              ? 'border-amber-200 cursor-pointer hover:border-amber-400 hover:shadow-md transition-all'
              : 'border-slate-100'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className={`p-2 ${activity.bgColor} rounded-lg flex-shrink-0`}>
              <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-sm font-semibold text-slate-900">
                  {activity.title}
                </h4>
                <span className="text-xs text-slate-500 flex items-center space-x-1 flex-shrink-0">
                  <Clock className="h-3 w-3" />
                  <span>{activity.time}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                {activity.message}
              </p>
              {activity.action && (
                <div className="flex items-center space-x-1 text-amber-600 font-medium text-xs">
                  <Sparkles className="h-3 w-3" />
                  <span>{activity.action}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityFeed;
