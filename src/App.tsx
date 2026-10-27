import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { BrandProvider } from './context/BrandContext.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { Sidebar } from './components/common/Sidebar.tsx';
import { LandingPage } from './components/landing/LandingPage.tsx';
import { DashboardOverview } from './components/dashboard/DashboardOverview.tsx';
import { InstagramStudio } from './components/studio/InstagramStudio.tsx';
import { YouTubeStudio } from './components/studio/YouTubeStudio.tsx';
import { MarketingStudio } from './components/studio/MarketingStudio.tsx';
import { UniversalStudio } from './components/studio/UniversalStudio.tsx';
import { BrandBrainView } from './components/brand/BrandBrainView.tsx';
import { ContentLibraryView } from './components/library/ContentLibraryView.tsx';
import { CreditsView } from './components/credits/CreditsView.tsx';
import { SettingsView } from './components/settings/SettingsView.tsx';
import { AdminDashboardView } from './components/admin/AdminDashboardView.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';
import { CreditsModal } from './components/credits/CreditsModal.tsx';
import { LegalModal } from './components/legal/LegalModal.tsx';

function MainApp() {
  const { user, isLoading } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center animate-pulse">
          <span className="w-4 h-4 rounded-full bg-indigo-500" />
        </div>
        <div className="text-xs font-semibold tracking-wider uppercase text-slate-300">
          Loading Flowora AI...
        </div>
      </div>
    );
  }

  // If user is not authenticated, show landing page with interactive modals
  if (!user) {
    return (
      <>
        <LandingPage
          onStartCreating={() => {
            setAuthModalMode('register');
            setIsAuthModalOpen(true);
          }}
          onOpenSignIn={() => {
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
          }}
          onOpenLegal={(type) => setLegalModalType(type)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authModalMode}
          onClose={() => setIsAuthModalOpen(false)}
        />

        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </>
    );
  }

  // Authenticated Application Shell
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Workspace Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
        />

        {/* Viewport Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950">
          {currentTab === 'overview' && (
            <DashboardOverview
              setCurrentTab={setCurrentTab}
              onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
            />
          )}

          {currentTab === 'studio-universal' && <UniversalStudio />}
          {currentTab === 'studio-instagram' && <InstagramStudio />}
          {currentTab === 'studio-youtube' && <YouTubeStudio />}
          {currentTab === 'studio-marketing' && <MarketingStudio />}
          {currentTab === 'brand-brain' && <BrandBrainView />}
          {currentTab === 'library' && <ContentLibraryView />}
          {currentTab === 'credits' && <CreditsView />}
          {currentTab === 'settings' && (
            <SettingsView onOpenLegal={(type) => setLegalModalType(type)} />
          )}

          {currentTab === 'admin' && user.role === 'admin' && (
            <AdminDashboardView />
          )}
        </main>
      </div>

      {/* Reusable Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        onViewLedger={() => setCurrentTab('credits')}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrandProvider>
        <MainApp />
      </BrandProvider>
    </AuthProvider>
  );
}
