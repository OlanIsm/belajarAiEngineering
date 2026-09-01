import React, { useState, useEffect } from 'react';
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

  // Global Theme State ('light' | 'dark')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

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
      case 'settings': return <SettingsPage theme={theme} onToggleTheme={toggleTheme} />;
      default:         return <HomePage onNavigate={setActiveTab} />;
    }
  };

  // Study page has its own full-height layout
  const isStudyPage = activeTab === 'study';

  return (
    <>
      <div className="app-layout">
        <Sidebar
          activeTab={activeTab}
          onNavigate={setActiveTab}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

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

      {/* Floating Mascot Chat Button */}
      <button
        className="fab-chat"
        onClick={() => setShowChat(true)}
        title="Tanya AI Tutor"
        aria-label="AI Tutor Chatbot"
      >
        <img src="/macot_chatbot_icon.png" alt="AI Tutor Mascot" className="mascot-img" />
        <span className="online-dot" />
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
