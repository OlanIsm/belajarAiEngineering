import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[React ErrorBoundary caught error]:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#e0e0e0',
          padding: 24,
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
        }}>
          <div style={{
            background: '#e0e0e0',
            borderRadius: 40,
            boxShadow: '5px 5px 17px #aaaaaa, -5px -5px 17px #ffffff',
            padding: 48,
            maxWidth: 480,
            width: '100%',
          }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>⚠️</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#2D3748', marginBottom: 8 }}>
              Terjadi Kesalahan Render
            </h1>
            <p style={{ fontSize: 13, color: '#718096', marginBottom: 24, lineHeight: 1.6 }}>
              {this.state.error?.message || 'Aplikasi mengalami error yang tidak terduga.'}
            </p>
            <button
              onClick={this.handleReset}
              style={{
                padding: '12px 28px',
                borderRadius: 20,
                border: 'none',
                background: '#FFD700',
                boxShadow: '5px 5px 17px #aaaaaa, -5px -5px 17px #ffffff',
                fontWeight: 700,
                fontSize: 14,
                color: '#2D3748',
                cursor: 'pointer',
              }}
            >
              🔄 Reset State & Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
