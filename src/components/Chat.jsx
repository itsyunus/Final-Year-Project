import { useState, useRef, useEffect } from 'react';
import { generateResponseStream } from '../utils/ragEngine.js';
import { Plane, Search, Briefcase, DollarSign, FileText, CloudRain, Paperclip, Send, Copy, RefreshCw, FileText as FileIcon, ChevronUp, ChevronDown, Check, User, Bot, AlertTriangle } from 'lucide-react';

export default function Chat({ t, chats, activeChatId, updateChatMessages, aiProvider, user, apiKeys }) {
    const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
    const messages = activeChat?.messages || [];

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async () => {
        const query = input.trim();
        if (!query || isTyping) return;

        // Validate API Keys
        const hasGroq = !!(apiKeys?.groqKey || import.meta.env.VITE_GROQ_API_KEY);
        const hasBedrock = !!(apiKeys?.awsAccess || import.meta.env.VITE_AWS_ACCESS_KEY_ID);

        if (aiProvider === 'groq' && !hasGroq) {
            alert("Chat Blocked: Missing Groq API Key. Please click the 'API Config' tab to securely configure your keys.");
            return;
        }
        if (aiProvider === 'bedrock' && !hasBedrock) {
            alert("Chat Blocked: Missing AWS Bedrock Credentials. Please click the 'API Config' tab to securely configure your keys.");
            return;
        }

        const userMsg = { id: Date.now(), role: 'user', text: query };
        updateChatMessages(activeChatId, prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        const assistantId = Date.now() + 1;
        updateChatMessages(activeChatId, prev => [...prev, {
            id: assistantId,
            role: 'assistant',
            text: '',
            streaming: true
        }]);

        let accumulatedText = '';
        const currentHistory = [...messages]; // capture before await

        const metaData = await generateResponseStream(query, currentHistory, aiProvider, apiKeys, (chunk) => {
            setIsTyping(false);
            accumulatedText += chunk;
            updateChatMessages(activeChatId, prev => prev.map(m =>
                m.id === assistantId ? { ...m, text: accumulatedText } : m
            ));
        });

        // Add metadata once stream completes
        updateChatMessages(activeChatId, prev => prev.map(m =>
            m.id === assistantId ? {
                ...m,
                streaming: false,
                sources: metaData.sources,
                confidence: metaData.confidence,
                intent: metaData.intent,
                isHallucination: metaData.isHallucination,
                latency: metaData.latency
            } : m
        ));

        setIsTyping(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleQuickAction = (text) => {
        setInput(text);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleRegenerate = (msg) => {
        setInput(messages.find(m => m.role === 'user' && messages.indexOf(m) < messages.indexOf(msg))?.text || '');
    };

    const [copiedId, setCopiedId] = useState(null);
    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const quickActions = [
        { icon: <Plane size={20} />, title: 'Flight Status', desc: 'Check real-time flight info', query: 'Show me today\'s flight schedule' },
        { icon: <Search size={20} />, title: 'PNR Lookup', desc: 'Track your booking', query: 'Check PNR status ABC123' },
        { icon: <Briefcase size={20} />, title: 'Baggage Policy', desc: 'Know your allowance', query: 'What is the baggage allowance for economy class?' },
        { icon: <DollarSign size={20} />, title: 'Refund Policy', desc: 'Cancellation & refunds', query: 'What is the refund policy for ticket cancellation?' },
        { icon: <FileText size={20} />, title: 'DGCA Rules', desc: 'Compliance info', query: 'What are the DGCA pilot duty time limitations?' },
        { icon: <CloudRain size={20} />, title: 'Weather Advisory', desc: 'Disruption protocols', query: 'What is the fog disruption protocol?' },
    ];

    return (
        <div className="chat-area">
            <div className="chat-messages">
                {messages.length === 0 && (
                    <div className="welcome-card">
                        <div className="welcome-icon"><Plane size={24} color="#fff" /></div>
                        <h2>{t.welcome}</h2>
                        <p>{t.welcomeSub}</p>
                        <div className="quick-actions">
                            {quickActions.map((qa, i) => (
                                <button key={i} className="quick-action" onClick={() => handleQuickAction(qa.query)}>
                                    <span className="quick-action-icon">{qa.icon}</span>
                                    <div className="quick-action-text">
                                        <h4>{qa.title}</h4>
                                        <p>{qa.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map(msg => (
                    <MessageBubble
                        key={msg.id}
                        msg={msg}
                        t={t}
                        copiedId={copiedId}
                        onCopy={handleCopy}
                        onRegenerate={handleRegenerate}
                        userRole={user?.role}
                    />
                ))}

                {isTyping && (
                    <div className="typing-indicator">
                        <div className="message-inner">
                            <div className="message-avatar" style={{ background: 'var(--accent-color)', width: 36, height: 36, minWidth: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                <Bot size={20} />
                            </div>
                            <div className="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <div className="chat-input-wrapper">
                    <textarea
                        ref={inputRef}
                        className="chat-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t.typeMessage}
                        rows={1}
                    />
                    <div className="chat-input-actions">
                        <button className="input-action-btn" title="Attach file"><Paperclip size={18} /></button>
                        <button
                            className="input-action-btn btn-send"
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            title={t.send}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
                <p className="chat-footer-text">{t.aiPowered}</p>
            </div>
        </div>
    );
}

function MessageBubble({ msg, t, copiedId, onCopy, onRegenerate, userRole }) {
    const [showSources, setShowSources] = useState(false);

    return (
        <div className={`message ${msg.role}`}>
            <div className="message-inner">
                <div className={`message-avatar ${msg.role}`}>
                    {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-content">
                    <div className="message-bubble">
                        {msg.text.split('\n').map((line, i) => {
                            if (!line.trim()) return <br key={i} />;
                            // Bold text
                            const parts = line.split(/(\*\*[^*]+\*\*)/g);
                            return (
                                <p key={i}>
                                    {parts.map((part, j) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={j}>{part.slice(2, -2)}</strong>;
                                        }
                                        if (part.startsWith('• ')) {
                                            return <span key={j}>{part}</span>;
                                        }
                                        return <span key={j}>{part}</span>;
                                    })}
                                </p>
                            );
                        })}
                    </div>

                    {msg.role === 'assistant' && !msg.streaming && (
                        <>
                            <div className="message-actions">
                                <button
                                    className={`msg-action-btn ${copiedId === msg.id ? 'copied' : ''}`}
                                    onClick={() => onCopy(msg.id, msg.text)}
                                >
                                    {copiedId === msg.id ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />} {t.copy}
                                </button>
                                <button className="msg-action-btn" onClick={() => onRegenerate(msg)}>
                                    <RefreshCw size={14} className="mr-1" /> {t.regenerate}
                                </button>
                            </div>

                            {userRole !== 'passenger' && (
                                <>
                                    {msg.confidence && (
                                        <div className="confidence-meter">
                                            <span className="confidence-label">{t.confidence}:</span>
                                            <div className="confidence-bar-track">
                                                <div
                                                    className={`confidence-bar-fill ${msg.confidence >= 80 ? 'confidence-high' : msg.confidence >= 50 ? 'confidence-mid' : 'confidence-low'}`}
                                                    style={{ width: `${msg.confidence}%` }}
                                                />
                                            </div>
                                            <span className={`confidence-value`} style={{ color: msg.confidence >= 80 ? '#4ade80' : msg.confidence >= 50 ? '#fbbf24' : '#f87171' }}>
                                                {msg.confidence}%
                                            </span>
                                            {msg.latency && <span className="confidence-label" style={{ marginLeft: 8 }}>⚡ {msg.latency}</span>}
                                        </div>
                                    )}

                                    {msg.isHallucination && (
                                        <div className="hallucination-flag">
                                            <AlertTriangle size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                                            Low confidence — response may not be fully accurate. Verify critical information.
                                        </div>
                                    )}

                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="source-section">
                                            <button className="source-toggle" onClick={() => setShowSources(!showSources)}>
                                                <FileIcon size={14} className="mr-1" /> {t.sources} ({msg.sources.length}) {showSources ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                            </button>
                                            {showSources && (
                                                <div className="source-list">
                                                    {msg.sources.map((src, i) => (
                                                        <div key={i} className="source-item">
                                                            <span className="source-item-icon"><FileIcon size={14} /></span>
                                                            <span className="source-item-name">{src.name}</span>
                                                            <span className="source-item-detail">{src.detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
