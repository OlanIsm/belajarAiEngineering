import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

interface ChatDialogProps {
  onClose: () => void;
}

export default function ChatDialog({ onClose }: ChatDialogProps) {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || isLoading) return;
    setInput('');
    await sendMessage(prompt);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="chat-dialog">
        {/* Header */}
        <div className="chat-header">
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'var(--gold)', boxShadow: 'var(--shadow-raise-sm)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bot size={20} color="#2D3748" />
          </div>
          <div style={{ flex: 1 }}>
            <p className="font-heading" style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: 15 }}>
              AI Tutor Assistant
            </p>
            <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: 'var(--gold-rich)', letterSpacing: 1 }}>
              GEMINI 1.5 FLASH
            </p>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Sparkles size={20} color="var(--gold-rich)" />
              <span>Tanyakan apa saja tentang AI Engineering, Python, atau Machine Learning!</span>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="chat-bubble ai" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="spinner" style={{ borderTopColor: 'var(--gold)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>AI sedang berpikir...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-bar">
          <div className="input-wrap" style={{ flex: 1, borderRadius: 10 }}>
            <input
              placeholder="Tanya tentang AI, Python, atau ML..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isLoading}
            />
          </div>
          <button
            className="btn btn-gold"
            style={{ padding: '10px 16px', borderRadius: 10 }}
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
