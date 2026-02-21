import { MessageSquare, Search, Plane, Home, FileText, BarChart2, Shield, Moon, Sun, Globe, LogOut, Plus, ChevronRight, Cpu, Zap, Settings } from 'lucide-react';

export default function Sidebar({
    user, activeView, setActiveView, collapsed, toggleSidebar,
    lang, toggleLang, theme, toggleTheme,
    chats, activeChatId, createNewChat, switchChat,
    onLogout, t, mobileSidebarOpen, setMobileSidebarOpen, aiProvider, toggleAiProvider, onOpenSettings
}) {
    const isAdmin = user.role === 'ops_admin';
    const isCrew = user.role === 'cabin_crew' || user.role === 'ground_staff';

    const navItems = [
        { id: 'chat', icon: <MessageSquare size={18} />, label: t.chat, show: true },
        { id: 'pnr', icon: <Search size={18} />, label: t.pnrLookup, show: true },
        { id: 'flights', icon: <Plane size={18} />, label: t.flights, show: true },
    ];

    const adminItems = [
        { id: 'dashboard', icon: <Home size={18} />, label: t.dashboard, badge: null },
        { id: 'documents', icon: <FileText size={18} />, label: t.documents, badge: '10' },
        { id: 'analytics', icon: <BarChart2 size={18} />, label: t.analytics, badge: null },
        { id: 'audit', icon: <Shield size={18} />, label: t.auditLog, badge: '3' },
        { id: 'settings', icon: <Settings size={18} />, label: 'API Config', badge: null },
    ];

    return (
        <>
            {mobileSidebarOpen && <div className="mobile-overlay show" onClick={() => setMobileSidebarOpen(false)} />}
            <div className={`sidebar-wrapper`}>
                <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
                    <div className="sidebar-header">
                        <div className="sidebar-logo">
                            <Plane size={20} className="brand-plane" />
                        </div>
                        <div className="sidebar-brand">
                            <h2>Air Bharat</h2>
                        </div>
                    </div>

                    <div className="sidebar-new-chat">
                        <button className="btn-new-chat" onClick={createNewChat}>
                            <Plus size={16} /> <span className="nav-text">New Chat</span>
                        </button>
                    </div>

                    <nav className="sidebar-nav">
                        <div className="nav-section-label">Main Functions</div>
                        {navItems.filter(item => item.show).map(item => (
                            <button
                                key={item.id}
                                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                                onClick={() => { setActiveView(item.id); setMobileSidebarOpen(false); }}
                            >
                                <span className="nav-item-icon">{item.icon}</span>
                                <span className="nav-text">{item.label}</span>
                            </button>
                        ))}

                        {(isAdmin || isCrew) && (
                            <>
                                <div className="nav-section-label">{isAdmin ? 'Administration' : 'Tools'}</div>
                                {adminItems.filter(item => isAdmin || item.id === 'dashboard' || item.id === 'settings').map(item => (
                                    <button
                                        key={item.id}
                                        className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                                        onClick={() => { setActiveView(item.id); setMobileSidebarOpen(false); }}
                                    >
                                        <span className="nav-item-icon">{item.icon}</span>
                                        <span className="nav-text">{item.label}</span>
                                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                                    </button>
                                ))}
                            </>
                        )}

                        <div className="nav-section-label" style={{ marginTop: '16px' }}>Recent Chats</div>
                        <div className="recent-chats-list">
                            {chats.map(c => (
                                <button
                                    key={c.id}
                                    className={`nav-item recent-chat-btn ${activeChatId === c.id && activeView === 'chat' ? 'active' : ''}`}
                                    onClick={() => switchChat(c.id)}
                                    title={c.title}
                                >
                                    <span className="nav-item-icon"><MessageSquare size={14} /></span>
                                    <span className="nav-text truncate">{c.title}</span>
                                    {activeChatId === c.id && activeView === 'chat' && (
                                        <ChevronRight size={14} className="active-chat-indicator" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </nav>

                    <div className="sidebar-footer">
                        <button className="theme-switcher" onClick={toggleTheme}>
                            <span className="lang-icon">{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}</span>
                            <span className="lang-text">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                        </button>

                        <button className="theme-switcher" onClick={toggleAiProvider}>
                            <span className="lang-icon">{aiProvider === 'groq' ? <Zap size={16} color="#f59e0b" /> : <Cpu size={16} color="#6366f1" />}</span>
                            <span className="lang-text">{aiProvider === 'groq' ? 'Groq Llama 3' : 'AWS Bedrock'}</span>
                        </button>

                        <button className="lang-switcher" onClick={toggleLang}>
                            <span className="lang-icon"><Globe size={16} /></span>
                            <span className="lang-text">{lang === 'en' ? 'हिंदी' : 'English'}</span>
                        </button>

                        <div className="sidebar-user">
                            <div className="user-avatar">{user.initials}</div>
                            <div className="sidebar-footer-info">
                                <div className="user-name">{user.name}</div>
                                <div className="user-role">{user.role.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                            </div>
                        </div>

                        <button className="btn-logout" onClick={onLogout}>
                            <span><LogOut size={16} /></span>
                            <span className="nav-text">{t.logout}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
