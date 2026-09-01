import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Briefcase,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Cpu,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'study', icon: BookOpen, label: 'Study' },
  { id: 'quiz', icon: Brain, label: 'Weekly Quiz' },
  { id: 'interview', icon: Briefcase, label: 'Interview Qs', disabled: true, badge: 'SOON' },
];

export default function Sidebar({ activeTab, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Cpu size={22} color="#2D3748" />
        </div>
        {!collapsed && (
          <div className="sidebar-brand">
            <h2>BelajarAI</h2>
            <span>Engineering</span>
          </div>
        )}
      </div>

      <div className="sidebar-divider" />

      {/* Nav Links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item${isActive ? ' active' : ''}${item.disabled ? ' disabled' : ''}`}
              onClick={() => !item.disabled && onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <div className="nav-icon-wrap">
                <Icon size={18} strokeWidth={2.2} />
              </div>
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-divider" style={{ margin: '0 16px' }} />

      {/* Settings & Logout */}
      <div style={{ padding: '12px' }}>
        <button
          className={`nav-item${activeTab === 'settings' ? ' active' : ''}`}
          onClick={() => onNavigate('settings')}
          title={collapsed ? 'Settings' : undefined}
        >
          <div className="nav-icon-wrap">
            <Settings size={18} strokeWidth={2.2} />
          </div>
          {!collapsed && <span className="nav-label">Settings</span>}
        </button>

        <button
          className="nav-item"
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          style={{ color: 'var(--danger)', marginTop: 4 }}
        >
          <div className="nav-icon-wrap">
            <LogOut size={18} strokeWidth={2.2} />
          </div>
          {!collapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        className="sidebar-collapse-btn"
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
