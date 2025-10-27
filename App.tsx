import React, { useState } from 'react';
import { Page } from './types';
import {
  CanvasProLogo,
  DashboardIcon,
  AssignmentsIcon,
  CalendarIcon,
  AiToolsIcon,
  NotesIcon,
  ChatIcon,
  SettingsIcon,
  SignOutIcon,
} from './components/Icons';

import Dashboard from './components/Dashboard';
import Assignments from './components/Assignments';
import Calendar from './components/Calendar';
import AiTools from './components/AiTools';
import Notes from './components/Notes';
import PeerChat from './components/PeerChat';
import Settings from './components/Settings';


interface NavLinkProps {
  label: Page;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ label, isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-3 py-2.5 text-left transition-all duration-200 rounded-md text-sm ${
      isActive
        ? 'bg-primary/10 text-primary font-semibold'
        : 'text-text-secondary hover:bg-card-hover hover:text-text-primary'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    {children}
    <span className="ml-3">{label}</span>
  </button>
);

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);

  const navLinks: { name: Page, icon: React.ReactNode }[] = [
    { name: Page.Dashboard, icon: <DashboardIcon /> },
    { name: Page.Assignments, icon: <AssignmentsIcon /> },
    { name: Page.Calendar, icon: <CalendarIcon /> },
    { name: Page.AiTools, icon: <AiToolsIcon /> },
    { name: Page.Notes, icon: <NotesIcon /> },
    { name: Page.Chat, icon: <ChatIcon /> },
    { name: Page.Settings, icon: <SettingsIcon /> },
  ];

  const renderActivePage = () => {
    switch (activePage) {
      case Page.Dashboard: return <Dashboard setActivePage={setActivePage} />;
      case Page.Assignments: return <Assignments setActivePage={setActivePage} />;
      case Page.Calendar: return <Calendar />;
      case Page.AiTools: return <AiTools />;
      case Page.Notes: return <Notes />;
      case Page.Chat: return <PeerChat />;
      case Page.Settings: return <Settings />;
      default: return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-primary font-sans">
      <nav className="w-64 bg-sidebar p-4 flex flex-col border-r border-border">
        <div className="flex items-center mb-8 px-2">
          <CanvasProLogo />
          <div className="ml-2">
            <h1 className="text-md font-bold text-text-primary">Canvas Pro</h1>
            <p className="text-xs text-text-secondary">AI Study Assistant</p>
          </div>
        </div>
        <div className="flex-grow space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              label={link.name}
              isActive={activePage === link.name}
              onClick={() => setActivePage(link.name)}
            >
              {link.icon}
            </NavLink>
          ))}
        </div>
        <div className="flex-shrink-0">
           <div className="p-3 rounded-lg hover:bg-card-hover transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    AW
                </div>
                <div className="ml-3">
                    <p className="text-sm font-semibold text-text-primary">Asa Wiley</p>
                    <p className="text-xs text-text-secondary">ID: 136164317</p>
                </div>
              </div>
           </div>
           <button className="flex items-center w-full px-3 py-2.5 mt-2 text-left transition-colors duration-200 rounded-md text-sm text-text-secondary hover:bg-card-hover hover:text-text-primary">
            <SignOutIcon />
            <span className="ml-3">Sign Out</span>
           </button>
        </div>
      </nav>
      <main className="flex-1 overflow-auto">
        {renderActivePage()}
      </main>
    </div>
  );
};

export default App;