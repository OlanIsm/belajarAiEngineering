import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { MessageSquareCode } from 'lucide-react';
import './index.css';

import { useAuthStore } from './store/authStore';
import AuthPage from './pages/AuthPage';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';
import QuizPage from './pages/QuizPage';
import SettingsPage from './pages/SettingsPage';
import ChatDialog from './components/ChatDialog';

export default function App() {
  const { token } = useAuthStore();
  const [activeTab, setActiveTab] = useState('home');
  const [showChat, setShowChat] = useState(false);

  // Not authenticated → show auth screen
  if (!token) return (
    <>
      <AuthPage />
      <Toaster position="top-right" />
    </>
  );

  const renderPage = () => {
    switch (activeTab) {
      case 'home':     return <HomePage onNavigate={setActiveTab} />;
      case 'study':    return <StudyPage />;
      case 'quiz':     return <QuizPage />;
      case 'settings': return <SettingsPage />;
      default:         return <HomePage onNavigate={setActiveTab} />;
    }
  };

  // Study page has its own full-height layout (no padding wrapper needed)
  const isStudyPage = activeTab === 'study';

  return (
    <>
      <div className="app-layout">
        <Sidebar activeTab={activeTab} onNavigate={setActiveTab} />

        {isStudyPage ? (
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {renderPage()}
          </div>
        ) : (
          <main className="main-content">
            {renderPage()}
          </main>
        )}
      </div>

      {/* Floating Chat Button */}
      <button className="fab-chat" onClick={() => setShowChat(true)}>
        <MessageSquareCode size={18} strokeWidth={2.2} />
        AI Tutor Chat
      </button>

      {/* Chat Dialog */}
      {showChat && <ChatDialog onClose={() => setShowChat(false)} />}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--nm-base)',
            boxShadow: 'var(--shadow-raise)',
            color: 'var(--text-heading)',
            borderRadius: 12,
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
          },
        }}
      />
    </>
  );
}
