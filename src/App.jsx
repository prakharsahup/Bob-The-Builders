import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Founder pages
import FounderDashboard from './pages/founder/Dashboard';
import CreateProject from './pages/founder/CreateProject';
import SearchVCs from './pages/founder/SearchVCs';
import SearchResults from './pages/founder/SearchResults';
import ProjectDetail from './pages/founder/ProjectDetail';
import SentMessages from './pages/founder/SentMessages';

// VC pages
import VCDashboard from './pages/vc/Dashboard';
import MessageDetail from './pages/vc/MessageDetail';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/founder/dashboard" replace />} />

          {/* Founder routes */}
          <Route path="/founder/dashboard" element={<FounderDashboard />} />
          <Route path="/founder/project/new" element={<CreateProject />} />
          <Route path="/founder/project/:id" element={<ProjectDetail />} />
          <Route path="/founder/search" element={<SearchVCs />} />
          <Route path="/founder/search/results" element={<SearchResults />} />
          <Route path="/founder/messages" element={<SentMessages />} />

          {/* VC routes */}
          <Route path="/vc/dashboard" element={<VCDashboard />} />
          <Route path="/vc/message/:id" element={<MessageDetail />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
