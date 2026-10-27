import React from 'react';
import {
  LayoutDashboard,
  Wand2,
  Instagram,
  Youtube,
  FileText,
  BrainCircuit,
  Folder,
  Coins,
  Settings as SettingsIcon,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bot,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  onOpenCreditsModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  isCollapsed,
  setIsCollapsed,
  onOpenCreditsModal,
}) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: '' },
    { id: 'studio-universal', label: 'AI Content Studio', icon: Wand2, badge: 'Pro' },
    { id: 'studio-instagram', label: 'Instagram Studio', icon: Instagram, badge: 'Hot' },
    { id: 'studio-youtube', label: 'YouTube Studio', icon: Youtube, badge: '' },
    { id: 'studio-marketing', label: 'Marketing Copy', icon: FileText, badge: '' },
    { id: 'brand-brain', label: 'Brand Brain', icon: BrainCircuit, badge: 'AI' },
    { id: 'library', label: 'Content Library', icon: Folder, badge: '' },
    { id: 'credits', label: 'Credit Usage', icon: Coins, badge: '' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, badge: '' },
  ];

  if (user?.role === 'admin') {
    navItems.push({
      id: 'admin',
      label: 'Admin Dashboard',
      icon: ShieldCheck,
      badge: 'Admin',
    });
  }

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-20 flex flex-col border-r border-slate-800/80 bg-slate-950 transition-all duration-300 ${
        isCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Sidebar header toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Workspaces
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors mx-auto lg:mx-0"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav items list */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const isAdminItem = item.id === 'admin';

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center rounded-xl px-3 py-2.5 text-xs font-medium transition-all group relative ${
                isActive
                  ? isAdminItem
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-500/10'
                    : 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive
                      ? isAdminItem
                        ? 'text-amber-400'
                        : 'text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!isCollapsed && <span>{item.label}</span>}
              </div>

              {!isCollapsed && item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    item.badge === 'Admin'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : item.badge === 'Hot'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Tooltip in collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 hidden group-hover:block px-2.5 py-1 rounded-md bg-slate-800 text-white text-xs whitespace-nowrap shadow-xl z-50 border border-slate-700">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Credit balance promo card (when expanded) */}
      {!isCollapsed && user && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-300 flex items-center space-x-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Available Credits</span>
            </span>
            <span className="text-xs font-bold text-white bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-800">
              {user.credits}
            </span>
          </div>

          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(5, (user.credits / 200) * 100))}%` }}
            />
          </div>

          <button
            onClick={onOpenCreditsModal}
            className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-600/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get More Credits</span>
          </button>
        </div>
      )}
    </aside>
  );
};
