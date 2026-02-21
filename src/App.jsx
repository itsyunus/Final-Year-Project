import { useAppState } from './hooks/useAppState.js';
import Login from './components/Login.jsx';
import MainLayout from './components/MainLayout.jsx';

export default function App() {
    const {
        user, lang, t, theme, sidebarCollapsed, activeView, mobileSidebarOpen,
        chats, activeChatId, aiProvider, apiKeys, // New states exported
        login, logout, toggleLang, toggleTheme, toggleSidebar, toggleAiProvider, setActiveView, setMobileSidebarOpen,
        createNewChat, updateChatMessages, switchChat, saveApiKeys // New methods exported
    } = useAppState();

    if (!user) {
        return <Login onLogin={login} t={t} />;
    }

    return (
        <MainLayout
            user={user}
            activeView={activeView}
            setActiveView={setActiveView}
            sidebarCollapsed={sidebarCollapsed}
            toggleSidebar={toggleSidebar}
            lang={lang}
            toggleLang={toggleLang}
            theme={theme}
            toggleTheme={toggleTheme}
            chats={chats}
            activeChatId={activeChatId}
            createNewChat={createNewChat}
            updateChatMessages={updateChatMessages}
            switchChat={switchChat}
            onLogout={logout}
            t={t}
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
            aiProvider={aiProvider}
            toggleAiProvider={toggleAiProvider}
            apiKeys={apiKeys}
            saveApiKeys={saveApiKeys}
        />
    );
}
