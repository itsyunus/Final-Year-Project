import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { MessageSquare, CheckCircle, Users, FileText, BarChart2, TrendingUp, AlertCircle, Clock, Info, Shield, PlusCircle, UploadCloud, File as FileIcon } from 'lucide-react';
import { documents, auditLogs, analyticsData } from '../data/knowledgeBase.js';

export default function Dashboard({ t, activeView }) {
    if (activeView === 'documents') return <DocumentsView t={t} />;
    if (activeView === 'analytics') return <AnalyticsView t={t} />;
    if (activeView === 'audit') return <AuditView t={t} />;
    return <OverviewDashboard t={t} />;
}

function OverviewDashboard({ t }) {
    const stats = [
        { icon: <MessageSquare size={20} />, value: analyticsData.totalQueries.toLocaleString(), label: t.totalQueries, trend: '+12.4%', trendDir: 'up', color: 'sky' },
        { icon: <CheckCircle size={20} />, value: analyticsData.resolvedRate + '%', label: t.resolvedRate, trend: '+2.1%', trendDir: 'up', color: 'green' },
        { icon: <Users size={20} />, value: analyticsData.activeUsers.toLocaleString(), label: t.activeUsers, trend: '+8.7%', trendDir: 'up', color: 'amber' },
        { icon: <FileText size={20} />, value: analyticsData.documentsIndexed, label: t.docsIndexed, trend: analyticsData.totalChunks + ' chunks', trendDir: 'up', color: 'purple' },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2><BarChart2 size={24} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} /> {t.dashboard}</h2>
                <div className="dashboard-header-actions">
                    <button className="btn-secondary">📥 Export</button>
                    <button className="btn-secondary">🔄 Refresh</button>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-header">
                            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                            <span className={`stat-trend ${stat.trendDir}`}>
                                {stat.trendDir === 'up' ? '↑' : '↓'} {stat.trend}
                            </span>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="dash-card">
                    <div className="dash-card-header">
                        <h3>{t.queryAnalytics}</h3>
                        <div className="tab-bar">
                            <button className="tab-item active">Weekly</button>
                            <button className="tab-item">Monthly</button>
                        </div>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData.dailyQueries}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ background: '#152847', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 12, color: '#f1f5f9' }}
                                    cursor={{ fill: 'rgba(56,189,248,0.05)' }}
                                />
                                <Bar dataKey="queries" fill="#38bdf8" radius={[6, 6, 0, 0]} name="Total Queries" />
                                <Bar dataKey="resolved" fill="#22c55e" radius={[6, 6, 0, 0]} name="Resolved" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dash-card">
                    <div className="dash-card-header">
                        <h3>{t.recentQueries}</h3>
                    </div>
                    <div className="recent-queries">
                        {[
                            { text: 'What is the baggage limit for A320?', intent: 'Baggage', time: '2 min ago' },
                            { text: 'PNR status ABC123', intent: 'PNR Lookup', time: '5 min ago' },
                            { text: 'DGCA duty time for pilots', intent: 'Compliance', time: '12 min ago' },
                            { text: 'Flight AB-305 delay reason', intent: 'Flight Status', time: '18 min ago' },
                            { text: 'Refund policy for economy saver', intent: 'Refund', time: '25 min ago' },
                        ].map((q, i) => (
                            <div key={i} className="query-item">
                                <div className="query-text">{q.text}</div>
                                <div className="query-meta">
                                    <span className="query-intent">{q.intent}</span>
                                    <span>{q.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DocumentsView({ t }) {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2><FileText size={24} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} /> {t.documentControl}</h2>
                <div className="dashboard-header-actions">
                    <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <UploadCloud size={16} /> Upload Document
                    </button>
                </div>
            </div>

            <div className="upload-area">
                <div className="upload-area-icon"><PlusCircle size={36} color="var(--text-tertiary)" /></div>
                <h4>Drop files here or click to upload</h4>
                <p>Supports PDF, DOCX, TXT • Max 50MB per file</p>
            </div>

            <div className="dash-card">
                <div className="dash-card-header">
                    <h3>Indexed Documents</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gray-500)' }}>
                        {documents.length} documents • {analyticsData.totalChunks} chunks
                    </span>
                </div>
                <table className="docs-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Chunks</th>
                            <th>Last Processed</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc, i) => (
                            <tr key={i} className="fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
                                <td>
                                    <span className="doc-name">
                                        <span className="doc-icon"><FileIcon size={18} color="var(--accent-color)" /></span>
                                        {doc.name}
                                    </span>
                                </td>
                                <td>{doc.type}</td>
                                <td>{doc.size}</td>
                                <td>{doc.chunks}</td>
                                <td>{doc.lastProcessed}</td>
                                <td>
                                    <span className={`doc-status ${doc.status}`}>
                                        {doc.status === 'active' ? <><CheckCircle size={14} className="mr-1" style={{ display: 'inline' }} /> Active</> : doc.status === 'processing' ? <><Clock size={14} className="mr-1" style={{ display: 'inline' }} /> Processing</> : <><AlertCircle size={14} className="mr-1" style={{ display: 'inline' }} /> Error</>}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const COLORS = ['#38bdf8', '#22c55e', '#f59e0b', '#a855f7', '#ef4444', '#64748b'];

function AnalyticsView({ t }) {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2><TrendingUp size={24} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} /> {t.analytics}</h2>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon sky"><TrendingUp size={20} /></div>
                    </div>
                    <div className="stat-value">{analyticsData.avgConfidence}%</div>
                    <div className="stat-label">Avg Confidence Score</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon green"><Clock size={20} /></div>
                    </div>
                    <div className="stat-value">{analyticsData.avgLatency}</div>
                    <div className="stat-label">Avg Response Latency</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon amber"><AlertCircle size={20} /></div>
                    </div>
                    <div className="stat-value">{analyticsData.hallucinationRate}</div>
                    <div className="stat-label">Hallucination Rate</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon purple"><FileText size={20} /></div>
                    </div>
                    <div className="stat-value">{analyticsData.totalChunks}</div>
                    <div className="stat-label">Total Chunks Indexed</div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dash-card">
                    <div className="dash-card-header">
                        <h3>Weekly Query Volume</h3>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData.dailyQueries}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ background: '#152847', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 12, color: '#f1f5f9' }}
                                />
                                <Bar dataKey="queries" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dash-card">
                    <div className="dash-card-header">
                        <h3>Intent Distribution</h3>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analyticsData.intentDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}%`}
                                >
                                    {analyticsData.intentDistribution.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: '#152847', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 12, color: '#f1f5f9' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AuditView({ t }) {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2><Shield size={24} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} /> {t.auditLog}</h2>
                <div className="dashboard-header-actions">
                    <button className="btn-secondary">📥 Export Logs</button>
                </div>
            </div>

            <div className="dash-card">
                <div className="dash-card-header">
                    <h3>System Activity</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gray-500)' }}>Last 24 hours</span>
                </div>
                <div className="audit-log">
                    {auditLogs.map((log, i) => (
                        <div key={i} className="audit-item fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                            <div className={`audit-icon ${log.type}`}>
                                {log.type === 'info' ? <Info size={16} /> : log.type === 'warning' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                            </div>
                            <div className="audit-detail">
                                <div className="audit-action">{log.action}</div>
                                <div className="audit-time">{log.user} • {log.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
