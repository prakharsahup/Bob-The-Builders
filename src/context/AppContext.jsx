import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [vcReplies, setVcReplies] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      shortlistedVCs: [],
      sentMessages: []
    };
    setProjects([newProject, ...projects]);
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, ...updates } : p
    ));
  };

  const addShortlistedVCs = (projectId, vcs) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, shortlistedVCs: [...new Set([...p.shortlistedVCs, ...vcs])] }
        : p
    ));
  };

  const sendMessage = (projectId, vcId, message, report) => {
    const newMessage = {
      id: Date.now().toString(),
      projectId,
      vcId,
      message,
      report,
      sentAt: new Date().toISOString(),
      status: 'sent',
      read: false
    };

    setMessages([newMessage, ...messages]);

    // Update project's sent messages
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, sentMessages: [...p.sentMessages, newMessage.id] }
        : p
    ));

    return newMessage;
  };

  const sendVCReply = (messageId, vcId, replyText) => {
    const reply = {
      id: Date.now().toString(),
      messageId,
      vcId,
      replyText,
      sentAt: new Date().toISOString()
    };

    setVcReplies([reply, ...vcReplies]);

    // Mark original message as replied
    setMessages(messages.map(m =>
      m.id === messageId ? { ...m, replied: true, replyId: reply.id } : m
    ));

    return reply;
  };

  const scheduleMeeting = (messageId, vcId, meetingData) => {
    const meeting = {
      id: Date.now().toString(),
      messageId,
      vcId,
      ...meetingData,
      scheduledAt: new Date().toISOString(),
      status: 'scheduled'
    };

    setMeetings([meeting, ...meetings]);

    // Mark message as having a scheduled meeting
    setMessages(messages.map(m =>
      m.id === messageId ? { ...m, hasMeeting: true, meetingId: meeting.id } : m
    ));

    return meeting;
  };

  const value = {
    projects,
    messages,
    currentSearch,
    vcReplies,
    meetings,
    setCurrentSearch,
    addProject,
    updateProject,
    addShortlistedVCs,
    sendMessage,
    sendVCReply,
    scheduleMeeting
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
