import Sidebar from './Sidebar.jsx';
import Chat from './Chat.jsx';
import PNRLookup from './PNRLookup.jsx';
import FlightBoard from './FlightBoard.jsx';
import Dashboard from './Dashboard.jsx';
import { Menu, Bell } from 'lucide-react';

export default function MainLayout({
    user, activeView, setActiveView, sidebarCollapsed, toggleSidebar,
    lang, toggleLang, theme, toggleTheme,
    chats, activeChatId, createNewChat, updateChatMessages, switchChat,
    onLogout, t, mobileSidebarOpen, setMobileSidebarOpen, aiProvider, toggleAiProvider
}) {
    const renderView = () => {
        switch (activeView) {
            case 'chat': return <Chat
                t={t}
                chats={chats}
                activeChatId={activeChatId}
                updateChatMessages={updateChatMessages}
                aiProvider={aiProvider}
                user={user}
            />;
            case 'pnr': return <PNRLookup t={t} />;
            case 'flights': return <FlightBoard t={t} />;
            case 'dashboard':
            case 'documents':
            case 'analytics':
            case 'audit':
                return <Dashboard t={t} activeView={activeView} />;
            default: return <Chat
                t={t}
                chats={chats}
                activeChatId={activeChatId}
                updateChatMessages={updateChatMessages}
                aiProvider={aiProvider}
                user={user}
            />;
        }
    };

    const viewTitles = {
        chat: 'AI Chat Assistant',
        pnr: 'PNR Lookup',
        flights: 'Flight Board',
        dashboard: 'Dashboard',
        documents: 'Document Control',
        analytics: 'Analytics',
        audit: 'Audit Log',
    };

    return (
        <div className="app-layout">
            <Sidebar
                user={user}
                activeView={activeView}
                setActiveView={setActiveView}
                collapsed={sidebarCollapsed}
                toggleSidebar={toggleSidebar}
                lang={lang}
                toggleLang={toggleLang}
                theme={theme}
                toggleTheme={toggleTheme}
                chats={chats}
                activeChatId={activeChatId}
                createNewChat={createNewChat}
                switchChat={switchChat}
                onLogout={onLogout}
                t={t}
                mobileSidebarOpen={mobileSidebarOpen}
                setMobileSidebarOpen={setMobileSidebarOpen}
                aiProvider={aiProvider}
                toggleAiProvider={toggleAiProvider}
            />

            <div className="main-content">
                <div className="top-header">
                    <div className="header-left">
                        <button
                            className="header-btn desktop-menu-btn"
                            style={{ marginRight: 16 }}
                            onClick={toggleSidebar}
                        >
                            <Menu size={20} />
                        </button>
                        <button
                            className="header-btn mobile-menu-btn"
                            style={{ display: 'none', marginRight: 16 }}
                            onClick={() => setMobileSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <div className="header-title">{viewTitles[activeView] || 'Air Bharat Udaan'}</div>
                            <div className="header-subtitle">Udaan RAG Platform • {user.role.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="header-status">
                            <span className="status-dot"></span>
                            {t.online}
                        </div>
                        <button className="header-btn" title="Notifications">
                            <Bell size={20} />
                            <span className="notification-dot"></span>
                        </button>
                    </div>
                </div>

                {renderView()}
            </div>
        </div>
    );
}
