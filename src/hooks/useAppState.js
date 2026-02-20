import { useState, useCallback, useEffect } from 'react';
import { translations } from '../utils/ragEngine.js';
import Login from '../components/Login.jsx';
import MainLayout from '../components/MainLayout.jsx';

export function useAppState() {
    const [user, setUser] = useState(null);
    const [lang, setLang] = useState('en');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeView, setActiveView] = useState('chat');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Chat History State
    const [chats, setChats] = useState([{ id: 'default', title: 'New Chat', messages: [], updatedAt: Date.now() }]);
    const [activeChatId, setActiveChatId] = useState('default');

    const [theme, setTheme] = useState('dark');
    const [aiProvider, setAiProvider] = useState('groq'); // 'groq' or 'bedrock'

    const t = translations[lang];

    // Set theme on mount and when it changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const login = useCallback((email, password, role) => {
        let name = 'Guest User';

        if (role === 'passenger') {
            // Allow any passenger login for demo purposes
            name = email.split('@')[0] || 'Passenger';
            if (name === 'passenger') name = 'Guest Passenger';
            // Capitalize first letter
            name = name.charAt(0).toUpperCase() + name.slice(1);
        } else if (role === 'ops_admin') {
            const adminUsers = {
                'yunuz@admin': { pass: 'Yunuz', name: 'Yunuz' },
                'bharath@admin': { pass: 'bharath', name: 'Bharath' },
                'monika@admin': { pass: 'monika', name: 'Monika' },
                'vishwajith@admin': { pass: 'vishwajith', name: 'Vishwajith' }
            };

            const user = adminUsers[email.toLowerCase()];
            if (!user || user.pass !== password) {
                return false;
            }
            name = user.name + ' (Admin)';
        } else if (role === 'cabin_crew') {
            if (email !== 'crew@airbharat.in' || password !== 'crew123') return false;
            name = 'Priya Singh';
        } else if (role === 'ground_staff') {
            if (email !== 'staff@airbharat.in' || password !== 'staff123') return false;
            name = 'Rajesh Kumar';
        } else {
            return false;
        }

        setUser({
            email,
            role,
            name,
            initials: name.split(' ').map(n => n[0].toUpperCase()).join('').substring(0, 2)
        });
        return true;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setActiveView('chat');
        setChats([{ id: 'default', title: 'New Chat', messages: [], updatedAt: Date.now() }]);
        setActiveChatId('default');
    }, []);

    const createNewChat = useCallback(() => {
        const newId = Date.now().toString();
        setChats(prev => [{ id: newId, title: 'New Chat', messages: [], updatedAt: Date.now() }, ...prev]);
        setActiveChatId(newId);
        setActiveView('chat');
        if (window.innerWidth < 768) setMobileSidebarOpen(false);
    }, []);

    const updateChatMessages = useCallback((chatId, updater) => {
        setChats(prev => prev.map(chat => {
            if (chat.id === chatId) {
                const updatedMessages = typeof updater === 'function' ? updater(chat.messages) : updater;

                // Auto-generate title after first user message
                let title = chat.title;
                if (title === 'New Chat' && updatedMessages.length > 0 && updatedMessages[0].role === 'user') {
                    // Truncate to first 4 words or 25 chars
                    title = updatedMessages[0].text.split(' ').slice(0, 4).join(' ');
                    if (title.length > 25) title = title.substring(0, 25) + '...';
                }

                return { ...chat, messages: updatedMessages, title, updatedAt: Date.now() };
            }
            return chat;
        }).sort((a, b) => b.updatedAt - a.updatedAt)); // Keep sorted by most recent
    }, []);

    const switchChat = useCallback((chatId) => {
        setActiveChatId(chatId);
        setActiveView('chat');
        if (window.innerWidth < 768) setMobileSidebarOpen(false);
    }, []);

    const toggleLang = useCallback(() => {
        setLang(prev => prev === 'en' ? 'hi' : 'en');
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    const toggleAiProvider = useCallback(() => {
        setAiProvider(prev => prev === 'groq' ? 'bedrock' : 'groq');
    }, []);

    const toggleSidebar = useCallback(() => {
        setSidebarCollapsed(prev => !prev);
    }, []);

    return {
        user, lang, t, theme, sidebarCollapsed, activeView, mobileSidebarOpen,
        chats, activeChatId, aiProvider, // New states exported
        login, logout, toggleLang, toggleTheme, toggleAiProvider, toggleSidebar, setActiveView, setMobileSidebarOpen,
        createNewChat, updateChatMessages, switchChat // New methods exported
    };
}
